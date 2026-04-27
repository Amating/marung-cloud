import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
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
import { useColors } from "@/hooks/useColors";

export default function WelcomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const logoOpacity = useSharedValue(0);
  const logoY = useSharedValue(30);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const btnOpacity = useSharedValue(0);
  const btnY = useSharedValue(20);

  useEffect(() => {
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 700 }));
    logoY.value = withDelay(200, withSpring(0));
    titleOpacity.value = withDelay(450, withTiming(1, { duration: 700 }));
    titleY.value = withDelay(450, withSpring(0));
    subtitleOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    btnOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
    btnY.value = withDelay(1000, withSpring(0));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }],
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));
  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));
  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ translateY: btnY.value }],
  }));

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <LinearGradient
      colors={["#051A12", "#0C1F15", "#051A12"]}
      style={[
        styles.container,
        { paddingTop: topPad + 12, paddingBottom: bottomPad + 32 },
      ]}
    >
      <View style={styles.topSection}>
        <Animated.View style={[styles.logoWrap, logoStyle]}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.View style={titleStyle}>
          <Text style={[styles.appName, { color: colors.foreground }]}>Marung Cloud</Text>
          <Text style={[styles.tagline, { color: colors.primary }]}>
            Your cash send. Your card. Transact anywhere.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.middleSection}>
        <Animated.View style={[styles.featureList, subtitleStyle]}>
          {[
            {
              icon: "smartphone" as const,
              text: "Cash sends from any SA bank land directly in your Cloud",
            },
            {
              icon: "credit-card" as const,
              text: "Shop online and offline with Visa or Mastercard",
            },
            {
              icon: "send" as const,
              text: "Send money instantly to other Marung Cloud subscribers",
            },
            {
              icon: "shield" as const,
              text: "Marung Cloud is not a bank — funds held by Marung Sponsor Bank",
            },
          ].map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: "rgba(212,160,23,0.12)" },
                ]}
              >
                <Feather name={item.icon} size={18} color={colors.primary} />
              </View>
              <Text style={[styles.featureText, { color: colors.mutedForeground }]}>
                {item.text}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Animated.View style={[styles.bottomSection, btnStyle]}>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/onboarding/phone")}
          activeOpacity={0.85}
        >
          <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
            Get Started
          </Text>
          <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
        </TouchableOpacity>
        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
          R10/month to activate · Not a bank · Visa & Mastercard linked
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  logoWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#D4A017",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 88,
    height: 88,
  },
  appName: {
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
    marginTop: 4,
    lineHeight: 22,
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  featureList: { gap: 14 },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSection: { gap: 12 },
  primaryBtn: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryBtnText: {
    fontSize: 17,
    fontWeight: "700",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 17,
  },
});
