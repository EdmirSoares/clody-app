import { apiClient } from "@shared/api/client";
import type {
  AirPollutionParams,
  AirPollutionResponse,
} from "./air-pollution.types";

export async function getCurrentAirPollution(
  params: AirPollutionParams,
): Promise<AirPollutionResponse> {
  const { data } = await apiClient.get<AirPollutionResponse>(
    "/data/2.5/air_pollution",
    {
      params,
    },
  );
  return data;
}
