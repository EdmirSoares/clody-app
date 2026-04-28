import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "@shared/lib/use-debounce";
import { useGeocode } from "../../../entities/location/model/hooks";
import {
  getRecentLocations,
  upsertRecentLocation,
} from "../../../entities/recent-location";
import { getCurrentWeather } from "../../../entities/weather/api/current-weather.api";
import { getAirPollution } from "../../../entities/weather/api/air-pollution.api";
import type { RecentLocation } from "@shared/lib/db";
import type { GeocodingLocation } from "../../../entities/location/api/geocoding.types";

export type SearchState = "idle" | "searching" | "no-results";

export const useSearchLogic = () => {
  const [query, setQuery] = useState("");
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<RecentLocation | null>(null);
  const debouncedQuery = useDebounce(query, 500);

  const geocodeQuery = useGeocode(debouncedQuery, 5);

  const isSearching = debouncedQuery.trim().length >= 2;
  const hasResults = (geocodeQuery.data?.length ?? 0) > 0;

  const searchState: SearchState = !isSearching
    ? "idle"
    : hasResults
      ? "searching"
      : geocodeQuery.isFetching
        ? "searching"
        : "no-results";

  const loadRecent = useCallback(async () => {
    const rows = await getRecentLocations();
    setRecentLocations(rows);
    setSelectedLocation((prev) => {
      if (prev) {
        const updated = rows.find((r) => r.name === prev.name);
        return updated ?? rows[0] ?? null;
      }
      return rows[0] ?? null;
    });
  }, []);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  const handleSelectLocation = useCallback(
    async (location: GeocodingLocation) => {
      try {
        const [weather, pollution] = await Promise.all([
          getCurrentWeather({ lat: location.lat, lon: location.lon }),
          getAirPollution({ lat: location.lat, lon: location.lon }),
        ]);
        const iconCode = weather.weather[0]?.icon ?? "01d";
        const temp = Math.round(weather.main.temp);
        const weatherDescription = weather.weather[0]?.description ?? "";
        const aqi = pollution.list[0]?.main.aqi ?? 1;
        const co = pollution.list[0]?.components.co ?? 0;

        await upsertRecentLocation({
          name: location.name,
          state: location.state ?? null,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
          iconCode,
          temp,
          weatherDescription,
          aqi,
          co,
        });
        await loadRecent();
      } catch {}
      setQuery("");
    },
    [loadRecent],
  );

  const handleSelectCard = useCallback((location: RecentLocation) => {
    setSelectedLocation(location);
  }, []);

  return {
    query,
    setQuery,
    debouncedQuery,
    searchState,
    geocodeResults: geocodeQuery.data ?? [],
    isFetching: geocodeQuery.isFetching,
    recentLocations,
    selectedLocation,
    handleSelectLocation,
    handleSelectCard,
  };
};
