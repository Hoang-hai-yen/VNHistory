import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import GeographyCard from "../components/Geography/GeographyCard";

// -------------------mock data------------------
const GEOGRAPHY = [
  {
    id: "co-do-hue",
    name: "Cố Đô Huế",
    location: "Thừa Thiên Huế",
    description:
      "Kinh đô cuối cùng của Việt Nam, quần thể kiến trúc cung đình độc đáo.",
    category: "Di Sản Văn Hóa",
    icon: "🏯",
  },
  {
    id: "vinh-ha-long",
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    description:
      "Kỳ quan thiên nhiên thế giới, gắn liền với truyền thuyết rồng đáp xuống.",
    category: "Di Sản Thiên Nhiên",
    icon: "🌊",
  },
  {
    id: "thanh-nha-ho",
    name: "Thành Nhà Hồ",
    location: "Thanh Hóa",
    description:
      "Tòa thành bằng đá độc nhất vô nhị tại Đông Nam Á, xây dựng từ thế kỷ 14.",
    category: "Di Tích Lịch Sử",
    icon: "🧱",
  },
];

export default function GeographyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Địa Lý & Di Tích</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader
        subtitle="khám phá"
        title="Địa lí và di tích lịch sử"
      />

      {/* card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {GEOGRAPHY.map((geo) => (
          <GeographyCard key={geo.id} geo={geo} />
        ))}
      </div>
    </div>
  );
}
