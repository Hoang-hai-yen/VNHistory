import videoPlaceholder from "../../assets/Image/BG.png";
import type { VideoArticle } from "../../types";

export default function VideoCard({
  video,
  dark = false,
}: {
  video: VideoArticle;
  dark?: boolean;
}) {
  const imageSrc = video.cover_image_url || videoPlaceholder;

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-video bg-[#1A1208] mb-3">
        <img
          src={imageSrc}
          alt={video.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-13 h-13 bg-white/15 border-2 border-white/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#8B1A1A] group-hover:border-[#8B1A1A] group-hover:scale-110 transition-all">
            <div className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[16px] border-l-white ml-1" />
          </div>
        </div>

        <span className="absolute bottom-2 right-2 z-10 bg-black/75 text-white text-[10.5px] px-1.5 py-0.5 font-medium">
          {video.display.status_label}
        </span>
      </div>

      <div className="bg-[#8B1A1A] text-white text-[8.5px] font-bold tracking-[2px] uppercase px-1.5 py-0.5 inline-block mb-1.5">
        Video
      </div>

      <h4
        className={`font-['Playfair_Display',serif] text-[13px] font-bold group-hover:text-[#8B1A1A] transition-colors ${dark ? "text-white/90" : "text-[#1c1c1c]"}`}
      >
        {video.title}
      </h4>

      <p
        className={`font-['Source_Serif_4',serif] text-[11.5px] font-light mt-1 line-clamp-1 ${dark ? "text-white/45" : "text-[#6b6b6b]"}`}
      >
        {video.subtitle}
      </p>
    </div>
  );
}
