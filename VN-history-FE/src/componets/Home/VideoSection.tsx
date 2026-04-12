import type { Video } from "../../types/video.type";
import PageSectionHeader from "../common/PageSectionHeader";
import VideoCard from "../Video/VideoCard";

export default function VideoSection({ VIDEOS }: { VIDEOS: Video[] }) {
  return (
    <section className="bg-[#1A1208] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <PageSectionHeader
          subtitle="Lịch Sử Qua Màn Ảnh"
          title="Video Tư Liệu Lịch Sử"
          moreLink="/video"
          dark={true}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
