import { useThemeStore } from '../store/useThemeStore';
import { AppColors } from '../theme/colors';
import { ThemeMode } from '../theme/colors';

interface UseThemeReturn {
  colors: AppColors;
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

export function useTheme(): UseThemeReturn {
  const { colors, mode, setTheme } = useThemeStore();
  return { colors, mode, setTheme };
}
