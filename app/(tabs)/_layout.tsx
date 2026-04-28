import { Tabs } from "expo-router";
import React from "react";
import { FloatingTabBar } from "../../src/shared/ui/FloatingTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
    </Tabs>
  );
}
