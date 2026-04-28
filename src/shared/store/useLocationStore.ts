import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationState {
  lat: number | null;
  lon: number | null;
  city: string;
  _hasHydrated: boolean;
  setLocation: (lat: number, lon: number, city: string) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lat: null,
      lon: null,
      city: '',
      _hasHydrated: false,
      setLocation: (lat, lon, city) => set({ lat, lon, city }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
