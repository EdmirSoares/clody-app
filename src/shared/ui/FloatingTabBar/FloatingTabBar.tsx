import React, { useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ShadowView } from "react-native-inner-shadow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

import HomeIcon from "../../assets/icons/menu/reduced-logo-icon.svg";
import CalendarIcon from "../../assets/icons/menu/calendar-icon.svg";
import SearchIcon from "../../assets/icons/menu/search-icon.svg";
import SettingsIcon from "../../assets/icons/menu/settings-icon.svg";
import { shape } from "@shared/theme";
import { useTheme } from "@shared/hooks/useTheme";

const ICON_MAP: Record<
  string,
  React.FC<{ width: number; height: number; color: string }>
> = {
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

const ACTIVE_TAB_SIZE = 56;
const INACTIVE_TAB_SIZE = 40;

interface TabItemProps {
  route: any;
  isActive: boolean;
  onPress: () => void;
  iconSize: { width: number; height: number };
  colors: any;
}

const TabItem = ({
  route,
  isActive,
  onPress,
  iconSize,
  colors,
}: TabItemProps) => {
  const Icon = ICON_MAP[route.name];

  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive, progress]);

  const containerStyle = useAnimatedStyle(() => {
    const size = interpolate(
      progress.value,
      [0, 1],
      [INACTIVE_TAB_SIZE, ACTIVE_TAB_SIZE],
      Extrapolation.CLAMP,
    );
    return {
      width: size,
      height: size,
    };
  });

  const activeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [0.5, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const inactiveStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 0.7],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  if (!Icon) return null;

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Animated.View style={[styles.tabItemContainer, containerStyle]}>
        <Animated.View
          style={[styles.centeredAbsolute, inactiveStyle]}
          pointerEvents="none"
        >
          <View style={styles.inactiveTab}>
            <Icon
              width={iconSize.width}
              height={iconSize.height}
              color={colors.iconBlueBackground}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.centeredAbsolute, activeStyle]}
          pointerEvents="none"
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
              <Icon
                width={iconSize.width}
                height={iconSize.height}
                color={colors.surfaceMediumBlue}
              />
            </ShadowView>
          </ShadowView>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
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
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.surfaceWhite,
            shadowColor: colors.shadowCard,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const iconSize = ICON_SIZES[route.name] ?? { width: 20, height: 20 };

          return (
            <TabItem
              key={route.key}
              route={route}
              isActive={isActive}
              onPress={() => handlePress(route, isActive)}
              iconSize={iconSize}
              colors={colors}
            />
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
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  tabItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  centeredAbsolute: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: ACTIVE_TAB_SIZE,
    height: ACTIVE_TAB_SIZE,
  },
  activeCircle: {
    width: ACTIVE_TAB_SIZE,
    height: ACTIVE_TAB_SIZE,
    borderRadius: shape.full,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveTab: {
    padding: shape.xxs,
  },
});
