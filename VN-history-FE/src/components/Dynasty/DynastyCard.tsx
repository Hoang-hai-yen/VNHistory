import { Link } from "react-router";
import type { Dynasty } from "../../types/dynasty.type";

export default function DynastyCard({
  dyn,
  forHome = false,
}: {
  dyn: Dynasty;
  forHome?: boolean;
}) {
  if (forHome) {
    return (
      <Link to={`/bai-viet/${dyn.id}`} className="cursor-pointer group block">
        <div
          className={`overflow-hidden bg-[#1A1208] relative mb-3 aspect-[16/10] `}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1A1208] via-[#2D1F0A] to-[#1A1208]">
            <span className="text-3xl opacity-40 group-hover:scale-110 transition-transform duration-500">
              {"⚔"}
            </span>
            <span className="text-[9px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
              {dyn.period}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#8B1A1A]/0 group-hover:bg-[#8B1A1A]/10 transition-colors duration-300" />
        </div>

        <div className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#8B1A1A] mb-1.5">
          {dyn.era}
        </div>

        <h3
          className={`font-['Playfair_Display',serif] font-bold text-[#1c1c1c] leading-snug group-hover:text-[#8B1A1A] transition-colors mb-2 text-base`}
        >
          {dyn.title}
        </h3>

        <p className="font-['Source_Serif_4',serif] text-[13px] text-[#6b6b6b] leading-relaxed font-light line-clamp-2">
          {dyn.description}
        </p>
      </Link>
    );
  }
  return (
    <Link
      key={dyn.id}
      to={`/bai-viet/${dyn.id}`}
      className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-[#e0dbd0] group block"
    >
      <div className="bg-[#1A1208] p-6 flex flex-col justify-center cursor-pointer group-hover:bg-[#8B1A1A] transition-colors duration-300">
        <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#D4A017] mb-1 group-hover:text-white transition-colors duration-300">
          {dyn.name}
        </h3>
        <div className="text-[10px] text-white/40 tracking-[1.5px] uppercase group-hover:text-white/70">
          {dyn.period}
        </div>
      </div>

      <div className="p-6 lg:p-7 cursor-pointer group-hover:bg-[#FAFAF7]">
        <h4 className="font-['Playfair_Display',serif] text-base font-semibold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-2">
          {dyn.title}
        </h4>
        <p className="font-['Source_Serif_4',serif] text-[13.5px] text-[#6b6b6b] leading-relaxed font-light mb-4">
          {dyn.description}
        </p>

        {dyn.videos && (
          <div className="mt-4 p-5 bg-white border border-[#e0dbd0] border-l-3 border-[#8B1A1A]">
            <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#8B1A1A] mb-4">
              ▶ Video Liên Quan
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dyn.videos.map((v, i) => (
                <div key={i} className="group/vid">
                  <div className="relative aspect-video bg-[#1A1208] overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 text-2xl group-hover/vid:scale-110 transition-transform">
                      {v.icon}
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity">
                      <div className="w-10 h-10 border-2 border-white/60 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1">
                      {v.duration}
                    </span>
                  </div>
                  <h5 className="font-['Playfair_Display',serif] text-[12px] font-bold group-hover/vid:text-[#8B1A1A] transition-colors line-clamp-1">
                    {v.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
