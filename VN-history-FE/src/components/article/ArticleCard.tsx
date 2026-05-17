import { Link } from "react-router";
import articlePlaceholder from "../../assets/Image/BG.png";
import type { NormalizedArticleSummary } from "../../types";

export function ArticleCard({
  item,
  lg = false,
  horizontal = false,
}: {
  item: NormalizedArticleSummary;
  lg?: boolean;
  horizontal?: boolean;
}) {
  const imageSrc = item.cover_image_url || articlePlaceholder;

  if (horizontal) {
    return (
      <Link
        to={`/bai-viet/${item.slug}`}
        className="flex gap-3.5 cursor-pointer group pb-3.5 border-b border-[#e0dbd0] last:border-none"
      >
        <div className="w-32 h-18 shrink-0 overflow-hidden relative">
          <img
            src={imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 text-foreground">
          <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1">
            {item.year_display}
          </div>
          <h4 className="font-['Playfair_Display',serif] text-[13px] text-foreground font-bold leading-tight transition-colors">
            {item.title}
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/bai-viet/${item.slug}`} className="cursor-pointer group block">
      <div
        className={`overflow-hidden bg-[#1A1208] relative mb-3 w-full h-fit aspect-4/3 ${lg ? "aspect-video" : ""}`}
      >
        <img
          src={imageSrc}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/85 via-[#1A1208]/15 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-[#1A1208]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#f0cf80] backdrop-blur-sm">
          {item.year_display}
        </div>
        <div className="absolute inset-0 bg-[#8B1A1A]/0 transition-colors duration-300 group-hover:bg-[#8B1A1A]/10" />
      </div>

      <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1.5">
        {item.display.type_label}
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
