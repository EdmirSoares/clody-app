import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ForecastCard } from "../../../shared/ui/ForecastCard";
import { useTheme } from "../../../shared/hooks/useTheme";
import { useFontScale } from "../../../shared/hooks/useFontScale";
import { useForecastLogic } from "../model/use-feature-logic";
import { WeatherColoredIcon } from "@shared/ui/WeatherColoredIcon/WeatherColoredIcon";
import { getLocalColoredIconMapping } from "@shared/utils/getLocalIconMapping";
import { shape } from "@shared/theme";

export const SchedulePage = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { fontSize } = useFontScale();
  const { forecasts, isLoading, error, expandedId, toggleExpand, city } =
    useForecastLogic();

  const dayColors = ["#E0F2FE", "#F7F9FB"] as const;

  return (
    <LinearGradient
      colors={dayColors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.wrapper,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.title,
            { fontSize: fontSize["4xl"], color: colors.textPrimary },
          ]}
          accessibilityRole="header"
        >
          Próximos dias
        </Text>
        {city ? (
          <Text
            style={[
              styles.subtitle,
              { fontSize: fontSize["lg"], color: colors.textSecondary },
            ]}
            accessibilityRole="text"
            accessibilityLabel={`Localização: ${city}`}
          >
            {city}
          </Text>
        ) : null}
      </View>

      {isLoading ? (
        <View
          style={styles.centerContainer}
          accessible={true}
          accessibilityLabel="Carregando previsão do tempo"
        >
          <ActivityIndicator
            size="large"
            color={colors.surfaceMediumBlue}
            accessibilityLabel="Indicador de carregamento"
          />
        </View>
      ) : error ? (
        <View
          style={styles.centerContainer}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLabel="Erro ao carregar a previsão do tempo"
        >
          <Text
            style={[
              styles.errorText,
              { fontSize: fontSize["lg"], color: colors.iconRedColor },
            ]}
          >
            Erro ao carregar a previsão
          </Text>
        </View>
      ) : (
        <FlatList
          data={forecasts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
          accessibilityLabel="Lista de previsão dos próximos dias"
          renderItem={({ item }) => {
            const meta = getLocalColoredIconMapping(item.iconName);
            return (
              <ForecastCard
                dayLabel={item.dayName}
                weatherLabel={item.weatherDescription}
                icon={<WeatherColoredIcon iconCode={item.iconName} size={28} />}
                iconBackgroundColor={meta.bg}
                temperature={`${item.maxTemp}°`}
                lowTemperature={`${item.minTemp}°`}
                isExpanded={expandedId === item.id}
                onPress={() => toggleExpand(item.id)}
                chartData={item.hourlyData}
              />
            );
          }}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: shape.smd,
    marginBottom: shape.smd,
  },
  title: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_400Regular",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "PlusJakartaSans_400Regular",
  },
  listContent: {
    paddingHorizontal: shape.smd,
    paddingBottom: 120,
  },
});
