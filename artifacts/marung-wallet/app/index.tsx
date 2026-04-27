import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useWallet } from "@/context/WalletContext";
import { useColors } from "@/hooks/useColors";

export default function Index() {
  const { isOnboarded, isLoading } = useWallet();
  const router = useRouter();
  const colors = useColors();

  useEffect(() => {
    if (!isLoading) {
      if (isOnboarded) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }
  }, [isLoading, isOnboarded]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}
