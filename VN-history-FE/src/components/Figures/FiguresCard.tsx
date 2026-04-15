import { Link } from "react-router";
import type { Article } from "../../types/article.type";

export default function FiguresCard({
  figure,
  forHome = false,
}: {
  figure: Article;
  forHome?: boolean;
}) {
  return (
    <Link
      key={figure.id}
      to={`/bai-viet/${figure.slug}`}
      className="bg-white border border-[#e0dbd0] cursor-pointer group hover:border-[#B8860B] hover:shadow-lg transition-all duration-300 block"
    >
      <div
        className={`relative overflow-hidden ${forHome ? "aspect-[3/2]" : "aspect-[3/4]"}`}
      >
        {/* lazy loading here */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-b from-[#2D1F0A] to-[#1A1208]">
          <div className="w-16 h-16 rounded-full border-2 border-[#C8941A]/30 flex items-center justify-center text-3xl bg-[#C8941A]/10 group-hover:scale-105 transition-transform duration-500">
            image here
          </div>
          <div className="text-[9px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
            {figure.year_display}
          </div>
        </div>
        <div className="absolute top-2.5 left-2.5 bg-[#8B1A1A] text-white text-[8.5px] font-bold tracking-[1.5px] uppercase px-2 py-0.5">
          {figure.dynasty_id}
        </div>
      </div>

      <div className="p-4 lg:p-5">
        <h3 className="font-['Playfair_Display',serif] text-[15px] font-bold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-0.5">
          {figure.title}
        </h3>
        <div className="text-[11px] text-[#B8860B] font-medium uppercase tracking-[1px] mb-1.5">
          {figure.subtitle}
        </div>
        <div className="text-[11px] text-[#6b6b6b] mb-2">
          {figure.year_display}
        </div>
        <p className="font-['Source_Serif_4',serif] text-[12px] text-[#6b6b6b] leading-relaxed font-light line-clamp-3">
          {figure.summary}
        </p>
      </div>
    </Link>
  );
}
