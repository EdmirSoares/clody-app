import { apiClient } from "@shared/api/client";
import type {
  GeocodingDirectParams,
  GeocodingLocation,
  GeocodingReverseParams,
  GeocodingZipParams,
  GeocodingZipResponse,
} from "./geocoding.types";

export async function geocodeByCityName(
  params: GeocodingDirectParams,
): Promise<GeocodingLocation[]> {
  const { data } = await apiClient.get<GeocodingLocation[]>("/geo/1.0/direct", {
    params,
  });
  return data;
}

export async function geocodeByZip(
  params: GeocodingZipParams,
): Promise<GeocodingZipResponse> {
  const { data } = await apiClient.get<GeocodingZipResponse>("/geo/1.0/zip", {
    params,
  });
  return data;
}

export async function reverseGeocode(
  params: GeocodingReverseParams,
): Promise<GeocodingLocation[]> {
  const { data } = await apiClient.get<GeocodingLocation[]>(
    "/geo/1.0/reverse",
    { params },
  );
  return data;
}
