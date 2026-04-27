import { apiClient } from "@shared/api/client";
import type { ForecastParams, ForecastResponse } from "./forecast.types";

export async function getForecast(
  params: ForecastParams,
): Promise<ForecastResponse> {
  const { data } = await apiClient.get<ForecastResponse>("/data/2.5/forecast", {
    params,
  });
  return data;
}
