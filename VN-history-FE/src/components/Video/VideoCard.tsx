import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import videoPlaceholder from "../../assets/Image/BG.png";
import type { VideoArticle } from "../../types";
import { useArticleBySlug } from "../../hooks/api/useArticles";
import { InlineLoader } from "../Loading";

export default function VideoCard({
  video,
  dark = false,
}: {
  video: VideoArticle;
  dark?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const { data: detailData, isLoading } = useArticleBySlug(
    isHovered ? video.slug : ""
  );

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const videoMedia = detailData?.media?.find((m) => m.media_type === "video");
  const videoUrl = videoMedia?.url || "";

  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);
  const imageSrc = video.cover_image_url || videoPlaceholder;

  return (
    <Link to={`/video/${video.slug}`} className="group block text-inherit no-underline">
      <div
        className="relative overflow-hidden aspect-video bg-[#1A1208] mb-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cover Image */}
        <img
          src={imageSrc}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play Icon and Dark Overlay */}
        {!isHovered && (
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-13 h-13 bg-white/15 border-2 border-white/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#8B1A1A] group-hover:border-[#8B1A1A] group-hover:scale-110 transition-all">
              <div className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[16px] border-l-white ml-1" />
            </div>
          </div>
        )}

        {/* Hover Video Preview State */}
        {isHovered && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10 pointer-events-none">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white/80 gap-2 z-20">
                <InlineLoader size="sm" />
                <span className="text-[9px] tracking-wider uppercase font-medium">
                  Đang tải...
                </span>
              </div>
            )}

            {videoUrl ? (
              youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&start=0&end=15&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= 15) {
                      e.currentTarget.currentTime = 0;
                    }
                  }}
                />
              )
            ) : (
              !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white/40 text-[10px]">
                  Không có video xem thử
                </div>
              )
            )}
          </div>
        )}

        <span className="absolute bottom-2 right-2 z-20 bg-black/75 text-white text-[10.5px] px-1.5 py-0.5 font-medium">
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
    </Link>
  );
}
