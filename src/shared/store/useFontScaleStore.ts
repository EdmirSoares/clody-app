import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FontScaleState {
  userOverride: number;
  setUserOverride: (value: number) => void;
  resetOverride: () => void;
}

export const useFontScaleStore = create<FontScaleState>()(
  persist(
    (set) => ({
      userOverride: 1,
      setUserOverride: (value) => set({ userOverride: value }),
      resetOverride: () => set({ userOverride: 1 }),
    }),
    {
      name: 'font-scale-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
