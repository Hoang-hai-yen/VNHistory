import { BookOpen } from "lucide-react";
import type { Article } from "../../types/article.type";

export default function QuickFactsCard({ article }: { article: Article }) {
  return (
    <div className="bg-[#13100a] text-[#e8d9b0] rounded-sm p-6 border border-[#2e2510]">
      <h4 className="text-[10px] font-bold text-[#C5A028] tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
        <BookOpen size={14} /> Thông tin nhanh
      </h4>
      <div className="space-y-4">
        <div className="pb-4 border-b border-[#2e2510]">
          <div className="text-[11px] text-[#8a7a4a] uppercase mb-1">
            Tên chính thức
          </div>
          <div className="text-[14px] font-serif">{article.title}</div>
        </div>
        <div className="pb-4 border-b border-[#2e2510]">
          <div className="text-[11px] text-[#8a7a4a] uppercase mb-1">
            Thời gian
          </div>
          <div className="text-[14px] font-serif">
            {article.year_display || "Đang cập nhật"}
          </div>
        </div>
        <div className="pb-4 border-b border-[#2e2510]">
          <div className="text-[11px] text-[#8a7a4a] uppercase mb-1">
            Giai đoạn
          </div>
          <div className="text-[14px] font-serif">
            {article.dynasty_id || "Đang cập nhật"}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-[#8a7a4a] uppercase mb-1">
            Danh mục
          </div>
          <div className="inline-block bg-[#8B1A1A] text-[#f5e0b0] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
            {article.type}
          </div>
        </div>
      </div>
    </div>
  );
}
