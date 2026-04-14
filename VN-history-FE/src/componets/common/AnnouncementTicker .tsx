export default function AnnouncementTicker() {
  return (
    <div className="bg-[#8B1A1A] py-1.5 overflow-hidden border-b border-[#B8860B]/20">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3.5">
        <span className="bg-white text-[#8B1A1A] text-[9px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded-[2px] shrink-0">
          Hôm Nay
        </span>
        <div className="flex items-center gap-3.5 text-white/90 text-xs whitespace-nowrap overflow-hidden">
          <span className="hover:underline cursor-pointer">
            📅 Tháng 3 trong lịch sử: Chiếu dời đô của Lý Thái Tổ — Thăng Long
            ngàn năm văn hiến
          </span>
          <span className="text-white/30">|</span>
          <span className="hover:underline cursor-pointer">
            Chiến thắng Bạch Đằng 938 — Ngô Quyền chấm dứt 1.000 năm Bắc thuộc
          </span>
        </div>
      </div>
    </div>
  );
}
