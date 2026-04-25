export const shape = {
  pill: 9999,
  card: 48,
  sm: 16,
} as const;

export type Shape = typeof shape;
