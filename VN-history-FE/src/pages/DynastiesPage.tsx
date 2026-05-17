import { Search } from "lucide-react";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router";
import { ArticleCard } from "../components/article/ArticleCard";
import DynastyTimelineCard from "../components/Dynasty/DynastyTimelineCard";
import { InlineLoader } from "../components/Loading";
import PaginationControls from "../components/Pagination/PaginationControls";
import PageSectionHeader from "../components/common/PageSectionHeader";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import {
  useArticles,
  type ArticleTypeFilter,
} from "../hooks/api/useArticles";
import { useDynasties } from "../hooks/api/useDynasties";
import { usePaginationUrl } from "../hooks/usePaginationUrl";

const ARTICLE_TYPE_OPTIONS: Array<{
  label: string;
  value: "" | ArticleTypeFilter;
}> = [
  { label: "Tất cả", value: "" },
  { label: "Nhân vật", value: "person" },
  { label: "Sự kiện", value: "event" },
  { label: "Địa lý", value: "place" },
  { label: "Văn hóa", value: "culture" },
  { label: "Video", value: "video" },
];

const DEFAULT_ARTICLE_LIMIT = 9;

export default function DynastiesPage() {
  const { page, limit, totalPages, goToPage, nextPage, prevPage, changeLimit } =
    usePaginationUrl(0, 8);
  const { data, isPending, isFetching, error, refetch } = useDynasties({
    page,
    limit,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [articleSearchInput, setArticleSearchInput] = useState(
    searchParams.get("articleQ") ?? "",
  );
  const deferredArticleSearch = useDeferredValue(articleSearchInput.trim());

  const articlePage = Math.max(
    1,
    Number.parseInt(searchParams.get("articlePage") ?? "1", 10) || 1,
  );
  const articleLimit = Math.max(
    1,
    Number.parseInt(
      searchParams.get("articleLimit") ?? String(DEFAULT_ARTICLE_LIMIT),
      10,
    ) || DEFAULT_ARTICLE_LIMIT,
  );
  const articleTypeParam = searchParams.get("articleType") ?? "";
  const articleType = ARTICLE_TYPE_OPTIONS.some(
    (option) => option.value === articleTypeParam,
  )
    ? (articleTypeParam as "" | ArticleTypeFilter)
    : "";

  useEffect(() => {
    setArticleSearchInput(searchParams.get("articleQ") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const currentQuery = searchParams.get("articleQ") ?? "";
    if (currentQuery === deferredArticleSearch) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    if (deferredArticleSearch) {
      nextParams.set("articleQ", deferredArticleSearch);
    } else {
      nextParams.delete("articleQ");
    }
    nextParams.set("articlePage", "1");

    startTransition(() => {
      setSearchParams(nextParams);
    });
  }, [deferredArticleSearch, searchParams, setSearchParams]);

  const { data: articleData, isPending: isArticlePending, isFetching: isArticleFetching, error: articleError, refetch: refetchArticles } =
    useArticles({
      type: articleType || undefined,
      q: deferredArticleSearch || undefined,
      page: articlePage,
      limit: articleLimit,
    });

  const dynasties = [...(data?.data || [])].sort((left, right) => {
    if (left.sort_order !== right.sort_order) {
      return left.sort_order - right.sort_order;
    }

    return left.year_start - right.year_start;
  });
  const total = data?.total ?? 0;
  const articles = articleData?.data || [];
  const articleTotal = articleData?.total ?? 0;
  const articleTotalPages = Math.max(
    1,
    Math.ceil(articleTotal / articleLimit) || 1,
  );

  const updateArticleParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, value);
    });

    setSearchParams(nextParams);
  };

  const handleArticleTypeChange = (value: "" | ArticleTypeFilter) => {
    updateArticleParams({
      articleType: value || null,
      articlePage: "1",
    });
  };

  const handleArticlePageChange = (nextPageValue: number) => {
    updateArticleParams({ articlePage: String(nextPageValue) });
  };

  const goToNextArticlePage = () => {
    if (articlePage < articleTotalPages) {
      handleArticlePageChange(articlePage + 1);
    }
  };

  const goToPrevArticlePage = () => {
    if (articlePage > 1) {
      handleArticlePageChange(articlePage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-4">
      <div className="flex items-center gap-1.5 py-4 text-[11.5px] text-[#6b6b6b] lg:py-5">
        <Link to="/" className="hover:text-[#8B1A1A]">
          Trang chủ
        </Link>
        <span className="opacity-40">›</span>
        <span>Khám phá</span>
      </div>

      <PageSectionHeader subtitle="Lịch Sử" title="Các Triều Đại Việt Nam" />

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

        <section className="overflow-hidden bg-transparent">
          <div className="relative hidden overflow-x-auto pb-4 lg:block">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 " />

            <div className="relative flex min-w-max items-stretch justify-center gap-2 px-2">
              {dynasties.map((dynasty, index) => (
                <DynastyTimelineCard
                  key={dynasty.id}
                  dynasty={dynasty}
                  position={index % 2 === 0 ? "top" : "bottom"}
                />
              ))}
            </div>
          </div>

          <div className="space-y-5 lg:hidden">
            {dynasties.map((dynasty, index) => (
              <Link
                key={dynasty.id}
                to={`/dong-thoi-gian?dynasty=${dynasty.slug}`}
                className="group grid grid-cols-[24px_1fr] gap-4"
              >
                <div className="relative flex justify-center">
                  <div
                    className={`absolute left-1/2 w-px -translate-x-1/2 bg-[#cca339] ${
                      index === dynasties.length - 1 ? "top-0 h-4" : "inset-y-0"
                    }`}
                  />
                  <div className="relative mt-2 h-3 w-3 rounded-full border-2 border-[#f7f2e8] bg-[#9f2020]" />
                </div>

                <div className="overflow-hidden rounded-[3px] border border-[#d8ccb7] bg-white shadow-[0_10px_26px_rgba(63,39,11,0.08)] transition-all duration-300 group-hover:border-[#b8860b] group-hover:shadow-[0_18px_40px_rgba(63,39,11,0.15)]">
                  <div className="border-b border-[#3c2a14] bg-[#1a1208] px-4 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c28a2a]">
                      {dynasty.year_display ||
                        `${dynasty.year_start} - ${dynasty.year_end}`}
                    </div>
                    <h3 className="mt-2 font-['Playfair_Display',serif] text-[28px] font-bold leading-none text-white">
                      {dynasty.name}
                    </h3>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[13px] leading-relaxed text-[#62584d]">
                      {dynasty.description ||
                        "Khám phá các sự kiện tiêu biểu của giai đoạn này trên dòng thời gian lịch sử."}
                    </p>
                    <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
                      Mở dòng thời gian
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[4px] border border-[#e3d7c3] bg-[#fbf8f2] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-5 border-b border-[#e4dac8] pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="font-['Playfair_Display',serif] text-[30px] font-bold text-[#2c2318]">
                Kho Dữ Liệu
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#6c6258]">
                Tìm kiếm và khám phá nhóm bài viết liên quan đến các triều đại,
                nhân vật, sự kiện và không gian lịch sử.
              </p>
            </div>

            <label className="relative block w-full lg:max-w-[300px]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b09b7b]"
                strokeWidth={1.8}
              />
              <input
                value={articleSearchInput}
                onChange={(event) => {
                  setArticleSearchInput(event.target.value);
                }}
                placeholder="Tìm kiếm..."
                className="h-11 w-full border border-[#dccfb9] bg-white pl-10 pr-4 text-[13px] text-[#2c2318] outline-none transition-colors placeholder:text-[#b6a893] focus:border-[#8B1A1A]"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {ARTICLE_TYPE_OPTIONS.map((option) => {
              const isActive = articleType === option.value;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleArticleTypeChange(option.value)}
                  className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "border-[#2b1d0b] bg-[#2b1d0b] text-[#f1d58e]"
                      : "border-[#ddcfb8] bg-white text-[#7a6c57] hover:border-[#b8860b] hover:text-[#8B1A1A]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <QueryStateWrapper
              isLoading={isArticlePending && !articleData}
              error={articleError && !articleData ? articleError : null}
              data={articles}
              emptyMessage="Không có bài viết nào phù hợp với bộ lọc hiện tại"
              loadingMessage="Đang tải kho dữ liệu..."
              onRetry={refetchArticles}
            >
              {isArticleFetching && (
                <div className="mb-4 flex items-center gap-2">
                  <InlineLoader size="sm" />
                  <span className="text-xs italic text-[#6b6b6b]">
                    Đang cập nhật danh sách bài viết...
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} item={article} />
                ))}
              </div>

              {articleTotalPages > 1 && (
                <div className="mt-8">
                  <PaginationControls
                    page={articlePage}
                    totalPages={articleTotalPages}
                    hasNextPage={articlePage < articleTotalPages}
                    hasPreviousPage={articlePage > 1}
                    isLoading={isArticleFetching}
                    onNextPage={goToNextArticlePage}
                    onPrevPage={goToPrevArticlePage}
                    onGoToPage={handleArticlePageChange}
                  />
                </div>
              )}

              <div className="mt-4 text-xs text-[#7e7365]">
                Hiển thị {articles.length} / {articleTotal} bài viết
              </div>
            </QueryStateWrapper>
          </div>
        </section>
      </QueryStateWrapper>
    </div>
  );
}
