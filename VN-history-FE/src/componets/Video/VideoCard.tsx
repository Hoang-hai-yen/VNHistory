import { Bookmark, Clock, PlayCircle } from "lucide-react";
import type { Video } from "../../types/video.type";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-video bg-[#1A1208] mb-3 group-hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 text-4xl group-hover:scale-110 transition-transform">
          {video.icon}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/20 border-2 border-white/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#8B1A1A] group-hover:border-[#8B1A1A] group-hover:scale-110 transition-all">
            <PlayCircle size={28} className="text-white fill-white/20" />
          </div>
        </div>

        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 font-medium flex items-center gap-1.5">
          <Clock size={10} /> {video.duration}
        </span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="bg-[#8B1A1A] text-white text-[8px] font-bold tracking-[2px] uppercase px-1.5 py-0.5 inline-block mb-1.5">
            {video.category}
          </div>
          <h3 className="font-['Playfair_Display',serif] text-[14px] font-bold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors leading-snug line-clamp-2">
            {video.title}
          </h3>
        </div>
        <button className="text-[#6b6b6b] hover:text-[#8B1A1A] transition-colors">
          <Bookmark size={16} />
        </button>
      </div>

      <p className="font-['Source_Serif_4',serif] text-[11.5px] font-light text-[#6b6b6b] mt-1.5 line-clamp-2 leading-relaxed">
        {video.desc}
      </p>
    </div>
  );
}
