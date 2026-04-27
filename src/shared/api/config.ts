import Constants from "expo-constants";

export const OWM_API_KEY: string =
  process.env.EXPO_PUBLIC_OWM_API_KEY ||
  (Constants.expoConfig?.extra as Record<string, string> | undefined)
    ?.owmApiKey ||
  "";

export const OWM_BASE_URL = "https://api.openweathermap.org";
export const REQUEST_TIMEOUT_MS = 10_000;
