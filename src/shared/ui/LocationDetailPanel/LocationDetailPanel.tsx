import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { getSvgForCondition } from "@shared/utils/getSvgForCondition";
import { getLocalColoredIconMapping } from "@shared/utils/getLocalIconMapping";
import { AQI_LABELS } from "../../../entities/weather/api/air-pollution.types";
import { palette } from "@shared/theme/colors";
import type { RecentLocation } from "@shared/lib/db";
import { shape } from "@shared/theme";

interface LocationDetailPanelProps {
  location: RecentLocation;
}

const AQI_COLORS: Record<number, string> = {
  1: palette.hardGreen,
  2: palette.hardYellow,
  3: "#E65100",
  4: palette.hardRed,
  5: palette.inkDark,
};

const AQI_BG: Record<number, string> = {
  1: palette.softGreen,
  2: palette.softYellow,
  3: "#FFE0B2",
  4: palette.softRed,
  5: palette.softGray,
};

export const LocationDetailPanel = ({ location }: LocationDetailPanelProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();
  const iconMapping = getLocalColoredIconMapping(location.iconCode);
  const aqiLabel = AQI_LABELS[location.aqi] ?? "—";
  const aqiColor = AQI_COLORS[location.aqi] ?? palette.inkDark;
  const aqiBg = AQI_BG[location.aqi] ?? palette.softGray;
  const coFormatted =
    location.co >= 1000
      ? `${(location.co / 1000).toFixed(1)} mg/m³`
      : `${Math.round(location.co)} µg/m³`;

  const locationLabel = [location.name, location.state, location.country]
    .filter(Boolean)
    .join(", ");
  const a11yLabel = `${locationLabel}. ${location.temp} graus. ${location.weatherDescription}. Qualidade do ar: ${aqiLabel}. Monóxido de carbono: ${coFormatted}.`;

  return (
    <View
      style={[styles.outerShadow, { shadowColor: colors.shadowCard }]}
      accessible
      accessibilityRole="none"
      accessibilityLabel={a11yLabel}
    >
      <ShadowView
        inset
        backgroundColor={colors.surfaceWhite}
        shadowColor={colors.insetDarkCard}
        shadowOffset={{ width: -8, height: -8 }}
        shadowBlur={6}
        isReflectedLightEnabled={false}
        style={[styles.shadowLayer, { mixBlendMode: "multiply" }]}
      >
        <ShadowView
          inset
          backgroundColor={colors.surfaceWhite}
          shadowColor={colors.insetLightCard}
          shadowOffset={{ width: 8, height: 8 }}
          shadowBlur={6}
          isReflectedLightEnabled={false}
          style={styles.card}
        >
          <View
            style={styles.headerRow}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View style={styles.nameBlock}>
              <Text
                style={[
                  styles.cityName,
                  {
                    color: colors.textPrimary,
                    fontSize: fontSize["3xl"],
                    lineHeight: lineHeight["3xl"],
                  },
                ]}
                numberOfLines={1}
              >
                {location.name}
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.textSecondary,
                    fontSize: fontSize.md,
                    lineHeight: lineHeight.md,
                  },
                ]}
              >
                {location.state ? `${location.state}, ` : ""}
                {location.country}
              </Text>
            </View>
            <View style={styles.tempBlock}>
              <Text
                style={[
                  styles.temp,
                  {
                    color: colors.textPrimary,
                    fontSize: fontSize["5xl"],
                    lineHeight: lineHeight["5xl"],
                  },
                ]}
              >
                {location.temp}°
              </Text>
              {getSvgForCondition({
                iconCode: location.iconCode,
                color: iconMapping.fg,
                size: 32,
              })}
            </View>
          </View>

          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
                fontSize: fontSize.lg,
                lineHeight: lineHeight.lg,
              },
            ]}
            accessibilityElementsHidden
            importantForAccessibility="no"
          >
            {location.weatherDescription}
          </Text>

          <View
            style={[styles.divider, { backgroundColor: colors.borderSubtle }]}
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <View
            style={styles.airRow}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View style={styles.airBlock}>
              <Text
                style={[
                  styles.airLabel,
                  { color: colors.textSecondary, fontSize: fontSize.sm },
                ]}
              >
                Ql. do ar
              </Text>
              <View style={[styles.aqiBadge, { backgroundColor: aqiBg }]}>
                <Text
                  style={[
                    styles.aqiText,
                    { color: aqiColor, fontSize: fontSize.md },
                  ]}
                >
                  {aqiLabel}
                </Text>
              </View>
            </View>
            <View style={styles.airBlock}>
              <Text
                style={[
                  styles.airLabel,
                  { color: colors.textSecondary, fontSize: fontSize.sm },
                ]}
              >
                CO
              </Text>
              <Text
                style={[
                  styles.airValue,
                  { color: colors.textPrimary, fontSize: fontSize.lg },
                ]}
              >
                {coFormatted}
              </Text>
            </View>
          </View>
        </ShadowView>
      </ShadowView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerShadow: {
    borderRadius: shape.md,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  shadowLayer: {
    borderRadius: shape.md,
  },
  card: {
    borderRadius: shape.md,
    padding: shape.smd,
    gap: shape.xs,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  nameBlock: {
    flex: 1,
    gap: 2,
    marginRight: shape.xs,
  },
  cityName: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_400Regular",
  },
  tempBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: shape.xxs,
  },
  temp: {
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: -0.32,
  },
  description: {
    fontFamily: "PlusJakartaSans_400Regular",
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    borderRadius: 1,
    opacity: 0.3,
  },
  airRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: shape.smd,
  },
  airBlock: {
    gap: shape.xxs,
  },
  airLabel: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  aqiBadge: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: shape.full,
    paddingHorizontal: shape.smd,
    paddingVertical: 6,
  },
  aqiText: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  airValue: {
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
