import type { PaginationState } from "../types/pagination.type";

/**
 * Calculate total pages based on total items and limit per page
 */
export const calculateTotalPages = (total: number, limit: number): number => {
  if (limit <= 0) return 1;
  return Math.max(1, Math.ceil(total / limit));
};

/**
 * Validate page number - ensure it's within valid range
 */
export const validatePageNumber = (
  page: number,
  totalPages: number,
): number => {
  const validPage = Math.max(1, Math.min(page, totalPages));
  return Number.isNaN(validPage) ? 1 : validPage;
};

/**
 * Calculate offset for API requests
 * Useful for some APIs that use offset instead of page number
 */
export const calculateOffset = (page: number, limit: number): number => {
  return Math.max(0, (page - 1) * limit);
};

/**
 * Check if page number is valid
 */
export const isValidPageNumber = (page: unknown): boolean => {
  const pageNum = Number(page);
  return Number.isInteger(pageNum) && pageNum > 0;
};

/**
 * Build pagination state from data
 */
export const buildPaginationState = (
  page: number,
  limit: number,
  total: number,
): PaginationState => {
  const totalPages = calculateTotalPages(total, limit);
  const validPage = validatePageNumber(page, totalPages);

  return {
    page: validPage,
    limit,
    total,
    totalPages,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
  };
};

/**
 * Get page range for display (e.g., showing "1-10 of 50")
 */
export const getPageRange = (
  page: number,
  limit: number,
  total: number,
): { start: number; end: number } => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return { start, end };
};

/**
 * Generate page numbers to display in pagination
 * Example: [1, 2, 3, "...", 8, 9, 10]
 */
export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  siblings: number = 1,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  const leftSibling = Math.max(2, currentPage - siblings);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblings);

  // Add left ellipsis
  if (leftSibling > 2) {
    pages.push("...");
  }

  // Add left siblings and current page
  for (let i = leftSibling; i <= currentPage; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Add right siblings
  for (let i = currentPage + 1; i <= rightSibling; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Add right ellipsis
  if (rightSibling < totalPages - 1) {
    pages.push("...");
  }

  // Always show last page (if more than 1 page)
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
};
