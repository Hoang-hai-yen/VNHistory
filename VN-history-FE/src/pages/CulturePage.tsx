import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import { useArticles } from "../hooks/api/useArticles";
import { SkeletonLoader } from "../components/Loading";
import CultureCard from "../components/Geography/CultureCard";

// -------------------mock data------------------


export default function GeographyPage() {
  const { data, isPending, error } = useArticles({ type: "culture" });
  const cultures = data?.data || [];
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>văn hóa</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="khám phá" title="Văn hóa Việt" />

      {isPending ? (
        <SkeletonLoader count={6} variant="card" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cultures &&
            cultures.map((geo) => <CultureCard key={geo.id} item={geo} />)}
        </div>
      )}
    </div>
  );
}
