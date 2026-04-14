import React from "react";
import "../../styles/Reports.css";

const Reports: React.FC = () => {
  return (
    <div className="reports-page">
      {/* Sidebar danh sách báo cáo bên trái */}
      <div className="reports-sidebar">
        <div className="sidebar-header">
          <h3 className="gold-text">BÁO CÁO LỖI</h3>
          <span className="count-hint">8 chưa xử lý</span>
        </div>
        <div className="filter-tabs">
          <button className="tab active">MỚI</button>
          <button className="tab">ĐÃ XONG</button>
        </div>

        <div className="report-items-list">
          <div className="report-item-card">
            {/* Thanh vàng bên trái */}
            <div className="active-indicator"></div>

            <div className="item-content">
              <div className="item-title">
                Ngày tháng Trận Bạch Đằng sai (936→938)
              </div>
              <div className="item-meta">Chiến Thắng Bạch Đằng (938)</div>

              {/* Hàng dưới cùng chứa Pill và Thời gian */}
              <div className="item-footer">
                <div className="status-pills">
                  {/* <span className="pill-new">Mới</span> */}
                  <span className="pill-serious">Nghiêm trọng</span>
                </div>
                <span className="item-time">2 giờ trước</span>
              </div>
            </div>
          </div>
          {/* Lặp lại các item khác tương tự */}
          <div className="report-item-card">
            {/* Thanh vàng bên trái */}
            {/* <div className="active-indicator"></div> */}

            <div className="item-content">
              <div className="item-title">
                Ngày tháng Trận Bạch Đằng sai (936→938)
              </div>
              <div className="item-meta">Chiến Thắng Bạch Đằng (938)</div>

              {/* Hàng dưới cùng chứa Pill và Thời gian */}
              <div className="item-footer">
                <div className="status-pills">
                  {/* <span className="pill-new">Mới</span> */}
                  <span className="pill-serious">Nghiêm trọng</span>
                </div>
                <span className="item-time">2 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chi tiết báo cáo bên phải */}
      <div className="report-detail">
        <div className="detail-header">
          <h2 className="detail-title gold-text">
            Chi tiết báo cáo #BC-2026-0341
          </h2>
          <div className="header-actions">
            <button className="btn-danger">Từ chối</button>
            <button className="btn-info">Mở bài để sửa</button>
            <button className="btn-success">Xử lý xong</button>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <label>TRẠNG THÁI</label>
            <span className="tag-new">Mới</span>
          </div>
          <div className="info-box">
            <label>MỨC ĐỘ</label>
            <span className="tag-urgent">Nghiêm trọng</span>
          </div>
          <div className="info-box">
            <label>LOẠI LỖI</label>
            <span>Ngày tháng sai</span>
          </div>
          <div className="info-box">
            <label>GỬI LÚC</label>
            <span>28/03/2026</span>
          </div>
        </div>

        <section className="detail-section">
          <label className="gold-text">BÀI VIẾT LIÊN QUAN</label>
          <div className="related-post-card">
            <span className="category-tag">SỰ KIỆN</span>
            <h4>Chiến Thắng Bạch Đằng (938)</h4>
            <span className="link-text">lsvn.vn/su-kien/bach-dang-938</span>
          </div>
        </section>

        <section className="detail-section">
          <label className="gold-text">
            ĐOẠN NỘI DUNG BỊ LỖI (NGƯỜI DÙNG TRÍCH DẪN)
          </label>
          <blockquote className="error-quote">
            "Ngô Quyền lãnh đạo quân dân đánh tan quân Nam Hán vào mùa xuân năm{" "}
            <span className="highlight-red">936</span>, kết thúc hơn 1.000 năm
            Bắc thuộc..."
          </blockquote>
        </section>

        <section className="detail-section">
          <label className="gold-text">MÔ TẢ LỖI TỪ NGƯỜI DÙNG</label>
          <p className="user-comment">
            Năm ghi trong bài là 936 nhưng trận Bạch Đằng thực sự diễn ra vào
            năm 938, không phải 936. Sai lệch 2 năm nhưng đây là sự kiện quan
            trọng, cần sửa lại ngay.
          </p>
        </section>

        <section className="detail-section">
          <label className="gold-text">
            NGUỒN THAM KHẢO NGƯỜI DÙNG CUNG CẤP
          </label>
          <div className="source-box">
            Đại Việt Sử Ký Toàn Thư — Quyển V, Kỷ nhà Ngô, trang 112
          </div>
        </section>

        <div className="sender-grid">
          <div className="info-box">
            <label>NGƯỜI GỬI</label>
            <span>Ẩn danh</span>
          </div>
          <div className="info-box">
            <label>EMAIL</label>
            <span className="blue-text">nguyen.t@gmail.com</span>
          </div>
          <div className="info-box">
            <label>SỐ BÁO CÁO ĐÃ GỬI</label>
            <span>3</span>
          </div>
          <div className="info-box">
            <label>ĐỘ TIN CẬY</label>
            <span className="green-text">Cao (2/3 đúng)</span>
          </div>
        </div>

        <section className="detail-section">
          <label className="gold-text">GHI CHÚ NỘI BỘ (CHỈ ADMIN THẤY)</label>
          <textarea placeholder="Thêm ghi chú về quyết định xử lý, nguồn kiểm chứng bổ sung..."></textarea>
        </section>

        <div className="detail-footer">
          <div className="assign-action">
            <span>Chuyển cho:</span>
            <select className="moderator-select">
              <option>— Chọn moderator —</option>
              <option>Trần Thị B (Editor)</option>
              <option>Lê Văn C (Reviewer)</option>
            </select>
            <button className="btn-gold">Chuyển</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
