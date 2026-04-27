export const AIR_POLLUTION_KEYS = {
  all: ["air-pollution"] as const,
  current: (lat: number, lon: number) =>
    ["air-pollution", "current", lat, lon] as const,
};
