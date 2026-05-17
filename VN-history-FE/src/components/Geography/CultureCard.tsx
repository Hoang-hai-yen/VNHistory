import { Info, Calendar } from "lucide-react";
import { Link } from "react-router";
import type { NormalizedArticleSummary } from "../../types";

export default function CultureCard({
  item,
}: {
  item: NormalizedArticleSummary<"culture">;
}) {
  return (
    <Link
      to={`/bai-viet/${item.slug}`}
      className="bg-white border border-[#e0dbd0] overflow-hidden group hover:border-[#B8860B] hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-video bg-[#1A1208] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#0D1A08] via-[#1A2D0A] to-[#0D1A0A]">
          <span className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            {"\ud83d\udccd"}
          </span>
          <span className="text-[10px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
            {item.display.type_label}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#8B1A1A]/90 text-white/95 text-[10px] px-2.5 py-1.5 rounded-full backdrop-blur-sm font-medium">
          <Calendar size={11} />
          {item.year_display}
        </div>

        <div className="absolute top-3 left-3 bg-black/60 text-white/90 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-medium uppercase tracking-wider">
          {item.display.type_label}
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
          {item.summary}
        </p>

        <div className="flex items-center justify-between text-[10px] text-[#8B6B47]">
          <div className="flex items-center gap-1.5">
            <Info size={12} />
            <span className="font-medium">Chi ti\u1ebft</span>
          </div>
          <span className="text-[#B8860B]">{"\u2192"}</span>
        </div>
      </div>
    </Link>
  );
}
