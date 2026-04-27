export const palette = {
  skyBlue: "#0EA5E9",
  lightBlue: "#38BDF8",
  mediumBlue: "#0284C7",
  deepBlue: "#2E6385",

  white: "#FFFFFF",
  offWhite: "#F5F5F5",
  blueWhite: "#E0F2FE",
  transparent: "rgba(255,255,255,0)",

  softPink: "#F8D0E6",
  softGreen: "#B4EEDF",
  softBlue: "#AEE2FF",
  softRed: "#FFDAD6",

  hardBlue: "#2F647D",
  hardGreen: "#30685C",
  hardRed: "#BA1A1A",
  hardPink: "#745568",

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
  backgroundLightBlueWhite: string;
  cardBackground: string;
  surfaceWhite: string;
  surfaceBlue: string;
  surfaceMediumBlue: string;
  surfaceLightBlue: string;
  buttonPrimaryBackground: string;
  buttonSecondaryBackground: string;
  iconBlueBackground: string;
  iconGreenBackground: string;
  iconRedBackground: string;
  iconPinkBackground: string;
  iconBlueColor: string;
  iconGreenColor: string;
  iconRedColor: string;
  iconPinkColor: string;
  textPrimary: string;
  textSecondary: string;
  textHeading: string;
  textButtonPrimary: string;
  textButtonSecondary: string;
  borderSubtle: string;
  shadowCard: string;
  shadowForecast: string;
  shadowCircle: string;
  shadowButtonPrimary: string;
  shadowButtonSecondary: string;
  insetDarkCard: string;
  insetLightCard: string;
  insetDarkCircle: string;
  insetLightCircle: string;
  insetDarkForecast: string;
  insetDarkButtonPrimary: string;
  insetLightButtonPrimary: string;
  insetDarkButtonSecondary: string;
  insetLightButtonSecondary: string;
}

export const lightColors: AppColors = {
  screenBackground: palette.offWhite,
  backgroundLightBlueWhite: palette.blueWhite,
  cardBackground: palette.transparent,
  surfaceWhite: palette.white,
  surfaceLightBlue: palette.lightBlue,
  surfaceBlue: palette.skyBlue,
  surfaceMediumBlue: palette.mediumBlue,
  buttonPrimaryBackground: palette.skyBlue,
  buttonSecondaryBackground: palette.white,
  iconBlueBackground: palette.softBlue,
  iconGreenBackground: palette.softGreen,
  iconRedBackground: palette.softRed,
  iconPinkBackground: palette.softPink,
  iconBlueColor: palette.hardBlue,
  iconGreenColor: palette.hardGreen,
  iconRedColor: palette.hardRed,
  iconPinkColor: palette.hardPink,
  textPrimary: palette.inkDark,
  textSecondary: palette.inkMid,
  textHeading: palette.inkLight,
  textButtonPrimary: palette.white,
  textButtonSecondary: palette.deepBlue,
  borderSubtle: "rgba(255, 255, 255, 0.40)",
  
  shadowCard: palette.shadowCard,
  shadowForecast: "rgba(174, 226, 255, 0.30)",
  shadowCircle: palette.shadowCircle,
  shadowButtonPrimary: palette.shadowPrimary,
  shadowButtonSecondary: palette.shadowSecondary,
  insetDarkCard: palette.insetDarkCard,
  insetLightCard: palette.insetLightCard,
  insetDarkCircle: palette.insetDarkCircle,
  insetLightCircle: palette.insetLightCircle,
  insetDarkForecast: "rgba(47, 100, 125, 0.05)",
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
