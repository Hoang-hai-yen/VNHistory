import { Link, useParams } from "react-router";
import remarkGfm from "remark-gfm";
import ArticleHeaderWithImage from "../components/article/ArticleHeaderWithImage";
import {
  Share2,
  Bookmark,
  AlertTriangle,
  Printer,
  Heart,
  MapPin,
  Calendar,
  Book,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import QuickFactsCard from "../components/article/QuickFactsCard";
import ArticleRecommended from "../components/article/ArticleRecommended";
import { useArticleBySlug } from "../hooks/api/useArticles";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import ReactMarkdown from "react-markdown";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const {
    data: articleData,
    isLoading,
    error,
    refetch,
  } = useArticleBySlug(slug || "");

  // Get cover image

  // Get previous and next articles from related
  const prevArticle = articleData?.related?.find(
    (r) => r.relation_type === "previous",
  );
  const nextArticle = articleData?.related?.find(
    (r) => r.relation_type === "next",
  );

  return (
    <QueryStateWrapper
      isLoading={isLoading}
      error={error}
      data={articleData}
      emptyMessage="Bài viết không tồn tại"
      loadingMessage="Đang tải bài viết..."
      onRetry={refetch}
    >
      <div className="bg-[#FDFBF7] min-h-screen text-[#2c2c2c] selection:bg-[#F5C842] selection:text-[#1c1c1c]">
        {/* Top Header Image Area */}
        <ArticleHeaderWithImage article={articleData!} />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] mb-8 lg:mb-12">
            <Link to="/" className="hover:text-[#8B1A1A]">
              Trang Chủ
            </Link>
            <span className="opacity-40">›</span>
            <Link to="/bai-viet" className="hover:text-[#8B1A1A]">
              Bài Viết
            </Link>
            <span className="opacity-40">›</span>
            {articleData?.category_name && (
              <>
                <span className="hover:text-[#8B1A1A] cursor-pointer">
                  {articleData.category_name}
                </span>
                <span className="opacity-40">›</span>
              </>
            )}
            <span className="text-[#1c1c1c] font-medium line-clamp-1">
              {articleData?.title}
            </span>
          </div>

          {/* Article Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12 pb-12 border-b border-[#E8D9B0]">
            {/* Publication Date */}
            <div className="flex flex-col">
              <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                Ngày Đăng
              </span>
              <div className="flex items-center gap-2 text-[#1c1c1c]">
                <Calendar size={16} className="text-[#8B1A1A]" />
                <span className="text-[13px] font-medium">
                  {articleData?.published_at
                    ? new Date(articleData.published_at).toLocaleDateString(
                        "vi-VN",
                      )
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Time Period */}
            {(articleData?.year_start || articleData?.year_end) && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Thời Kỳ
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Calendar size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.year_start && articleData.year_end
                      ? `${articleData.year_start} - ${articleData.year_end}`
                      : articleData.year_start || articleData.year_end || "N/A"}
                  </span>
                </div>
              </div>
            )}

            {/* Dynasty */}
            {articleData?.dynasty_name && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Triều Đại
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Book size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.dynasty_name}
                  </span>
                </div>
              </div>
            )}

            {/* Category */}
            {articleData?.category_name && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Chuyên Mục
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <AlertTriangle size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.category_name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* Main Content Area */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-stone max-w-none"
            >
              {/* Reading Tools Bar */}
              <div className="flex items-center justify-between border-y border-[#E8D9B0] py-4 mb-12 sticky top-4 z-10 bg-[#FDFBF7]/90 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#1c1c1c] uppercase tracking-wider hover:text-[#8B1A1A] transition-colors">
                    <Heart size={16} /> Lưu bài viết
                  </button>
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#1c1c1c] uppercase tracking-wider hover:text-[#8B1A1A] transition-colors">
                    <Share2 size={16} /> Chia sẻ
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-[#F5E0B0] rounded-full transition-colors">
                    <Printer size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#F5E0B0] rounded-full transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>

              {/* Text Content */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mt-12 mb-6">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-[15px] text-[#2c2c2c] leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                }}
              >
                {articleData?.content || ""}
              </ReactMarkdown>

              {/* Places Section */}
              {articleData?.places && articleData.places.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#E8D9B0]">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mb-6">
                    Địa Điểm Liên Quan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articleData.places.map((place) => (
                      <div
                        key={place.id}
                        className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all group"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <MapPin
                            size={20}
                            className="text-[#8B1A1A] shrink-0 mt-0.5"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-[#1c1c1c] text-[14px] group-hover:text-[#8B1A1A] transition-colors">
                              {place.place_name}
                            </h4>
                            <p className="text-[12px] text-[#6b6b6b] mt-1">
                              {place.province} • {place.place_type}
                            </p>
                            {place.unesco_status && (
                              <p className="text-[11px] text-[#B8860B] font-medium mt-2">
                                ✓ Di sản UNESCO
                              </p>
                            )}
                          </div>
                        </div>
                        {place.latitude && place.longitude && (
                          <a
                            href={`https://maps.google.com/?q=${place.latitude},${place.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#8B1A1A] font-medium hover:underline"
                          >
                            Xem trên bản đồ →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources Section */}
              {articleData?.sources && articleData.sources.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#E8D9B0]">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mb-6">
                    Tài Liệu Tham Khảo
                  </h3>
                  <div className="space-y-4">
                    {articleData.sources.map((source) => (
                      <div
                        key={source.id}
                        className="p-4 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <Book
                            size={18}
                            className="text-[#8B1A1A] shrink-0 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-[#1c1c1c] text-[13px] group-hover:text-[#8B1A1A] transition-colors line-clamp-2">
                              {source.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-[#6b6b6b]">
                              {source.author && (
                                <span className="flex items-center gap-1">
                                  <User size={12} />
                                  {source.author}
                                </span>
                              )}
                              {source.publisher && (
                                <>
                                  <span>•</span>
                                  <span>{source.publisher}</span>
                                </>
                              )}
                              {source.year && (
                                <>
                                  <span>•</span>
                                  <span>{source.year}</span>
                                </>
                              )}
                            </div>
                            {source.url && (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-[#8B1A1A] font-medium hover:underline mt-2 inline-block"
                              >
                                Xem nguồn →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="mt-20 pt-10 border-t border-[#E8D9B0] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#8B1A1A] text-[#FDFBF7] rounded-full flex items-center justify-center font-bold text-xl">
                    LS
                  </div>
                  <div>
                    <div className="text-[12px] text-[#6b6b6b]">
                      Biên tập bởi
                    </div>
                    <div className="text-[14px] font-bold text-[#1c1c1c]">
                      Ban biên tập Lịch Sử Việt Nam
                    </div>
                  </div>
                </div>

                <Link
                  to={`/bao-cao-loi?article_id=${articleData?.id}`}
                  className="flex items-center gap-2 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 px-4 py-2 rounded-sm border border-dashed border-[#8B1A1A] text-[13px] font-bold transition-all"
                >
                  <AlertTriangle size={16} /> Báo cáo lỗi nội dung
                </Link>
              </div>

              {/* Related/Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {prevArticle ? (
                  <Link
                    to={`/bai-viet/${prevArticle.slug}`}
                    className="p-6 border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all text-left group"
                  >
                    <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                      ← Bài trước đó
                    </div>
                    <div className="text-lg font-['Playfair_Display',serif] group-hover:text-[#8B1A1A]">
                      {prevArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 border border-[#E8D9B0]/30 rounded-sm bg-[#F9F5EF]/50 opacity-50">
                    <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                      ← Bài trước đó
                    </div>
                    <div className="text-lg font-['Playfair_Display',serif] text-[#6b6b6b]">
                      Không có bài viết trước
                    </div>
                  </div>
                )}

                {nextArticle ? (
                  <Link
                    to={`/bai-viet/${nextArticle.slug}`}
                    className="p-6 border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all text-right group"
                  >
                    <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                      Tiếp theo →
                    </div>
                    <div className="text-lg font-['Playfair_Display',serif] group-hover:text-[#8B1A1A]">
                      {nextArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 border border-[#E8D9B0]/30 rounded-sm bg-[#F9F5EF]/50 opacity-50">
                    <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                      Tiếp theo →
                    </div>
                    <div className="text-lg font-['Playfair_Display',serif] text-[#6b6b6b]">
                      Không có bài viết tiếp theo
                    </div>
                  </div>
                )}
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-10">
              {/* Quick Facts Card */}
              <QuickFactsCard article={articleData!} />

              {/* Recommended Reading */}
              <ArticleRecommended article={articleData!} />

              {/* Tags/Categories */}
              {articleData?.category_name && (
                <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                  <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                    Chuyên Mục
                  </h4>
                  <div className="space-y-2">
                    <span className="inline-block text-[13px] bg-[#8B1A1A] text-white px-3 py-1.5 rounded-full font-medium hover:bg-[#B8860B] transition-colors">
                      {articleData.category_name}
                    </span>
                  </div>
                </div>
              )}

              {/* Article Type Badge */}
              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Loại Bài Viết
                </h4>
                <div className="space-y-2">
                  <span className="inline-block text-[13px] bg-[#B8860B]/20 text-[#8B1A1A] px-3 py-1.5 rounded-full font-medium">
                    {articleData?.type === "event"
                      ? "Sự Kiện"
                      : articleData?.type === "person"
                        ? "Nhân Vật"
                        : articleData?.type === "place"
                          ? "Địa Điểm"
                          : articleData?.type === "culture"
                            ? "Văn Hóa"
                            : "Video"}
                  </span>
                </div>
              </div>

              {/* Share Section */}
              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Chia Sẻ
                </h4>
                <div className="flex gap-2">
                  <button className="p-3 bg-white border border-[#E8D9B0] rounded-full hover:bg-[#F5C842]/10 transition-colors">
                    <Share2 size={16} className="text-[#8B1A1A]" />
                  </button>
                  <button className="p-3 bg-white border border-[#E8D9B0] rounded-full hover:bg-[#F5C842]/10 transition-colors">
                    <Heart size={16} className="text-[#8B1A1A]" />
                  </button>
                  <button className="p-3 bg-white border border-[#E8D9B0] rounded-full hover:bg-[#F5C842]/10 transition-colors">
                    <Bookmark size={16} className="text-[#8B1A1A]" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </QueryStateWrapper>
  );
}
