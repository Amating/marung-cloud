import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWallet } from "@/context/WalletContext";
import { useColors } from "@/hooks/useColors";

type FeatherIconName =
  | "dollar-sign"
  | "activity"
  | "calendar"
  | "credit-card"
  | "hash"
  | "clock"
  | "eye"
  | "shield"
  | "lock"
  | "map-pin"
  | "bell"
  | "help-circle"
  | "info"
  | "trash-2"
  | "chevron-right";

function Row({
  icon,
  label,
  value,
  mono,
}: {
  icon: FeatherIconName;
  label: string;
  value: string;
  mono?: boolean;
}) {
  const colors = useColors();
  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View style={[styles.rowIcon, { backgroundColor: "rgba(212,160,23,0.1)" }]}>
        <Feather name={icon} size={16} color={colors.primary} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text
          style={[
            styles.rowValue,
            { color: colors.foreground, fontFamily: mono ? "monospace" : undefined },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

function SettingRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: FeatherIconName;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[styles.settingRow, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        style={[
          styles.rowIcon,
          {
            backgroundColor: danger
              ? "rgba(239,68,68,0.1)"
              : "rgba(255,255,255,0.06)",
          },
        ]}
      >
        <Feather
          name={icon}
          size={16}
          color={danger ? colors.destructive : colors.mutedForeground}
        />
      </View>
      <Text
        style={[
          styles.settingLabel,
          { color: danger ? colors.destructive : colors.foreground },
        ]}
      >
        {label}
      </Text>
      {!danger && (
        <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, balance, transactions, resetWallet } = useWallet();
  const [showCVV, setShowCVV] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const maskedCard = user
    ? `•••• •••• •••• ${user.cardNumber.slice(-4)}`
    : "•••• •••• •••• ••••";

  const handleResetWallet = () => {
    Alert.alert(
      "Reset Wallet",
      "This will clear all wallet data and return you to onboarding. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            await resetWallet();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Profile</Text>
      </View>

      <View style={[styles.avatarSection, { borderBottomColor: colors.border }]}>
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: "rgba(212,160,23,0.12)", borderColor: colors.primary },
          ]}
        >
          <Text style={[styles.avatarInitial, { color: colors.primary }]}>
            {user?.name?.charAt(0).toUpperCase() ?? "M"}
          </Text>
        </View>
        <View>
          <Text style={[styles.profileName, { color: colors.foreground }]}>
            {user?.name ?? "Madichaba"}
          </Text>
          <Text style={[styles.profilePhone, { color: colors.mutedForeground }]}>
            {user?.phoneNumber ?? "+27 —"}
          </Text>
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>WALLET</Text>
        <Row icon="dollar-sign" label="Current Balance" value={`R ${balance.toFixed(2)}`} />
        <Row icon="activity" label="Total Transactions" value={String(transactions.length)} />
        <Row icon="calendar" label="Monthly Fee" value="R 10.00 / month" />
        <Row icon="credit-card" label="Card Limit" value="R 5 000.00 / day" />
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>CARD DETAILS</Text>
        <Row
          icon="credit-card"
          label="Card Network"
          value={user?.cardType === "visa" ? "Visa" : "Mastercard"}
        />
        <Row icon="hash" label="Card Number" value={maskedCard} mono />
        <Row icon="clock" label="Expiry Date" value={user?.expiryDate ?? "—"} />
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={() => {
            Haptics.selectionAsync();
            setShowCVV(!showCVV);
          }}
        >
          <View style={[styles.rowIcon, { backgroundColor: "rgba(212,160,23,0.1)" }]}>
            <Feather name="eye" size={16} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.mutedForeground }]}>CVV</Text>
            <Text style={[styles.rowValue, { color: colors.foreground }]}>
              {showCVV ? user?.cvv : "•••"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SPONSOR BANK</Text>
        <Row
          icon="shield"
          label="Sponsor Bank"
          value="Marung Sponsor Bank — powered by AWS Partner"
        />
        <Row icon="lock" label="Regulatory Status" value="SARB Draft Exemption" />
        <Row icon="map-pin" label="Region" value="South Africa · ZA" />
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>SETTINGS</Text>
        <SettingRow icon="bell" label="Notifications" onPress={() => {}} />
        <SettingRow icon="help-circle" label="Help & Support" onPress={() => {}} />
        <SettingRow icon="info" label="About Marung" onPress={() => {}} />
        <SettingRow icon="trash-2" label="Reset Wallet" onPress={handleResetWallet} danger />
      </View>

      <Text style={[styles.version, { color: colors.mutedForeground }]}>
        Marung Wallet v1.0.0 · Reg. 2026/221199/07
      </Text>
    </ScrollView>
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
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  avatarInitial: {
    fontSize: 26,
    fontWeight: "800",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
  },
  profilePhone: {
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
});
