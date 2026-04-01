import { Link } from "react-router";
import PageSectionHeader from "../componets/common/PageSectionHeader";
import FiguresCard from "../componets/Figures/FiguresCard";

// --------------mock data------------------
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

export default function FiguresPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Nhân Vật</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="Tiểu sử" title="Nhân vật lịch sử" />

      <p className=" text-[13.5px] text-[#6b6b6b] mb-8 font-light italic">
        Click vào thẻ nhân vật để đọc tiểu sử chi tiết. Ảnh chân dung sẽ được
        cập nhật khi có tư liệu.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {FIGURES.map((figure) => (
          <FiguresCard key={figure.id} figure={figure} />
        ))}
      </div>
    </div>
  );
}
