import type { Dynasty } from "../../types/dynasty.type";
import PageSectionHeader from "../common/PageSectionHeader";
import DynastyCard from "../Dynasty/DynastyCard";

export default function MoreDynasties({ DYNASTIES }: { DYNASTIES: Dynasty[] }) {
  return (
    <div>
      <PageSectionHeader
        subtitle="Khám Phá Thêm"
        title="Triều đại & Sự kiện"
        moreLink="/trieu-dai"
      />
      {DYNASTIES.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DYNASTIES.slice(0, 4).map((dyn) => (
            <DynastyCard key={dyn.id} dyn={dyn} forHome={true} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-[#d9ccb8] bg-[#faf7f0] p-8 text-center text-[14px] text-[#6b6b6b]">
          Chưa có triều đại để hiển thị.
        </div>
      )}
    </div>
  );
}
