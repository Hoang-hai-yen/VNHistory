import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import FiguresCard from "../components/Figures/FiguresCard";
import { useArticles } from "../hooks/api/useArticles";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import { InlineLoader } from "../components/Loading";
import { usePaginationUrl } from "../hooks/usePaginationUrl";

export default function FiguresPage() {
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(0, 10);

  const { data, isPending, error, isFetching, refetch } = useArticles({
    type: "person",
    limit,
    page,
  });

  const figures = data?.data || [];
  const total = data?.total ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] py-4 lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Nhân Vật</span>
      </div>

      {/* Section Header */}
      <PageSectionHeader subtitle="Tiểu sử" title="Nhân vật lịch sử" />

      <QueryStateWrapper
        isLoading={isPending && !data}
        error={error && !data ? error : null}
        data={figures}
        emptyMessage="Không có nhân vật nào"
        loadingMessage="Đang tải nhân vật..."
        onRetry={refetch}
        pagination={{
          page,
          limit,
          totalPages,
          total,
          onNextPage: nextPage,
          onPrevPage: prevPage,
          onGoToPage: goToPage,
          onLimitChange: changeLimit,
        }}
      >
        <p className=" text-[13.5px] text-[#6b6b6b] mb-8 font-light italic">
          Click vào thẻ nhân vật để đọc tiểu sử chi tiết. Ảnh chân dung sẽ được
          cập nhật khi có tư liệu.
        </p>

        {isFetching && (
          <div className="mb-4 flex items-center gap-2">
            <InlineLoader size="sm" />
            <span className="text-xs text-[#6b6b6b] italic">
              Đang tải thêm nhân vật...
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {figures.map((figure) => (
            <FiguresCard key={figure.id} figure={figure} />
          ))}
        </div>
      </QueryStateWrapper>
    </div>
  );
}
