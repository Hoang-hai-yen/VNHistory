import { Link } from "react-router";
import type { Article, Related } from "../../types/article.type";

export default function ArticleRecommended({ article }: { article: Article }) {
  const articleRelated: Related[] = article.related || [];
  return (
    <div>
      <h4 className="text-[13px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-6 border-b border-[#E8D9B0] pb-2">
        Bài viết gợi ý
      </h4>
      <div className="space-y-6">
        {articleRelated.slice(0, 3).map((ev) => (
          <Link key={ev.id} to={`/bai-viet/${ev.id}`} className="group block">
            <div className="text-[10px] text-[#C5A028] font-bold mb-1">
              {ev.year_display} — {ev.type}
            </div>
            <h5 className="text-[15px] font-['Playfair_Display',serif] font-bold leading-tight group-hover:text-[#8B1A1A] transition-colors">
              {ev.title}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
