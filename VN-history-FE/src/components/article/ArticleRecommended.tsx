import { Link } from "react-router";
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

export default function ArticleRecommended() {
  return (
    <div>
      <h4 className="text-[13px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-6 border-b border-[#E8D9B0] pb-2">
        Bài viết gợi ý
      </h4>
      <div className="space-y-6">
        {EVENTS.slice(0, 3).map((ev) => (
          <Link key={ev.id} to={`/bai-viet/${ev.id}`} className="group block">
            <div className="text-[10px] text-[#C5A028] font-bold mb-1">
              {ev.year} — {ev.category}
            </div>
            <h5 className="text-[15px] font-['Playfair_Display',serif] font-bold leading-tight group-hover:text-[#8B1A1A] transition-colors">
              {ev.title}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
