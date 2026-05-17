import { Link, useSearchParams } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import { useTimeline } from "../hooks/api/useTimeline";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
  const { data, error, isLoading, refetch } = useTimeline();
  const [searchParams] = useSearchParams();
  const selectedDynastySlug = searchParams.get("dynasty");
  const [activeDynasty, setActiveDynasty] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);


  const timelineData = data?.data || [];

  useEffect(() => {
    if (!selectedDynastySlug || timelineData.length === 0) return;

    const matchedDynasty = timelineData.find(
      (dynasty) => dynasty.slug === selectedDynastySlug,
    );

    if (!matchedDynasty) return;

    setActiveDynasty(matchedDynasty.id);

    requestAnimationFrame(() => {
      document.getElementById(matchedDynasty.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [selectedDynastySlug, timelineData]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Dòng Thời Gian</span>
      </div>

      <PageSectionHeader subtitle="Dữ Liệu" title="Dòng Thời Gian Lịch Sử" />

      <QueryStateWrapper
        isLoading={isLoading}
        error={error}
        data={timelineData}
        emptyMessage="Không có sự kiện nào"
        loadingMessage="Đang tải dòng thời gian..."
        onRetry={refetch}
      >


        <div
          className="min-h-screen bg-[#F4F1EA] font-['Source_Serif_4',serif]"
          ref={containerRef}
        >
          <div className="relative flex h-[40vh] items-center justify-center overflow-hidden border-b-4 border-[#B8860B] bg-[#1A1208]">
            <div className="absolute inset-0 opacity-40">
              <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 2 }}
                className="h-full w-full bg-[url('https://images.unsplash.com/photo-1599708153386-62cd3f0216fc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
              />
            </div>
            <div className="relative z-10 px-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[6px] text-[#B8860B]">
                  Chronicle of Civilizations
                </div>
                <h1 className="mb-4 font-['Playfair_Display',serif] text-4xl font-bold text-[#FAFAF7] drop-shadow-lg md:text-6xl">
                  Dòng Thời Gian Lịch Sử
                </h1>
                <div className="mx-auto mb-6 h-1 w-24 bg-[#B8860B]" />
                <p className="mx-auto max-w-xl text-sm italic leading-relaxed text-white/70 md:text-base">
                  "Lịch sử là túi đựng những sự kiện mà qua đó chúng ta tìm thấy
                  bản sắc của chính mình."
                </p>
              </motion.div>
            </div>
          </div>

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-12">
            <aside className="sticky top-32 hidden h-fit lg:col-span-3 lg:block">
              <div className="rounded-sm border border-[#D4A017]/30 bg-white/50 p-6 shadow-sm backdrop-blur-sm">
                <h3 className="mb-6 flex items-center gap-2 border-b border-[#D4A017]/20 pb-2 font-['Playfair_Display',serif] text-lg font-bold text-[#8B1A1A]">
                  <History size={18} />
                  Các Thời Kỳ
                </h3>
                <nav className="flex flex-col gap-1">
                  {timelineData.map((dynasty) => (
                    <button
                      key={dynasty.id}
                      onClick={() => {
                        document.getElementById(dynasty.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setActiveDynasty(dynasty.id);
                      }}
                      className={`group flex items-center justify-between rounded-sm px-3 py-2 text-left text-[13px] transition-all ${
                        activeDynasty === dynasty.id
                          ? "bg-[#8B1A1A] text-white"
                          : "text-[#6b6b6b] hover:bg-[#B8860B]/10 hover:text-[#1c1c1c]"
                      }`}
                    >
                      <span className="truncate pr-2">{dynasty.name}</span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${
                          activeDynasty === dynasty.id
                            ? "rotate-90"
                            : "group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  ))}
                </nav>

                <div className="mt-8 border-t border-[#D4A017]/20 pt-6">
                  <Link
                    to="/bao-cao-loi"
                    className="group flex items-center gap-3 rounded-sm border border-[#8B1A1A]/20 bg-[#8B1A1A]/5 p-3 transition-colors hover:bg-[#8B1A1A]/10"
                  >
                    <ShieldAlert size={18} className="text-[#8B1A1A]" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B1A1A]">
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

            <div className="lg:col-span-9">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 hidden w-[2px] bg-gradient-to-b from-[#B8860B] via-[#8B1A1A] to-[#B8860B] opacity-20 md:left-1/2 md:block" />

                <div className="space-y-24">
                  {timelineData.map((dynasty) => (
                    <section
                      key={dynasty.id}
                      id={dynasty.id}
                      className="relative scroll-mt-24"
                    >
                      <div className="relative z-10 mb-12 flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          className="mb-6 flex items-center gap-3 rounded-full border-2 border-[#B8860B] bg-[#1A1208] px-6 py-2 text-[#D4A017] shadow-xl"
                        >
                          <Calendar size={18} />
                          <span className="text-sm font-bold uppercase tracking-[3px]">
                            {dynasty.year_display}
                          </span>
                        </motion.div>

                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          className="mb-4 text-center font-['Playfair_Display',serif] text-3xl font-bold text-[#1c1c1c] md:text-5xl"
                        >
                          {dynasty.name}
                        </motion.h2>

                        {dynasty.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="max-w-2xl text-center text-[15px] italic leading-relaxed text-[#6b6b6b]"
                          >
                            {dynasty.description}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-12">
                        {dynasty.events.length > 0 ? (
                          dynasty.events.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                              <motion.div
                                key={event.id}
                                initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`flex flex-col items-center gap-8 md:gap-0 ${
                                  isEven
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                                }`}
                              >
                                <div
                                  className={`w-full md:w-[45%] ${
                                    isEven
                                      ? "md:pr-12 md:text-right"
                                      : "md:pl-12 md:text-left"
                                  }`}
                                >
                                  <Link
                                    to={`/bai-viet/${event.slug}`}
                                    className="group block"
                                  >
                                    <div className="relative overflow-hidden rounded-sm border-b-4 border-transparent bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#8B1A1A] hover:shadow-xl">
                                      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />

                                      <div
                                        className={`mb-3 flex items-center gap-3 ${
                                          isEven
                                            ? "md:justify-end"
                                            : "md:justify-start"
                                        }`}
                                      >
                                        <span className="rounded-sm bg-[#B8860B]/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">
                                          {event.category_name}
                                        </span>
                                        <span className="text-[11px] font-medium text-[#6b6b6b]">
                                          {event.year_display}
                                        </span>
                                      </div>

                                      <h3 className="mb-3 font-['Playfair_Display',serif] text-xl font-bold text-[#1c1c1c] transition-colors group-hover:text-[#8B1A1A]">
                                        {event.title}
                                      </h3>
                                      <p className="mb-4 line-clamp-3 text-[14px] font-light leading-relaxed text-[#6b6b6b]">
                                        {event.note}
                                      </p>

                                      <div
                                        className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#8B1A1A] transition-all group-hover:gap-4 ${
                                          isEven
                                            ? "md:justify-end"
                                            : "md:justify-start"
                                        }`}
                                      >
                                        Đọc Chi Tiết <ArrowUpRight size={14} />
                                      </div>
                                    </div>
                                  </Link>
                                </div>

                                <div className="relative z-10 flex w-12 justify-center">
                                  <div className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#B8860B] bg-[#FAFAF7] shadow-inner transition-colors duration-300 hover:bg-[#B8860B]">
                                    <div className="h-3 w-3 rounded-full bg-[#B8860B] group-hover:bg-[#FAFAF7]" />
                                  </div>
                                </div>

                                <div
                                  className={`w-full md:w-[45%] ${
                                    isEven ? "md:pl-12" : "md:pr-12"
                                  }`}
                                >
                                  <div className="group relative aspect-[16/9] overflow-hidden rounded-sm border border-[#D4A017]/20 bg-[#1A1208] shadow-lg">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#1A1208] to-transparent opacity-60" />
                                    <div className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-110">
                                      {event.type === "person" && (
                                        <Users className="h-16 w-16 text-[#D4A017]/30" />
                                      )}
                                      {event.type === "event" && (
                                        <Calendar className="h-16 w-16 text-[#D4A017]/30" />
                                      )}
                                      {event.type === "place" && (
                                        <MapPin className="h-16 w-16 text-[#D4A017]/30" />
                                      )}
                                      {event.type === "video" && (
                                        <Play className="h-16 w-16 text-[#D4A017]/30" />
                                      )}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 text-[10px] font-bold uppercase tracking-[2px] text-[#D4A017]">
                                      Tư Liệu Hình Ảnh
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="rounded-sm border-2 border-dashed border-[#D4A017]/20 py-12 text-center">
                            <BookOpen
                              className="mx-auto mb-4 text-[#B8860B]/30"
                              size={32}
                            />
                            <p className="text-sm italic text-[#6b6b6b]">
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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mt-32 overflow-hidden rounded-sm border-t-4 border-[#B8860B] bg-[#1A1208] p-12 text-center"
              >
                <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-10" />
                <div className="relative z-10">
                  <h3 className="mb-6 font-['Playfair_Display',serif] text-3xl font-bold text-white">
                    Bạn đóng góp cho kho sử liệu?
                  </h3>
                  <p className="mx-auto mb-8 max-w-2xl font-light italic text-white/60">
                    Chúng tôi luôn trân trọng những đóng góp về tư liệu, hình
                    ảnh và đính chính sai sót để xây dựng một bộ bách khoa toàn
                    thư lịch sử chính xác nhất.
                  </p>
                  <Link
                    to="/bao-cao-loi"
                    className="inline-flex items-center gap-3 rounded-sm bg-[#B8860B] px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest text-[#1A1208] shadow-lg transition-all hover:bg-[#D4A017] hover:shadow-[#D4A017]/20"
                  >
                    <ShieldAlert size={18} />
                    Gửi Báo Cáo & Góp Ý
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </QueryStateWrapper>
    </div>
  );
}
