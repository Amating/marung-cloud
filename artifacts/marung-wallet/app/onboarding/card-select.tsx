import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

type CardType = "visa" | "mastercard";

function VisaOption({ selected, onPress }: { selected: boolean; onPress: () => void }) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[
        styles.cardOption,
        {
          backgroundColor: selected ? "rgba(212,160,23,0.1)" : colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardNetworkLogo}>
        <Text style={{ fontSize: 28, fontWeight: "900", color: "#fff", fontStyle: "italic", letterSpacing: -1 }}>
          VISA
        </Text>
      </View>
      <View style={styles.cardOptionInfo}>
        <Text style={[styles.cardOptionTitle, { color: colors.foreground }]}>Visa</Text>
        <Text style={[styles.cardOptionDesc, { color: colors.mutedForeground }]}>
          Accepted at 100M+ merchants worldwide
        </Text>
      </View>
      {selected && (
        <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
          <Feather name="check" size={14} color={colors.primaryForeground} />
        </View>
      )}
    </TouchableOpacity>
  );
}

function MastercardOption({ selected, onPress }: { selected: boolean; onPress: () => void }) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[
        styles.cardOption,
        {
          backgroundColor: selected ? "rgba(212,160,23,0.1)" : colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardNetworkLogo}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#EB001B" }} />
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#F79E1B", marginLeft: -10 }} />
        </View>
      </View>
      <View style={styles.cardOptionInfo}>
        <Text style={[styles.cardOptionTitle, { color: colors.foreground }]}>Mastercard</Text>
        <Text style={[styles.cardOptionDesc, { color: colors.mutedForeground }]}>
          Contactless & online payments worldwide
        </Text>
      </View>
      {selected && (
        <View style={[styles.checkCircle, { backgroundColor: colors.primary }]}>
          <Feather name="check" size={14} color={colors.primaryForeground} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function CardSelectScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [selected, setSelected] = useState<CardType>("visa");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSelect = (type: CardType) => {
    Haptics.selectionAsync();
    setSelected(type);
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/onboarding/success", params: { phone, cardType: selected } });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad, paddingBottom: bottomPad + 24 },
      ]}
    >
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Feather name="arrow-left" size={22} color={colors.foreground} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.primary }]}>Step 2 of 3</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Choose your{"\n"}card network</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Your wallet balance will be linked to this card. You can tap to pay anywhere it's accepted.
          </Text>
        </View>

        <View style={styles.optionList}>
          <VisaOption selected={selected === "visa"} onPress={() => handleSelect("visa")} />
          <MastercardOption selected={selected === "mastercard"} onPress={() => handleSelect("mastercard")} />
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="info" size={15} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            Both networks are accepted at all major South African retailers, petrol stations, and online stores.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: colors.primary }]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={[styles.continueBtnText, { color: colors.primaryForeground }]}>
            Create My Wallet
          </Text>
          <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
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
    gap: 28,
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
  optionList: {
    gap: 12,
  },
  cardOption: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 18,
    gap: 14,
  },
  cardNetworkLogo: {
    width: 56,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cardOptionInfo: {
    flex: 1,
    gap: 3,
  },
  cardOptionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardOptionDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
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
