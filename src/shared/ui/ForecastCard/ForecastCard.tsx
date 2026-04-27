import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { LineChart } from "react-native-chart-kit";
import { CircularIcon } from "../CircularIcon";
import { useTheme } from "../../hooks/useTheme";
import { useFontScale } from "../../hooks/useFontScale";
import { shape } from "../../theme/shape";

interface ForecastCardProps {
  dayLabel: string;
  weatherLabel: string;
  icon: ReactNode;
  iconBackgroundColor?: string;
  temperature: string;
  lowTemperature: string;
  style?: StyleProp<ViewStyle>;
  isExpanded?: boolean;
  onPress?: () => void;
  chartData?: { time: string; temp: number }[];
}

export const ForecastCard = ({
  dayLabel,
  weatherLabel,
  icon,
  iconBackgroundColor,
  temperature,
  lowTemperature,
  style,
  isExpanded = false,
  onPress,
  chartData = [],
}: ForecastCardProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  const screenWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
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
          <View style={styles.topRow}>
            <View style={styles.leftContainer}>
              <CircularIcon
                variant="medium"
                backgroundColor={
                  iconBackgroundColor || colors.iconBlueBackground
                }
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
          </View>

          {isExpanded && chartData.length > 0 && (
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: chartData.map((d) => d.time),
                  datasets: [
                    {
                      data: chartData.map((d) => d.temp),
                    },
                  ],
                }}
                width={screenWidth - 60}
                height={160}
                withDots={true}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withHorizontalLabels={false}
                renderDotContent={({ x, y, index, indexData }) => (
                  <Text
                    key={index}
                    style={{
                      position: "absolute",
                      top: y - 24,
                      left: x - 10,
                      fontSize: fontSize.xs,
                      color: colors.textSecondary,
                      fontFamily: "PlusJakartaSans_700Bold",
                    }}
                  >
                    {Math.round(indexData)}°
                  </Text>
                )}
                chartConfig={{
                  backgroundColor: "transparent",
                  backgroundGradientFrom: colors.backgroundLightBlueWhite,
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: colors.backgroundLightBlueWhite,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(65, 72, 76, ${opacity})`,
                  strokeWidth: 2,
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: colors.surfaceMediumBlue,
                  },
                  propsForBackgroundLines: {
                    stroke: "transparent",
                  },
                }}
                bezier
                style={styles.chart}
                fromZero={false}
                yAxisInterval={1}
              />
            </View>
          )}
        </ShadowView>
      </ShadowView>
    </TouchableOpacity>
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
    flexDirection: "column",
    paddingVertical: shape.xs,
    paddingHorizontal: shape.xs,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: shape.sm,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: shape.sm,
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
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  chart: {
    marginVertical: shape.xxs,
    borderRadius: shape.sm,
  },
});
