import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ShadowView } from "react-native-inner-shadow";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeIcon from "../../assets/icons/menu/reduced-logo-icon.svg";
import CalendarIcon from "../../assets/icons/menu/calendar-icon.svg";
import SearchIcon from "../../assets/icons/menu/search-icon.svg";
import SettingsIcon from "../../assets/icons/menu/settings-icon.svg";
import { shape } from "@shared/theme";
import { useTheme } from "@shared/hooks/useTheme";

const ICON_MAP: Record<string, React.FC<{ width: number; height: number, color: string }>> = {
  home: HomeIcon,
  schedule: CalendarIcon,
  search: SearchIcon,
  settings: SettingsIcon,
};

const ICON_SIZES: Record<string, { width: number; height: number }> = {
  home: { width: 21, height: 20 },
  schedule: { width: 18, height: 20 },
  search: { width: 18, height: 18 },
  settings: { width: 20, height: 20 },
};

export const FloatingTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const handlePress = (route: (typeof state.routes)[0], isActive: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isActive && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      style={[styles.wrapper, { bottom: 24 + insets.bottom }]}
      pointerEvents="box-none"
    >
      <View style={[styles.bar, { backgroundColor: colors.surfaceWhite }]}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const Icon = ICON_MAP[route.name];
          if (!Icon) return null;

          const iconSize = ICON_SIZES[route.name] ?? { width: 20, height: 20 };

          if (isActive) {
            return (
              <Pressable
                key={route.key}
                onPress={() => handlePress(route, true)}
                hitSlop={8}
              >
                <ShadowView
                  inset
                  backgroundColor={colors.surfaceWhite}
                  shadowColor={colors.insetDarkCircle}
                  shadowOffset={{ width: -4, height: -4 }}
                  shadowBlur={4}
                  isReflectedLightEnabled={false}
                  style={[styles.activeCircle, { mixBlendMode: "multiply" }]}
                >
                  <ShadowView
                    inset
                    backgroundColor={colors.backgroundLightBlueWhite}
                    shadowColor={colors.insetLightCircle}
                    shadowOffset={{ width: 4, height: 4 }}
                    shadowBlur={4}
                    isReflectedLightEnabled={false}
                    style={styles.activeCircle}
                  >
                    <Icon width={iconSize.width} height={iconSize.height} color={colors.surfaceMediumBlue} />
                  </ShadowView>
                </ShadowView>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={() => handlePress(route, false)}
              style={styles.inactiveTab}
              hitSlop={8}
            >
              <Icon width={iconSize.width} height={iconSize.height} color={colors.iconBlueBackground} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    alignSelf: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: shape.card,
    justifyContent: "space-between",
    borderRadius: shape.lg,
    paddingHorizontal: shape.smd,
    paddingVertical: shape.xs,
    shadowColor: "#E0F2FE",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: shape.full,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveTab: {
    padding: shape.xxs,
  },
});
