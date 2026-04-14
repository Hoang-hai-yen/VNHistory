import { Play } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function Banner() {
  return (
    <section className="bg-[#1A1208] relative overflow-hidden border-b-2 border-[#B8860B]">
      {/* Pattern Background Simulation */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8941A' %3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="bg-[#8B1A1A] text-white text-[9px] font-bold tracking-[2.5px] uppercase px-2.5 py-1">
              Khám Phá
            </span>
            <div className="h-px w-10 bg-[#D4A017]" />
          </div>

          <h1 className="font-['Playfair_Display',serif] text-[48px] lg:text-[52px] text-white leading-[1.1] font-bold mb-4.5">
            4.000 Năm
            <br />
            <em className="text-[#D4A017] not-italic italic">Dựng Nước</em>
            <br />& Giữ Nước
          </h1>

          <p className="font-['Source_Serif_4',serif] text-base text-white/60 leading-relaxed font-light max-w-[560px] mb-7">
            Hành trình lịch sử Việt Nam từ thời Hùng Vương đến hiện đại. Tra cứu
            triều đại, nhân vật, sự kiện với kho tư liệu phong phú.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/dong-thoi-gian"
              className="bg-[#8B1A1A] text-white px-6.5 py-3 text-[13px] font-medium tracking-wide hover:bg-[#A01C1C] hover:-translate-y-px transition-all duration-200"
            >
              Dòng Thời Gian
            </Link>
            <button className="bg-transparent text-white/70 border border-white/25 px-6.5 py-3 text-[13px] hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-200">
              Khám Phá Ngay
            </button>
            <Link
              to="/video"
              className="bg-transparent text-white/70 border border-white/25 px-6.5 py-3 text-[13px] hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-200 flex items-center gap-2"
            >
              <Play size={14} className="fill-[#D4A017] text-[#D4A017]" /> Xem
              Video
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-px bg-white/10 border border-white/10"
        >
          <div className="bg-white/4 p-5.5 text-center">
            <div className="font-['Playfair_Display',serif] text-4xl text-[#D4A017] font-bold leading-none mb-1">
              4000+
            </div>
            <div className="text-[11px] text-white/45 uppercase tracking-[1.5px] font-light">
              Năm lịch sử
            </div>
          </div>
          <div className="bg-white/4 p-5.5 text-center">
            <div className="font-['Playfair_Display',serif] text-4xl text-[#D4A017] font-bold leading-none mb-1">
              18
            </div>
            <div className="text-[11px] text-white/45 uppercase tracking-[1.5px] font-light">
              Triều đại lớn
            </div>
          </div>
          <div className="bg-white/4 p-5.5 text-center">
            <div className="font-['Playfair_Display',serif] text-4xl text-[#D4A017] font-bold leading-none mb-1">
              200+
            </div>
            <div className="text-[11px] text-white/45 uppercase tracking-[1.5px] font-light">
              Nhân vật
            </div>
          </div>
          <div className="bg-white/4 p-5.5 text-center">
            <div className="font-['Playfair_Display',serif] text-4xl text-[#D4A017] font-bold leading-none mb-1">
              500+
            </div>
            <div className="text-[11px] text-white/45 uppercase tracking-[1.5px] font-light">
              Sự kiện
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
