import { useArticles } from "../../hooks/api/useArticles";
import { ArticleCard } from "../article/ArticleCard";
import PageSectionHeader from "../common/PageSectionHeader";
import VideoCard from "../Video/VideoCard";

export default function FeaturedEvents() {
  const { data: eventsData } = useArticles({
    type: "event",
    is_featured: true,
  });
  const { data: videosData } = useArticles({
    type: "video",
    is_featured: true,
  });
  return (
    <div>
      <PageSectionHeader
        subtitle="Nổi Bật"
        title="Sự kiện lịch sử"
        moreLink="/dong-thoi-gian"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-10">
        {eventsData?.data[0] && <ArticleCard lg item={eventsData?.data[0]} />}

        <div className="flex flex-col">
          {eventsData?.data.slice(1, 4).map((event) => (
            <ArticleCard key={event.id} horizontal item={event} />
          ))}
        </div>
      </div>

      {/* video */}
      <div className="my-8 p-6 bg-white border border-[#e0dbd0] border-l-3 border-[#8B1A1A]">
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#8B1A1A] mb-3.5">
          ▶ Video Liên Quan
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {videosData?.data.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
