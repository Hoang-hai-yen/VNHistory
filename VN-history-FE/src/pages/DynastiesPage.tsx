import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import DynastyCard from "../components/Dynasty/DynastyCard";

const DYNASTIES = [
  {
    id: "van-lang",
    name: "Văn Lang – Âu Lạc",
    period: "2879 TCN – 207 TCN",
    title: "Nhà nước đầu tiên của người Việt",
    description:
      "18 đời Vua Hùng dựng nên nước Văn Lang tại vùng đồng bằng sông Hồng. An Dương Vương xây thành Cổ Loa hình xoắn ốc kỳ bí. Truyền thuyết Lạc Long Quân và Âu Cơ là nền tảng văn hóa dân tộc Việt.",
    era: "Hồng Bàng",
    videos: [
      {
        title: "Văn Lang — Nhà Nước Đầu Tiên",
        desc: "Nguồn gốc nhà nước Văn Lang và 18 đời Vua Hùng.",
        duration: "15:00",
        icon: "🏛",
      },
    ],
  },
  {
    id: "nha-dinh",
    name: "Nhà Đinh",
    period: "968 – 980",
    title: "Đinh Tiên Hoàng dẹp loạn 12 sứ quân",
    description:
      "Từ Đinh Bộ Lĩnh đến Đinh Tiên Hoàng — từ cậu bé chơi trận giả đến hoàng đế thống nhất giang sơn. Đại Cồ Việt là nhà nước độc lập thực sự đầu tiên sau Ngô.",
    era: "Độc Lập Tự Chủ",
  },
  {
    id: "nha-ly",
    name: "Nhà Lý",
    period: "1009 – 1225",
    title: "Thăng Long — Kinh Đô Ngàn Năm",
    description:
      "Lý Công Uẩn ban Chiếu dời đô về vùng đất rồng bay lên. 216 năm phát triển Phật giáo, xây dựng Văn Miếu, Quốc Tử Giám. Lý Thường Kiệt đánh tan quân Tống với bài thơ 'Nam quốc sơn hà'.",
    era: "Đại Việt",
    videos: [
      {
        title: "Lý Thái Tổ & Chiếu Dời Đô",
        desc: "Tầm nhìn chiến lược dời đô từ Hoa Lư về Thăng Long.",
        duration: "16:10",
        icon: "🏛",
      },
      {
        title: "Nam Quốc Sơn Hà — Tuyên Ngôn Độc Lập",
        desc: "Bài thơ thần trên sông Như Nguyệt năm 1077.",
        duration: "14:22",
        icon: "📜",
      },
    ],
  },
  {
    id: "nha-tran",
    name: "Nhà Trần",
    period: "1225 – 1400",
    title: "Đỉnh Cao Võ Công — Ba Lần Phá Mông Nguyên",
    description:
      "Hội nghị Diên Hồng — tất cả đồng thanh 'Đánh!'. Hịch tướng sĩ của Trần Hưng Đạo rung chuyển lòng người. Ba lần đại thắng 1258, 1285, 1288 ghi danh sử sách.",
    era: "Đại Việt",
    videos: [
      {
        title: "Hội Nghị Diên Hồng — Hòa Hay Chiến?",
        desc: "Khi quân Mông Cổ lần thứ hai tràn xuống.",
        duration: "19:30",
        icon: "👑",
      },
      {
        title: "Bạch Đằng 1288 — Thủy Chiến Vĩ Đại",
        desc: "Trần Hưng Đạo tiêu diệt đoàn thuyền Ô Mã Nhi.",
        duration: "24:00",
        icon: "⚔",
      },
    ],
  },
  {
    id: "nha-le-so",
    name: "Nhà Lê Sơ",
    period: "1428 – 1527",
    title: "Thời Hoàng Kim — Bộ Luật Hồng Đức",
    description:
      "Lê Thánh Tông — vị vua anh minh nhất lịch sử phong kiến Việt Nam. Bộ luật Hồng Đức bảo vệ quyền phụ nữ, nông dân và các tầng lớp xã hội.",
    era: "Đại Việt",
  },
  {
    id: "tay-son",
    name: "Tây Sơn",
    period: "1778 – 1802",
    title: "Quang Trung — Hoàng Đế Huyền Thoại",
    description:
      "Ba anh em Tây Sơn lật đổ cả hai chúa Nguyễn – Trịnh. Nguyễn Huệ lên ngôi Quang Trung, thần tốc hành quân đại phá 29 vạn quân Thanh chỉ trong 5 ngày.",
    era: "Đại Việt",
    videos: [
      {
        title: "Quang Trung — Mùa Xuân Kỷ Dậu 1789",
        desc: "Thiên tài quân sự Nguyễn Huệ đánh bại 29 vạn quân Thanh.",
        duration: "25:00",
        icon: "🌟",
      },
    ],
  },
  {
    id: "nha-nguyen",
    name: "Nhà Nguyễn",
    period: "1802 – 1945",
    title: "Triều Đại Phong Kiến Cuối Cùng",
    description:
      "Gia Long thống nhất đất nước từ Ải Nam Quan đến Mũi Cà Mau. Kinh đô Huế tráng lệ — Di sản thế giới. Minh Mạng, Tự Đức và cuộc đối đầu thực dân Pháp.",
    era: "Đại Nam",
  },
];

export default function DynastiesPage() {
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
