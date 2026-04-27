import type { WeatherCondition } from "@shared/api/types";

export type { WeatherCondition };

export interface ForecastParams {
  lat: number;
  lon: number;
  cnt?: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  snow?: { "3h": number };
  sys: { pod: "n" | "d" };
  dt_txt: string;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: ForecastCity;
}

export interface DailyForecast {
  date: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  dominantCondition: WeatherCondition;
  items: ForecastItem[];
}
