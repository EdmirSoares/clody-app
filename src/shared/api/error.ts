import axios from "axios";

export interface ApiError {
  status: number;
  message: string;
  code?: string | number;
}

export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    return {
      status: error.response?.status ?? 0,
      message: typeof data?.message === "string" ? data.message : error.message,
      code: data?.cod as string | number | undefined,
    };
  }
  return {
    status: 0,
    message: error instanceof Error ? error.message : "Unknown error",
  };
}
