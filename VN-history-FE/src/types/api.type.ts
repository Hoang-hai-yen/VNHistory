export interface ApiResponse<T> {
  data: T;
  total?: number;
  pagination?: PaginationResponse;
  message?: string;
}

export interface PaginationResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
