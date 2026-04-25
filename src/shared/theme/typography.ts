export const baseFontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
} as const;

export type FontSizeKey = keyof typeof baseFontSizes;

export const baseLineHeights: Record<FontSizeKey, number> = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 26,
  '2xl': 28,
  '3xl': 32,
  '4xl': 36,
  '5xl': 40,
};

export const fontFamilies = {
  regular: 'PlusJakartaSans_400Regular',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
} as const;

export type FontFamily = keyof typeof fontFamilies;
