import type { VideoArticle } from "../../types";
import PageSectionHeader from "../common/PageSectionHeader";
import VideoCard from "../Video/VideoCard";

export default function VideoSection({ VIDEOS }: { VIDEOS: VideoArticle[] }) {
  return (
    <section className="bg-[#1A1208] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <PageSectionHeader
          subtitle="L\u1ecbch S\u1eed Qua M\u00e0n \u1ea2nh"
          title="Video T\u01b0 Li\u1ec7u L\u1ecbch S\u1eed"
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
