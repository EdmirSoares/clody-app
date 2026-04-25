import { useMemo } from 'react';
import { useFontScaleStore } from '../store/useFontScaleStore';
import { computeScaleFactor, buildScaledTypography } from '../lib/fontScale';
import { FontSizeKey } from '../theme/typography';

interface UseFontScaleReturn {
  fontSize: Record<FontSizeKey, number>;
  lineHeight: Record<FontSizeKey, number>;
  userOverride: number;
  setUserOverride: (value: number) => void;
  resetOverride: () => void;
}

export function useFontScale(): UseFontScaleReturn {
  const { userOverride, setUserOverride, resetOverride } = useFontScaleStore();

  const { sizes, lineHeights } = useMemo(() => {
    const factor = computeScaleFactor(userOverride);
    return buildScaledTypography(factor);
  }, [userOverride]);

  return {
    fontSize: sizes,
    lineHeight: lineHeights,
    userOverride,
    setUserOverride,
    resetOverride,
  };
}
