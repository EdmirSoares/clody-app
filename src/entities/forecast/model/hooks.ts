import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../api/forecast.api";
import { FORECAST_KEYS } from "../api/query-keys";
import { groupForecastByDay } from "./forecast.utils";

export function useForecast(lat: number, lon: number) {
  return useQuery({
    queryKey: FORECAST_KEYS.fiveDay(lat, lon),
    queryFn: () => getForecast({ lat, lon }),
    enabled: Boolean(lat && lon),
    staleTime: 3 * 60 * 60 * 1000,
    select: (data) => ({
      raw: data,
      daily: groupForecastByDay(data.list),
      city: data.city,
    }),
  });
}
