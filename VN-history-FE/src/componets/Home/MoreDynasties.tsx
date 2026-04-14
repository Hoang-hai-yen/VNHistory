import type { Dynasty } from "../../types/dynasty.type";
import PageSectionHeader from "../common/PageSectionHeader";
import DynastyCard from "../Dynasty/DynastyCard";

export default function MoreDynasties({ DYNASTIES }: { DYNASTIES: Dynasty[] }) {
  return (
    <div>
      <PageSectionHeader
        subtitle="Khám Phá Thêm"
        title="Triều Đại & Sự Kiện"
        moreLink="/trieu-dai"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DYNASTIES.slice(0, 4).map((dyn) => (
          <DynastyCard key={dyn.id} dyn={dyn} forHome={true} />
        ))}
      </div>
    </div>
  );
}
