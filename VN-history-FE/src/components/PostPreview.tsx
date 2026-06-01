import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Eye, Calendar, Book, AlertTriangle } from 'lucide-react';

const TYPE_LABEL: Record<string, string> = {
  event: 'Sự kiện',
  person: 'Nhân vật',
  place: 'Di sản',
  culture: 'Văn hóa',
  video: 'Video',
};

const PostPreview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div style={{ padding: 40 }}>
        <p>Không có dữ liệu bài viết.</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      {/* Banner preview */}
      <div style={{
        background: '#1A1208',
        color: '#D4A017',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px',
        fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        borderBottom: '2px solid #D4A017',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Eye size={16} />
          CHẾ ĐỘ XEM TRƯỚC — Bài viết chưa xuất bản sẽ hiển thị như thế này
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => navigate('/post-edit', { state: { article } })}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#D4A017', border: 'none',
              color: '#1A1208', padding: '4px 14px', borderRadius: 4,
              cursor: 'pointer', fontSize: '12px', fontWeight: 'bold',
            }}
          >
            CHỈNH SỬA
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: '1px solid #D4A017',
              color: '#D4A017', padding: '4px 12px', borderRadius: 4,
              cursor: 'pointer', fontSize: '12px',
            }}
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>
      </div>

      {/* Nội dung bài viết theo style public */}
      <div className="bg-[#FDFBF7] min-h-screen text-[#2c2c2c]">

        {/* Cover image */}
        {article.cover_image_url && (
          <div className="w-full h-[400px] overflow-hidden relative">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4A017] mb-2 block">
                {TYPE_LABEL[article.type] || article.type}
              </span>
              <h1 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">

          {/* Title nếu không có ảnh bìa */}
          {!article.cover_image_url && (
            <h1 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-bold text-[#1c1c1c] mb-4">
              {article.title}
            </h1>
          )}

          {article.subtitle && (
            <p className="text-[15px] text-[#B8860B] font-medium uppercase tracking-wider mb-6">
              {article.subtitle}
            </p>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-10 border-b border-[#E8D9B0]">
            {article.year_display && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-1">Thời gian</span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Calendar size={14} className="text-[#8B1A1A]" />
                  <span className="text-[13px]">{article.year_display}</span>
                </div>
              </div>
            )}
            {article.dynasty_name && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-1">Triều đại</span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <Book size={14} className="text-[#8B1A1A]" />
                  <span className="text-[13px]">{article.dynasty_name}</span>
                </div>
              </div>
            )}
            {article.category_name && (
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-1">Chuyên mục</span>
                <div className="flex items-center gap-2 text-[#1c1c1c]">
                  <AlertTriangle size={14} className="text-[#8B1A1A]" />
                  <span className="text-[13px]">{article.category_name}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-1">Loại</span>
              <span className="text-[13px] text-[#1c1c1c]">{TYPE_LABEL[article.type] || article.type}</span>
            </div>
          </div>

          {/* Summary */}
          {article.summary && (
            <p className="text-[16px] text-[#444] leading-relaxed italic mb-10 pl-4 border-l-4 border-[#B8860B]">
              {article.summary}
            </p>
          )}

          {/* Quote */}
          {article.quote && (
            <blockquote className="my-8 p-6 bg-[#F9F5EF] border-l-4 border-[#8B1A1A] rounded-sm">
              <p className="text-[15px] italic text-[#1c1c1c] leading-relaxed">"{article.quote}"</p>
            </blockquote>
          )}

          {/* Nội dung */}
          <div className="prose prose-stone max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="border-l-4 border-[#8B1A1A] pl-4 text-2xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1c1c1c] mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[15px] text-[#2c2c2c] leading-relaxed mb-6">{children}</p>
                ),
                img: ({ src, alt }) => (
                  <img src={src} alt={alt} className="w-full rounded-sm my-6 shadow-md" />
                ),
              }}
            >
              {article.content || ''}
            </ReactMarkdown>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostPreview;
