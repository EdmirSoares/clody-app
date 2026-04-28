import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { shape } from "@shared/theme/shape";
import type { GeocodingLocation } from "../../../entities/location/api/geocoding.types";

interface GeoResultItemProps {
  item: GeocodingLocation;
  onPress: (item: GeocodingLocation) => void;
}

export const GeoResultItem = ({ item, onPress }: GeoResultItemProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  const locationLabel = [item.name, item.state, item.country]
    .filter(Boolean)
    .join(", ");

  return (
    <TouchableOpacity
      style={[styles.geoItem, { borderBottomColor: colors.borderSubtle }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      accessibilityLabel={locationLabel}
      accessibilityHint="Toque para ver o clima desta cidade"
    >
      <Text
        style={[
          styles.geoName,
          {
            color: colors.textPrimary,
            fontSize: fontSize.lg,
            lineHeight: lineHeight.lg,
          },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.geoCountry,
          {
            color: colors.textSecondary,
            fontSize: fontSize.md,
            lineHeight: lineHeight.md,
          },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {item.state ? `${item.state}, ` : ""}
        {item.country}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  geoItem: {
    paddingVertical: shape.xs,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  geoName: {
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  geoCountry: {
    fontFamily: "PlusJakartaSans_400Regular",
    marginTop: 2,
  },
});
