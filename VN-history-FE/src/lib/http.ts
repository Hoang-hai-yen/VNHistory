import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      <T>(response: AxiosResponse<T>) => response,
      // Error response
      (error: AxiosError) => {
        const status = error.response?.status;

        switch (status) {
          case 400:
            console.error("Bad Request");
            break;

          case 401:
            console.error("Unauthorized");
            // logout / redirect login here
            break;

          case 403:
            console.error("Forbidden");
            break;

          case 404:
            console.error("Not Found");
            break;

          case 500:
            console.error("Server Error");
            break;

          default:
            console.error(error.message || "Unknown Error");
        }

        return Promise.reject(error);
      },
    );
  }

  public get<T>(url: string) {
    return this.instance.get<T>(url);
  }

  public post<T>(url: string, data?: unknown) {
    return this.instance.post<T>(url, data);
  }

  public put<T>(url: string, data?: unknown) {
    return this.instance.put<T>(url, data);
  }

  public delete<T>(url: string) {
    return this.instance.delete<T>(url);
  }
}

export const httpClient = new HttpClient();
