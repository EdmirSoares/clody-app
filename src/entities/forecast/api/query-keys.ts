export const FORECAST_KEYS = {
  all: ["forecast"] as const,
  fiveDay: (lat: number, lon: number) =>
    ["forecast", "5day", lat, lon] as const,
};
