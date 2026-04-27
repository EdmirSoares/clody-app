export const LOCATION_KEYS = {
  all: ["location"] as const,
  direct: (query: string, limit?: number) =>
    ["location", "direct", query, limit] as const,
  zip: (zip: string) => ["location", "zip", zip] as const,
  reverse: (lat: number, lon: number) =>
    ["location", "reverse", lat, lon] as const,
};
