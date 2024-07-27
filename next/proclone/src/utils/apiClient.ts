// src/utils/apiClient.ts

import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: unknown;
}

export const BASE_URL = "http://localhost:3001";

export async function apiClient<T>(
  path: string,
  method: Method,
  requestData?: {
    data?: Record<string, any> | Array<any>;
    params?: Record<string, any> | Array<any>;
  }
): Promise<ApiResponse> {
  const url = `${BASE_URL}${path}`;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      "Content-Type": "application/json",
      toJSON: true,
    },
    data: requestData ? requestData.data : undefined,
    params: requestData ? requestData.params : undefined,
    maxBodyLength: Infinity,
    withCredentials: true, // Include cookies in the request
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    // Handle Axios errors
    if (axios.isAxiosError(error))
      return {
        success: false,
        error: error.response?.data || error.message,
      };

    // Handle non-Axios errors
    return { success: false, error: error };
  }
}
