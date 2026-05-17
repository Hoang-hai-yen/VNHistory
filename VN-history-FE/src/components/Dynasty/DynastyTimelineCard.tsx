import { Landmark } from "lucide-react";
import { Link } from "react-router";
import type { Dynasty } from "../../types/dynasty.type";

interface DynastyTimelineCardProps {
  dynasty: Dynasty;
  position: "top" | "bottom";
}

export default function DynastyTimelineCard({
  dynasty,
  position,
}: DynastyTimelineCardProps) {
  const period =
    dynasty.year_display || `${dynasty.year_start} - ${dynasty.year_end}`;
  const isTop = position === "top";

  return (
    <article
      className={`relative flex min-w-[240px] max-w-[240px] flex-col items-center ${
        isTop ? "justify-end pb-10 pt-2" : "justify-start pb-2 pt-10"
      } lg:min-w-[320px] lg:max-w-[320px]`}
    >
      <Link
        to={`/dong-thoi-gian?dynasty=${dynasty.slug}`}
        className="group block w-full"
      >
        <div className="overflow-hidden rounded-[3px] border border-[#d8ccb7] bg-white shadow-[0_10px_26px_rgba(63,39,11,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#b8860b] group-hover:shadow-[0_18px_40px_rgba(63,39,11,0.15)]">
          <div className="flex h-[54px] items-center justify-center border-b border-[#3c2a14] bg-[#1a1208]">
            <Landmark className="h-4 w-4 text-[#d7d0c3]" strokeWidth={1.6} />
          </div>

          <div className="px-5 py-4 text-center">
            <div className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c28a2a]">
              {period}
            </div>
            <h3 className="mt-2 font-['Playfair_Display',serif] text-[25px] font-bold leading-none text-[#2f2418]">
              {dynasty.name}
            </h3>
            <p className="mt-3 line-clamp-3 min-h-[58px] text-[12px] leading-relaxed text-[#62584d]">
              {dynasty.description ||
                "Khám phá các sự kiện tiêu biểu của giai đoạn này trên dòng thời gian lịch sử."}
            </p>
          </div>
        </div>
      </Link>

      <div
        aria-hidden
        className={`absolute left-1/2 -translate-x-1/2 ${
          isTop ? "bottom-0" : "top-0"
        }`}
      >
        <div className="flex flex-col items-center">
          {isTop ? (
            <>
              <div className="h-6 w-px bg-[#d7cfc2]" />
              <div className="h-3 w-3 rotate-45 border-b border-r border-[#d7cfc2] bg-[#f7f2e8]" />
              <div className="mt-4 h-4 w-px bg-[#d7cfc2]" />
              <div className="h-3 w-3 rounded-full border-2 border-[#f7f2e8] bg-[#9f2020]" />
            </>
          ) : (
            <>
              <div className="h-3 w-3 rounded-full border-2 border-[#f7f2e8] bg-[#9f2020]" />
              <div className="mt-4 h-4 w-px bg-[#d7cfc2]" />
              <div className="h-3 w-3 rotate-45 border-b border-r border-[#d7cfc2] bg-[#f7f2e8]" />
              <div className="h-6 w-px bg-[#d7cfc2]" />
            </>
          )}
        </div>
      </div>
    </article>
  );
}
