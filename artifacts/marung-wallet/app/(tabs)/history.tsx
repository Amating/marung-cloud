import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallet } from "@/context/WalletContext";
import TransactionItem from "@/components/TransactionItem";
import { useColors } from "@/hooks/useColors";

export default function HistoryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { transactions, balance } = useWallet();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const totalIn = transactions
    .filter((t) => t.type === "receive")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOut = transactions
    .filter((t) => t.type === "pay")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Transactions</Text>
      </View>

      {transactions.length > 0 && (
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.2)" }]}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total In</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>
              +R {totalIn.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.15)" }]}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total Out</Text>
            <Text style={[styles.summaryValue, { color: colors.destructive }]}>
              -R {totalOut.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: "rgba(212,160,23,0.1)", borderColor: "rgba(212,160,23,0.2)" }]}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Balance</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>
              R {balance.toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: 120 },
          transactions.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={transactions.length > 0}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="inbox" size={44} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No transactions
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.mutedForeground }]}>
              Receive a cash send or make a payment to see your history here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  summaryRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 8,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    gap: 3,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  list: {
    paddingHorizontal: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
