import { Dimensions } from 'react-native';
import { baseFontSizes, baseLineHeights, FontSizeKey } from '../theme/typography';

const BASE_WIDTH = 390;

const MIN_SCALE = 0.85;
const MAX_SCALE = 1.20;

export function computeScaleFactor(overrideScale = 1): number {
  const { width } = Dimensions.get('screen');
  const deviceRatio = width / BASE_WIDTH;
  const clamped = Math.min(Math.max(deviceRatio, MIN_SCALE), MAX_SCALE);
  return clamped * overrideScale;
}

export function buildScaledTypography(scaleFactor: number) {
  const sizes = {} as Record<FontSizeKey, number>;
  const lineHeights = {} as Record<FontSizeKey, number>;

  (Object.keys(baseFontSizes) as FontSizeKey[]).forEach((key) => {
    sizes[key] = Math.round(baseFontSizes[key] * scaleFactor);
    lineHeights[key] = Math.round(baseLineHeights[key] * scaleFactor);
  });

  return { sizes, lineHeights };
}
