import { useQuery } from "@tanstack/react-query";
import {
  geocodeByCityName,
  geocodeByZip,
  reverseGeocode,
} from "../api/geocoding.api";
import { LOCATION_KEYS } from "../api/query-keys";
import type {
  GeocodingZipParams,
  GeocodingReverseParams,
} from "../api/geocoding.types";

const GEOCODE_STALE_TIME = 24 * 60 * 60 * 1000;

export function useGeocode(query: string, limit = 5) {
  return useQuery({
    queryKey: LOCATION_KEYS.direct(query, limit),
    queryFn: () => geocodeByCityName({ q: query, limit }),
    enabled: query.trim().length >= 2,
    staleTime: GEOCODE_STALE_TIME,
  });
}

export function useGeocodeByZip(params: GeocodingZipParams) {
  return useQuery({
    queryKey: LOCATION_KEYS.zip(params.zip),
    queryFn: () => geocodeByZip(params),
    enabled: params.zip.trim().length > 0,
    staleTime: GEOCODE_STALE_TIME,
  });
}

export function useReverseGeocode(params: GeocodingReverseParams) {
  return useQuery({
    queryKey: LOCATION_KEYS.reverse(params.lat, params.lon),
    queryFn: () => reverseGeocode(params),
    enabled: Boolean(params.lat && params.lon),
    staleTime: GEOCODE_STALE_TIME,
  });
}
