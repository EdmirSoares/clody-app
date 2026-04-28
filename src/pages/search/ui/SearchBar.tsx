import React from "react";
import { TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { palette } from "@shared/theme/colors";
import { shape } from "@shared/theme/shape";
import SearchIconSvg from "@shared/assets/icons/menu/search-icon.svg";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  isFetching: boolean;
}

export const SearchBar = ({
  value,
  onChangeText,
  isFetching,
}: SearchBarProps) => {
  const { colors } = useTheme();
  const { fontSize } = useFontScale();

  return (
    <ShadowView
      inset
      backgroundColor={palette.white}
      shadowColor={colors.insetLightCircle}
      shadowOffset={{ width: -6, height: -6 }}
      shadowBlur={6}
      isReflectedLightEnabled={false}
      style={styles.searchBar}
      accessible={false}
    >
      <SearchIconSvg
        width={18}
        height={18}
        color={palette.skyBlue}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <TextInput
        style={[
          styles.input,
          { color: colors.textPrimary, fontSize: fontSize.lg },
        ]}
        placeholder="Busque a cidade..."
        placeholderTextColor={colors.textSecondary + "77"}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Campo de busca de cidade"
        accessibilityHint="Digite o nome da cidade para pesquisar"
        accessibilityRole="search"
      />
      {isFetching && (
        <ActivityIndicator
          size="small"
          color={palette.skyBlue}
          accessibilityLabel="Buscando cidades"
        />
      )}
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: shape.pill,
    paddingHorizontal: shape.xs,
    paddingVertical: shape.sm,
    gap: shape.xs,
  },
  input: {
    flex: 1,
    fontFamily: "PlusJakartaSans_400Regular",
    padding: 0,
  },
});
