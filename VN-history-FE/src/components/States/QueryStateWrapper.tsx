import type { ReactNode } from "react";
import EmptyState from "../Error/EmptyState";
import ErrorAlert from "../Error/ErrorAlert";
import PageLoader from "../Loading/PageLoader";
import { PaginationControls, PaginationSizeSelector } from "../Pagination";

interface PaginationProps {
  page: number;
  limit: number;
  totalPages: number;
  total?: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

interface QueryStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  data: unknown;
  children: ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
  onRetry?: () => void;
  pagination?: PaginationProps;
}

export default function QueryStateWrapper({
  isLoading,
  error,
  data,
  children,
  emptyMessage = "Không có dữ liệu",
  loadingMessage = "Đang tải dữ liệu...",
  onRetry,
  pagination,
}: QueryStateWrapperProps) {
  // Loading state
  if (isLoading && !data) {
    return <PageLoader message={loadingMessage} />;
  }

  // Error state
  if (error && !data) {
    return (
      <ErrorAlert
        title="Lỗi tải dữ liệu"
        message={error.message || "Đã xảy ra lỗi khi tải dữ liệu"}
        onRetry={onRetry}
      />
    );
  }

  // Empty state
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <EmptyState title="Không có dữ liệu" description={emptyMessage} />;
  }

  // Success state - render children with pagination
  return (
    <>
      {children}

      <div className="flex flex-row gap-2 items-end justify-end">
        {pagination?.onLimitChange && (
          <div className="my-6">
            <PaginationSizeSelector
              value={pagination.limit}
              onChange={pagination.onLimitChange}
              disabled={isLoading}
            />
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <PaginationControls
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.page < pagination.totalPages}
            hasPreviousPage={pagination.page > 1}
            isLoading={isLoading}
            onNextPage={pagination.onNextPage}
            onPrevPage={pagination.onPrevPage}
            onGoToPage={pagination.onGoToPage}
          />
        )}
      </div>
    </>
  );
}
