import { useAppStore } from '../../../shared/store/useAppStore';
import { useRouter } from 'expo-router';

export const useOnboardingModel = () => {
  const setHasSeenOnboarding = useAppStore((state) => state.setHasSeenOnboarding);
  const router = useRouter();

  const completeOnboarding = () => {
    setHasSeenOnboarding(true);
    router.replace('/(tabs)/home');
  };

  return { completeOnboarding };
};
