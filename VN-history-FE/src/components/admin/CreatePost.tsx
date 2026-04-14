import React from "react";
import "../../styles/CreatePost.css";

const CreatePost: React.FC = () => {
  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <h2 className="main-page-title">TẠO BÀI VIẾT MỚI</h2>
      </div>

      <div className="create-post-content">
        {/* CỘT TRÁI: THÔNG TIN CHÍNH */}
        <div className="main-form">
          <section className="form-section">
            <h3 className="section-title">THÔNG TIN CƠ BẢN</h3>

            <div className="form-group">
              <label>
                TIÊU ĐỀ<span className="required">*</span>
              </label>
              <input type="text" placeholder="Nhập tiêu đề bài viết..." />
            </div>

            <div className="form-group">
              <label>TIÊU ĐỀ PHỤ</label>
              <input type="text" placeholder="Nhập tiêu đề phụ (nếu có)..." />
            </div>

            <div className="form-group">
              <label>
                MÔ TẢ NGẮN<span className="required">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Tóm tắt nội dung bài viết..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>
                NỘI DUNG BÀI VIẾT<span className="required">*</span>
              </label>
              <textarea
                rows={12}
                placeholder="Viết nội dung chi tiết tại đây..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">TRÍCH DẪN / NGỮ LIỆU NỔI BẬT</h3>
            <div className="form-group">
              <textarea
                rows={5}
                placeholder="Nhập các trích dẫn quan trọng..."
              ></textarea>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">NGUỒN TÀI LIỆU</h3>
            <div className="form-group">
              <label>
                NGUỒN CHÍNH<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Sách, tài liệu lịch sử chính..."
              />
            </div>
            <div className="form-group">
              <label>NGUỒN BỔ SUNG</label>
              <input
                type="text"
                placeholder="Link tham khảo, tài liệu khác..."
              />
            </div>
            <div className="form-group">
              <label>NGUỒN BỔ SUNG</label>
              <input
                type="text"
                placeholder="Link tham khảo, tài liệu khác..."
              />
            </div>
          </section>
        </div>

        {/* CỘT PHẢI: CẤU HÌNH & PHÂN LOẠI */}
        <div className="side-panel">
          {/* Box Xuất bản */}
          <div className="side-box">
            <h3 className="side-title">XUẤT BẢN</h3>
            <div className="toggle-group">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span className="label-text-gold">Cho phép bình luận</span>
            </div>
            <div className="toggle-group">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span className="label-text-gold">Đánh dấu nổi bật</span>
            </div>

            <div className="publish-actions">
              <button className="btn-save-draft">LƯU BẢN NHÁP</button>
              <button className="btn-publish-now">XUẤT BẢN</button>
            </div>
          </div>

          {/* Box Phân loại */}
          <div className="side-box">
            <h3 className="side-title">
              PHÂN LOẠI<span className="required">*</span>
            </h3>
            <div className="form-group">
              <label>LOẠI NỘI DUNG</label>
              <select>
                <option>Sự kiện</option>
                <option>Nhân vật</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                TRIỀU ĐẠI<span className="required">*</span>
              </label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>
                NĂM / GIAI ĐOẠN<span className="required">*</span>
              </label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>DANH MỤC SỰ KIỆN</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>NHÂN VẬT LIÊN QUAN</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>ĐỊA DANH</label>
              <input type="text" />
            </div>
          </div>

          {/* Box Hiển thị trên */}
          <div className="side-box display-info">
            <h3 className="side-title">HIỂN THỊ TRÊN</h3>
            <p className="meta-hint">
              Dựa vào metadata, bài sẽ tự xuất hiện tại:
            </p>
            <ul className="display-list">
              <li>
                <span className="icon-check">✓</span> Dòng thời gian (năm 938)
              </li>
              <li>
                <span className="icon-check">✓</span> Trang Triều Đại → Nhà Ngô
              </li>
              <li>
                <span className="icon-check">✓</span> Mục Kháng chiến
              </li>
              <li>
                <span className="icon-check">✓</span> Kết quả tìm kiếm
              </li>
              <li>
                <span className="icon-refresh">↻</span> Địa lý & Di tích (chưa
                đủ thông tin)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
