import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";

const EVENTS = [
  {
    id: "bach-dang-938",
    year: "938",
    title: "Chiến Thắng Bạch Đằng",
    era: "Kỷ Nguyên Độc Lập",
    description:
      "Ngô Quyền dùng cọc nhọn tiêu diệt quân Nam Hán, kết thúc nghìn năm Bắc thuộc.",
    category: "Kháng Chiến",
    icon: "🌊",
  },
  {
    id: "doi-do-1010",
    year: "1010",
    title: "Lý Thái Tổ Dời Đô",
    era: "Nhà Lý",
    description:
      "Kinh đô dời từ Hoa Lư về Đại La (Thăng Long), mở ra thời đại hưng thịnh ngàn năm.",
    category: "Chính Trị",
    icon: "🏛",
  },
  {
    id: "binh-ngo-1428",
    year: "1428",
    title: "Bình Ngô Đại Cáo",
    era: "Nhà Lê",
    description:
      "Tuyên ngôn độc lập thứ hai, khẳng định chủ quyền và chính nghĩa của dân tộc Việt.",
    category: "Văn Hóa",
    icon: "📜",
  },
  {
    id: "cach-mang-1945",
    year: "1945",
    title: "Cách Mạng Tháng Tám",
    era: "Hiện Đại",
    description:
      "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình.",
    category: "Khởi Nghĩa",
    icon: "⭐",
  },
  {
    id: "dien-bien-phu",
    year: "1954",
    title: "Chiến Thắng Điện Biên Phủ",
    era: "Hiện Đại",
    description:
      "Đánh bại thực dân Pháp, lừng lẫy năm châu, chấn động địa cầu.",
    category: "Kháng Chiến",
    icon: "🎖",
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Dòng Thời Gian</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="Dữ Liệu" title="Dòng Thời Gian Lịch Sử" />
      {/*  */}
      <div className="relative border-l-2 border-[#e0dbd0] ml-24 pl-8 py-8">
        {EVENTS.map((event) => (
          // tach component cho moi event
          <Link
            key={event.id}
            to={`/bai-viet/${event.id}`}
            className="relative mb-14 last:mb-0 group cursor-pointer block"
          >
            {/* Year Label */}
            <div className="absolute -left-[140px] top-0 w-24 text-right">
              <span className="font-['Playfair_Display',serif] text-[18px] font-bold text-[#B8860B] group-hover:text-[#8B1A1A] transition-colors duration-300">
                {event.year}
              </span>
              <div className="text-[10px] text-[#6b6b6b] uppercase tracking-[1px] mt-0.5">
                {event.category}
              </div>
            </div>

            {/* Dot */}
            <div className="absolute -left-[41px] top-2 w-4 h-4 rounded-full border-2 border-[#FAFAF7] bg-[#B8860B] group-hover:bg-[#8B1A1A] group-hover:scale-125 transition-all duration-300 shadow-sm" />

            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors mb-2 leading-tight">
                {event.title}
              </h3>
              <div className="text-[11px] text-[#B8860B] font-medium uppercase tracking-[1.5px] mb-2">
                {event.era}
              </div>
              <p className="font-['Source_Serif_4',serif] text-[14px] text-[#6b6b6b] leading-relaxed font-light">
                {event.description}
              </p>

              {/* Optional Placeholder for event image */}
              <div className="mt-4 aspect-[16/7] bg-[#1A1208] overflow-hidden group-hover:shadow-md transition-shadow">
                <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#1A1208] via-[#2D1F0A] to-[#1A1208]">
                  <span className="text-3xl opacity-30 group-hover:scale-110 transition-transform">
                    {event.icon}
                  </span>
                  <span className="text-[10px] text-[#C8941A]/40 uppercase tracking-[2px]">
                    Tư Liệu {event.year}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
