import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { shape } from "@shared/theme/shape";
import { RecentLocationCard } from "@shared/ui/RecentLocationCard";
import { LocationDetailPanel } from "@shared/ui/LocationDetailPanel";
import { useSearchLogic } from "../model/use-search-logic";
import { SearchBar } from "./SearchBar";
import { GeoResultItem } from "./GeoResultItem";
import type { GeocodingLocation } from "../../../entities/location/api/geocoding.types";
import type { RecentLocation } from "@shared/lib/db";
import { NotFoundView } from "@shared/ui/NotFoundView";

const CARD_VARIANTS = ["blue", "green"] as const;

export const SearchPage = () => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();
  const insets = useSafeAreaInsets();
  const {
    query,
    setQuery,
    debouncedQuery,
    searchState,
    geocodeResults,
    isFetching,
    recentLocations,
    selectedLocation,
    handleSelectLocation,
    handleSelectCard,
  } = useSearchLogic();

  const renderRecentItem = ({
    item,
    index,
  }: {
    item: RecentLocation;
    index: number;
  }) => (
    <RecentLocationCard
      name={item.name}
      country={item.country}
      temp={item.temp}
      iconCode={item.iconCode}
      variant={CARD_VARIANTS[index % 2]}
      onPress={() => handleSelectCard(item)}
    />
  );

  const renderGeoItem = ({ item }: { item: GeocodingLocation }) => (
    <GeoResultItem item={item} onPress={handleSelectLocation} />
  );

  return (
    <LinearGradient colors={["#E0F2FE", "#F7F9FB"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[styles.fixedHeader, { paddingTop: insets.top + 16 }]}
          accessibilityRole="header"
        >
          <Text
            style={[
              styles.title,
              { fontSize: fontSize["4xl"], color: colors.textPrimary },
            ]}
            accessibilityRole="header"
            accessibilityLabel="Buscar Cidades"
          >
            Buscar Cidades
          </Text>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            isFetching={isFetching}
          />
          {searchState === "searching" && geocodeResults.length > 0 && (
            <Text
              style={[
                styles.resultsLabel,
                { color: colors.textSecondary, fontSize: fontSize.md },
              ]}
              accessibilityRole="text"
              accessibilityLabel={`${geocodeResults.length} resultado${geocodeResults.length !== 1 ? "s" : ""} encontrado${geocodeResults.length !== 1 ? "s" : ""}`}
            >
              Resultados
            </Text>
          )}
        </View>

        {searchState === "searching" && (
          <FlatList
            data={geocodeResults}
            keyExtractor={(item) => `${item.lat}-${item.lon}`}
            renderItem={renderGeoItem}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.bodyContent,
              { paddingBottom: insets.bottom + 100 },
            ]}
            accessibilityLabel="Lista de resultados da busca"
          />
        )}

        {searchState === "no-results" && (
          <ScrollView
            contentContainerStyle={[
              styles.bodyContent,
              { paddingBottom: insets.bottom + 100 },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <NotFoundView query={debouncedQuery} />
          </ScrollView>
        )}

        {searchState === "idle" && (
          <ScrollView
            contentContainerStyle={[
              styles.bodyContent,
              { paddingBottom: insets.bottom + 100 },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {recentLocations.length > 0 && (
              <View style={styles.section} accessibilityRole="none">
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.textPrimary,
                      fontSize: fontSize["2xl"],
                      lineHeight: lineHeight["2xl"],
                    },
                  ]}
                  accessibilityRole="header"
                >
                  Recentes
                </Text>
                <FlatList
                  data={recentLocations}
                  keyExtractor={(item) => item.id!.toString()}
                  renderItem={renderRecentItem}
                  numColumns={2}
                  columnWrapperStyle={styles.cardRow}
                  scrollEnabled={false}
                  initialNumToRender={2}
                  removeClippedSubviews={false}
                  style={styles.cardList}
                  accessibilityLabel="Cidades recentes"
                />
              </View>
            )}

            {selectedLocation && (
              <View style={styles.section} accessibilityRole="none">
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.textPrimary,
                      fontSize: fontSize["2xl"],
                      lineHeight: lineHeight["2xl"],
                    },
                  ]}
                  accessibilityRole="header"
                  accessibilityLabel="Detalhes"
                >
                  Detalhes
                </Text>
                <LocationDetailPanel location={selectedLocation} />
              </View>
            )}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  fixedHeader: {
    paddingHorizontal: shape.smd,
    gap: shape.xxs,
    paddingBottom: shape.sm,
  },
  bodyContent: {
    paddingTop: shape.sm,
    paddingHorizontal: shape.smd,
    gap: shape.md,
  },
  title: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.32,
  },
  resultsLabel: {
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: -shape.sm,
  },
  section: {
    gap: shape.sm,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
  },
  cardList: {
    overflow: "visible",
  },
  cardRow: {
    gap: shape.sm,
    overflow: "visible",
  },
});
