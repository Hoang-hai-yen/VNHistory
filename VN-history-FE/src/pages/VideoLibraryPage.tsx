import { Link } from "react-router";
import PageSectionHeader from "../componets/common/PageSectionHeader";
import { Filter } from "lucide-react";
import VideoCard from "../componets/Video/VideoCard";

const VIDEOS = [
  {
    id: "v1",
    title: "Trận Bạch Đằng 938 — Bí Mật Cọc Nhọn",
    desc: "Ngô Quyền cùng quân sĩ dùng cọc nhọn tiêu diệt toàn bộ thủy quân Nam Hán.",
    duration: "12:34",
    category: "Trận Đánh",
    icon: "🌊",
  },
  {
    id: "v2",
    title: "Hịch Tướng Sĩ — Lời Hiệu Triệu Lịch Sử",
    desc: "Trần Quốc Tuấn khơi dậy tinh thần chiến đấu toàn quân chống Mông Nguyên.",
    duration: "18:20",
    category: "Văn Hóa",
    icon: "⚔",
  },
  {
    id: "v3",
    title: "Quang Trung — 5 Ngày Thần Tốc Kỳ Diệu",
    desc: "Hành quân từ Phú Xuân ra Thăng Long đại phá 29 vạn quân Thanh.",
    duration: "22:15",
    category: "Thiên Tài Quân Sự",
    icon: "🌟",
  },
];

export default function VideoLibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Thư Viện Video</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="Màn Ảnh" title="Video Tư Liệu Lịch Sử" />

      {/* Filters Simulation */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {["Tất cả", "Triều đại", "Kháng chiến", "Văn hóa", "Danh nhân"].map(
          (filter, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${i === 0 ? "bg-[#8B1A1A] text-white shadow-md" : "bg-white border border-[#e0dbd0] text-[#6b6b6b] hover:border-[#8B1A1A] hover:text-[#8B1A1A]"}`}
            >
              {filter}
            </button>
          ),
        )}
        <div className="ml-auto flex items-center gap-2 text-[12px] text-[#6b6b6b] cursor-pointer hover:text-[#8B1A1A]">
          <Filter size={14} />
          Lọc theo thời đại
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {VIDEOS.concat(VIDEOS).map((video, i) => (
          <VideoCard key={i} video={video} />
        ))}
      </div>
    </div>
  );
}
