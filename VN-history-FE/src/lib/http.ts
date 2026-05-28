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

const API_URL = import.meta.env.VITE_API_URL;
export class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
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
        const token = localStorage.getItem("token");
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

  public patch<T>(url: string, data?: unknown) {
    return this.instance.patch<T>(url, data);
  }
}

export const httpClient = new HttpClient();
