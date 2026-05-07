import { Info, Calendar } from "lucide-react";
import { Link } from "react-router";
import type { ArticleSummary } from "../../types/article.type";

export default function CultureCard({ item }: { item: ArticleSummary }) {
  return (
    <Link
      to={`/bai-viet/${item.slug}`}
      className="bg-white border border-[#e0dbd0] overflow-hidden group hover:border-[#B8860B] hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-video bg-[#1A1208] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#0D1A08] via-[#1A2D0A] to-[#0D1A0A]">
          <span className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            📍
          </span>
          <span className="text-[10px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
            {item.type === "culture" ? "Di Tích Văn Hóa" : "Di Tích Quốc Gia"}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#8B1A1A]/90 text-white/95 text-[10px] px-2.5 py-1.5 rounded-full backdrop-blur-sm font-medium">
          <Calendar size={11} />
          {item.year_display}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white/90 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-medium uppercase tracking-wider">
          {item.type === "culture"
            ? "Văn Hóa"
            : item.type === "place"
              ? "Địa Điểm"
              : item.type}
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <h3 className="font-['Playfair_Display',serif] text-[17px] font-bold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-1 line-clamp-2">
          {item.title}
        </h3>

        {item.subtitle && (
          <div className="text-[11px] text-[#B8860B] font-medium uppercase tracking-[1.5px] mb-2">
            {item.subtitle}
          </div>
        )}

        <p className="font-['Source_Serif_4',serif] text-[13.5px] text-[#6b6b6b] leading-relaxed font-light mb-4 line-clamp-3">
          {item.summary || item.quote}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-[10px] text-[#8B6B47]">
          <div className="flex items-center gap-1.5">
            <Info size={12} />
            <span className="font-medium">Chi tiết</span>
          </div>
          <span className="text-[#B8860B]">→</span>
        </div>
      </div>
    </Link>
  );
}
