import React, { useEffect, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from '../store/useThemeStore';
import { useFontScaleStore } from '../store/useFontScaleStore';
import { queryClient } from '../lib/query-client';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    useThemeStore.persist.rehydrate();
    useFontScaleStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
