import { Redirect } from "expo-router";
import { useAppStore } from "../src/shared/store/useAppStore";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (hasSeenOnboarding) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/onboarding" />;
}
