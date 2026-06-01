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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const timelineData = data?.data || [];

  // ScrollSpy logic to automatically highlight the active dynasty period on scroll
  useEffect(() => {
    if (timelineData.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section is in the center viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveDynasty(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observerRef.current = observer;

    timelineData.forEach((dynasty) => {
      const el = document.getElementById(dynasty.id);
      if (el) observer.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [timelineData]);

  // Initial scroll when search param is available
  useEffect(() => {
    if (!selectedDynastySlug || timelineData.length === 0) return;

    const matchedDynasty = timelineData.find(
      (dynasty) => dynasty.slug === selectedDynastySlug,
    );

    if (!matchedDynasty) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    setActiveDynasty(matchedDynasty.id);

    requestAnimationFrame(() => {
      const targetEl = document.getElementById(matchedDynasty.id);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Re-enable observer after smooth scroll completes
        setTimeout(() => {
          if (observerRef.current) {
            timelineData.forEach((d) => {
              const el = document.getElementById(d.id);
              if (el) observerRef.current?.observe(el);
            });
          }
        }, 800);
      }
    });
  }, [selectedDynastySlug, timelineData]);

  const handlePeriodClick = (dynastyId: string) => {
    const targetEl = document.getElementById(dynastyId);
    if (targetEl) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      setActiveDynasty(dynastyId);

      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        if (observerRef.current) {
          timelineData.forEach((d) => {
            const el = document.getElementById(d.id);
            if (el) observerRef.current?.observe(el);
          });
        }
      }, 800);
    }
  };

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
          className="min-h-screen bg-[#F5F2EB] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] font-['Source_Serif_4',serif] text-[#2C2318] rounded-md shadow-sm border border-[#D4A017]/20"
          ref={containerRef}
        >
          {/* Header Banner */}
          <div className="relative flex h-[45vh] items-center justify-center overflow-hidden border-b-4 border-[#B8860B] bg-[#1A1208]">
            <div className="absolute inset-0 opacity-50">
              <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-10" />
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.35 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="h-full w-full bg-[url('https://images.unsplash.com/photo-1599708153386-62cd3f0216fc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center filter sepia-[20%] brightness-[90%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208] via-transparent to-[#1A1208]/80 z-[5]" />
            </div>

            <div className="relative z-10 px-4 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              >
                <div className="mb-4 text-[11px] font-bold uppercase tracking-[8px] text-[#D4A017]">
                  Chronicle of Civilizations
                </div>
                <h1 className="mb-4 font-['Playfair_Display',serif] text-4xl font-bold text-[#FAFAF7] drop-shadow-xl md:text-6xl tracking-wide">
                  Dòng Thời Gian Lịch Sử
                </h1>
                <div className="mx-auto mb-6 flex items-center justify-center gap-3">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B8860B]" />
                  <div className="h-2 w-2 rotate-45 bg-[#B8860B]" />
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B8860B]" />
                </div>
                <p className="mx-auto max-w-xl text-sm italic leading-relaxed text-[#FAFAF7]/80 md:text-base font-light">
                  "Lịch sử là túi đựng những sự kiện mà qua đó chúng ta tìm thấy bản sắc của chính mình."
                </p>
              </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#D4A017]/80 text-[10px] tracking-wider uppercase hidden md:flex flex-col items-center gap-1.5 cursor-pointer"
              onClick={() => {
                window.scrollBy({ top: window.innerHeight * 0.4, behavior: 'smooth' });
              }}
            >
              <span>Cuộn xuống khám phá</span>
              <span className="text-sm font-bold">↓</span>
            </motion.div>
          </div>

          {/* Sticky Mobile Period Navigator */}
          <div className="sticky top-14 z-[90] flex items-center gap-2 overflow-x-auto bg-[#F5F2EB]/95 px-4 py-3 border-b border-[#B8860B]/20 shadow-sm backdrop-blur-md lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A] mr-1">
              Thời kỳ:
            </span>
            {timelineData.map((dynasty) => (
              <button
                key={dynasty.id}
                onClick={() => handlePeriodClick(dynasty.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                  activeDynasty === dynasty.id
                    ? "bg-[#8B1A1A] text-white shadow-sm shadow-[#8B1A1A]/30 scale-105"
                    : "bg-white/60 text-[#5C5346] border border-[#B8860B]/20 hover:bg-white/95"
                }`}
              >
                {dynasty.name}
              </button>
            ))}
          </div>

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-12">
            {/* Desktop Sticky Sidebar */}
            <aside className="sticky top-32 hidden h-fit lg:col-span-3 lg:block">
              <div className="rounded-md border-2 border-[#B8860B]/30 bg-white/70 p-6 shadow-md backdrop-blur-md relative overflow-hidden">
                {/* Vintage Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#B8860B]/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#B8860B]/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#B8860B]/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#B8860B]/40" />

                <h3 className="mb-6 flex items-center gap-2 border-b border-[#D4A017]/30 pb-2 font-['Playfair_Display',serif] text-lg font-bold text-[#8B1A1A]">
                  <History size={18} />
                  Các Thời Kỳ
                </h3>
                <nav className="flex flex-col gap-1.5 max-h-[50vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#B8860B]/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#B8860B]/40">
                  {timelineData.map((dynasty) => (
                    <button
                      key={dynasty.id}
                      onClick={() => handlePeriodClick(dynasty.id)}
                      className={`group flex items-center justify-between rounded px-3 py-2 text-left text-[13px] font-medium transition-all duration-300 ${
                        activeDynasty === dynasty.id
                          ? "bg-gradient-to-r from-[#8B1A1A] to-[#A32222] text-white shadow-md shadow-[#8B1A1A]/10"
                          : "text-[#5C5346] hover:bg-[#B8860B]/10 hover:text-[#1c1c1c]"
                      }`}
                    >
                      <span className="truncate pr-2">{dynasty.name}</span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform duration-300 ${
                          activeDynasty === dynasty.id
                            ? "rotate-90 text-white"
                            : "text-[#B8860B]/50 group-hover:translate-x-1 group-hover:text-[#B8860B]"
                        }`}
                      />
                    </button>
                  ))}
                </nav>

                <div className="mt-8 border-t border-[#D4A017]/30 pt-6">
                  <Link
                    to="/bao-cao-loi"
                    className="group flex items-center gap-3 rounded border-2 border-dashed border-[#8B1A1A]/20 bg-[#8B1A1A]/5 p-3.5 transition-all duration-300 hover:bg-[#8B1A1A]/10 hover:border-[#8B1A1A]/40"
                  >
                    <ShieldAlert size={20} className="text-[#8B1A1A] shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B1A1A]">
                        Góp Ý Tư Liệu
                      </div>
                      <div className="text-[10px] text-[#6b6b6b] leading-normal mt-0.5">
                        Phát hiện sai sót? Hãy báo cho chúng tôi.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Timeline Events Scroll */}
            <div className="lg:col-span-9">
              <div className="relative">
                {/* Timeline axis (glowing central line) */}
                <div className="absolute left-4 top-0 bottom-0 hidden w-[3px] bg-gradient-to-b from-[#B8860B] via-[#8B1A1A] to-[#B8860B] opacity-30 md:left-1/2 md:-translate-x-1/2 md:block shadow-[0_0_8px_rgba(184,134,11,0.15)]" />

                <div className="space-y-28">
                  {timelineData.map((dynasty) => (
                    <section
                      key={dynasty.id}
                      id={dynasty.id}
                      className="relative scroll-mt-28"
                    >
                      {/* Dynasty Milestone Header */}
                      <div className="relative z-10 mb-16 flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0.85, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ type: "spring", stiffness: 100, damping: 15 }}
                          className="mb-5 flex items-center gap-3 rounded-full border-2 border-[#B8860B] bg-gradient-to-r from-[#1A1208] via-[#2E200F] to-[#1A1208] px-6 py-2 text-[#D4A017] shadow-xl shadow-[#1A1208]/10"
                        >
                          <Calendar size={16} />
                          <span className="text-[12px] font-bold uppercase tracking-[4px]">
                            {dynasty.year_display}
                          </span>
                        </motion.div>

                        <motion.h2
                          initial={{ y: 25, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="mb-4 text-center font-['Playfair_Display',serif] text-3xl font-bold text-[#1c1c1c] md:text-5xl flex items-center gap-4 justify-center"
                        >
                          <span className="hidden md:inline-block h-[1px] w-8 bg-gradient-to-r from-transparent to-[#B8860B]/60" />
                          {dynasty.name}
                          <span className="hidden md:inline-block h-[1px] w-8 bg-gradient-to-l from-transparent to-[#B8860B]/60" />
                        </motion.h2>

                        {dynasty.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="max-w-2xl text-center text-[15px] italic leading-relaxed text-[#5C5346] px-4 font-light"
                          >
                            {dynasty.description}
                          </motion.p>
                        )}
                      </div>

                      {/* Events Cards Container */}
                      <div className="space-y-16">
                        {dynasty.events.length > 0 ? (
                          dynasty.events.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                              <motion.div
                                key={event.id}
                                initial={{ x: isEven ? -40 : 40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                                className={`flex flex-col items-stretch gap-6 md:gap-0 ${
                                  isEven
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                                }`}
                              >
                                {/* Info Text Card */}
                                <div
                                  className={`w-full md:w-[45%] flex flex-col justify-center ${
                                    isEven
                                      ? "md:pr-12 md:text-right"
                                      : "md:pl-12 md:text-left"
                                  }`}
                                >
                                  <Link
                                    to={`/bai-viet/${event.slug}`}
                                    className="group block"
                                  >
                                    <div className="relative overflow-hidden rounded-lg border border-[#B8860B]/20 border-b-4 border-b-[#B8860B]/40 bg-[#FCFAF6] p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-b-[#8B1A1A] group-hover:shadow-md">
                                      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-25" />

                                      <div
                                        className={`mb-4.5 flex items-center gap-3 ${
                                          isEven
                                            ? "md:justify-end"
                                            : "md:justify-start"
                                        }`}
                                      >
                                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border transition-colors ${
                                          event.type === "person"
                                            ? "bg-[#0F3020]/5 text-[#0F3020] border-[#0F3020]/20"
                                            : event.type === "event"
                                            ? "bg-[#4A0E17]/5 text-[#4A0E17] border-[#4A0E17]/20"
                                            : event.type === "place"
                                            ? "bg-[#3E2723]/5 text-[#3E2723] border-[#3E2723]/20"
                                            : event.type === "video"
                                            ? "bg-[#0D1B2A]/5 text-[#0D1B2A] border-[#0D1B2A]/20"
                                            : "bg-[#5C4008]/5 text-[#5C4008] border-[#5C4008]/20"
                                        }`}>
                                          {event.category_name}
                                        </span>
                                        <span className="text-[11px] font-semibold text-[#8B1A1A]/80 tracking-wide">
                                          {event.year_display}
                                        </span>
                                      </div>

                                      <h3 className="mb-3 font-['Playfair_Display',serif] text-xl font-bold text-[#1C160E] leading-snug transition-colors group-hover:text-[#8B1A1A]">
                                        {event.title}
                                      </h3>
                                      <p className="mb-4 line-clamp-3 text-[14px] font-light leading-relaxed text-[#6B5E4F]">
                                        {event.note}
                                      </p>

                                      <div
                                        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8B1A1A] transition-all group-hover:gap-3 ${
                                          isEven
                                            ? "md:justify-end"
                                            : "md:justify-start"
                                        }`}
                                      >
                                        Đọc Chi Tiết <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                      </div>
                                    </div>
                                  </Link>
                                </div>

                                {/* Central Indicator Node */}
                                <div className="relative z-10 flex w-12 justify-center shrink-0">
                                  {/* Pulsing indicator under the node on hover */}
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#B8860B]/15 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 pointer-events-none" />
                                  
                                  {/* Small connector horizontal indicators pointing to the card */}
                                  <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-7 h-[1px] bg-gradient-to-r from-transparent to-[#B8860B]/40 ${
                                    isEven ? "right-1/2 -translate-x-3.5" : "left-1/2 translate-x-3.5"
                                  }`} />

                                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#B8860B] bg-[#FCFAF6] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#8B1A1A] group-hover:shadow-md mt-6 md:mt-0">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A1208] text-[#D4A017] transition-colors duration-300 group-hover:bg-[#8B1A1A] group-hover:text-white">
                                      {event.type === "person" && <Users size={12} />}
                                      {event.type === "event" && <Calendar size={12} />}
                                      {event.type === "place" && <MapPin size={12} />}
                                      {event.type === "video" && <Play size={12} className="ml-0.5" />}
                                      {event.type === "culture" && <BookOpen size={12} />}
                                    </div>
                                  </div>
                                </div>

                                {/* Media Image/Placeholder Card */}
                                <div
                                  className={`w-full md:w-[45%] flex flex-col justify-center ${
                                    isEven ? "md:pl-12" : "md:pr-12"
                                  }`}
                                >
                                  <div className="group relative aspect-[16/9] overflow-hidden rounded-lg border-2 border-[#B8860B]/30 bg-[#1A1208] shadow-md transition-all duration-500 hover:border-[#B8860B] hover:shadow-xl">
                                    {event.cover_image_url ? (
                                      <>
                                        <img
                                          src={event.cover_image_url}
                                          alt={event.title}
                                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/90 via-transparent to-transparent" />
                                      </>
                                    ) : (
                                      // Premium themed fallback gradient based on category type
                                      <div
                                        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br transition-all duration-700 ${
                                          event.type === "person"
                                            ? "from-[#0F3020] to-[#1A3A2B]"
                                            : event.type === "event"
                                            ? "from-[#4A0E17] to-[#5C1A24]"
                                            : event.type === "place"
                                            ? "from-[#3E2723] to-[#4E342E]"
                                            : event.type === "video"
                                            ? "from-[#0D1B2A] to-[#152238]"
                                            : "from-[#5C4008] to-[#6E4F12]" // culture or others
                                        }`}
                                      >
                                        {/* Vintage borders inside placeholder */}
                                        <div className="absolute inset-2 border border-[#B8860B]/20 pointer-events-none rounded" />
                                        <div className="absolute inset-3 border border-dashed border-[#B8860B]/10 pointer-events-none rounded" />
                                        
                                        {/* Corner brackets */}
                                        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#B8860B]/40" />
                                        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#B8860B]/40" />
                                        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#B8860B]/40" />
                                        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#B8860B]/40" />

                                        {/* Background giant icon overlay */}
                                        <div className="absolute opacity-5 transform scale-[2] pointer-events-none transition-transform duration-1000 group-hover:scale-[2.4] text-[#FCFAF6]">
                                          {event.type === "person" && <Users size={120} />}
                                          {event.type === "event" && <Calendar size={120} />}
                                          {event.type === "place" && <MapPin size={120} />}
                                          {event.type === "video" && <Play size={120} />}
                                          {event.type === "culture" && <BookOpen size={120} />}
                                        </div>

                                        {/* Glowing core overlay */}
                                        <div className="absolute h-24 w-24 rounded-full bg-white/5 blur-xl pointer-events-none group-hover:bg-[#B8860B]/10 transition-colors duration-500" />

                                        {/* Center icon emblem */}
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1208]/85 border border-[#B8860B]/30 shadow-lg text-[#D4A017] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white group-hover:border-white/30">
                                          {event.type === "person" && <Users size={24} />}
                                          {event.type === "event" && <Calendar size={24} />}
                                          {event.type === "place" && <MapPin size={24} />}
                                          {event.type === "video" && <Play size={24} className="ml-1" />}
                                          {event.type === "culture" && <BookOpen size={24} />}
                                        </div>

                                        <span className="relative z-10 mt-3 text-[11px] font-medium uppercase tracking-[3px] text-[#D4A017] opacity-80 group-hover:opacity-100 transition-opacity">
                                          {event.type === "person" && "Nhân vật Lịch sử"}
                                          {event.type === "event" && "Sự kiện tiêu biểu"}
                                          {event.type === "place" && "Địa danh / Di tích"}
                                          {event.type === "video" && "Tư liệu Video"}
                                          {event.type === "culture" && "Di sản văn hóa"}
                                        </span>
                                      </div>
                                    )}

                                    {/* Type text banner */}
                                    <div className="absolute bottom-4 left-4 z-20 text-[10px] font-bold uppercase tracking-[2px] text-[#FCFAF6] drop-shadow bg-[#1C160E]/50 px-2.5 py-0.5 rounded backdrop-blur-xs">
                                      {event.type === "video" ? "Thư viện Video" : "Hình ảnh tư liệu"}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="rounded-lg border-2 border-dashed border-[#B8860B]/30 bg-[#FCFAF6] py-16 text-center shadow-inner relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-15" />
                            <BookOpen
                              className="mx-auto mb-4 text-[#B8860B]/40 animate-pulse"
                              size={36}
                            />
                            <p className="text-sm italic text-[#6B5E4F] font-light max-w-sm mx-auto relative z-10">
                              Dữ liệu sự kiện đang được biên soạn cho giai đoạn này...
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              {/* Bottom Support Callout Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mt-32 overflow-hidden rounded-lg border-2 border-[#B8860B] bg-gradient-to-r from-[#1A1208] via-[#241A0E] to-[#1A1208] p-12 text-center shadow-xl shadow-[#1A1208]/20"
              >
                <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-15" />
                
                {/* Vintage Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#B8860B]/50" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#B8860B]/50" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#B8860B]/50" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#B8860B]/50" />

                <div className="relative z-10">
                  <h3 className="mb-4.5 font-['Playfair_Display',serif] text-3xl font-bold text-[#FCFAF6] tracking-wide">
                    Bạn muốn đóng góp cho kho sử liệu?
                  </h3>
                  <div className="mx-auto mb-6 h-[1px] w-16 bg-[#B8860B]/60" />
                  <p className="mx-auto mb-8 max-w-xl font-light italic text-[#FCFAF6]/70 leading-relaxed text-sm md:text-base">
                    Chúng tôi luôn trân trọng những đóng góp về tư liệu, hình ảnh và đính chính sai sót để xây dựng một bộ bách khoa toàn thư lịch sử chính xác nhất.
                  </p>
                  <Link
                    to="/bao-cao-loi"
                    className="inline-flex items-center gap-3.5 rounded bg-gradient-to-r from-[#B8860B] to-[#D4A017] px-8 py-3.5 text-[12.5px] font-bold uppercase tracking-widest text-[#1A1208] shadow-lg transition-all duration-300 hover:from-[#D4A017] hover:to-[#E5B83E] hover:shadow-[#D4A017]/30 hover:scale-[1.02]"
                  >
                    <ShieldAlert size={16} />
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
