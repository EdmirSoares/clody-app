import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../api/current-weather.api";
import { WEATHER_KEYS } from "../api/query-keys";

export function useCurrentWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: WEATHER_KEYS.current(lat, lon),
    queryFn: () => getCurrentWeather({ lat, lon }),
    enabled: Boolean(lat && lon),
    staleTime: 5 * 60 * 1000,
  });
}
