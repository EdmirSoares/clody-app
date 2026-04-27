import { apiClient } from "@shared/api/client";
import type {
  CurrentWeatherParams,
  CurrentWeatherResponse,
} from "./current-weather.types";

export async function getCurrentWeather(
  params: CurrentWeatherParams,
): Promise<CurrentWeatherResponse> {
  const { data } = await apiClient.get<CurrentWeatherResponse>(
    "/data/2.5/weather",
    { params },
  );
  return data;
}
