import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import { useTimeline } from "../hooks/api/useTimeline";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronRight,
  History,
  MapPin,
  Play,
  ShieldAlert,
  Users,
} from "lucide-react";

export default function TimelinePage() {
  const { data, error, isLoading } = useTimeline();
  console.log("Timeline data:", data, "Error:", error, "Loading:", isLoading);

  const [activeDynasty, setActiveDynasty] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!data && isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {" "}
        Loading...{" "}
      </div>
    );
  }

  const timelineData = data?.data || [];
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

      <motion.div
        className="fixed top-14 left-0 right-0 h-1 bg-[#B8860B] z-[210] origin-left"
        style={{ scaleX }}
      />

      <div
        className="bg-[#F4F1EA] min-h-screen font-['Source_Serif_4',serif]"
        ref={containerRef}
      >
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-[40vh] overflow-hidden bg-[#1A1208] flex items-center justify-center border-b-4 border-[#B8860B]">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2 }}
              className="w-full h-full bg-[url('https://images.unsplash.com/photo-1599708153386-62cd3f0216fc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
            />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-[#B8860B] text-[10px] font-bold tracking-[6px] uppercase mb-4">
                Chronicle of Civilizations
              </div>
              <h1 className="font-['Playfair_Display',serif] text-4xl md:text-6xl text-[#FAFAF7] font-bold mb-4 drop-shadow-lg">
                Dòng Thời Gian Lịch Sử
              </h1>
              <div className="w-24 h-1 bg-[#B8860B] mx-auto mb-6" />
              <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base italic font-light leading-relaxed">
                "Lịch sử là túi đựng những sự kiện mà qua đó chúng ta tìm thấy
                bản sắc của chính mình."
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <div className="bg-white/50 backdrop-blur-sm border border-[#D4A017]/30 p-6 rounded-sm shadow-sm">
              <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#8B1A1A] mb-6 border-b border-[#D4A017]/20 pb-2 flex items-center gap-2">
                <History size={18} />
                Các Thời Kỳ
              </h3>
              <nav className="flex flex-col gap-1">
                {data &&
                  timelineData.map((dynasty) => (
                    <button
                      key={dynasty.id}
                      onClick={() => {
                        document.getElementById(dynasty.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setActiveDynasty(dynasty.id);
                      }}
                      className={`text-left px-3 py-2 text-[13px] transition-all rounded-sm flex items-center justify-between group ${
                        activeDynasty === dynasty.id
                          ? "bg-[#8B1A1A] text-white"
                          : "text-[#6b6b6b] hover:bg-[#B8860B]/10 hover:text-[#1c1c1c]"
                      }`}
                    >
                      <span className="truncate pr-2">{dynasty.name}</span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${activeDynasty === dynasty.id ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </button>
                  ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-[#D4A017]/20">
                <Link
                  to="/bao-cao-loi"
                  className="flex items-center gap-3 p-3 bg-[#8B1A1A]/5 border border-[#8B1A1A]/20 rounded-sm hover:bg-[#8B1A1A]/10 transition-colors group"
                >
                  <ShieldAlert size={18} className="text-[#8B1A1A]" />
                  <div>
                    <div className="text-[11px] font-bold text-[#8B1A1A] uppercase tracking-wider">
                      Góp Ý Tư Liệu
                    </div>
                    <div className="text-[10px] text-[#6b6b6b]">
                      Phát hiện sai sót? Hãy báo cho chúng tôi.
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Timeline Thread */}
          <div className="lg:col-span-9">
            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B8860B] via-[#8B1A1A] to-[#B8860B] opacity-20 hidden md:block" />

              <div className="space-y-24">
                {timelineData.map((dynasty) => (
                  <section
                    key={dynasty.id}
                    id={dynasty.id}
                    className="relative"
                  >
                    {/* Dynasty Header */}
                    <div className="flex flex-col items-center mb-12 relative z-10">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#1A1208] text-[#D4A017] px-6 py-2 border-2 border-[#B8860B] rounded-full shadow-xl mb-6 flex items-center gap-3"
                      >
                        <Calendar size={18} />
                        <span className="text-sm font-bold tracking-[3px] uppercase">
                          {dynasty.year_display}
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold text-[#1c1c1c] mb-4 text-center"
                      >
                        {dynasty.name}
                      </motion.h2>

                      {dynasty.description && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className="text-[#6b6b6b] text-center max-w-2xl text-[15px] italic leading-relaxed"
                        >
                          {dynasty.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Events within Dynasty */}
                    <div className="space-y-12">
                      {dynasty.events.length > 0 ? (
                        dynasty.events.map((event, eIndex) => {
                          const isEven = eIndex % 2 === 0;
                          return (
                            <motion.div
                              key={event.id}
                              initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                              {/* Content Card */}
                              <div
                                className={`w-full md:w-[45%] ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
                              >
                                <Link
                                  to={`/bai-viet/${event.id}`}
                                  className="group block"
                                >
                                  <div className="bg-white p-6 rounded-sm shadow-sm hover:shadow-xl border-b-4 border-transparent hover:border-[#8B1A1A] transition-all duration-500 relative overflow-hidden">
                                    {/* Subtle texture overlay */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />

                                    <div
                                      className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}
                                    >
                                      <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest bg-[#B8860B]/5 px-2 py-0.5 rounded-sm">
                                        {event.category_name}
                                      </span>
                                      <span className="text-[11px] text-[#6b6b6b] font-medium">
                                        {event.year_display}
                                      </span>
                                    </div>

                                    <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#1c1c1c] mb-3 group-hover:text-[#8B1A1A] transition-colors">
                                      {event.title}
                                    </h3>
                                    <p className="text-[14px] text-[#6b6b6b] leading-relaxed mb-4 line-clamp-3 font-light">
                                      {event.note}
                                    </p>

                                    <div
                                      className={`flex items-center gap-2 text-[12px] font-bold text-[#8B1A1A] uppercase tracking-wider group-hover:gap-4 transition-all ${isEven ? "md:justify-end" : "md:justify-start"}`}
                                    >
                                      Đọc Chi Tiết <ArrowUpRight size={14} />
                                    </div>
                                  </div>
                                </Link>
                              </div>

                              {/* Center Dot */}
                              <div className="relative z-10 w-12 flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#FAFAF7] border-2 border-[#B8860B] shadow-inner flex items-center justify-center group cursor-pointer hover:bg-[#B8860B] transition-colors duration-300">
                                  <div className="w-3 h-3 rounded-full bg-[#B8860B] group-hover:bg-[#FAFAF7]" />
                                </div>
                              </div>

                              {/* Decorative Placeholder for image or icon */}
                              <div
                                className={`w-full md:w-[45%] ${isEven ? "md:pl-12" : "md:pr-12"}`}
                              >
                                <div className="aspect-[16/9] rounded-sm bg-[#1A1208] overflow-hidden group shadow-lg border border-[#D4A017]/20 relative">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1208] to-transparent z-10 opacity-60" />
                                  <div className="w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                                    {event.type === "person" && (
                                      <Users className="text-[#D4A017]/30 w-16 h-16" />
                                    )}
                                    {event.type === "event" && (
                                      <Calendar className="text-[#D4A017]/30 w-16 h-16" />
                                    )}
                                    {event.type === "place" && (
                                      <MapPin className="text-[#D4A017]/30 w-16 h-16" />
                                    )}
                                    {event.type === "video" && (
                                      <Play className="text-[#D4A017]/30 w-16 h-16" />
                                    )}
                                  </div>
                                  <div className="absolute bottom-4 left-4 z-20">
                                    <div className="text-[10px] text-[#D4A017] uppercase tracking-[2px] font-bold">
                                      Tư Liệu Hình Ảnh
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="text-center py-12 border-2 border-dashed border-[#D4A017]/20 rounded-sm">
                          <BookOpen
                            className="mx-auto text-[#B8860B]/30 mb-4"
                            size={32}
                          />
                          <p className="text-[#6b6b6b] text-sm italic">
                            Dữ liệu sự kiện đang được biên soạn cho giai đoạn
                            này...
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* Bottom Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-12 bg-[#1A1208] border-t-4 border-[#B8860B] rounded-sm text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-['Playfair_Display',serif] text-3xl text-white font-bold mb-6">
                  Bạn đóng góp cho kho sử liệu?
                </h3>
                <p className="text-white/60 max-w-2xl mx-auto mb-8 font-light italic">
                  Chúng tôi luôn trân trọng những đóng góp về tư liệu, hình ảnh
                  và đính chính sai sót để xây dựng một bộ bách khoa toàn thư
                  lịch sử chính xác nhất.
                </p>
                <Link
                  to="/bao-cao-loi"
                  className="inline-flex items-center gap-3 bg-[#B8860B] hover:bg-[#D4A017] text-[#1A1208] px-8 py-3.5 rounded-sm font-bold uppercase tracking-widest text-[13px] transition-all shadow-lg hover:shadow-[#D4A017]/20"
                >
                  <ShieldAlert size={18} />
                  Gửi Báo Cáo & Góp Ý
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
