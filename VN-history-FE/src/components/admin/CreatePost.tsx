import React, { useState } from 'react';
import '../../styles/CreatePost.css';
import { useAdminTimelineQuery } from '../../hooks/api/useAdminTimeline';
import { useCategories } from '../../hooks/api/useCategories';
import { useCreateArticleMutation } from '../../hooks/api/useAdminArticles';

interface FormData {
  title: string;
  subtitle: string;
  slug: string;
  summary: string;
  content: string;
  quote: string;
  cover_image_url: string;
  type: string;
  year_start: number;
  year_end: number;
  year_display: string;
  dynasty_id: string;
  category_id: string;
  is_featured: boolean;
}

const CreatePost: React.FC = () => {
  const { data: dynastiesRaw = [] } = useAdminTimelineQuery();
  const { data: categoriesRaw } = useCategories();
  const createArticleMutation = useCreateArticleMutation();

  const dynasties = dynastiesRaw.map(d => ({ id: d.id, name: d.name }));
  const categories = categoriesRaw?.data || [];

  const loading = createArticleMutation.isPending;

  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    slug: '',
    summary: '',
    content: '',
    quote: '',
    cover_image_url: '',
    type: 'event',
    year_start: 0,
    year_end: 0,
    year_display: '',
    dynasty_id: '',
    category_id: '',
    is_featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const createArticle = async () => {
    try {
      await createArticleMutation.mutateAsync({
        ...formData,
        status: 'draft',
      });

      alert('Tạo bài viết thành công!');
    } catch (error) {
      console.log(error);
      alert('Tạo bài viết thất bại!');
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h2 className="main-page-title">
          TẠO BÀI VIẾT MỚI
        </h2>
      </div>

      <div className="create-post-content">

        {/* LEFT */}
        <div className="main-form">

          <section className="form-section">
            <h3 className="section-title">
              THÔNG TIN CƠ BẢN
            </h3>

            <div className="form-group">
              <label>
                TIÊU ĐỀ
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            <div className="form-group">
              <label>TIÊU ĐỀ PHỤ<span className="required">*</span></label>
              

              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Nhập tiêu đề phụ..."
              />
            </div>

            <div className="form-group">
              <label>ĐƯỜNG DẪN<span className="required">*</span></label>
              

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                MÔ TẢ NGẮN
                <span className="required">*</span>
              </label>

              <textarea
                rows={3}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Tóm tắt nội dung..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>
                NỘI DUNG
                <span className="required">*</span>
              </label>

              <div style={{ marginBottom: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Nhập URL ảnh:');
                    if (!url) return;
                    const alt = prompt('Mô tả ảnh (alt text):', '') || '';
                    const markdown = `\n![${alt}](${url})\n`;
                    const ta = document.querySelector<HTMLTextAreaElement>('textarea[name="content"]');
                    if (!ta) return;
                    const start = ta.selectionStart;
                    const end = ta.selectionEnd;
                    const newContent = formData.content.slice(0, start) + markdown + formData.content.slice(end);
                    setFormData(prev => ({ ...prev, content: newContent }));
                    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + markdown.length; }, 0);
                  }}
                  style={{ padding: '4px 12px', fontSize: '12px', border: '1px solid #C5A028', borderRadius: '4px', background: 'transparent', color: '#C5A028', cursor: 'pointer' }}
                >
                  🖼 Chèn ảnh
                </button>
              </div>

              <textarea
                rows={12}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Nhập nội dung bài viết..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">
              TRÍCH DẪN
              <span className="required">*</span>
            </h3>

            <div className="form-group">
              <textarea
                rows={5}
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Nhập trích dẫn..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">
              ẢNH BÌA
            </h3>

            <div className="form-group">
              <label>URL ẢNH<span className="required">*</span></label>

              <input
                type="text"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="side-panel">

          {/* Publish */}
          <div className="side-box">
            <h3 className="side-title">
              LƯU BÀI VIẾT
            </h3>

            <div className="toggle-group">
              <label className="switch">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                />

                <span className="slider"></span>
              </label>

              <span className="label-text-gold">
                Đánh dấu nổi bật
              </span>
            </div>

            <div className="publish-actions">
              <button
                className="btn-save-draft"
                onClick={createArticle}
                disabled={loading}
              >
                {loading
                  ? 'ĐANG LƯU...'
                  : 'LƯU BẢN NHÁP'}
              </button>
            </div>
          </div>

          {/* Classification */}
          <div className="side-box">
            <h3 className="side-title">
              PHÂN LOẠI
            </h3>

            <div className="form-group">
              <label>LOẠI NỘI DUNG<span className="required">*</span></label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="event">Sự kiện</option>
                <option value="person">Nhân vật</option>
                <option value="place">Di sản</option>
                <option value="culture">Văn hóa</option>
                <option value="video">Video / Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                TRIỀU ĐẠI<span className="required">*</span>
              </label>

              <select
                name="dynasty_id"
                value={formData.dynasty_id}
                onChange={handleChange}
              >
                <option value="">
                  Chọn triều đại
                </option>

                {dynasties.map((dynasty) => (
                  <option
                    key={dynasty.id}
                    value={dynasty.id}
                  >
                    {dynasty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>DANH MỤC<span className="required">*</span></label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">
                  Chọn danh mục
                </option>

                {categories
                  .filter((category) => {

                    // Nếu là "Khác" → hiện tất cả
                    if (formData.type === 'video') {
                      return true;
                    }

                    // Các loại khác → lọc đúng article_type
                    return category.article_type === formData.type;
                  })
                  .map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>NĂM BẮT ĐẦU<span className="required">*</span></label>

              <input
                type="number"
                name="year_start"
                value={formData.year_start}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>NĂM KẾT THÚC<span className="required">*</span></label>

              <input
                type="number"
                name="year_end"
                value={formData.year_end}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>HIỂN THỊ NĂM<span className="required">*</span></label>

              <input
                type="text"
                name="year_display"
                value={formData.year_display}
                onChange={handleChange}
                placeholder="VD: 938 hoặc 1418–1427"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
