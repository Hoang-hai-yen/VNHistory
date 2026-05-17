import { Calendar, Clock, MapPin, User } from "lucide-react";
import articlePlaceholder from "../../assets/Image/BG.png";
import type { NormalizedArticleDetail } from "../../types";

export default function ArticleHeaderWithImage({
  article,
}: {
  article: NormalizedArticleDetail;
}) {
  const heroImageUrl =
    article.cover_image_url ||
    article.media.find((media) => media.is_cover === 1)?.url ||
    article.media[0]?.url ||
    articlePlaceholder;

  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-[#1c1c1c]">
      <img
        src={heroImageUrl}
        alt={article.media[0]?.caption || article.title}
        className="w-full h-full object-cover opacity-60 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />

      <div className="absolute bottom-10 left-0 w-full px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[#C5A028] font-bold text-[10px] tracking-[0.2em] uppercase mb-4">
          <span className="w-8 h-[1px] bg-[#C5A028]" />
          {article.display.type_label}
        </div>
        <h1 className="font-['Playfair_Display',serif] text-4xl lg:text-6xl text-white font-black leading-tight max-w-4xl">
          {article.title}
        </h1>
        <p>{article.subtitle}</p>
        <div className="flex flex-wrap items-center gap-6 mt-8 text-[12px] text-[#6b6b6b] font-medium border-t border-[#E8D9B0] pt-6">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#8B1A1A]" />
            <span>
              {article.display.period_label ||
                "Kh\u00f4ng r\u00f5 th\u1eddi gian"}
            </span>
          </div>
          {article.display.dynasty_label && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#8B1A1A]" />
              <span>Thời gian: {article.display.dynasty_label}</span>
            </div>
          )}
          {article.display.location_label && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#8B1A1A]" />
              <span>{article.display.location_label}</span>
            </div>
          )}
          {article.display.category_label && (
            <div className="flex items-center gap-2">
              <User size={14} className="text-[#8B1A1A]" />
              <span>{article.display.category_label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
