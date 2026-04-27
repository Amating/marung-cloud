import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallet } from "@/context/WalletContext";
import { useColors } from "@/hooks/useColors";

type PayState = "ready" | "entering" | "processing" | "success";

export default function PayScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { balance, makePayment, user } = useWallet();
  const [payState, setPayState] = useState<PayState>("ready");
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [paidMerchant, setPaidMerchant] = useState("");

  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0.5)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (payState === "ready") {
      startPulse();
    }
    return () => {
      pulseAnimRef.current?.stop();
    };
  }, [payState]);

  const startPulse = () => {
    pulseAnimRef.current?.stop();
    ring1.setValue(0);
    ring2.setValue(0);
    ring3.setValue(0);
    const createRingAnim = (val: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    pulseAnimRef.current = Animated.parallel([
      createRingAnim(ring1, 0),
      createRingAnim(ring2, 650),
      createRingAnim(ring3, 1300),
    ]);
    pulseAnimRef.current.start();
  };

  const handleSimulateTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPayState("entering");
  };

  const handleConfirmPay = () => {
    const amt = parseFloat(amount);
    if (!merchant.trim()) {
      Alert.alert("Enter merchant name");
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Enter a valid amount");
      return;
    }
    if (amt > balance) {
      Alert.alert("Insufficient balance", `Your balance is R ${balance.toFixed(2)}`);
      return;
    }
    setPaidAmount(amt);
    setPaidMerchant(merchant.trim());
    setPayState("processing");

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setTimeout(() => {
      makePayment(merchant.trim(), amt);
      setPayState("success");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.parallel([
        Animated.spring(successScale, { toValue: 1, useNativeDriver: true, damping: 12 }),
        Animated.timing(successOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }, 1500);
  };

  const handleDone = () => {
    setMerchant("");
    setAmount("");
    successScale.setValue(0.5);
    successOpacity.setValue(0);
    setPayState("ready");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const ringStyle = (val: Animated.Value) => ({
    transform: [{ scale: val.interpolate({ inputRange: [0, 1], outputRange: [1, 2.8] }) }],
    opacity: val.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.5, 0] }),
  });

  if (payState === "success") {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
        <Animated.View
          style={[styles.successContainer, { opacity: successOpacity, transform: [{ scale: successScale }] }]}
        >
          <View style={[styles.successCircle, { backgroundColor: "rgba(34,197,94,0.15)" }]}>
            <View style={[styles.successInner, { backgroundColor: colors.success }]}>
              <Feather name="check" size={32} color="#fff" />
            </View>
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground }]}>Payment Sent!</Text>
          <Text style={[styles.successMerchant, { color: colors.mutedForeground }]}>{paidMerchant}</Text>
          <Text style={[styles.successAmount, { color: colors.primary }]}>
            R {paidAmount.toFixed(2)}
          </Text>
          <Text style={[styles.successCard, { color: colors.mutedForeground }]}>
            via {user?.cardType === "visa" ? "Visa" : "Mastercard"} · Contactless
          </Text>
        </Animated.View>
        <View style={[styles.doneWrap, { paddingBottom: bottomPad + 100 }]}>
          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
            onPress={handleDone}
            activeOpacity={0.85}
          >
            <Text style={[styles.doneBtnText, { color: colors.primaryForeground }]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (payState === "processing") {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.processingContainer}>
          <Animated.View style={[styles.ring, styles.ringLarge, { borderColor: colors.primary, ...ringStyle(ring1) }]} />
          <Animated.View style={[styles.ring, styles.ringLarge, { borderColor: colors.primary, ...ringStyle(ring2) }]} />
          <View style={[styles.nfcIconWrap, { backgroundColor: colors.primary }]}>
            <Feather name="wifi" size={32} color={colors.primaryForeground} />
          </View>
          <Text style={[styles.processingText, { color: colors.foreground, marginTop: 32 }]}>
            Processing...
          </Text>
        </View>
      </View>
    );
  }

  if (payState === "entering") {
    return (
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.enterContainer, { paddingTop: topPad + 16, paddingBottom: bottomPad + 100 }]}>
          <View style={styles.enterHeader}>
            <TouchableOpacity onPress={() => setPayState("ready")}>
              <Feather name="x" size={22} color={colors.foreground} />
            </TouchableOpacity>
            <Text style={[styles.enterTitle, { color: colors.foreground }]}>Payment Details</Text>
            <View style={{ width: 22 }} />
          </View>

          <View style={styles.enterFields}>
            <View style={[styles.field, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Merchant / Payee</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.foreground }]}
                placeholder="e.g. Pick n Pay, Garage..."
                placeholderTextColor={colors.mutedForeground}
                value={merchant}
                onChangeText={setMerchant}
                autoFocus
              />
            </View>

            <View style={[styles.field, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Amount</Text>
              <View style={styles.amountRow}>
                <Text style={[styles.currencySymbol, { color: colors.foreground }]}>R</Text>
                <TextInput
                  style={[styles.fieldInput, styles.amountInput, { color: colors.foreground }]}
                  placeholder="0.00"
                  placeholderTextColor={colors.mutedForeground}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <Text style={[styles.balanceHint, { color: colors.mutedForeground }]}>
              Available: R {balance.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.payBtn, { backgroundColor: colors.primary }]}
            onPress={handleConfirmPay}
            activeOpacity={0.85}
          >
            <Feather name="wifi" size={18} color={colors.primaryForeground} />
            <Text style={[styles.payBtnText, { color: colors.primaryForeground }]}>
              Confirm Payment
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      <Text style={[styles.pageTitle, { color: colors.foreground }]}>Tap to Pay</Text>
      <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
        {user?.cardType === "visa" ? "Visa" : "Mastercard"} contactless
      </Text>

      <View style={styles.pulseContainer}>
        <Animated.View style={[styles.ring, { borderColor: colors.primary, ...ringStyle(ring1) }]} />
        <Animated.View style={[styles.ring, { borderColor: colors.primary, ...ringStyle(ring2) }]} />
        <Animated.View style={[styles.ring, { borderColor: colors.primary, ...ringStyle(ring3) }]} />
        <View style={[styles.nfcIconWrap, { backgroundColor: "rgba(212,160,23,0.12)", borderColor: colors.primary }]}>
          <Feather name="wifi" size={40} color={colors.primary} />
        </View>
      </View>

      <Text style={[styles.readyText, { color: colors.foreground }]}>Ready to Tap</Text>
      <Text style={[styles.readySubtext, { color: colors.mutedForeground }]}>
        Hold your phone near any contactless payment terminal
      </Text>

      <View style={[styles.bottomActions, { paddingBottom: bottomPad + 100 }]}>
        <TouchableOpacity
          style={[styles.simulateBtn, { backgroundColor: colors.primary }]}
          onPress={handleSimulateTap}
          activeOpacity={0.85}
          testID="simulate-payment-btn"
        >
          <Text style={[styles.simulateBtnText, { color: colors.primaryForeground }]}>
            Simulate Payment
          </Text>
        </TouchableOpacity>
        <Text style={[styles.simulateHint, { color: colors.mutedForeground }]}>
          Balance: R {balance.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 20,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  pulseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  ringLarge: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  nfcIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  readyText: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  readySubtext: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  bottomActions: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 10,
    alignItems: "center",
  },
  simulateBtn: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  simulateBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
  simulateHint: {
    fontSize: 13,
  },
  enterContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 24,
  },
  enterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  enterTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  enterFields: {
    gap: 12,
  },
  field: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  fieldInput: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
  },
  amountInput: {
    flex: 1,
  },
  balanceHint: {
    fontSize: 13,
    textAlign: "right",
  },
  payBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: "auto",
  },
  payBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    fontSize: 18,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  successInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "800",
  },
  successMerchant: {
    fontSize: 16,
  },
  successAmount: {
    fontSize: 36,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
    marginTop: 4,
  },
  successCard: {
    fontSize: 13,
  },
  doneWrap: {
    width: "100%",
    paddingHorizontal: 24,
  },
  doneBtn: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  doneBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
