import { useQuery } from "@tanstack/react-query";
import { getCurrentAirPollution } from "../api/air-pollution.api";
import { AIR_POLLUTION_KEYS } from "../api/query-keys";
import { AQI_LABELS } from "../api/air-pollution.types";

export function useAirPollution(lat: number, lon: number) {
  return useQuery({
    queryKey: AIR_POLLUTION_KEYS.current(lat, lon),
    queryFn: () => getCurrentAirPollution({ lat, lon }),
    enabled: Boolean(lat && lon),
    staleTime: 60 * 60 * 1000,
    select: (data) => ({
      ...data,
      aqiLabel: AQI_LABELS[data.list[0].main.aqi],
    }),
  });
}
