export default function PageSectionHeader({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <div className="flex items-end justify-between border-b-2 border-[#1c1c1c] pb-2.5 mb-6">
      <div>
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#8B1A1A] mb-1">
          {subtitle}
        </div>
        <h1 className="font-['Playfair_Display',serif] text-[26px] text-[#1c1c1c] font-bold leading-none">
          {title}
        </h1>
      </div>
    </div>
  );
}
