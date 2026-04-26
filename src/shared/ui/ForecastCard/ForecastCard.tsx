import React, { ReactNode } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { CircularIcon } from "../CircularIcon";
import { useTheme } from "../../hooks/useTheme";
import { useFontScale } from "../../hooks/useFontScale";
import { shape } from "../../theme/shape";

interface ForecastCardProps {
  dayLabel: string;
  weatherLabel: string;
  icon: ReactNode;
  temperature: string;
  lowTemperature: string;
  style?: StyleProp<ViewStyle>;
}

export const ForecastCard = ({
  dayLabel,
  weatherLabel,
  icon,
  temperature,
  lowTemperature,
  style,
}: ForecastCardProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  return (
    <View
      style={[
        styles.outerWrapper,
        { shadowColor: colors.shadowForecast },
        style,
      ]}
    >
      <ShadowView
        inset={true}
        backgroundColor="#fff"
        shadowColor={colors.insetLightCard}
        shadowOffset={{ width: 8, height: 8 }}
        shadowBlur={12}
        isReflectedLightEnabled={false}
        style={[styles.shadowLayer, { mixBlendMode: "multiply" }]}
      >
        <ShadowView
          inset={true}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          shadowColor={colors.shadowForecast}
          shadowOffset={{ width: -8, height: -8 }}
          shadowBlur={12}
          isReflectedLightEnabled={false}
          style={styles.innerContent}
        >
          <View style={styles.leftContainer}>
            <CircularIcon
              variant="medium"
              backgroundColor={colors.iconBlueBackground}
            >
              {icon}
            </CircularIcon>
            <View>
              <Text
                style={[
                  styles.dayLabel,
                  {
                    color: colors.textPrimary,
                    fontSize: fontSize.md,
                    lineHeight: lineHeight.md,
                  },
                ]}
              >
                {dayLabel}
              </Text>
              <Text
                style={[
                  styles.weatherLabel,
                  {
                    color: colors.textSecondary,
                    fontSize: fontSize.md,
                    lineHeight: lineHeight.md,
                  },
                ]}
              >
                {weatherLabel}
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.temperature,
                {
                  color: colors.textPrimary,
                  fontSize: fontSize["3xl"],
                  lineHeight: lineHeight["3xl"],
                },
              ]}
            >
              {temperature}
            </Text>
            <Text
              style={[
                styles.lowTemperature,
                {
                  color: colors.textSecondary,
                  fontSize: fontSize.lg,
                  lineHeight: lineHeight.lg,
                },
              ]}
            >
              {lowTemperature}
            </Text>
          </View>
        </ShadowView>
      </ShadowView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    borderRadius: shape.md,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  shadowLayer: {
    width: "100%",
    borderRadius: shape.md,
    justifyContent: "center",
    alignItems: "stretch",
  },
  innerContent: {
    width: "100%",
    borderRadius: shape.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: shape.xs,
    paddingHorizontal: shape.xs,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap:shape.sm,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap:shape.sm,
  },
  dayLabel: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  weatherLabel: {
    fontFamily: "PlusJakartaSans_400Regular",
  },
  temperature: {
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "right",
  },
  lowTemperature: {
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "right",
  },
});
