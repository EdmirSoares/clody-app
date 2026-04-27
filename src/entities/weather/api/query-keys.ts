export const WEATHER_KEYS = {
  all: ["weather"] as const,
  current: (lat: number, lon: number) =>
    ["weather", "current", lat, lon] as const,
};
