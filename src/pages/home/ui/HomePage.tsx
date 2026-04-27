import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ShadowCard } from "@shared/ui/ShadowCard";
import { WideCard } from "@shared/ui/WideCard";
import { StatCard } from "@shared/ui/StatCard";
import { useTheme } from "@shared/hooks/useTheme";
import { shape } from "@shared/theme";
import { useHomeLogic } from "../model/use-feature-logic";
import { getSvgForCondition } from "@shared/utils/getSvgForCondition";
import { useFontScale } from "@shared/hooks/useFontScale";
import UmidityIcon from "@shared/assets/icons/weather/humidity-icon.svg";
import TemperatureIcon from "@shared/assets/icons/weather/temperature-icon.svg";
import WindIcon from "@shared/assets/icons/weather/wind-icon.svg";

export const HomePage = () => {
  const { colors } = useTheme();
  const { fontSize } = useFontScale();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const {
    isLoading,
    locationError,
    currentWeather,
  } = useHomeLogic();

  const dayColors = ["#E0F2FE", "#F7F9FB"] as const;

  if (isLoading) {
    return (
      <View
        style={[
          styles.wrapper,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.surfaceMediumBlue} />
        <Text style={{ marginTop: shape.sm, color: colors.textPrimary }}>
          Obtendo localização...
        </Text>
      </View>
    );
  }

  if (locationError && !currentWeather) {
    return (
      <View
        style={[
          styles.wrapper,
          { justifyContent: "center", alignItems: "center", padding: 24 },
        ]}
      >
        <Text style={{ textAlign: "center", color: colors.iconRedColor }}>
          {locationError}
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={dayColors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.wrapper,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <Image
            source={currentWeather.conditionImage}
            style={{ width: width * 0.6, height: width * 0.6 }}
            resizeMode="contain"
          />
          <View style={styles.cityTempContainer}>
            <Text
              style={[
                styles.hugeTemperature,
                { color: colors.surfaceMediumBlue, fontSize: fontSize["8xl"] },
              ]}
            >
              {currentWeather.temp}°
            </Text>
            <Text
              style={[
                styles.cityLocation,
                { color: colors.textSecondary, fontSize: fontSize["3xl"] },
              ]}
            >
              {currentWeather.city}
            </Text>
          </View>
        </View>

        <View style={styles.cardsWrapper}>
          <View style={styles.cardContainer}>
            <ShadowCard
              icon={
                <UmidityIcon
                  width={20}
                  height={20}
                  color={colors.iconBlueColor}
                />
              }
              iconBackgroundColor={colors.iconBlueBackground}
              label="Humidade"
              value={`${currentWeather.humidity}%`}
            />
            <ShadowCard
              icon={
                <WindIcon
                  width={20}
                  height={20}
                  color={colors.iconGreenColor}
                />
              }
              iconBackgroundColor={colors.iconGreenBackground}
              label="Vel. Ventos"
              value={`${currentWeather.windSpeed} km/h`}
            />
          </View>

          <View style={styles.wideCardContainer}>
            <WideCard
              icon={
                <TemperatureIcon
                  width={20}
                  height={20}
                  color={colors.iconPinkColor}
                />
              }
              iconBackgroundColor={colors.iconPinkBackground}
              label="Sensação térmica"
              value={`${currentWeather.feelsLike}°`}
            />
          </View>
        </View>

        <View style={styles.hojeSection}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textPrimary, fontSize: fontSize.xl },
            ]}
          >
            Hoje
          </Text>
          <FlatList
            data={currentWeather.hourlyData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => {
              return (
                <StatCard
                  label={item.label}
                  icon={getSvgForCondition({
                    iconCode: item.iconCode,
                    color: colors.surfaceLightBlue,
                    size: 22,
                  })}
                  value={`${item.temp}°`}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: shape.smd,
    paddingBottom: 120,
  },
  topSection: {
    alignItems: "center",
    marginBottom: shape.lg,
  },
  cityTempContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: shape.xxs,
    marginTop: -shape.smd,
  },
  hugeTemperature: {
    textAlign: "center",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    lineHeight: 72,
    letterSpacing: -1.28,
  },
  cityLocation: {
    textAlign: "center",
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 32,
  },
  cardsWrapper: {
    width: "100%",
    paddingHorizontal: shape.smd,
    gap: shape.sm,
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: shape.sm,
  },
  wideCardContainer: {
    width: "100%",
  },
  hojeSection: {
    width: "100%",
    marginTop: shape.md,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    paddingHorizontal: shape.smd,
    marginBottom: shape.sm,
  },
  flatListContent: {
    paddingHorizontal: shape.smd,
    paddingBottom: shape.sm,
  },
});
