import Banner from "../components/Home/Banner";
import FeaturedEvents from "../components/Home/FeaturedEvents";
import HeroFigures from "../components/Home/HeroFigures";
import MoreDynasties from "../components/Home/MoreDynasties";
import VideoSection from "../components/Home/VideoSection";
import { useArticles } from "../hooks/api/useArticles";
import { useDynasties } from "../hooks/api/useDynasties";

export default function HomePage() {
  const { data: dynastiesData } = useDynasties({ limit: 4, page: 1 });
  const { data: eventsData } = useArticles({
    type: "event",
    is_featured: true,
    limit: 4,
    page: 1,
  });
  const { data: figuresData } = useArticles({
    type: "person",
    is_featured: true,
    limit: 4,
    page: 1,
  });
  const { data: videosData } = useArticles({
    type: "video",
    is_featured: true,
    limit: 4,
    page: 1,
  });

  const dynasties = dynastiesData?.data || [];
  const featuredEvents = eventsData?.data || [];
  const featuredFigures = figuresData?.data || [];
  const featuredVideos = videosData?.data || [];

  return (
    <div>
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-8 pb-10">
        <FeaturedEvents events={featuredEvents} videos={featuredVideos.slice(0, 3)} />
        <HeroFigures FIGURES={featuredFigures} />
      </div>
      <VideoSection VIDEOS={featuredVideos} />
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-10">
        <MoreDynasties DYNASTIES={dynasties} />
      </div>
    </div>
  );
}
