import type { Figure } from "../../types/figure.type";

import PageSectionHeader from "../common/PageSectionHeader";
import FiguresCard from "../Figures/FiguresCard";

export default function HeroFigures({ FIGURES }: { FIGURES: Figure[] }) {
  return (
    <div>
      <PageSectionHeader
        subtitle="Nhân Vật"
        title="Anh Hùng Dân Tộc"
        moreLink="/nhan-vat"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {FIGURES.slice(0, 4).map((figure) => (
          <FiguresCard key={figure.id} figure={figure} forHome={true} />
        ))}
      </div>
    </div>
  );
}
