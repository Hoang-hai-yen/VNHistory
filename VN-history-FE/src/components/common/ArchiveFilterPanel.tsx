import type { Category, Dynasty } from "../../types";

interface ArchiveFilterPanelProps {
  title: string;
  description: string;
  total: number;
  categoryOptions?: Category[];
  dynastyOptions?: Dynasty[];
  categoryId?: string;
  dynastyId?: string;
  onCategoryChange?: (value: string) => void;
  onDynastyChange?: (value: string) => void;
  onClear?: () => void;
}

export default function ArchiveFilterPanel({
  title,
  description,
  total,
  categoryOptions = [],
  dynastyOptions = [],
  categoryId = "",
  dynastyId = "",
  onCategoryChange,
  onDynastyChange,
  onClear,
}: ArchiveFilterPanelProps) {
  return (
    <div className="mb-8 rounded-sm border border-[#e0dbd0] bg-[#faf7f0] p-5 lg:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B1A1A]">
            Bộ sưu tập
          </div>
          <h2 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#1c1c1c]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#6b6b6b]">
            {description}
          </p>
        </div>

        <div className="rounded-sm border border-[#eadfcb] bg-white px-4 py-3 text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#8B6B47]">
            Kết quả hiện có
          </div>
          <div className="font-['Playfair_Display',serif] text-3xl font-bold text-[#8B1A1A]">
            {total}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
        {onCategoryChange && (
          <label className="block">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
              Chuyên mục
            </div>
            <select
              value={categoryId}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="w-full rounded-sm border border-[#d8cdb8] bg-white px-3 py-2.5 text-[13px] text-[#1c1c1c] outline-none transition-colors focus:border-[#8B1A1A]"
            >
              <option value="">Tất cả chuyên mục</option>
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {onDynastyChange && (
          <label className="block">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#8a7a4a]">
              Triều đại
            </div>
            <select
              value={dynastyId}
              onChange={(event) => onDynastyChange(event.target.value)}
              className="w-full rounded-sm border border-[#d8cdb8] bg-white px-3 py-2.5 text-[13px] text-[#1c1c1c] outline-none transition-colors focus:border-[#8B1A1A]"
            >
              <option value="">Tất cả triều đại</option>
              {dynastyOptions.map((dynasty) => (
                <option key={dynasty.id} value={dynasty.id}>
                  {dynasty.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {onClear && (categoryId || dynastyId) ? (
          <button
            type="button"
            onClick={onClear}
            className="self-end rounded-sm border border-[#8B1A1A] px-4 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#8B1A1A] transition-colors hover:bg-[#8B1A1A] hover:text-white"
          >
            Xóa bộ lọc
          </button>
        ) : null}
      </div>
    </div>
  );
}
