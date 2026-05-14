import { Link } from "react-router";
import { useDynasties } from "../hooks/api/useDynasties";
import PageSectionHeader from "../components/common/PageSectionHeader";
import DynastyCard from "../components/Dynasty/DynastyCard";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import { usePaginationUrl } from "../hooks/usePaginationUrl";
import ArchiveFilterPanel from "../components/common/ArchiveFilterPanel";
import { InlineLoader } from "../components/Loading";

export default function DynastiesPage() {
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(0, 8);
  const { data, isPending, isFetching, error, refetch } = useDynasties({
    page,
    limit,
  });

  const dynasties = data?.data || [];
  const total = data?.total ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Triều Đại</span>
      </div>

      <PageSectionHeader subtitle="Lịch Sử" title="Các Triều Đại Việt Nam" />

      <ArchiveFilterPanel
        title="Danh sách triều đại"
        description="Mỗi triều đại dẫn bạn sang dòng thời gian đã được lọc sẵn theo slug, giúp việc điều hướng giữa danh sách và mốc sự kiện luôn nhất quán."
        total={total}
      />

      <QueryStateWrapper
        isLoading={isPending && !data}
        error={error && !data ? error : null}
        data={dynasties}
        emptyMessage="Không có triều đại nào"
        loadingMessage="Đang tải dữ liệu triều đại..."
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
              Đang cập nhật danh sách triều đại...
            </span>
          </div>
        )}

        <div className="grid gap-5">
          {dynasties.map((dyn) => (
            <DynastyCard key={dyn.id} dyn={dyn} />
          ))}
        </div>
      </QueryStateWrapper>
    </div>
  );
}
