export interface GeocodingDirectParams {
  q: string;
  limit?: number;
}

export interface GeocodingZipParams {
  zip: string;
}

export interface GeocodingReverseParams {
  lat: number;
  lon: number;
  limit?: number;
}

export interface GeocodingLocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface GeocodingZipResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}
