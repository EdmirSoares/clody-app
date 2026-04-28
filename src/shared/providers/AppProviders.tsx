import React, { useEffect, ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useThemeStore } from "../store/useThemeStore";
import { useFontScaleStore } from "../store/useFontScaleStore";
import { useLocationStore } from "../store/useLocationStore";
import { queryClient } from "../lib/query-client";
import { db, useMigrations, migrations } from "../lib/db";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    useThemeStore.persist.rehydrate();
    useFontScaleStore.persist.rehydrate();
    useLocationStore.persist.rehydrate();
  }, []);

  if (error) throw error;

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
