import { LIMIT_OPTIONS } from "../../types/pagination.type";

interface PaginationSizeSelectorProps {
  value: number;
  onChange: (limit: number) => void;
  label?: string;
  disabled?: boolean;
}

export default function PaginationSizeSelector({
  value,
  onChange,
  label = "Hiển thị",
  disabled = false,
}: PaginationSizeSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-medium text-[#6b6b6b]">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        disabled={disabled}
        className="px-3 py-1.5 text-xs border border-[#e0dbd0] rounded-md bg-white hover:border-[#8B1A1A] focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {LIMIT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option} mục
          </option>
        ))}
      </select>
    </div>
  );
}
