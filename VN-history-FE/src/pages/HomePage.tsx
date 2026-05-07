import Banner from "../components/Home/Banner";
import FeaturedEvents from "../components/Home/FeaturedEvents";
import HeroFigures from "../components/Home/HeroFigures";
import MoreDynasties from "../components/Home/MoreDynasties";
import VideoSection from "../components/Home/VideoSection";
import { useArticles } from "../hooks/api/useArticles";
import { useDynasties } from "../hooks/api/useDynasties";
import type { Article } from "../types/article.type";

export default function HomePage() {
  const { data } = useDynasties();
  const dynasties = data?.data || [];
  const { data: figuresData } = useArticles({
    type: "person",
    is_featured: true,
  });
  const { data: videosData } = useArticles({
    type: "video",
    is_featured: true,
  });
  return (
    <div>
      <Banner />
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-10">
        {/* Featured Events */}
        <FeaturedEvents />
        {/* Hero Figures */}
        <HeroFigures FIGURES={figuresData?.data || []} />
      </div>
      {/* Video Section */}
      <VideoSection VIDEOS={videosData?.data || []} />
      {/* Explore More Dynasties */}
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-10">
        <MoreDynasties DYNASTIES={dynasties} />
      </div>
    </div>
  );
}
