import axios, { AxiosResponse } from "axios";
import { ApiError } from "../types/error";

export async function handleApiRequest<T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = new Error(
        error.response?.data?.message || "Operation failed"
      ) as Error & ApiError;
      apiError.statusCode = error.response?.status;
      throw apiError;
    }
    const unexpectedError = new Error("An unexpected error occurred") as Error &
      ApiError;
    throw unexpectedError;
  }
}
