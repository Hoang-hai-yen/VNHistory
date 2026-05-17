import { Link } from "react-router";
import articlePlaceholder from "../../assets/Image/BG.png";
import type { NormalizedArticleSummary } from "../../types";

export default function FiguresCard({
  figure,
  forHome = false,
}: {
  figure: NormalizedArticleSummary<"person">;
  forHome?: boolean;
}) {
  const imageSrc = figure.cover_image_url || articlePlaceholder;

  return (
    <Link
      key={figure.id}
      to={`/bai-viet/${figure.slug}`}
      className="bg-white border border-[#e0dbd0] cursor-pointer group hover:border-[#B8860B] hover:shadow-lg transition-all duration-300 block"
    >
      <div
        className={`relative overflow-hidden ${forHome ? "aspect-[3/2]" : "aspect-[3/4]"}`}
      >
        <img
          src={imageSrc}
          alt={figure.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/90 via-[#1A1208]/20 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-[#1A1208]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#f0cf80] backdrop-blur-sm">
          {figure.year_display}
        </div>
        <div className="absolute top-2.5 left-2.5 bg-[#8B1A1A] text-white text-[8.5px] font-bold tracking-[1.5px] uppercase px-2 py-0.5">
          {figure.display.type_label}
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
