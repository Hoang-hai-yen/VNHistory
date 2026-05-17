export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  total?: number;
  pagination?: PaginationResponse;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  total: number;
  pagination: PaginationResponse;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
