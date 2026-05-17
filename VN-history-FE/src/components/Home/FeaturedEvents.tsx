import type { NormalizedArticleSummary, VideoArticle } from "../../types";
import { ArticleCard } from "../article/ArticleCard";
import PageSectionHeader from "../common/PageSectionHeader";
import VideoCard from "../Video/VideoCard";

export default function FeaturedEvents({
  events,
  videos,
}: {
  events: NormalizedArticleSummary<"event">[];
  videos: VideoArticle[];
}) {
  return (
    <div>
      <PageSectionHeader
        subtitle="Nổi Bật"
        title="Sự kiện lịch sử"
        moreLink="/dong-thoi-gian"
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-5 mb-10">
          <ArticleCard lg item={events[0]} />

          <div className="flex flex-col">
            {events.slice(1, 4).map((event) => (
              <ArticleCard key={event.id} horizontal item={event} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-10 rounded-sm border border-dashed border-[#d9ccb8] bg-[#faf7f0] p-8 text-center text-[14px] text-[#6b6b6b]">
          Chưa có sự kiện nổi bật để hiển thị.
        </div>
      )}

      <div className="my-8 rounded-sm border border-[#e0dbd0] border-l-4 border-l-[#8B1A1A] bg-white p-6">
        <div className="mb-3.5 text-[9px] font-bold uppercase tracking-[3px] text-[#8B1A1A]">
          Video liên quan
        </div>
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm bg-[#faf7f0] px-4 py-6 text-[13px] text-[#6b6b6b]">
            Chưa có video nổi bật trong thời điểm này.
          </div>
        )}
      </div>
    </div>
  );
}
