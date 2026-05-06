import Banner from "../components/Home/Banner";
import FeaturedEvents from "../components/Home/FeaturedEvents";
import HeroFigures from "../components/Home/HeroFigures";
import MoreDynasties from "../components/Home/MoreDynasties";
import VideoSection from "../components/Home/VideoSection";
import { useDynasties } from "../hooks/api/useDynasties";

const FIGURES = [
  {
    id: "hai-ba-trung",
    name: "Hai Bà Trưng",
    role: "Anh Hùng Dân Tộc",
    years: "14 TCN – 43 SCN",
    era: "Bắc Thuộc",
    short:
      "Nữ anh hùng đầu tiên, lãnh đạo cuộc khởi nghĩa lớn nhất chống lại ách đô hộ của nhà Hán.",
    icon: "🌺",
  },
  {
    id: "ba-trieu",
    name: "Bà Triệu",
    role: "Nữ Tướng",
    years: "226 – 248",
    era: "Bắc Thuộc",
    short:
      "Biểu tượng bất khuất: 'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ...'",
    icon: "⚔",
  },
  {
    id: "ngo-quyen",
    name: "Ngô Quyền",
    role: "Vua Ngô",
    years: "898 – 944",
    era: "Ngô",
    short:
      "Người chấm dứt 1.000 năm Bắc thuộc bằng chiến thắng Bạch Đằng lừng lẫy năm 938.",
    icon: "⚔",
  },
  {
    id: "tran-hung-dao",
    name: "Trần Hưng Đạo",
    role: "Tướng Lĩnh",
    years: "1228 – 1300",
    era: "Nhà Trần",
    short:
      "Hưng Đạo Đại Vương — vị thánh quân sự của dân tộc, ba lần đánh bại Mông Nguyên.",
    icon: "⚔",
  },
  {
    id: "nguyen-trai",
    name: "Nguyễn Trãi",
    role: "Nhà Tư Tưởng",
    years: "1380 – 1442",
    era: "Nhà Lê",
    short:
      "Đại thi hào, nhà tư tưởng lớn nhất của Việt Nam trung đại. Tác giả Bình Ngô Đại Cáo.",
    icon: "📜",
  },
  {
    id: "vo-nguyen-giap",
    name: "Võ Nguyên Giáp",
    role: "Đại Tướng",
    years: "1911 – 2013",
    era: "Hiện Đại",
    short:
      "Đại tướng huyền thoại, thiên tài quân sự của thế kỷ XX, người anh hùng Điện Biên Phủ.",
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

export default function HomePage() {
  const { data } = useDynasties();
  const dynasties = data?.data || [];
  return (
    <div>
      <Banner />
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-10">
        {/* Featured Events */}
        <FeaturedEvents />
        {/* Hero Figures */}
        <HeroFigures FIGURES={FIGURES} />
      </div>
      {/* Video Section */}
      <VideoSection VIDEOS={VIDEOS} />
      {/* Explore More Dynasties */}
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-10">
        <MoreDynasties DYNASTIES={dynasties} />
      </div>
    </div>
  );
}
