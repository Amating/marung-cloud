import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallet } from "@/context/WalletContext";
import VirtualCard from "@/components/VirtualCard";
import TransactionItem from "@/components/TransactionItem";
import { useColors } from "@/hooks/useColors";

function CardNetworkToggle({
  current,
  onSwitch,
}: {
  current: "visa" | "mastercard";
  onSwitch: (type: "visa" | "mastercard") => void;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.toggleContainer,
        { borderColor: "rgba(212,160,23,0.3)", backgroundColor: colors.card },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.toggleBtn,
          current === "visa" ? { backgroundColor: colors.primary } : {},
        ]}
        onPress={() => onSwitch("visa")}
        activeOpacity={0.85}
        testID="toggle-visa"
      >
        <Text
          style={[
            styles.toggleBtnText,
            { color: current === "visa" ? colors.primaryForeground : colors.mutedForeground },
          ]}
        >
          VISA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleBtn,
          current === "mastercard" ? { backgroundColor: colors.primary } : {},
        ]}
        onPress={() => onSwitch("mastercard")}
        activeOpacity={0.85}
        testID="toggle-mastercard"
      >
        <Text
          style={[
            styles.toggleBtnText,
            {
              color:
                current === "mastercard"
                  ? colors.primaryForeground
                  : colors.mutedForeground,
            },
          ]}
        >
          Mastercard
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, balance, transactions, switchCardType } = useWallet();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const recentTx = transactions.slice(0, 4);

  const handleSwitchCard = (type: "visa" | "mastercard") => {
    if (type !== user?.cardType) {
      Haptics.selectionAsync();
      switchCardType(type);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View>
          <Text style={[styles.appLabel, { color: colors.primary }]}>Marung Cloud</Text>
          <Text style={[styles.name, { color: colors.foreground }]}>
            {user?.name ?? "Madichaba"}
          </Text>
        </View>
        <View
          style={[
            styles.notifBtn,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="bell" size={20} color={colors.foreground} />
        </View>
      </View>

      <View style={[styles.notBankBanner, { backgroundColor: "rgba(212,160,23,0.08)", borderColor: "rgba(212,160,23,0.18)" }]}>
        <Feather name="info" size={13} color={colors.primary} />
        <Text style={[styles.notBankText, { color: colors.mutedForeground }]}>
          Marung Cloud is not a bank. Funds held by Marung Sponsor Bank. Loads via bank cash send only.
        </Text>
      </View>

      <View style={styles.balanceSection}>
        <Text style={[styles.balanceLabel, { color: colors.mutedForeground }]}>
          Cloud Balance
        </Text>
        <Text style={[styles.balanceAmount, { color: colors.foreground }]}>
          R{" "}
          <Text style={{ color: colors.primary }}>{balance.toFixed(2)}</Text>
        </Text>
        <Text style={[styles.monthlyFee, { color: colors.mutedForeground }]}>
          R10/month · Active · {user?.cardType === "visa" ? "Visa" : "Mastercard"} linked
        </Text>
      </View>

      <View style={styles.toggleWrap}>
        <CardNetworkToggle current={user?.cardType ?? "visa"} onSwitch={handleSwitchCard} />
      </View>

      <View style={styles.cardWrap}>
        {user && (
          <VirtualCard
            cardNumber={user.cardNumber}
            cardType={user.cardType}
            name={user.name}
            expiry={user.expiryDate}
            cvv={user.cvv}
          />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/receive");
          }}
          activeOpacity={0.85}
          testID="receive-btn"
        >
          <Feather name="arrow-down-left" size={18} color={colors.primaryForeground} />
          <Text style={[styles.actionBtnText, { color: colors.primaryForeground }]}>
            Receive
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.secondary, borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/send");
          }}
          activeOpacity={0.85}
          testID="send-btn"
        >
          <Feather name="send" size={18} color={colors.foreground} />
          <Text style={[styles.actionBtnText, { color: colors.foreground }]}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnSquare,
            { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 },
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/(tabs)/pay");
          }}
          activeOpacity={0.85}
        >
          <Feather name="wifi" size={20} color={colors.foreground} />
          <Text style={[styles.actionBtnSquareText, { color: colors.foreground }]}>
            Tap Pay
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Recent Activity
          </Text>
          {transactions.length > 4 && (
            <TouchableOpacity onPress={() => router.push("/(tabs)/history")}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
        {recentTx.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="inbox" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No activity yet
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.mutedForeground }]}>
              Load your Cloud with a cash send from your bank
            </Text>
          </View>
        ) : (
          recentTx.map((tx) => <TransactionItem key={tx.id} transaction={tx} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  appLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  notBankBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 4,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  notBankText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 16,
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 2,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    fontVariant: ["tabular-nums"],
  },
  monthlyFee: {
    fontSize: 12,
    marginTop: 2,
  },
  toggleWrap: {
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleBtnText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  cardWrap: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
  actionBtnSquare: {
    width: 72,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  actionBtnSquareText: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 28,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  emptySubtext: {
    fontSize: 13,
    textAlign: "center",
  },
});
