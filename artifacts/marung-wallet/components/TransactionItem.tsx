import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { Transaction } from "@/context/WalletContext";

interface Props {
  transaction: Transaction;
}

function formatAmount(amount: number): string {
  return `R ${amount.toFixed(2)}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

export default function TransactionItem({ transaction }: Props) {
  const colors = useColors();
  const isReceive = transaction.type === "receive";

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: isReceive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)" },
        ]}
      >
        <Feather
          name={isReceive ? "arrow-down-left" : "arrow-up-right"}
          size={18}
          color={isReceive ? colors.success : colors.destructive}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.description, { color: colors.foreground }]} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={[styles.date, { color: colors.mutedForeground }]}>
          {formatDate(transaction.timestamp)}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: isReceive ? colors.success : colors.destructive },
        ]}
      >
        {isReceive ? "+" : "-"}
        {formatAmount(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 15,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
});
