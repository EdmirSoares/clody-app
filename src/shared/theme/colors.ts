export const palette = {
  skyBlue: "#0EA5E9",
  softBlue: "#AEE2FF",
  deepBlue: "#2E6385",

  white: "#FFFFFF",
  offWhite: "#F5F5F5",
  transparent: "rgba(255,255,255,0)",

  inkDark: "#191C1E",
  inkMid: "#41484C",
  inkLight: "#333333",

  shadowPrimary: "rgba(46, 99, 133, 0.20)",
  shadowSecondary: "rgba(0, 0, 0, 0.20)",
  shadowCard: "rgba(222, 222, 222, 0.50)",
  shadowCircle: "rgba(47, 100, 125, 0.15)",

  insetDarkCard: "rgba(174, 226, 255, 0.20)",
  insetLightCard: "rgba(255, 255, 255, 0.80)",
  insetDarkCircle: "rgba(47, 100, 125, 0.10)",
  insetLightCircle: "rgba(255, 255, 255, 0.90)",
  insetDarkButtonPrimary: "rgba(0, 0, 0, 0.20)",
  insetLightButtonPrimary: "rgba(255, 255, 255, 0.50)",
  insetDarkButtonSecondary: "rgba(165, 216, 255, 0.50)",
  insetLightButtonSecondary: "#FFFFFF",
} as const;

export interface AppColors {
  screenBackground: string;
  cardBackground: string;
  surfaceWhite: string;
  buttonPrimaryBackground: string;
  buttonSecondaryBackground: string;
  iconBackground: string;
  textPrimary: string;
  textSecondary: string;
  textHeading: string;
  textButtonPrimary: string;
  textButtonSecondary: string;
  borderSubtle: string;
  shadowCard: string;
  shadowCircle: string;
  shadowButtonPrimary: string;
  shadowButtonSecondary: string;
  insetDarkCard: string;
  insetLightCard: string;
  insetDarkCircle: string;
  insetLightCircle: string;
  insetDarkButtonPrimary: string;
  insetLightButtonPrimary: string;
  insetDarkButtonSecondary: string;
  insetLightButtonSecondary: string;
}

export const lightColors: AppColors = {
  screenBackground: palette.offWhite,
  cardBackground: palette.transparent,
  surfaceWhite: palette.white,
  buttonPrimaryBackground: palette.skyBlue,
  buttonSecondaryBackground: palette.white,
  iconBackground: palette.softBlue,
  textPrimary: palette.inkDark,
  textSecondary: palette.inkMid,
  textHeading: palette.inkLight,
  textButtonPrimary: palette.white,
  textButtonSecondary: palette.deepBlue,
  borderSubtle: "rgba(255, 255, 255, 0.40)",
  shadowCard: palette.shadowCard,
  shadowCircle: palette.shadowCircle,
  shadowButtonPrimary: palette.shadowPrimary,
  shadowButtonSecondary: palette.shadowSecondary,
  insetDarkCard: palette.insetDarkCard,
  insetLightCard: palette.insetLightCard,
  insetDarkCircle: palette.insetDarkCircle,
  insetLightCircle: palette.insetLightCircle,
  insetDarkButtonPrimary: palette.insetDarkButtonPrimary,
  insetLightButtonPrimary: palette.insetLightButtonPrimary,
  insetDarkButtonSecondary: palette.insetDarkButtonSecondary,
  insetLightButtonSecondary: palette.insetLightButtonSecondary,
};

export const darkColors: AppColors = {
  ...lightColors,
  screenBackground: "#0F1117",
  cardBackground: "rgba(255,255,255,0.04)",
  textPrimary: "#E8EAED",
  textSecondary: "#A0ADB5",
  textHeading: "#FFFFFF",
};

export type ThemeMode = "light" | "dark";

export const ThemeColorMap: Record<ThemeMode, AppColors> = {
  light: lightColors,
  dark: darkColors,
};
