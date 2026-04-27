export type AQILevel = 1 | 2 | 3 | 4 | 5;

export type AQILabel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

export const AQI_LABELS: Record<AQILevel, AQILabel> = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

export interface AirPollutionParams {
  lat: number;
  lon: number;
}

export interface AirPollutionComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

export interface AirPollutionItem {
  dt: number;
  main: { aqi: AQILevel };
  components: AirPollutionComponents;
}

export interface AirPollutionResponse {
  coord: [number, number];
  list: AirPollutionItem[];
}

export interface AirPollutionData extends AirPollutionResponse {
  aqiLabel: AQILabel;
}
