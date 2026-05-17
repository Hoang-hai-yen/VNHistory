import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { usePagination } from "./usePagination";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../types/pagination.type";
import { scrollToTop } from "../utils/scrollUtils";

interface UsePaginationUrlOptions {
  scrollToTop?: boolean;
  behavior?: "smooth" | "auto";
}

/**
 * Hook to manage pagination with URL synchronization
 * Automatically syncs page/limit with URL search params
 */
export const usePaginationUrl = (
  total: number = 0,
  defaultLimit: number = DEFAULT_LIMIT,
  options: UsePaginationUrlOptions = {},
) => {
  const { scrollToTop: shouldScroll = true, behavior = "smooth" } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params
  const urlPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const parsed = parseInt(pageParam || "1", 10);
    return Number.isNaN(parsed) || parsed < 1 ? DEFAULT_PAGE : parsed;
  }, [searchParams]);

  const urlLimit = useMemo(() => {
    const limitParam = searchParams.get("limit");
    const parsed = parseInt(limitParam || String(defaultLimit), 10);
    return Number.isNaN(parsed) || parsed < 1 ? defaultLimit : parsed;
  }, [searchParams, defaultLimit]);

  const {
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage: goToPageInternal,
    changeLimit: changeLimitInternal,
  } = usePagination(total, {
    initialPage: urlPage,
    initialLimit: urlLimit,
  });

  // Update URL when page or limit changes
  const updateUrl = (newPage: number, newLimit: number = limit) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    params.set("limit", String(newLimit));
    setSearchParams(params);
  };

  // Scroll to top when page changes
  useEffect(() => {
    if (shouldScroll && page !== urlPage) {
      scrollToTop(behavior);
    }
  }, [page, urlPage, shouldScroll, behavior]);

  // Wrapper functions that update URL
  const goToPage = (newPage: number) => {
    const validPage = goToPageInternal(newPage);
    updateUrl(validPage, limit);
  };

  const nextPage = () => {
    if (hasNextPage) {
      const newPage = page + 1;
      updateUrl(newPage, limit);
    }
  };

  const prevPage = () => {
    if (hasPreviousPage) {
      const newPage = page - 1;
      updateUrl(newPage, limit);
    }
  };

  const changeLimit = (newLimit: number) => {
    changeLimitInternal(newLimit);
    updateUrl(DEFAULT_PAGE, newLimit);
  };

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
  };
};
