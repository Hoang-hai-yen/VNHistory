export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const LIMIT_OPTIONS = [10, 20, 50, 100];

export const PAGINATION_DEFAULTS = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};
