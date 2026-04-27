import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
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
  withTiming,
} from "react-native-reanimated";
import { useColors } from "@/hooks/useColors";

interface VirtualCardProps {
  cardNumber: string;
  cardType: "visa" | "mastercard";
  name: string;
  expiry: string;
  cvv: string;
  balance?: number;
}

const CARD_ASPECT = 1.586;

function VisaLogo({ size = 28 }: { size?: number }) {
  return (
    <Text
      style={{
        fontSize: size,
        fontWeight: "900",
        color: "#fff",
        fontStyle: "italic",
        letterSpacing: -1,
      }}
    >
      VISA
    </Text>
  );
}

function MastercardLogo({ size = 32 }: { size?: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#EB001B",
          opacity: 0.95,
        }}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#F79E1B",
          opacity: 0.95,
          marginLeft: -(size * 0.38),
        }}
      />
    </View>
  );
}

function ChipIcon() {
  return (
    <View
      style={{
        width: 36,
        height: 28,
        borderRadius: 5,
        backgroundColor: "#D4A017",
        borderWidth: 1,
        borderColor: "#F0C84A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 20,
          height: 14,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "#8a6500",
        }}
      />
    </View>
  );
}

export default function VirtualCard({
  cardNumber,
  cardType,
  name,
  expiry,
  cvv,
}: VirtualCardProps) {
  const colors = useColors();
  const [isFlipped, setIsFlipped] = useState(false);
  const scaleX = useSharedValue(1);

  const formattedNumber = cardNumber.replace(/(.{4})/g, "$1 ").trim();
  const maskedNumber = formattedNumber
    .split(" ")
    .map((group, i) => (i < 3 ? "••••" : group))
    .join(" ");

  const handleFlip = () => {
    if (Platform.OS === "web") {
      setIsFlipped(!isFlipped);
      return;
    }
    scaleX.value = withTiming(0, { duration: 180 }, () => {
      setIsFlipped((prev) => !prev);
      scaleX.value = withTiming(1, { duration: 180 });
    });
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
  }));

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.95}>
      <Animated.View style={[styles.container, animStyle]}>
        <LinearGradient
          colors={["#0d3320", "#1a4731", "#0a2518"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {!isFlipped ? (
            <>
              <View style={styles.cardTop}>
                <View>
                  <Text style={[styles.bankName, { color: colors.goldLight }]}>
                    Marung
                  </Text>
                  <Text style={[styles.bankSub, { color: "rgba(255,255,255,0.5)" }]}>
                    Wallet
                  </Text>
                </View>
                {cardType === "visa" ? (
                  <VisaLogo size={26} />
                ) : (
                  <MastercardLogo size={30} />
                )}
              </View>
              <View style={styles.chipRow}>
                <ChipIcon />
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: 1.5,
                    borderColor: "rgba(212,160,23,0.4)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor: "rgba(212,160,23,0.6)",
                    }}
                  />
                </View>
              </View>
              <Text style={styles.cardNumber}>{maskedNumber}</Text>
              <View style={styles.cardBottom}>
                <View>
                  <Text style={styles.cardLabel}>CARD HOLDER</Text>
                  <Text style={styles.cardValue}>{name.toUpperCase()}</Text>
                </View>
                <View>
                  <Text style={styles.cardLabel}>EXPIRES</Text>
                  <Text style={styles.cardValue}>{expiry}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.magneticStripe} />
              <View style={styles.cvvRow}>
                <View style={styles.cvvStripe}>
                  <Text style={styles.cvvText}>{cvv}</Text>
                </View>
                <Text style={styles.cvvLabel}>CVV</Text>
              </View>
              <View style={styles.backBottom}>
                {cardType === "visa" ? (
                  <VisaLogo size={22} />
                ) : (
                  <MastercardLogo size={26} />
                )}
                <Text style={styles.backBankName}>Marung Sponsor Bank</Text>
              </View>
              <Text style={styles.tapHint}>Tap to flip back</Text>
            </>
          )}
          <View style={styles.tapHintFront}>
            <Text style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>
              {isFlipped ? "" : "Tap to see CVV"}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  card: {
    width: "100%",
    aspectRatio: CARD_ASPECT,
    borderRadius: 16,
    padding: 22,
    justifyContent: "space-between",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bankName: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bankSub: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 17,
    letterSpacing: 2.5,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cardValue: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  magneticStripe: {
    height: 42,
    backgroundColor: "#111",
    marginHorizontal: -22,
    marginTop: 10,
  },
  cvvRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  cvvStripe: {
    flex: 1,
    backgroundColor: "#fff",
    height: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 12,
  },
  cvvText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 3,
  },
  cvvLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "600",
  },
  backBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  backBankName: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tapHint: {
    color: "rgba(255,255,255,0.25)",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },
  tapHintFront: {
    position: "absolute",
    bottom: 8,
    right: 0,
    left: 0,
    alignItems: "center",
  },
});
