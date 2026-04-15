import { Link } from "react-router";
import type { Dynasty } from "../../types/dynasty.type";

export default function DynastyCard({
  dyn,
  forHome = false,
}: {
  dyn: Dynasty;
  forHome?: boolean;
}) {
  // Use year_display as the main period text, fall back to year_start-year_end
  const period = dyn.year_display || `${dyn.year_start} - ${dyn.year_end}`;

  if (forHome) {
    return (
      <Link to={`/bai-viet/${dyn.slug}`} className="cursor-pointer group block">
        <div className="overflow-hidden bg-[#1A1208] relative mb-3 aspect-[16/10]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1A1208] via-[#2D1F0A] to-[#1A1208]">
            <span className="text-3xl opacity-40 group-hover:scale-110 transition-transform duration-500">
              {"⚔"}
            </span>
            <span className="text-[9px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
              {period}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#8B1A1A]/0 group-hover:bg-[#8B1A1A]/10 transition-colors duration-300" />
        </div>

        <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1.5">
          {dyn.name}
        </div>

        <h3 className="font-['Playfair_Display',serif] font-bold text-[#1c1c1c] leading-snug group-hover:text-[#8B1A1A] transition-colors mb-2 text-base">
          {dyn.slug}
        </h3>

        <p className="font-['Source_Serif_4',serif] text-[13px] text-[#6b6b6b] leading-relaxed font-light line-clamp-2">
          {/* description is currently null in type; placeholder until API provides it */}
        </p>
      </Link>
    );
  }

  return (
    <Link
      key={dyn.id}
      to={`/bai-viet/${dyn.slug}`}
      className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-[#e0dbd0] group block"
    >
      <div className="bg-[#1A1208] p-6 flex flex-col justify-center cursor-pointer group-hover:bg-[#8B1A1A] transition-colors duration-300">
        <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#D4A017] mb-1 group-hover:text-white transition-colors duration-300">
          {dyn.name}
        </h3>
        <div className="text-[10px] text-white/40 tracking-[1.5px] uppercase group-hover:text-white/70">
          {period}
        </div>
      </div>

      <div className="p-6 lg:p-7 cursor-pointer group-hover:bg-[#FAFAF7]">
        <h4 className="font-['Playfair_Display',serif] text-base font-semibold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-2">
          {dyn.description}
        </h4>
        <p className="font-['Source_Serif_4',serif] text-[13.5px] text-[#6b6b6b] leading-relaxed font-light mb-4">
          {/* description is currently null in type; placeholder until API provides it */}
        </p>

        {/* videos field is not part of Dynasty type anymore; remove related UI */}
      </div>
    </Link>
  );
}
