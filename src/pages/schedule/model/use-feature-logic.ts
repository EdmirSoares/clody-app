import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../../../entities/weather/api/forecast.api";
import { ForecastItem } from "../../../entities/weather/api/forecast.types";
import { useLocationStore } from "@shared/store/useLocationStore";

interface DailyForecast {
  id: string;
  dayName: string;
  iconName: string;
  weatherDescription: string;
  minTemp: number;
  maxTemp: number;
  hourlyData: { time: string; temp: number }[];
}

export const useForecastLogic = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { lat, lon, city, _hasHydrated } = useLocationStore();


  const groupForecastByDay = (items: ForecastItem[]): DailyForecast[] => {
    const daysMap = new Map<string, ForecastItem[]>();

    for (const item of items) {
      const dateStr = item.dt_txt.split(" ")[0]; // yyyy-mm-dd
      if (!daysMap.has(dateStr)) {
        daysMap.set(dateStr, []);
      }
      daysMap.get(dateStr)!.push(item);
    }

    const result: DailyForecast[] = [];

    const daysOfWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const todayLocal = new Date();
    const localTodayStr = `${todayLocal.getFullYear()}-${String(todayLocal.getMonth() + 1).padStart(2, "0")}-${String(todayLocal.getDate()).padStart(2, "0")}`;

    Array.from(daysMap.entries()).forEach(([dateStr, dayItems]) => {
      if (dateStr === localTodayStr) {
        return;
      }

      const date = new Date(dateStr + "T00:00:00");
      const dayName = daysOfWeek[date.getDay()];

      let minTemp = Infinity;
      let maxTemp = -Infinity;
      const icons = new Map<string, number>();
      const descriptions = new Map<string, number>();

      const hourlyData = dayItems.map((item) => {
        if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
        if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;

        const ic = item.weather[0].icon;
        icons.set(ic, (icons.get(ic) || 0) + 1);

        const desc = item.weather[0].description;
        descriptions.set(desc, (descriptions.get(desc) || 0) + 1);

        const d = new Date(item.dt * 1000);
        const localHour = d.getHours();

        return {
          rawHour: localHour,
          time: "",
          temp: Math.round(item.main.temp),
        };
      });

      const targets = [8, 12, 18, 22];
      const filteredHourlyData: { time: string; temp: number }[] = [];

      targets.forEach((target) => {
        let closestItem = hourlyData[0];
        let minDiff = Infinity;

        hourlyData.forEach((hd) => {
          const diff = Math.abs(hd.rawHour - target);
          if (diff < minDiff) {
            minDiff = diff;
            closestItem = hd;
          }
        });

        if (
          closestItem &&
          !filteredHourlyData.some((f) => f.time === `${target}h`)
        ) {
          filteredHourlyData.push({
            time: `${target}h`,
            temp: closestItem.temp,
          });
        }
      });

      let mostFreqIcon = dayItems[0].weather[0].icon;
      let iconMaxCount = 0;
      icons.forEach((count, ic) => {
        if (count > iconMaxCount) {
          iconMaxCount = count;
          mostFreqIcon = ic;
        }
      });

      let mostFreqDesc = dayItems[0].weather[0].description;
      let descMaxCount = 0;
      descriptions.forEach((count, desc) => {
        if (count > descMaxCount) {
          descMaxCount = count;
          mostFreqDesc = desc;
        }
      });

      const capitalizedDesc =
        mostFreqDesc.charAt(0).toUpperCase() + mostFreqDesc.slice(1);

      result.push({
        id: dateStr,
        dayName,
        iconName: mostFreqIcon,
        weatherDescription: capitalizedDesc,
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        hourlyData: filteredHourlyData,
      });
    });

    return result.slice(0, 6);
  };

  const queryEnabled = _hasHydrated && !!lat && !!lon;

  const { data, isLoading, error } = useQuery({
    queryKey: ["forecast-grouped", lat, lon],
    queryFn: async () => {
      try {
        const res = await getForecast({ lat: lat!, lon: lon! });
        return groupForecastByDay(res.list);
      } catch (err: any) {
        console.warn("Erro na API:", err.message || err);
        throw err;
      }
    },
    enabled: queryEnabled,
  });


  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return {
    forecasts: data || [],
    isLoading: isLoading || !_hasHydrated,
    error,
    expandedId,
    toggleExpand,
    city,
  };
};
