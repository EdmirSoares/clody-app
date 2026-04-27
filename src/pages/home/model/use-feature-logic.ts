import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../../../entities/weather/api/current-weather.api";
import { getForecast } from "../../../entities/weather/api/forecast.api";
import { getImageForCondition } from "@shared/utils";

export const useHomeLogic = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [address, setAddress] = useState<string>("");
  const [locationError, setLocationError] = useState<string | null>(null);

  const lat = location?.coords.latitude;
  const lon = location?.coords.longitude;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permissão de localização foi negada.");
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        const [geocode] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (geocode) {
          const regionStr = geocode.region ? `, ${geocode.region}` : "";
          setAddress(
            `${geocode.city || geocode.subregion || "Local"}${regionStr}`,
          );
        }
      } catch (e) {
        setLocationError("Falha ao obter localização.");
      }
    })();
  }, []);

  const currentQuery = useQuery({
    queryKey: ["current-weather", lat, lon],
    queryFn: () => getCurrentWeather({ lat: lat!, lon: lon! }),
    enabled: !!lat && !!lon,
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => getForecast({ lat: lat!, lon: lon! }),
    enabled: !!lat && !!lon,
  });

  const upcomingForecasts = (() => {
    if (!forecastQuery.data) return [];
    const now = new Date();
    return forecastQuery.data.list
      .filter((item) => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate > now;
      })
      .slice(0, 6)
      .map((item) => {
        const d = new Date(item.dt * 1000);
        const ampm = d.getHours() >= 12 ? "PM" : "AM";
        let displayH = d.getHours() % 12;
        if (displayH === 0) displayH = 12;
        return {
          id: item.dt.toString(),
          label: `${displayH} ${ampm}`,
          temp: Math.round(item.main.temp),
          iconCode: item.weather[0].icon,
        };
      });
  })();

  const currentCondition = currentQuery.data?.weather?.[0]?.icon || "01d";

  const currentTemp = currentQuery.data
    ? Math.round(currentQuery.data.main.temp)
    : 0;
  const currentCity =
    address ||
    (currentQuery.data ? currentQuery.data.name : "Local Desconhecido");

  const humidity = currentQuery.data ? currentQuery.data.main.humidity : 0;

  const windSpeed = currentQuery.data
    ? Math.round(currentQuery.data.wind.speed * 3.6)
    : 0;

  const feelsLike = currentQuery.data
    ? Math.round(currentQuery.data.main.feels_like)
    : 0;

  const conditionImage = getImageForCondition(currentCondition);

  const hourlyData = [
    {
      id: "now",
      label: "Agora",
      temp: currentTemp,
      iconCode: currentCondition,
    },
    ...upcomingForecasts,
  ];

  return {
    locationError,
    currentWeather: {
      temp: currentTemp,
      city: currentCity,
      humidity,
      windSpeed,
      feelsLike,
      conditionImage,
      hourlyData,
    },
    isLoading:
      !locationError &&
      (currentQuery.isLoading || forecastQuery.isLoading || !location),
  };
};
