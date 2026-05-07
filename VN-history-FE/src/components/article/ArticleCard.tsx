import { Link } from "react-router";
import type { ArticleSummary } from "../../types/article.type";

export function ArticleCard({
  item,
  lg = false,
  horizontal = false,
}: {
  item: ArticleSummary;
  lg?: boolean;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <Link
        to={`/bai-viet/${item.slug}`}
        className="flex gap-3.5 cursor-pointer group py-3.5 border-b border-[#e0dbd0] last:border-none"
      >
        <div className="w-22 h-16 shrink-0 bg-[#1A1208] overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-xl opacity-30">
            {item.published_at}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1">
            {item.year_display}
          </div>
          <h4 className="font-['Playfair_Display',serif] text-[13px] font-bold leading-tight group-hover:text-[#8B1A1A] transition-colors">
            {item.title}
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/bai-viet/${item.slug}`} className="cursor-pointer group block">
      <div
        className={`overflow-hidden bg-[#1A1208] relative mb-3 aspect-[16/10] ${lg ? "aspect-video" : ""}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1A1208] via-[#2D1F0A] to-[#1A1208]">
          <span className="text-3xl opacity-40 group-hover:scale-110 transition-transform duration-500">
            {"⚔"}
          </span>
          <span className="text-[9px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
            {item.year_display}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#8B1A1A]/0 group-hover:bg-[#8B1A1A]/10 transition-colors duration-300" />
      </div>

      <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1.5">
        {item.category_id}
      </div>

      <h3
        className={`font-['Playfair_Display',serif] font-bold text-[#1c1c1c] leading-snug group-hover:text-[#8B1A1A] transition-colors mb-2 ${lg ? "text-2xl" : "text-base"}`}
      >
        {item.title}
      </h3>

      <p className="font-['Source_Serif_4',serif] text-[13px] text-[#6b6b6b] leading-relaxed font-light line-clamp-2">
        {item.summary}
      </p>
    </Link>
  );
}
