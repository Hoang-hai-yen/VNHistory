import { Link, useSearchParams } from "react-router";
import { useMemo } from "react";
import PageSectionHeader from "../components/common/PageSectionHeader";
import FiguresCard from "../components/Figures/FiguresCard";
import { useArticles } from "../hooks/api/useArticles";
import Loading from "../components/common/Loading";

export default function FiguresPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page, limit } = useMemo(() => {
    const pageParam = Number(searchParams.get("page") ?? "1");
    const limitParam = Number(searchParams.get("limit") ?? "8");

    return {
      page: Number.isNaN(pageParam) || pageParam <= 0 ? 1 : pageParam,
      limit: Number.isNaN(limitParam) || limitParam <= 0 ? 8 : limitParam,
    };
  }, [searchParams]);

  const { data, isPending, error, isFetching } = useArticles({
    type: "person",
    limit,
    page,
  });

  const updatePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    params.set("limit", String(limit));
    setSearchParams(params);
  };

  if (isPending && !data) {
    return <Loading message="Đang tải nhân vật..." fullScreen={true} />;
  }

  if (error && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">
          Đã có lỗi xảy ra
        </h2>
        <p className="text-[#6b6b6b] mb-6">
          Không thể tải dữ liệu nhân vật. Vui lòng thử lại sau.
        </p>
        <button
          onClick={() => updatePage(1)}
          className="px-4 py-2 bg-[#8B1A1A] text-white rounded hover:bg-[#B8860B] transition-colors duration-300"
        >
          Thử Lại
        </button>
      </div>
    );
  }

  const figures = data?.data || [];
  const total = data?.total ?? 0;
  const totalPages = total && limit ? Math.max(1, Math.ceil(total / limit)) : 1;

  const canPrev = page > 1;
  const canNext = page < totalPages;

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

      <p className=" text-[13.5px] text-[#6b6b6b] mb-8 font-light italic">
        Click vào thẻ nhân vật để đọc tiểu sử chi tiết. Ảnh chân dung sẽ được
        cập nhật khi có tư liệu.
      </p>

      {isFetching && (
        <div className="mb-4 text-xs text-[#6b6b6b] italic">
          Đang tải thêm nhân vật...
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {figures.map((figure) => (
          <FiguresCard key={figure.id} figure={figure} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 border-t border-[#e0dbd0] pt-6">
          <div className="text-xs text-[#6b6b6b]">
            Trang <span className="font-semibold text-[#1c1c1c]">{page}</span> /{" "}
            <span>{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!canPrev}
              onClick={() => canPrev && updatePage(page - 1)}
              className="px-3 py-1.5 text-xs border border-[#e0dbd0] rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF7] transition-colors"
            >
              Trước
            </button>
            <button
              disabled={!canNext}
              onClick={() => canNext && updatePage(page + 1)}
              className="px-3 py-1.5 text-xs border border-[#e0dbd0] rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF7] transition-colors"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
