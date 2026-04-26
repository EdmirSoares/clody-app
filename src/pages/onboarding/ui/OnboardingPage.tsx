import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionButton } from "../../../shared/ui/ActionButton";
import { useOnboardingModel } from "../model/use-feature-logic";
import ClodyBlueLogo from "../../../shared/assets/icons/logo/Clody-blue-logo.svg";
import ClodyWhiteLogo from "../../../shared/assets/icons/logo/Clody-white-logo.svg";
import { useFontScale } from "@shared/hooks/useFontScale";
import { shape } from "@shared/theme";
import MoonImage from "../../../shared/assets/images/png/Moon.png";
import SunCloudImage from "../../../shared/assets/images/png/Sun-Cloud.png";

export const OnboardingPage = () => {
  const { completeOnboarding } = useOnboardingModel();
  const { width } = useWindowDimensions();
  const { fontSize, lineHeight } = useFontScale();
  const insets = useSafeAreaInsets();
  const [isNight, setIsNight] = useState<boolean>(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsNight(currentHour >= 18 || currentHour < 6);
  }, []);

  const dayColors = ["#E0F2FE", "#F7F9FB"] as const;
  const nightColors = ["#001E2F", "#2E6385"] as const;

  return (
    <LinearGradient
      colors={isNight ? nightColors : dayColors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 48),
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {isNight ? (
            <Image
              source={MoonImage}
              style={styles.imageConfig}
              resizeMode="contain"
              width={width * 0.8}
              height={width * 0.8}
            />
          ) : (
            <Image
              source={SunCloudImage}
              style={styles.imageConfig}
              resizeMode="contain"
              width={width * 0.8}
              height={width * 0.8}
            />
          )}
        </View>

        <View style={styles.textContainer}>
          {isNight ? (
            <ClodyWhiteLogo
              width={width * 0.8}
              height={60}
              style={styles.logo}
            />
          ) : (
            <ClodyBlueLogo
              width={width * 0.8}
              height={60}
              style={styles.logo}
            />
          )}
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: fontSize.md,
                lineHeight: lineHeight.md,
                color: isNight ? "#E8EAED" : "#41484C",
              },
            ]}
          >
            {isNight
              ? "Seu companheiro aconchegante para qualquer clima, faça chuva ou faça sol."
              : "Sua previsão do tempo diária,\nentregue com um toque suave."}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {isNight ? (
            <ActionButton
              title="Iniciar"
              variant="secondary"
              style={styles.actionBtn}
              onPress={completeOnboarding}
            />
          ) : (
            <ActionButton
              title="Iniciar"
              variant="primary"
              style={styles.actionBtn}
              onPress={completeOnboarding}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: shape.smd,
    gap: shape.lg,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageConfig: {
    aspectRatio: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  logo: {
    marginBottom: shape.smd,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  actionBtn: {
    width: 280,
  },
});
