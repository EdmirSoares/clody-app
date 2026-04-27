import type { DailyForecast, ForecastItem } from "../api/forecast.types";
import type { WeatherCondition } from "@shared/api/types";

export function groupForecastByDay(items: ForecastItem[]): DailyForecast[] {
  const byDay = new Map<string, ForecastItem[]>();

  for (const item of items) {
    const date = item.dt_txt.split(" ")[0];
    const existing = byDay.get(date) ?? [];
    byDay.set(date, [...existing, item]);
  }

  return Array.from(byDay.entries()).map(([date, dayItems]) => {
    const avgTemp =
      dayItems.reduce((sum, i) => sum + i.main.temp, 0) / dayItems.length;
    const minTemp = Math.min(...dayItems.map((i) => i.main.temp_min));
    const maxTemp = Math.max(...dayItems.map((i) => i.main.temp_max));
    const dominantCondition = getDominantCondition(dayItems);

    return {
      date,
      avgTemp,
      minTemp,
      maxTemp,
      dominantCondition,
      items: dayItems,
    };
  });
}

function getDominantCondition(items: ForecastItem[]): WeatherCondition {
  const counts = new Map<
    string,
    { count: number; condition: WeatherCondition }
  >();

  for (const item of items) {
    const condition = item.weather[0];
    const prev = counts.get(condition.main);
    counts.set(condition.main, {
      count: (prev?.count ?? 0) + 1,
      condition,
    });
  }

  return [...counts.values()].sort((a, b) => b.count - a.count)[0].condition;
}
