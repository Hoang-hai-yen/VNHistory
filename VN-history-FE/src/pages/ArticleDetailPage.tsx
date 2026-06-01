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


  return (
    <QueryStateWrapper
      isLoading={isLoading}
      error={error}
      data={articleData}
      emptyMessage="Bài viết không tồn tại"
      loadingMessage="Đang tải bài viết ..."
      onRetry={refetch}
    >
      <div className="bg-[#FDFBF7] min-h-screen text-[#2c2c2c] selection:bg-[#F5C842] selection:text-[#1c1c1c]">
        <ArticleHeaderWithImage article={articleData!} />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] mb-8 lg:mb-12">
            <Link to="/" className="hover:text-[#8B1A1A]">
              Trang chủ
            </Link>
            <span className="opacity-40">{"\u203a"}</span>
            <Link to="/bai-viet" className="hover:text-[#8B1A1A]">
              Bài viết
            </Link>
            <span className="opacity-40">{"\u203a"}</span>
            {articleData?.display.category_label && (
              <>
                <span className="hover:text-[#8B1A1A] cursor-pointer">
                  {articleData.display.category_label}
                </span>
                <span className="opacity-40">{"\u203a"}</span>
              </>
            )}
            <span className="text-[#1c1c1c] font-medium line-clamp-1">
              {articleData?.title}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12 pb-12 border-b border-[#E8D9B0]">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                Ngày phát hành
              </span>
              <div className="flex items-center gap-2 text-[#1c1c1c]">
                <Calendar size={16} className="text-[#8B1A1A]" />
                <span className="text-[13px] font-medium">
                  {articleData?.display.published_at_label || "N/A"}
                </span>
              </div>
            </div>

            {articleData?.display.period_label && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Thời gian
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Calendar size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.display.period_label}
                  </span>
                </div>
              </div>
            )}

            {articleData?.display.dynasty_label && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Triều đại
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Book size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.display.dynasty_label}
                  </span>
                </div>
              </div>
            )}

            {articleData?.display.category_label && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                  Chuyên mục
                </span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <AlertTriangle size={16} className="text-[#8B1A1A]" />
                  <span className="text-[13px] font-medium">
                    {articleData.display.category_label}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-stone max-w-none"
            >
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

              <div className="text-2xl font-semibold">{articleData?.title}</div>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="border-l-4 border-primary pl-4 text-h2 font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-[15px] text-[#2c2c2c] leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  img: ({ src, alt }) => (
                    <span className="block text-center my-6">
                      <img src={src} alt={alt} className="inline-block max-w-full rounded-sm shadow-md" />
                      {alt && <span className="block text-[12px] text-[#888] italic mt-2">{alt}</span>}
                    </span>
                  ),
                }}
              >
                {articleData?.content || ""}
              </ReactMarkdown>

              {articleData?.places && articleData.places.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#E8D9B0]">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mb-6">
                    Bài viết liên quan
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
                              {place.province} {"\u2022"} {place.place_type}
                            </p>
                            {place.unesco_status && (
                              <p className="text-[11px] text-[#B8860B] font-medium mt-2">
                                {"\u2713"} Di s\u1ea3n UNESCO
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
                            Xem thêm {"\u2192"}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {articleData?.sources && articleData.sources.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#E8D9B0]">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mb-6">
                    Tư liệu tham khảo
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
                                  <span>{"\u2022"}</span>
                                  <span>{source.publisher}</span>
                                </>
                              )}
                              {source.year && (
                                <>
                                  <span>{"\u2022"}</span>
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
                                Xem ngay {"\u2192"}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                      Ban biên tập lịch sử Việt Nam
                    </div>
                  </div>
                </div>

                <Link
                  to={`/bao-cao-loi?article_id=${articleData?.id}&article_slug=${articleData?.slug}`}
                  state={{
                    article: {
                      id: articleData?.id,
                      slug: articleData?.slug,
                      title: articleData?.title,
                      typeLabel: articleData?.display.type_label,
                      categoryLabel: articleData?.display.category_label,
                    },
                  }}
                  className="flex items-center gap-2 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 px-4 py-2 rounded-sm border border-dashed border-[#8B1A1A] text-[13px] font-bold transition-all"
                >
                  <AlertTriangle size={16} /> Báo cáo lỗi hoặc góp ý
                </Link>
              </div>
            </motion.article>

            <aside className="space-y-10">
              <QuickFactsCard article={articleData!} />
              <ArticleRecommended article={articleData!} />

              {articleData?.display.category_label && (
                <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                  <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                    Chuyên mục
                  </h4>
                  <div className="space-y-2">
                    <span className="inline-block text-[13px] bg-[#8B1A1A] text-white px-3 py-1.5 rounded-full font-medium hover:bg-[#B8860B] transition-colors">
                      {articleData.display.category_label}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Loại bài viết
                </h4>
                <div className="space-y-2">
                  <span className="inline-block text-[13px] bg-[#B8860B]/20 text-[#8B1A1A] px-3 py-1.5 rounded-full font-medium">
                    {articleData?.display.type_label}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Chia sẻ
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
