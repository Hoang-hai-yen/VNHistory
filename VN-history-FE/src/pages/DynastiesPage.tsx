import { Link } from "react-router";
import { useDynasties } from "../hooks/api/useDynasties";
import PageSectionHeader from "../components/common/PageSectionHeader";
import DynastyCard from "../components/Dynasty/DynastyCard";
import QueryStateWrapper from "../components/States/QueryStateWrapper";

export default function DynastiesPage() {
  const { data, isPending: isLoading, error, refetch } = useDynasties();

  const DYNASTIES = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Triều Đại</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="Lịch Sử" title="Các Triều Đại Việt Nam" />

      {/* Dynasty List */}
      <QueryStateWrapper
        isLoading={isLoading}
        error={error}
        data={DYNASTIES}
        emptyMessage="Không có triều đại nào"
        loadingMessage="Đang tải dữ liệu triều đại..."
        onRetry={refetch}
      >
        <div className="flex flex-col border-t border-[#e0dbd0]">
          {DYNASTIES.map((dyn) => (
            <DynastyCard key={dyn.id} dyn={dyn} />
          ))}
        </div>
      </QueryStateWrapper>
    </div>
  );
}
