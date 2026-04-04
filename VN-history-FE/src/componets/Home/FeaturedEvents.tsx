import { ArticleCard } from "../article/ArticleCard";
import PageSectionHeader from "../common/PageSectionHeader";
import VideoCard from "../Video/VideoCard";

// Mock data for featured events
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

export default function FeaturedEvents() {
  return (
    <div>
      <PageSectionHeader
        subtitle="Nổi Bật"
        title="Sự kiện lịch sử"
        moreLink="/dong-thoi-gian"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 mb-10">
        <ArticleCard
          lg
          item={{
            id: "ba-lan-dai-pha-mong-co",
            year: "1258 – 1288",
            era: "Nhà Trần",
            title: "Ba Lần Đại Phá Đế Quốc Mông Cổ",
            category: "Kháng Chiến",
            period: "1258 – 1288",
            description:
              "Nhà Trần ba lần đánh bại đế quốc Mông Cổ hùng mạnh nhất thế giới. Hịch tướng sĩ, Hội nghị Diên Hồng, và chiến thắng Bạch Đằng 1288 làm rạng danh non sông.",
            icon: "⚔",
          }}
        />
        <div className="flex flex-col">
          {EVENTS.slice(0, 4).map((event) => (
            <ArticleCard key={event.id} horizontal item={event} />
          ))}
        </div>
      </div>

      {/* video */}
      <div className="my-8 p-6 bg-white border border-[#e0dbd0] border-l-3 border-[#8B1A1A]">
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#8B1A1A] mb-3.5">
          ▶ Video Liên Quan
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
