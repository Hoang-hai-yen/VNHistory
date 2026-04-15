import { Link } from "react-router";
import { useDynasties } from "../hooks/api/useDynasties";
import PageSectionHeader from "../components/common/PageSectionHeader";
import DynastyCard from "../components/Dynasty/DynastyCard";

export default function DynastiesPage() {
  const { data, isPending, error } = useDynasties();

  const DYNASTIES = data?.data || [];

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500">Lỗi tải dữ liệu: {error.message}</p>
      </div>
    );
  }
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
      <div className="flex flex-col border-t border-[#e0dbd0]">
        {DYNASTIES.map((dyn) => (
          <DynastyCard key={dyn.id} dyn={dyn} />
        ))}
      </div>
    </div>
  );
}
