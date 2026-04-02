import { Info, MapPin } from "lucide-react";
import type { Geography } from "../../types/geography.type";

export default function GeographyCard({ geo }: { geo: Geography }) {
  return (
    <div
      key={geo.id}
      className="bg-white border border-[#e0dbd0] overflow-hidden group hover:border-[#B8860B] hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-video bg-[#1A1208] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0D1A08] via-[#1A2D0A] to-[#0D1A0A]">
          <span className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            {geo.icon}
          </span>
          <span className="text-[10px] tracking-[2px] text-[#C8941A]/50 uppercase font-medium">
            Di Tích Quốc Gia
          </span>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 text-white/90 text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
          <MapPin size={10} className="text-[#D4A017]" />
          {geo.location}
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <h3 className="font-['Playfair_Display',serif] text-[17px] font-bold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-1">
          {geo.name}
        </h3>
        <div className="text-[11px] text-[#B8860B] font-medium uppercase tracking-[1.5px] mb-3">
          {geo.category}
        </div>
        <p className="font-['Source_Serif_4',serif] text-[13.5px] text-[#6b6b6b] leading-relaxed font-light mb-4">
          {geo.description}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-[#8B1A1A] font-medium uppercase tracking-wider group-hover:opacity-70 transition-opacity">
          <Info size={12} />
          Chi tiết di tích
        </div>
      </div>
    </div>
  );
}
