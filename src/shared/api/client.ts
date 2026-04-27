import axios from "axios";
import { OWM_API_KEY, OWM_BASE_URL, REQUEST_TIMEOUT_MS } from "./config";
import { normalizeError } from "./error";

export const apiClient = axios.create({
  baseURL: OWM_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

apiClient.interceptors.request.use((config) => {
  config.params = {
    appid: OWM_API_KEY,
    units: "metric",
    lang: "pt_br",
    ...config.params,
  };
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);
