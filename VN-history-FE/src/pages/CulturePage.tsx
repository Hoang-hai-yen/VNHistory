import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import { useArticles } from "../hooks/api/useArticles";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import CultureCard from "../components/Geography/CultureCard";
import { usePaginationUrl } from "../hooks/usePaginationUrl";
import { useCategories } from "../hooks/api/useCategories";
import { useDynasties } from "../hooks/api/useDynasties";
import { useArchiveFilters } from "../hooks/useArchiveFilters";
import ArchiveFilterPanel from "../components/common/ArchiveFilterPanel";
import { InlineLoader } from "../components/Loading";

export default function GeographyPage() {
  const { categoryId, dynastyId, setCategoryId, setDynastyId, clearFilters } =
    useArchiveFilters();
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(0, 9);

  const { data: categoriesData } = useCategories("culture");
  const { data: dynastiesData } = useDynasties();
  const { data, isPending, error, isFetching, refetch } = useArticles({
    type: "culture",
    category_id: categoryId || undefined,
    dynasty_id: dynastyId || undefined,
    limit,
    page,
  });

  const cultures = data?.data || [];
  const total = data?.total ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Văn hóa</span>
      </div>

      <PageSectionHeader subtitle="Khám Phá" title="Văn hóa Việt" />

      <ArchiveFilterPanel
        title="Không gian văn hóa"
        description="Tập hợp các bài viết về văn hóa, di sản và không gian lịch sử. Bạn có thể khoanh vùng theo chuyên mục và triều đại."
        total={total}
        categoryOptions={categoriesData?.data || []}
        dynastyOptions={dynastiesData?.data || []}
        categoryId={categoryId}
        dynastyId={dynastyId}
        onCategoryChange={setCategoryId}
        onDynastyChange={setDynastyId}
        onClear={clearFilters}
      />

      <QueryStateWrapper
        isLoading={isPending && !data}
        error={error && !data ? error : null}
        data={cultures}
        emptyMessage="Không có bài viết văn hóa nào phù hợp bộ lọc hiện tại"
        loadingMessage="Đang tải bài viết văn hóa..."
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
        {isFetching && (
          <div className="mb-4 flex items-center gap-2">
            <InlineLoader size="sm" />
            <span className="text-xs italic text-[#6b6b6b]">
              Đang cập nhật danh sách văn hóa...
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cultures.map((geo) => (
            <CultureCard key={geo.id} item={geo} />
          ))}
        </div>
      </QueryStateWrapper>
    </div>
  );
}
