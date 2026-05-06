import { useState, useCallback } from "react";
import type { PaginationState } from "../types/pagination.type";
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  LIMIT_OPTIONS,
} from "../types/pagination.type";
import {
  validatePageNumber,
  calculateTotalPages,
  buildPaginationState,
} from "../utils/pagination.utils";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export const usePagination = (
  total: number = 0,
  options: UsePaginationOptions = {},
) => {
  const { initialPage = DEFAULT_PAGE, initialLimit = DEFAULT_LIMIT } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = calculateTotalPages(total, limit);

  // Validate and update page
  const goToPage = useCallback(
    (newPage: number) => {
      const validPage = validatePageNumber(newPage, totalPages);
      setPage(validPage);
      return validPage;
    },
    [totalPages],
  );

  // Go to next page
  const nextPage = useCallback(() => {
    if (page < totalPages) {
      goToPage(page + 1);
    }
  }, [page, totalPages, goToPage]);

  // Go to previous page
  const prevPage = useCallback(() => {
    if (page > 1) {
      goToPage(page - 1);
    }
  }, [page, goToPage]);

  // Update limit and reset to page 1
  const changeLimit = useCallback((newLimit: number) => {
    if (LIMIT_OPTIONS.includes(newLimit)) {
      setLimit(newLimit);
      setPage(DEFAULT_PAGE);
    }
  }, []);

  // Reset to initial state
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  // Build complete pagination state
  const paginationState: PaginationState = buildPaginationState(
    page,
    limit,
    total,
  );

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: paginationState.hasNextPage,
    hasPreviousPage: paginationState.hasPreviousPage,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    reset,
    paginationState,
  };
};
