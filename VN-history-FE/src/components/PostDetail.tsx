import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';
import '../styles/Posts.css';

const PostDetail: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article;

  // Nếu không có data
  if (!article) {
    return (
      <div style={{ padding: '40px' }}>
        <h2>Không tìm thấy dữ liệu bài viết</h2>

        <button
          onClick={() => navigate('/posts')}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const renderStatusTag = (status: string) => {

    const statusMap: Record<string, string> = {
        published: 'published',
        pending: 'pending',
        draft: 'draft',
        rejected: 'rejected',
    };

    const statusLabel: Record<string, string> = {
        published: 'Đã xuất bản',
        pending: 'Chờ duyệt',
        draft: 'Bản nháp',
        rejected: 'Từ chối',
    };

    return (
        <span
        className={`status-tag status-${statusMap[status]}`}
        >
        {statusLabel[status]}
        </span>
    );
    };

    const renderTypeTag = (type: string) => {

    let className = 'type-other';
    let label = 'Khác';

    if (type === 'event') {
        className = 'type-event';
        label = 'Sự kiện';
    }

    if (type === 'person') {
        className = 'type-person';
        label = 'Nhân vật';
    }

    if (type === 'place') {
        className = 'type-place';
        label = 'Di sản';
    }

    return (
        <span className={`type-badge ${className}`}>
        {label}
        </span>
    );
    };

  return (
    <div className="create-post-container">

      <div className="create-post-header">

        <h2 className="main-page-title">
          CHI TIẾT BÀI VIẾT
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
              <label>TIÊU ĐỀ</label>

              <input
                type="text"
                value={article.title || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>TIÊU ĐỀ PHỤ</label>

              <input
                type="text"
                value={article.subtitle || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>MÔ TẢ NGẮN</label>

              <textarea
                rows={4}
                value={article.summary || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>NỘI DUNG</label>

              <textarea
                rows={15}
                value={article.content || ''}
                disabled
              />
            </div>

          </section>

          <section className="form-section">

            <h3 className="section-title">
              TRÍCH DẪN
            </h3>

            <textarea
              rows={5}
              value={article.quote || ''}
              disabled
            />

          </section>

        </div>

        {/* RIGHT */}
        <div className="side-panel">

          <div className="side-box">

            <h3 className="side-title">
              THÔNG TIN BÀI VIẾT
            </h3>

            <div className="form-group">
              <label>LOẠI</label>

              <div style={{ marginTop: '10px' }}>
            {renderTypeTag(article.type)}
            </div>
            </div>

            <div className="form-group">
              <label>TRẠNG THÁI</label>

              <div style={{ marginTop: '10px' }}>
                {renderStatusTag(article.status)}
                </div>
            </div>

            <div className="form-group">
              <label>TRIỀU ĐẠI</label>

              <input
                type="text"
                value={article.dynasty_name || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>DANH MỤC</label>

              <input
                type="text"
                value={article.category_name || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>NĂM</label>

              <input
                type="text"
                value={article.year_display || ''}
                disabled
              />
            </div>

            <div className="form-group">
              <label>ẢNH BÌA</label>

              <img
                src={article.cover_image_url}
                alt="cover"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  marginTop: '10px',
                }}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PostDetail;