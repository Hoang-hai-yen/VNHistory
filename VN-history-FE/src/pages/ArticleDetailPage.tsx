import { Link } from "react-router";
import ArticleHeaderWithImage from "../componets/article/ArticleHeaderWithImage";
import type { Article } from "../types/article.type";
import { Share2, Bookmark, AlertTriangle, Printer, Heart } from "lucide-react";
import { motion } from "motion/react";
import QuickFactsCard from "../componets/article/QuickFactsCard";
import ArticleRecommended from "../componets/article/ArticleRecommended";

const article: Article = {
  id: "550e8400-e29b-41d4-a716-446655440000",

  // Basic info
  title: "Chiến thắng Bạch Đằng năm 938",
  subtitle: "Ngô Quyền đánh bại quân Nam Hán",
  slug: "chien-thang-bach-dang-938",
  summary:
    "Trận Bạch Đằng năm 938 là chiến thắng lịch sử của Ngô Quyền trước quân Nam Hán, mở ra thời kỳ độc lập lâu dài cho dân tộc Việt Nam.",
  content: `
## Bối cảnh
Sau khi Kiều Công Tiễn phản bội, vua Nam Hán đem quân xâm lược nước ta.

## Diễn biến
Ngô Quyền đã cho đóng cọc gỗ dưới lòng sông Bạch Đằng...

## Kết quả
Quân Nam Hán đại bại, Hoằng Tháo tử trận.
  `,
  quote: "Đây là trận thủy chiến mang tính quyết định trong lịch sử Việt Nam.",

  // Classification
  type: "event",
  category_id: "cat-001",
  dynasty_id: "dynasty-ngo",

  // Timeline
  year_start: 938,
  year_end: 938,
  year_display: "Năm 938",

  // Workflow
  status: "published",
  rejection_note: null,

  // UI control
  is_featured: true,
  allow_comments: true,

  // Metadata
  view_count: 12543,

  // Audit
  created_by: "admin-001",
  updated_by: "admin-002",
  published_by: "admin-002",

  published_at: "2024-01-10T08:00:00Z",

  created_at: "2024-01-01T10:00:00Z",
  updated_at: "2024-01-10T08:00:00Z",
};

export default function ArticleDetailPage() {
  // const { id } = useParams();
  // loading

  if (!article)
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#8B1A1A]">
        Đang tải...
      </div>
    );

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#2c2c2c] selection:bg-[#F5C842] selection:text-[#1c1c1c]">
      {/* Top Header Image Area */}
      <ArticleHeaderWithImage article={article} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
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
            <div
              className="font-['Source_Serif_4',serif] text-lg lg:text-xl text-[#2c2c2c] leading-[1.8] article-content"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />

            {/* Bottom Actions */}
            <div className="mt-20 pt-10 border-t border-[#E8D9B0] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8B1A1A] text-[#FDFBF7] rounded-full flex items-center justify-center font-bold text-xl">
                  LS
                </div>
                <div>
                  <div className="text-[12px] text-[#6b6b6b]">Biên tập bởi</div>
                  <div className="text-[14px] font-bold text-[#1c1c1c]">
                    Ban biên tập Lịch Sử Việt Nam
                  </div>
                </div>
              </div>

              <Link
                to="/bao-cao-loi"
                className="flex items-center gap-2 text-[#8B1A1A] hover:bg-[#8B1A1A]/5 px-4 py-2 rounded-sm border border-dashed border-[#8B1A1A] text-[13px] font-bold transition-all"
              >
                <AlertTriangle size={16} /> Báo cáo lỗi nội dung
              </Link>
            </div>

            {/* Related/Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              <button className="p-6 border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all text-left group">
                <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                  Bài trước đó
                </div>
                <div className="text-lg font-['Playfair_Display',serif] group-hover:text-[#8B1A1A]">
                  Hành trình mở mang bờ cõi phương Nam
                </div>
              </button>
              <button className="p-6 border border-[#E8D9B0] rounded-sm hover:border-[#8B1A1A] transition-all text-right group">
                <div className="text-[10px] text-[#6b6b6b] uppercase tracking-widest mb-1">
                  Tiếp theo
                </div>
                <div className="text-lg font-['Playfair_Display',serif] group-hover:text-[#8B1A1A]">
                  Kiến trúc cung đình Huế qua các thời kỳ
                </div>
              </button>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Quick Facts Card */}
            <QuickFactsCard article={article} />

            {/* Recommended Reading */}
            <ArticleRecommended />

            {/* Tags/Categories */}
            <div className="p-6 bg-[#F9F5EF] border border-[#E8D9B0] rounded-sm">
              <h4 className="text-[11px] font-bold text-[#1c1c1c] uppercase tracking-widest mb-4">
                Từ khóa liên quan
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Lịch sử",
                  "Văn hóa",
                  "Quân sự",
                  "Độc lập",
                  "Triều đại",
                  "Kháng chiến",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#E8D9B0]/30 text-[#8a7a4a] px-2 py-1 rounded-sm hover:bg-[#E8D9B0] cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
