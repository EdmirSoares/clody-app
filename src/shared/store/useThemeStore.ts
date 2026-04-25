import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ThemeColorMap, AppColors } from '../theme/colors';

interface ThemeState {
  mode: ThemeMode;
  colors: AppColors;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      colors: ThemeColorMap.light,
      setTheme: (mode) => set({ mode, colors: ThemeColorMap[mode] }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.colors = ThemeColorMap[state.mode];
        }
      },
    }
  )
);
