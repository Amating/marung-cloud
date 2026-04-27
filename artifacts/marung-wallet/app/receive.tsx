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

type ReceiveState = "form" | "success";

const SA_BANKS = [
  "Absa Bank",
  "FNB",
  "Nedbank",
  "Standard Bank",
  "Capitec Bank",
  "Investec",
];

export default function ReceiveScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { receivePayment } = useWallet();
  const [state, setState] = useState<ReceiveState>("form");
  const [senderPhone, setSenderPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [receivedFrom, setReceivedFrom] = useState("");

  const successScale = useSharedValue(0.5);
  const successOpacity = useSharedValue(0);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleReceive = () => {
    const phone = senderPhone.replace(/[^0-9+]/g, "");
    const amt = parseFloat(amount);
    if (phone.length < 9) {
      Alert.alert("Enter a valid sender phone number");
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Enter a valid amount");
      return;
    }

    const bankLabel = selectedBank ? ` via ${selectedBank}` : "";
    receivePayment(`${phone}${bankLabel}`, amt);
    setReceivedAmount(amt);
    setReceivedFrom(phone);
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
            style={[styles.successCircle, { backgroundColor: "rgba(34,197,94,0.12)" }]}
          >
            <View style={[styles.successInner, { backgroundColor: colors.success }]}>
              <Feather name="arrow-down-left" size={32} color="#fff" />
            </View>
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground }]}>
            Cash Send Received!
          </Text>
          <Text style={[styles.successFrom, { color: colors.mutedForeground }]}>
            From {receivedFrom}
          </Text>
          <Text style={[styles.successAmount, { color: colors.primary }]}>
            +R {receivedAmount.toFixed(2)}
          </Text>
          <Text style={[styles.successNote, { color: colors.mutedForeground }]}>
            Loaded to your Marung Cloud balance.{"\n"}Shop anywhere Visa or Mastercard is accepted.
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
          <Text style={[styles.formTitle, { color: colors.foreground }]}>
            Receive Cash Send
          </Text>
          <View style={{ width: 22 }} />
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="info" size={15} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            Funds load to your Marung Cloud from a cash send made at any South African bank. No
            cash deposits — only bank cash sends accepted.
          </Text>
        </View>

        <View style={styles.fields}>
          <View
            style={[
              styles.field,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Sender's Phone Number
            </Text>
            <TextInput
              style={[styles.fieldInput, { color: colors.foreground }]}
              placeholder="+27 8X XXX XXXX"
              placeholderTextColor={colors.mutedForeground}
              value={senderPhone}
              onChangeText={setSenderPhone}
              keyboardType="phone-pad"
              autoFocus
            />
          </View>

          <View
            style={[
              styles.field,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
              Sending Bank (optional)
            </Text>
            <View style={styles.bankGrid}>
              {SA_BANKS.map((bank) => (
                <TouchableOpacity
                  key={bank}
                  style={[
                    styles.bankChip,
                    {
                      backgroundColor:
                        selectedBank === bank
                          ? "rgba(212,160,23,0.15)"
                          : "rgba(255,255,255,0.04)",
                      borderColor:
                        selectedBank === bank
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedBank(selectedBank === bank ? "" : bank);
                  }}
                >
                  <Text
                    style={[
                      styles.bankChipText,
                      {
                        color:
                          selectedBank === bank
                            ? colors.primary
                            : colors.mutedForeground,
                      },
                    ]}
                  >
                    {bank}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.field,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
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
        </View>

        <TouchableOpacity
          style={[styles.receiveBtn, { backgroundColor: colors.primary }]}
          onPress={handleReceive}
          activeOpacity={0.85}
          testID="receive-confirm-btn"
        >
          <Feather name="arrow-down-left" size={18} color={colors.primaryForeground} />
          <Text style={[styles.receiveBtnText, { color: colors.primaryForeground }]}>
            Load to Cloud
          </Text>
        </TouchableOpacity>

        <Text style={[styles.bottomDisclaimer, { color: colors.mutedForeground }]}>
          Marung Cloud is not a bank. Funds held by Marung Sponsor Bank.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 16,
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
    gap: 8,
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
  },
  bankGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bankChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  bankChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currency: {
    fontSize: 18,
    fontWeight: "600",
  },
  amountInput: { flex: 1 },
  receiveBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: "auto",
  },
  receiveBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
  bottomDisclaimer: {
    textAlign: "center",
    fontSize: 11,
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
    fontSize: 26,
    fontWeight: "800",
  },
  successFrom: { fontSize: 15 },
  successAmount: {
    fontSize: 36,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
    marginTop: 4,
  },
  successNote: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 24,
  },
  doneWrap: { paddingHorizontal: 24 },
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
