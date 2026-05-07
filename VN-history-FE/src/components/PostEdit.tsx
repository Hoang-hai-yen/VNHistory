import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import '../styles/CreatePost.css';
import '../styles/Posts.css';

const PostEdit: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article;

  const [formData, setFormData] = useState({
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

  useEffect(() => {

    if (!article) {
      navigate('/posts');
      return;
    }

    setFormData({
      title: article.title || '',
      subtitle: article.subtitle || '',
      slug: article.slug || '',
      summary: article.summary || '',
      content: article.content || '',
      quote: article.quote || '',
      cover_image_url:
        article.cover_image_url || '',

      type: article.type || 'event',

      year_start: article.year_start || 0,
      year_end: article.year_end || 0,

      year_display:
        article.year_display || '',

      dynasty_id:
        article.dynasty_id || '',

      category_id:
        article.category_id || '',

      is_featured:
        article.is_featured === 1,
    });

  }, [article]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = async () => {

    try {

      const token =
        localStorage.getItem('token');

      await axios.put(
        `http://localhost:3000/api/admin/articles/${article.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Đã lưu bản nháp');

      navigate('/posts');

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitReview = async () => {

    try {

      const token =
        localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/articles/${article.id}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Đã gửi duyệt');

      navigate('/posts');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-post-container">

      <div className="create-post-header">

        <h2 className="main-page-title">
          CHỈNH SỬA BÀI VIẾT
        </h2>

      </div>

      <div className="create-post-content">

        {/* LEFT */}
        <div className="main-form">

          <section className="form-section">

            <h3 className="section-title">
              THÔNG TIN BÀI VIẾT
            </h3>

            <div className="form-group">
              <label>TIÊU ĐỀ</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>TIÊU ĐỀ PHỤ</label>

              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>MÔ TẢ NGẮN</label>

              <textarea
                rows={4}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>NỘI DUNG</label>

              <textarea
                rows={15}
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>TRÍCH DẪN</label>

              <textarea
                rows={5}
                name="quote"
                value={formData.quote}
                onChange={handleChange}
              />
            </div>

          </section>

        </div>

        {/* RIGHT */}
        <div className="side-panel">

          <div className="side-box">

            <h3 className="side-title">
              THÔNG TIN PHỤ
            </h3>

            <div className="form-group">
              <label>LOẠI</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="event">
                  Sự kiện
                </option>

                <option value="person">
                  Nhân vật
                </option>

                <option value="place">
                  Di sản
                </option>

                <option value="place">
                  Khác
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>NĂM HIỂN THỊ</label>

              <input
                type="text"
                name="year_display"
                value={formData.year_display}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ẢNH BÌA</label>

              <input
                type="text"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
              />
            </div>

            {formData.cover_image_url && (
              <img
                src={formData.cover_image_url}
                alt="cover"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  marginTop: '10px',
                }}
              />
            )}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >

              <button
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                LƯU BẢN NHÁP
              </button>

              <button
                className="btn-publish-now"
                onClick={handleSubmitReview}
              >
                GỬI DUYỆT
              </button>

              {/* <button
                className="btn-action"
                onClick={() => navigate(-1)}
              >
                HỦY
              </button> */}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PostEdit;