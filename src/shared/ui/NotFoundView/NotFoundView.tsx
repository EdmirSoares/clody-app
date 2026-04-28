import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ShadowView } from "react-native-inner-shadow";
import { useTheme } from "@shared/hooks/useTheme";
import { useFontScale } from "@shared/hooks/useFontScale";
import { palette } from "@shared/theme/colors";
import { shape } from "@shared/theme/shape";
import NotFoundEmojiIcon from "@shared/assets/icons/not-found/not-found-emoji-icon.svg";

interface NotFoundViewProps {
  query: string;
}

export const NotFoundView = ({ query }: NotFoundViewProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  return (
    <View
      style={styles.errorSection}
      accessible
      accessibilityRole="none"
      accessibilityLabel={`Cidade não encontrada. Não foi possível encontrar ${query}. Por favor, verifique a ortografia ou tente outra cidade.`}
    >
      <View
        style={styles.notFoundWrapper}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <ShadowView
          inset
          backgroundColor={palette.blueWhite}
          shadowColor="rgba(255,255,255,0.8)"
          shadowOffset={{ width: 6, height: 6 }}
          shadowBlur={6}
          isReflectedLightEnabled={true}
          style={[styles.notFoundCircleOuter, { mixBlendMode: "multiply" }]}
        >
          <ShadowView
            inset
            backgroundColor="transparent"
            shadowColor={colors.insetDarkCircle}
            shadowOffset={{ width: -4, height: -4 }}
            shadowBlur={4}
            isReflectedLightEnabled={true}
            style={styles.notFoundCircleInner}
          >
            <NotFoundEmojiIcon />
          </ShadowView>
        </ShadowView>

        <View
          style={[
            styles.questionBubbleOuter,
            { shadowColor: "rgba(174,226,255,0.4)" },
          ]}
        >
          <ShadowView
            inset
            backgroundColor={palette.softRed}
            shadowColor={colors.insetLightCard}
            shadowOffset={{ width: 10, height: 10 }}
            shadowBlur={20}
            isReflectedLightEnabled={false}
            style={styles.questionBubble}
          >
            <ShadowView
              inset
              backgroundColor="transparent"
              shadowColor="rgba(0,0,0,0.05)"
              shadowOffset={{ width: -10, height: -10 }}
              shadowBlur={20}
              isReflectedLightEnabled={false}
              style={styles.questionBubble}
            >
              <Text style={[styles.questionMark, { color: palette.hardRed }]}>
                ?
              </Text>
            </ShadowView>
          </ShadowView>
        </View>
      </View>

      <Text
        style={[
          styles.notFoundTitle,
          {
            color: colors.textPrimary,
            fontSize: fontSize["3xl"],
            lineHeight: lineHeight["3xl"],
          },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        Cidade não encontrada
      </Text>
      <Text
        style={[
          styles.notFoundSubtitle,
          {
            color: colors.textSecondary,
            fontSize: fontSize.lg,
            lineHeight: lineHeight.lg,
          },
        ]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {`Não foi possível encontrar "${query}".\nPor favor, verifique a ortografia ou tente outra cidade.`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorSection: {
    alignItems: "center",
    gap: shape.sm,
    paddingVertical: shape.card,
  },
  notFoundWrapper: {
    position: "relative",
    alignSelf: "center",
  },
  notFoundCircleOuter: {
    width: 128,
    height: 128,
    borderRadius: shape.full,
  },
  notFoundCircleInner: {
    width: 128,
    height: 128,
    borderRadius: shape.full,
    alignItems: "center",
    justifyContent: "center",
  },
  questionBubbleOuter: {
    position: "absolute",
    top: -shape.sm,
    right: -shape.sm,
    width: shape.lg,
    height: shape.lg,
    borderRadius: shape.full,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 6,
  },
  questionBubble: {
    width: shape.lg,
    height: shape.lg,
    borderRadius: shape.full,
    alignItems: "center",
    justifyContent: "center",
  },
  questionMark: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  notFoundTitle: {
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
  },
  notFoundSubtitle: {
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    paddingHorizontal: shape.smd,
  },
});
