import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallet } from "@/context/WalletContext";
import { useColors } from "@/hooks/useColors";

type SendState = "form" | "success";

export default function SendScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { balance, makePayment } = useWallet();
  const [state, setState] = useState<SendState>("form");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [sentAmount, setSentAmount] = useState(0);
  const [sentTo, setSentTo] = useState("");

  const successScale = useSharedValue(0.5);
  const successOpacity = useSharedValue(0);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSend = () => {
    const phone = recipientPhone.trim();
    const amt = parseFloat(amount);
    if (phone.length < 9) {
      Alert.alert("Enter a valid recipient phone number");
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Enter a valid amount");
      return;
    }
    if (amt > balance) {
      Alert.alert(
        "Insufficient balance",
        `Your balance is R ${balance.toFixed(2)}. Load funds via a cash send from your bank.`
      );
      return;
    }

    makePayment(`To ${phone}`, amt);
    setSentAmount(amt);
    setSentTo(phone);
    setState("success");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    successScale.value = withDelay(100, withSpring(1, { damping: 12, stiffness: 200 }));
    successOpacity.value = withDelay(100, withTiming(1, { duration: 400 }));
  };

  const successStyle = useAnimatedStyle(() => ({
    opacity: successOpacity.value,
    transform: [{ scale: successScale.value }],
  }));

  if (state === "success") {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, paddingTop: topPad + 8 },
        ]}
      >
        <Animated.View style={[styles.successContainer, successStyle]}>
          <View
            style={[styles.successCircle, { backgroundColor: "rgba(212,160,23,0.12)" }]}
          >
            <View style={[styles.successInner, { backgroundColor: colors.primary }]}>
              <Feather name="send" size={28} color={colors.primaryForeground} />
            </View>
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground }]}>Money Sent!</Text>
          <Text style={[styles.successTo, { color: colors.mutedForeground }]}>
            Sent to {sentTo}
          </Text>
          <Text style={[styles.successAmount, { color: colors.primary }]}>
            R {sentAmount.toFixed(2)}
          </Text>
          <Text style={[styles.successNote, { color: colors.mutedForeground }]}>
            Recipient receives funds instantly in their Marung Cloud wallet
          </Text>
        </Animated.View>

        <View style={[styles.doneWrap, { paddingBottom: bottomPad + 24 }]}>
          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Text style={[styles.doneBtnText, { color: colors.primaryForeground }]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[
          styles.formContainer,
          { paddingTop: topPad + 8, paddingBottom: bottomPad + 24 },
        ]}
      >
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="x" size={22} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.formTitle, { color: colors.foreground }]}>Send Money</Text>
          <View style={{ width: 22 }} />
        </View>

        <View
          style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Feather name="users" size={15} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            Send instantly to any Marung Cloud subscriber. The recipient must have a Marung Cloud
            account and a linked Visa or Mastercard.
          </Text>
        </View>

        <View style={styles.fields}>
          <View
            style={[styles.field, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Recipient Phone Number
            </Text>
            <View style={styles.phoneRow}>
              <Text style={[styles.countryCode, { color: colors.mutedForeground }]}>+27</Text>
              <TextInput
                style={[styles.fieldInput, { color: colors.foreground }]}
                placeholder="8X XXX XXXX"
                placeholderTextColor={colors.mutedForeground}
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                keyboardType="phone-pad"
                autoFocus
              />
            </View>
          </View>

          <View
            style={[styles.field, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Amount (Rands)
            </Text>
            <View style={styles.amountRow}>
              <Text style={[styles.currency, { color: colors.foreground }]}>R</Text>
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
            Available balance: R {balance.toFixed(2)}
          </Text>
        </View>

        <View
          style={[
            styles.disclaimer,
            { backgroundColor: "rgba(212,160,23,0.07)", borderColor: "rgba(212,160,23,0.2)" },
          ]}
        >
          <Feather name="alert-circle" size={13} color={colors.primary} />
          <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
            Marung Cloud is not a bank. Funds are held by Marung Sponsor Bank. No cash deposits —
            only bank cash sends.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          onPress={handleSend}
          activeOpacity={0.85}
          testID="send-confirm-btn"
        >
          <Feather name="send" size={18} color={colors.primaryForeground} />
          <Text style={[styles.sendBtnText, { color: colors.primaryForeground }]}>
            Send Money
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  infoCard: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  fields: { gap: 12 },
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
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
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
    marginTop: 4,
  },
  currency: {
    fontSize: 18,
    fontWeight: "600",
  },
  amountInput: { flex: 1 },
  balanceHint: {
    fontSize: 13,
    textAlign: "right",
  },
  disclaimer: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
  sendBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: "auto",
  },
  sendBtnText: {
    fontSize: 17,
    fontWeight: "700",
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
  successTo: { fontSize: 16 },
  successAmount: {
    fontSize: 36,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
    marginTop: 4,
  },
  successNote: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 18,
  },
  doneWrap: {
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
