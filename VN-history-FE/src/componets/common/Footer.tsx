import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#1A1208]  py-16 text-white/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8.5 h-8.5 bg-[#8B1A1A] border-1.5 border-[#D4A017] rounded flex items-center justify-center text-sm">
                ⭐
              </div>
              <div>
                <div className="title text-lg text-white font-bold tracking-wide">
                  LỊCH SỬ VIỆT NAM
                </div>
                <div className="text-[10px] text-white/35 tracking-[3px] uppercase font-light">
                  Bách Khoa Toàn Thư
                </div>
              </div>
            </div>
            <p className="font-['Source_Serif_4',serif] text-sm leading-relaxed mb-8 max-w-md">
              Sứ mệnh của chúng tôi là gìn giữ và truyền tải những giá trị lịch
              sử cao quý của dân tộc Việt Nam đến mọi thế hệ qua nền tảng số
              hiện đại.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#D4A017] hover:text-[#D4A017] transition-all cursor-pointer"
                >
                  {i === 1 ? "f" : i === 2 ? "t" : i === 3 ? "i" : "y"}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-['Playfair_Display',serif] font-bold text-sm uppercase tracking-widest mb-6">
              Liên Kết
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/trieu-dai"
                  className="hover:text-white transition-colors"
                >
                  Triều Đại
                </Link>
              </li>
              <li>
                <Link
                  to="/nhan-vat"
                  className="hover:text-white transition-colors"
                >
                  Nhân Vật
                </Link>
              </li>
              <li>
                <Link
                  to="/dong-thoi-gian"
                  className="hover:text-white transition-colors"
                >
                  Dòng Thời Gian
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4A017] font-['Playfair_Display',serif] font-bold text-sm uppercase tracking-widest mb-6">
              Hỗ Trợ
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  to="/ve-chung-toi"
                  className="hover:text-white transition-colors"
                >
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/bao-cao-loi"
                  className="  hover:text-white transition-colors"
                >
                  Góp Ý Tư Liệu
                </Link>
              </li>
              <li>
                <Link
                  to="/ban-quyen"
                  className="hover:text-white transition-colors"
                >
                  Bản Quyền
                </Link>
              </li>
              <li>
                <Link
                  to="/lien-he"
                  className="hover:text-white transition-colors"
                >
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest">
          <p>© 2026 LỊCH SỬ VIỆT NAM — DỰ ÁN CỘNG ĐỒNG</p>
          <div className="flex gap-6">
            <span>Hà Nội</span>
            <span>Huế</span>
            <span>Sài Gòn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
