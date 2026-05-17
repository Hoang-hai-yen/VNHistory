import { Link } from "react-router";
import type { Dynasty } from "../../types/dynasty.type";

export default function DynastyCard({
  dyn,
  forHome = false,
}: {
  dyn: Dynasty;
  forHome?: boolean;
}) {
  const period = dyn.year_display || `${dyn.year_start} - ${dyn.year_end}`;
  const link = `/dong-thoi-gian?dynasty=${dyn.slug}`;

  if (forHome) {
    return (
      <Link to={link} className="group block">
        <div className="overflow-hidden rounded-sm border border-[#e0dbd0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B8860B] hover:shadow-lg">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1208]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1208] via-[#2D1F0A] to-[#1A1208]" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
              <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#D4A017]">
                Triều đại
              </div>
              <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-white">
                {dyn.name}
              </h3>
              <div className="mt-2 text-[12px] font-medium text-white/70">
                {period}
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="line-clamp-3 min-h-[60px] text-[13px] leading-relaxed text-[#6b6b6b]">
              {dyn.description || "Khám phá các sự kiện trọng yếu trong giai đoạn này trên dòng thời gian lịch sử."}
            </p>
            <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#8B1A1A]">
              Xem trên dòng thời gian →
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      key={dyn.id}
      to={link}
      className="grid grid-cols-1 overflow-hidden rounded-sm border border-[#e0dbd0] bg-white transition-all duration-300 hover:border-[#B8860B] hover:shadow-lg md:grid-cols-[220px_1fr]"
    >
      <div className="flex flex-col justify-center bg-[#1A1208] px-6 py-7">
        <div className="text-[10px] uppercase tracking-[0.24em] text-[#D4A017]">
          Triều đại
        </div>
        <h3 className="mt-2 font-['Playfair_Display',serif] text-2xl font-bold text-white">
          {dyn.name}
        </h3>
        <div className="mt-3 text-[12px] font-medium text-white/65">
          {period}
        </div>
      </div>

      <div className="p-6 lg:p-7">
        <p className="font-['Source_Serif_4',serif] text-[14px] leading-relaxed text-[#4f4f4f]">
          {dyn.description || "Giai đoạn này hiện chưa có mô tả chi tiết, nhưng bạn có thể mở dòng thời gian để xem các mốc lịch sử liên quan."}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8B1A1A]">
          Mở dòng thời gian <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}
