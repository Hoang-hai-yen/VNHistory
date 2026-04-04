import { Link } from "react-router";

export default function PageSectionHeader({
  subtitle,
  title,
  moreLink,
  dark = false,
}: {
  subtitle: string;
  title: string;
  moreLink?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-end justify-between border-b-2 border-[#1c1c1c] pb-2.5 mb-6">
      <div>
        <div
          className={`text-[9px] font-bold tracking-[3px] uppercase ${dark ? "text-[#D4A017]" : "text-[#8B1A1A]"}  mb-1`}
        >
          {subtitle}
        </div>
        <h1
          className={`font-['Playfair_Display',serif] text-[26px] font-bold leading-none ${dark ? "text-white" : "text-[#1c1c1c]"}`}
        >
          {title}
        </h1>
      </div>
      {moreLink && (
        <Link
          to={moreLink}
          className={`text-[11.5px]  ${dark ? "text-[#D4A017] border-[#D4A017]" : "text-[#8B1A1A]"} font-medium uppercase tracking-wider transition-opacity hover:opacity-70 border-b border-[#8B1A1A]`}
        >
          Xem tất cả →
        </Link>
      )}
    </div>
  );
}
