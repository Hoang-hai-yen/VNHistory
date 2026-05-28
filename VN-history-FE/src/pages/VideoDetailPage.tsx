import { Link, useParams } from "react-router";
import remarkGfm from "remark-gfm";
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
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import QuickFactsCard from "../components/article/QuickFactsCard";
import { useArticleBySlug, useArticles } from "../hooks/api/useArticles";
import QueryStateWrapper from "../components/States/QueryStateWrapper";
import ReactMarkdown from "react-markdown";
import videoPlaceholder from "../assets/Image/BG.png";

// Component con hiển thị danh sách video đề xuất
function VideoRecommendations({ currentSlug }: { currentSlug: string }) {
  const { data } = useArticles({ type: "video", limit: 6 });
  const videos = (data?.data || [])
    .filter((v) => v.slug !== currentSlug)
    .slice(0, 4);

  if (videos.length === 0) return null;

  return (
    <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
      <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
        Video Tư Liệu Khác
      </h4>
      <div className="space-y-4">
        {videos.map((v) => {
          const imageSrc = v.cover_image_url || videoPlaceholder;
          return (
            <Link
              key={v.id}
              to={`/video/${v.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-24 aspect-video bg-[#1A1208] overflow-hidden shrink-0 border border-[#E8D9B0]/60">
                <img
                  src={imageSrc}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={14} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-[12.5px] text-[#1c1c1c] group-hover:text-[#8B1A1A] transition-colors line-clamp-2 leading-snug">
                  {v.title}
                </h5>
                <span className="text-[10px] text-[#6b6b6b] block mt-1">
                  {v.display.published_at_label || "Mới đây"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Trợ thủ phân tích và lấy URL nhúng của YouTube
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes("youtube.com/embed/") || url.includes("youtube-nocookie.com/embed/")) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return null;
}

export default function VideoDetailPage() {
  const { slug } = useParams();
  const {
    data: articleData,
    isLoading,
    error,
    refetch,
  } = useArticleBySlug(slug || "");

  const videoMedia = articleData?.media?.find((m) => m.media_type === "video");
  const videoUrl = videoMedia?.url || "";
  const isYouTube =
    videoUrl.includes("youtube.com") ||
    videoUrl.includes("youtu.be") ||
    videoUrl.includes("youtube-nocookie.com");

  return (
    <QueryStateWrapper
      isLoading={isLoading}
      error={error}
      data={articleData}
      emptyMessage="Video tư liệu không tồn tại"
      loadingMessage="Đang tải video..."
      onRetry={refetch}
    >
      <div className="bg-[#FDFBF7] min-h-screen text-[#2c2c2c] selection:bg-[#F5C842] selection:text-[#1c1c1c] pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-[#6b6b6b] mb-6">
            <Link to="/" className="hover:text-[#8B1A1A]">
              Trang chủ
            </Link>
            <span className="opacity-40">{"\u203a"}</span>
            <Link to="/video" className="hover:text-[#8B1A1A]">
              Thư viện video
            </Link>
            <span className="opacity-40">{"\u203a"}</span>
            <span className="text-[#1c1c1c] font-medium line-clamp-1">
              {articleData?.title}
            </span>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video w-full max-w-5xl mx-auto bg-black rounded-lg overflow-hidden border border-[#E8D9B0] shadow-2xl mb-10">
            {videoUrl ? (
              isYouTube ? (
                <iframe
                  src={getYouTubeEmbedUrl(videoUrl) || videoUrl}
                  title={articleData?.title}
                  className="w-full h-full border-0 absolute top-0 left-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  poster={articleData?.cover_image_url || undefined}
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/50 gap-2">
                <Play size={40} className="opacity-30" />
                <span className="text-sm font-['Playfair_Display',serif]">
                  Không tìm thấy tệp hoặc đường dẫn video tư liệu
                </span>
              </div>
            )}
          </div>

          {/* Details layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-stone max-w-none"
            >
              {/* Actions sticky bar */}
              <div className="flex items-center justify-between border-y border-[#E8D9B0] py-4 mb-8 bg-[#FDFBF7]/90 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-[12px] font-bold text-[#1c1c1c] uppercase tracking-wider hover:text-[#8B1A1A] transition-colors">
                    <Heart size={16} /> Lưu video
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

              {/* Title & Subtitle */}
              <h1 className="font-['Playfair_Display',serif] text-3xl lg:text-5xl font-black text-[#1c1c1c] leading-tight mb-4">
                {articleData?.title}
              </h1>

              {articleData?.subtitle && (
                <p className="font-['Source_Serif_4',serif] text-lg font-light text-[#6b6b6b] mb-6 italic leading-relaxed">
                  {articleData.subtitle}
                </p>
              )}

              {/* Short Summary inside gold-bordered card */}
              {articleData?.summary && (
                <div className="p-6 bg-[#F9F5EF] border-l-4 border-[#8B1A1A] mb-8 text-[15px] italic text-[#2c2c2c] leading-relaxed border border-[#E8D9B0] border-y-1 border-r-1 rounded-r-md">
                  {articleData.summary}
                </div>
              )}

              {/* Full Description (Markdown) */}
              <div className="text-[15.5px] text-[#2c2c2c] leading-relaxed mb-6 font-['Source_Serif_4',serif]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className="border-l-4 border-[#8B1A1A] pl-4 text-h2 font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-[15.5px] text-[#2c2c2c] leading-relaxed mb-6">
                        {children}
                      </p>
                    ),
                  }}
                >
                  {articleData?.content || ""}
                </ReactMarkdown>
              </div>

              {/* Related Places */}
              {articleData?.places && articleData.places.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#E8D9B0]">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mb-6">
                    Địa danh liên quan
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
                                {"\u2713"} Di sản UNESCO
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
                            Xem bản đồ {"\u2192"}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reference Sources */}
              {articleData?.sources && articleData.sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#E8D9B0]">
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
                                Xem tư liệu gốc {"\u2192"}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editor credit & Report error button */}
              <div className="mt-16 pt-8 border-t border-[#E8D9B0] flex flex-col md:flex-row md:items-center justify-between gap-6">
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

            {/* Sidebar Column */}
            <aside className="space-y-8 lg:space-y-10">
              <QuickFactsCard article={articleData!} />

              {articleData?.display.dynasty_label && (
                <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                  <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                    Triều đại liên hệ
                  </h4>
                  <span className="inline-block text-[13px] bg-[#8B1A1A] text-white px-3 py-1.5 rounded-full font-medium hover:bg-[#B8860B] transition-colors">
                    {articleData.display.dynasty_label}
                  </span>
                </div>
              )}

              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Loại nội dung
                </h4>
                <span className="inline-block text-[13px] bg-[#B8860B]/20 text-[#8B1A1A] px-3 py-1.5 rounded-full font-medium">
                  {articleData?.display.type_label}
                </span>
              </div>

              {/* Sidebar Video Recommendations */}
              <VideoRecommendations currentSlug={articleData!.slug} />

              {/* Share Box */}
              <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
                <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                  Chia sẻ video
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
