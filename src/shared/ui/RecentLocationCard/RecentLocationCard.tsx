import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { getSvgForCondition } from "@shared/utils/getSvgForCondition";
import { getLocalColoredIconMapping } from "@shared/utils/getLocalIconMapping";
import { palette } from "@shared/theme/colors";

type Variant = "blue" | "green";

interface RecentLocationCardProps {
  name: string;
  country: string;
  temp: number;
  iconCode: string;
  variant: Variant;
  onPress?: () => void;
}

const VARIANT_COLORS: Record<
  Variant,
  { bg: string; cityColor: string; countryColor: string; tempColor: string }
> = {
  blue: {
    bg: palette.softBlue,
    cityColor: "#001E2B",
    countryColor: "#0F4C64",
    tempColor: "#001E2B",
  },
  green: {
    bg: palette.softGreen,
    cityColor: "#00201B",
    countryColor: "#135045",
    tempColor: "#00201B",
  },
};

export const RecentLocationCard = ({
  name,
  country,
  temp,
  iconCode,
  variant,
  onPress,
}: RecentLocationCardProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();
  const theme = VARIANT_COLORS[variant];
  const iconMapping = getLocalColoredIconMapping(iconCode);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.touchable}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${country}, ${temp} graus`}
      accessibilityHint="Toque para ver os detalhes desta cidade"
    >
      <View
        style={[styles.outerShadow, { shadowColor: colors.insetDarkCard }]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <ShadowView
          inset
          backgroundColor={theme.bg}
          shadowColor={colors.insetLightCard}
          shadowOffset={{ width: 10, height: 10 }}
          shadowBlur={20}
          isReflectedLightEnabled={false}
          style={[styles.topInset, { mixBlendMode: "multiply" }]}
        >
          <ShadowView
            inset
            backgroundColor="transparent"
            shadowColor="rgba(0,0,0,0.05)"
            shadowOffset={{ width: -10, height: -10 }}
            shadowBlur={20}
            isReflectedLightEnabled={false}
            style={styles.card}
          >
            <View style={styles.topRow}>
              <Text
                style={[
                  styles.cityName,
                  {
                    color: theme.cityColor,
                    fontSize: fontSize.xl,
                    lineHeight: lineHeight.xl,
                  },
                ]}
                numberOfLines={2}
              >
                {name}
              </Text>
              <Text
                style={[
                  styles.country,
                  {
                    color: theme.countryColor,
                    fontSize: fontSize.sm,
                    lineHeight: lineHeight.sm,
                  },
                ]}
              >
                {country}
              </Text>
            </View>
            <View style={styles.bottomRow}>
              <Text
                style={[
                  styles.temp,
                  {
                    color: theme.tempColor,
                    fontSize: fontSize["3xl"],
                    lineHeight: lineHeight["3xl"],
                  },
                ]}
              >
                {temp}°
              </Text>
              {getSvgForCondition({
                iconCode,
                color: iconMapping.fg,
                size: 28,
              })}
            </View>
          </ShadowView>
        </ShadowView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    overflow: "visible",
  },
  outerShadow: {
    flex: 1,
    height: 160,
    borderRadius: 32,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  topInset: {
    flex: 1,
    borderRadius: 32,
    height: 160,
  },
  card: {
    flex: 1,
    borderRadius: 32,
    padding: 20,
    justifyContent: "space-between",
  },
  topRow: {
    gap: 2,
  },
  cityName: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  country: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  temp: {
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: -0.32,
  },
});
