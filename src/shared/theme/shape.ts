export const shape = {
  pill: 9999,
  card: 48,
  lg: 40,
  md: 32,
  smd: 24,
  sm: 16,
  xs: 12,
  xxs: 8,
} as const;

export type Shape = typeof shape;
