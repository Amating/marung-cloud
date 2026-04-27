import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface Transaction {
  id: string;
  type: "receive" | "pay";
  amount: number;
  description: string;
  timestamp: string;
}

export interface UserProfile {
  phoneNumber: string;
  name: string;
  cardType: "visa" | "mastercard";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface WalletState {
  isOnboarded: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  balance: number;
  transactions: Transaction[];
}

interface WalletContextType extends WalletState {
  completeOnboarding: (phone: string, cardType: "visa" | "mastercard") => Promise<void>;
  receivePayment: (sender: string, amount: number) => void;
  makePayment: (merchant: string, amount: number) => void;
  switchCardType: (cardType: "visa" | "mastercard") => Promise<void>;
  resetWallet: () => Promise<void>;
}

const STORAGE_KEYS = {
  IS_ONBOARDED: "@marung/isOnboarded",
  USER: "@marung/user",
  BALANCE: "@marung/balance",
  TRANSACTIONS: "@marung/transactions",
};

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function generateCardNumber(cardType: "visa" | "mastercard"): string {
  const prefix = cardType === "visa" ? "4" : "5";
  let num = prefix;
  for (let i = 0; i < 15; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
}

function formatCardDisplay(num: string): string {
  return num.replace(/(.{4})/g, "$1 ").trim();
}

function generateExpiry(): string {
  const now = new Date();
  const year = (now.getFullYear() + 4) % 100;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  return `${month}/${String(year).padStart(2, "0")}`;
}

function generateCVV(): string {
  return String(Math.floor(Math.random() * 900) + 100);
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    isOnboarded: false,
    isLoading: true,
    user: null,
    balance: 0,
    transactions: [],
  });

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const [isOnboarded, userStr, balanceStr, txStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.IS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.BALANCE),
        AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS),
      ]);

      setState({
        isOnboarded: isOnboarded === "true",
        isLoading: false,
        user: userStr ? JSON.parse(userStr) : null,
        balance: balanceStr ? parseFloat(balanceStr) : 0,
        transactions: txStr ? JSON.parse(txStr) : [],
      });
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  };

  const completeOnboarding = useCallback(
    async (phone: string, cardType: "visa" | "mastercard") => {
      const user: UserProfile = {
        phoneNumber: phone,
        name: "Madichaba",
        cardType,
        cardNumber: generateCardNumber(cardType),
        expiryDate: generateExpiry(),
        cvv: generateCVV(),
      };
      const demoBalance = 500;
      const demoTx: Transaction[] = [
        {
          id: generateId(),
          type: "receive",
          amount: 500,
          description: "Cash send from Capitec",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
      ];
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.IS_ONBOARDED, "true"),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
        AsyncStorage.setItem(STORAGE_KEYS.BALANCE, String(demoBalance)),
        AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(demoTx)),
      ]);
      setState((s) => ({ ...s, isOnboarded: true, user, balance: demoBalance, transactions: demoTx }));
    },
    []
  );

  const receivePayment = useCallback((sender: string, amount: number) => {
    const tx: Transaction = {
      id: generateId(),
      type: "receive",
      amount,
      description: `From ${sender}`,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => {
      const newBalance = prev.balance + amount;
      const newTx = [tx, ...prev.transactions];
      AsyncStorage.setItem(STORAGE_KEYS.BALANCE, String(newBalance));
      AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(newTx));
      return { ...prev, balance: newBalance, transactions: newTx };
    });
  }, []);

  const makePayment = useCallback((merchant: string, amount: number) => {
    const tx: Transaction = {
      id: generateId(),
      type: "pay",
      amount,
      description: merchant,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => {
      const newBalance = Math.max(0, prev.balance - amount);
      const newTx = [tx, ...prev.transactions];
      AsyncStorage.setItem(STORAGE_KEYS.BALANCE, String(newBalance));
      AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(newTx));
      return { ...prev, balance: newBalance, transactions: newTx };
    });
  }, []);

  const switchCardType = useCallback(async (cardType: "visa" | "mastercard") => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedUser: UserProfile = {
        ...prev.user,
        cardType,
        cardNumber: generateCardNumber(cardType),
      };
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  }, []);

  const resetWallet = useCallback(async () => {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    setState({ isOnboarded: false, isLoading: false, user: null, balance: 0, transactions: [] });
  }, []);

  return (
    <WalletContext.Provider
      value={{ ...state, completeOnboarding, receivePayment, makePayment, switchCardType, resetWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}

export { formatCardDisplay };
