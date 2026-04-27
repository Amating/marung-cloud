import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
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
import VirtualCard from "@/components/VirtualCard";
import { useColors } from "@/hooks/useColors";

export default function SuccessScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completeOnboarding } = useWallet();
  const { phone, cardType } = useLocalSearchParams<{
    phone: string;
    cardType: "visa" | "mastercard";
  }>();

  const [tempCardNumber] = React.useState(() =>
    cardType === "visa"
      ? "4" + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("")
      : "5" + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("")
  );
  const [tempExpiry] = React.useState(() => {
    const y = (new Date().getFullYear() + 4) % 100;
    const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    return `${m}/${String(y).padStart(2, "0")}`;
  });

  const checkOpacity = useSharedValue(0);
  const checkScale = useSharedValue(0.4);
  const cardY = useSharedValue(60);
  const cardOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);
  const btnY = useSharedValue(20);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    checkOpacity.value = withDelay(100, withTiming(1, { duration: 400 }));
    checkScale.value = withDelay(100, withSpring(1, { damping: 12, stiffness: 200 }));
    cardY.value = withDelay(400, withSpring(0, { damping: 16 }));
    cardOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    titleOpacity.value = withDelay(700, withTiming(1, { duration: 400 }));
    btnOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));
    btnY.value = withDelay(900, withSpring(0));
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkScale.value }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
  }));
  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ translateY: btnY.value }],
  }));

  const handleGoToWallet = async () => {
    await completeOnboarding(phone, cardType);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/(tabs)");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad, paddingBottom: bottomPad + 24 },
      ]}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.checkWrap, checkStyle]}>
          <View style={[styles.checkCircle, { backgroundColor: "rgba(34,197,94,0.15)" }]}>
            <View style={[styles.checkCircleInner, { backgroundColor: colors.success }]}>
              <Feather name="check" size={28} color="#fff" />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={titleStyle}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Your Cloud is ready!
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {phone} is now linked to your {cardType === "visa" ? "Visa" : "Mastercard"} Marung Cloud.
            Load it with a cash send from any SA bank.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.cardWrap, cardStyle]}>
          <VirtualCard
            cardNumber={tempCardNumber}
            cardType={cardType}
            name="Madichaba"
            expiry={tempExpiry}
            cvv="•••"
          />
        </Animated.View>

        <Animated.View style={[styles.balanceRow, titleStyle]}>
          <Text style={[styles.balanceLabel, { color: colors.mutedForeground }]}>
            Starting balance
          </Text>
          <Text style={[styles.balanceValue, { color: colors.primary }]}>R 0.00</Text>
        </Animated.View>
      </View>

      <Animated.View style={btnStyle}>
        <TouchableOpacity
          style={[styles.goBtn, { backgroundColor: colors.primary }]}
          onPress={handleGoToWallet}
          activeOpacity={0.85}
        >
          <Text style={[styles.goBtnText, { color: colors.primaryForeground }]}>
            Open Marung Cloud
          </Text>
          <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    gap: 24,
    justifyContent: "center",
  },
  checkWrap: {
    alignItems: "center",
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  checkCircleInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 6,
  },
  cardWrap: {
    paddingHorizontal: 4,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  goBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  goBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
