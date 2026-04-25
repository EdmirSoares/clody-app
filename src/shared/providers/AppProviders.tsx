import React, { useEffect, ReactNode } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useFontScaleStore } from '../store/useFontScaleStore';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    useThemeStore.persist.rehydrate();
    useFontScaleStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
