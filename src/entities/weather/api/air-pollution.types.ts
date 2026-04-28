export interface AirPollutionParams {
  lat: number;
  lon: number;
}

export interface AirPollutionResponse {
  list: Array<{
    main: { aqi: 1 | 2 | 3 | 4 | 5 };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

export const AQI_LABELS: Record<number, string> = {
  1: "Boa",
  2: "Moderada",
  3: "Regular",
  4: "Ruim",
  5: "Péssima",
};
