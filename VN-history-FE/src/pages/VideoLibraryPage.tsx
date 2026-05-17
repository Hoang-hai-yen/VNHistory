import { Link } from "react-router";
import PageSectionHeader from "../components/common/PageSectionHeader";
import VideoCard from "../components/Video/VideoCard";
import { useArticles } from "../hooks/api/useArticles";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import { useCategories } from "../hooks/api/useCategories";
import { useDynasties } from "../hooks/api/useDynasties";
import { useArchiveFilters } from "../hooks/useArchiveFilters";
import ArchiveFilterPanel from "../components/common/ArchiveFilterPanel";
import { usePaginationUrl } from "../hooks/usePaginationUrl";
import { InlineLoader } from "../components/Loading";

export default function VideoLibraryPage() {
  const { categoryId, dynastyId, setCategoryId, setDynastyId, clearFilters } =
    useArchiveFilters();
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(0, 12);

  const { data: categoriesData } = useCategories("video");
  const { data: dynastiesData } = useDynasties();
  const { data, isPending, error, isFetching, refetch } = useArticles({
    type: "video",
    category_id: categoryId || undefined,
    dynasty_id: dynastyId || undefined,
    limit,
    page,
  });

  const videos = data?.data || [];
  const total = data?.total ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-4">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang Chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Thư Viện Video</span>
      </div>

      <PageSectionHeader subtitle="Màn Ảnh" title="Video Tư Liệu Lịch Sử" />

      <ArchiveFilterPanel
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
        data={videos}
        emptyMessage="Không có video nào phù hợp bộ lọc hiện tại"
        loadingMessage="Đang tải thư viện video..."
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
              Đang cập nhật thư viện video...
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </QueryStateWrapper>
    </div>
  );
}
