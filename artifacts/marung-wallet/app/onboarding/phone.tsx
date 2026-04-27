import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function PhoneScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    setPhone(digits);
    if (error) setError("");
  };

  const displayPhone = phone ? `+27 ${phone}` : "";

  const handleContinue = () => {
    if (phone.length < 9) {
      setError("Please enter a valid 9-digit mobile number");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/onboarding/card-select", params: { phone: `+27${phone}` } });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad, paddingBottom: bottomPad + 24 },
      ]}
    >
      <TouchableOpacity
        style={[styles.backBtn]}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Feather name="arrow-left" size={22} color={colors.foreground} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.primary }]}>Step 1 of 3</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>What's your{"\n"}number?</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Cash sends from any South African bank will land in your Marung wallet.
          </Text>
        </View>

        <View style={styles.inputSection}>
          <TouchableOpacity
            style={[styles.inputWrap, { borderColor: error ? colors.destructive : colors.border, backgroundColor: colors.card }]}
            onPress={() => inputRef.current?.focus()}
            activeOpacity={1}
          >
            <View style={[styles.countryCode, { borderRightColor: colors.border }]}>
              <Text style={[styles.flagText]}>🇿🇦</Text>
              <Text style={[styles.codeText, { color: colors.foreground }]}>+27</Text>
            </View>
            <TextInput
              ref={inputRef}
              style={[styles.input, { color: colors.foreground }]}
              placeholder="8X XXX XXXX"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handleChange}
              maxLength={10}
              autoFocus
            />
          </TouchableOpacity>
          {error ? (
            <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.continueBtn,
            {
              backgroundColor: phone.length >= 9 ? colors.primary : colors.secondary,
            },
          ]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.continueBtnText,
              { color: phone.length >= 9 ? colors.primaryForeground : colors.mutedForeground },
            ]}
          >
            Continue
          </Text>
          <Feather
            name="arrow-right"
            size={18}
            color={phone.length >= 9 ? colors.primaryForeground : colors.mutedForeground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginTop: 8,
    marginBottom: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 36,
  },
  header: {
    gap: 10,
    marginTop: 16,
  },
  step: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputSection: {
    gap: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    height: 60,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 6,
    borderRightWidth: 1,
    height: "100%",
  },
  flagText: {
    fontSize: 20,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    height: "100%",
  },
  error: {
    fontSize: 13,
    paddingLeft: 4,
  },
  continueBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: "auto",
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
