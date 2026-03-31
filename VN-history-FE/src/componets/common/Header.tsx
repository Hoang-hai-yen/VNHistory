import {
  Calendar,
  History,
  MapPin,
  Menu,
  Play,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const navLinks = [
  { path: "/", label: "Trang Chủ", icon: Star },
  { path: "/trieu-dai", label: "Triều Đại", icon: History },
  { path: "/nhan-vat", label: "Nhân Vật", icon: Users },
  { path: "/dong-thoi-gian", label: "Dòng Thời Gian", icon: Calendar },
  { path: "/dia-ly", label: "Địa Lý & Di Tích", icon: MapPin },
  { path: "/video", label: "Video", icon: Play },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <div>
      <nav className="sticky top-0 z-[200] bg-[#0D0D0D] shadow-sm shadow-[#B8860B] h-14 ">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 mr-8 shrink-0 group"
          >
            <div className="w-8.5 h-8.5 bg-[#8B1A1A] border-1.5 border-[#D4A017] rounded flex items-center justify-center text-sm">
              ⭐
            </div>
            <div>
              <div className="title text-[15px] text-white font-bold tracking-wide group-hover:text-[#D4A017] transition-colors">
                LỊCH SỬ VIỆT NAM
              </div>
              <div className="text-[8.5px] text-white/35 tracking-[3px] uppercase font-light">
                Bách Khoa Toàn Thư
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <div className="relative group " key={link.path}>
                  <Link
                    to={link.path}
                    className={`link px-3.5 h-14 flex items-center text-[11px] font-medium uppercase tracking-wider border-y-2 border-transparent transition-all ${
                      isActive
                        ? "text-[#D4A017]"
                        : "text-white/55 group-hover:text-[#D4A017]"
                    }`}
                  >
                    {link.label}
                  </Link>

                  <span
                    className={`
      absolute bottom-3 left-1/2 -translate-x-1/2 h-[2px] bg-[#B8860B] transition-all duration-400 
      ${isActive ? "w-1/2" : "w-0 group-hover:w-1/2"}
    `}
                  />
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2.5 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm lịch sử..."
                // value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
                // onFocus={() => setIsSearchFocused(true)}
                // ${isSearchFocused ? "w-64 border-[#D4A017] bg-white/12" : "w-48"}
                // onBlur={() => setIsSearchFocused(false)}
                className={`bg-white/8 border border-white/12 rounded-full py-1.5 px-3.5 pr-9 text-white text-[12.5px] outline-none transition-all duration-300 
                   
                  
                `}
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#D4A017] transition-colors">
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {/* <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[150] bg-[#0D0D0D] pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-['Playfair_Display',serif] text-white/80 hover:text-[#D4A017]"
                >
                  <link.icon size={20} className="text-[#B8860B]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
