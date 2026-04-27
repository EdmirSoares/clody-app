export const shape = {
  pill: 9999,
  xl: 64,
  card: 48,
  lg: 40,
  md: 32,
  smd: 24,
  sm: 16,
  xs: 12,
  xxs: 8,
  full: 9999,
} as const;

export type Shape = typeof shape;
