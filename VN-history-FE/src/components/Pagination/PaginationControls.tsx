import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading?: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage?: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  isLoading = false,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#e0dbd0] pt-6">
      {/* Page Info */}
      <div className="text-xs text-[#6b6b6b] font-medium">
        Trang <span className="font-semibold text-[#1c1c1c]">{page}</span>{" "}
        <span className="text-[#9b9b9b]">/</span>{" "}
        <span className="font-semibold text-[#1c1c1c]">{totalPages}</span>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          disabled={!hasPreviousPage || isLoading}
          onClick={onPrevPage}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#1c1c1c] border border-[#e0dbd0] rounded-full hover:bg-[#FAFAF7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Trang trước"
        >
          <ChevronLeft size={14} />
          <span>Trước</span>
        </button>

        {/* Page Input */}
        {onGoToPage && (
          <input
            type="number"
            min="1"
            max={totalPages}
            value={page}
            onChange={(e) => {
              const newPage = parseInt(e.target.value, 10);
              if (newPage > 0 && newPage <= totalPages) {
                onGoToPage(newPage);
              }
            }}
            disabled={isLoading}
            className="w-12 px-2 py-1.5 text-xs text-center border border-[#e0dbd0] rounded-md hover:border-[#8B1A1A] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Nhập số trang"
          />
        )}

        {/* Next Button */}
        <button
          disabled={!hasNextPage || isLoading}
          onClick={onNextPage}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#1c1c1c] border border-[#e0dbd0] rounded-full hover:bg-[#FAFAF7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Trang sau"
        >
          <span>Sau</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
