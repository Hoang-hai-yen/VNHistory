import React, { useState } from 'react';
import '../styles/Dashboard.css';

// Kiểu dữ liệu cho bảng nội dung
interface ContentItem {
  id: number;
  title: string;
  subtitle?: string; // Tiêu đề phụ (ví dụ: "Có báo cáo lỗi: Ngày tháng sai")
  type: 'Sự kiện' | 'Nhân vật';
  dynasty: string;
  assignee: string;
  date: string;
  status: 'Chờ duyệt' | 'Đang xem xét' | 'Đã xuất bản' | 'Bản nháp' | 'Từ chối';
}

const Dashboard: React.FC = () => {
  // Trạng thái cho tab filter của bảng
  const [activeTab, setActiveTab] = useState<'TẤT CẢ' | 'SỰ KIỆN' | 'NHÂN VẬT' | 'BÁO CÁO'>('TẤT CẢ');

  // Dữ liệu mẫu cho bảng
  const contentData: ContentItem[] = [
    { id: 1, title: 'Trận Bạch Đằng (938)', type: 'Sự kiện', dynasty: 'Nhà Ngô', assignee: 'Trần Thị B', date: '25/03/2026', status: 'Chờ duyệt' },
    { id: 2, title: 'Nguyễn Trãi — Nhà văn hoá lớn', type: 'Nhân vật', dynasty: 'Lê sơ', assignee: 'Lê Văn C', date: '24/03/2026', status: 'Đang xem xét' },
    { id: 3, title: 'Khởi nghĩa Lam Sơn (1418–1427)', type: 'Sự kiện', dynasty: 'Hậu Lê', assignee: 'Admin', date: '23/03/2026', status: 'Đã xuất bản' },
    { id: 4, title: 'Nhà Trần và kháng chiến Nguyên Mông', subtitle: 'Có báo cáo lỗi: Ngày tháng sai', type: 'Sự kiện', dynasty: 'Trần', assignee: 'Lê Văn C', date: '22/03/2026', status: 'Chờ duyệt' },
    { id: 5, title: 'Đinh Bộ Lĩnh thống nhất đất nước', type: 'Nhân vật', dynasty: 'Đinh', assignee: 'Nguyễn Thị A', date: '21/03/2026', status: 'Bản nháp' },
    { id: 6, title: 'Văn hoá Đông Sơn — nguồn gốc trống đồng', type: 'Sự kiện', dynasty: 'Hùng Vương', assignee: 'Admin', date: '20/03/2026', status: 'Từ chối' },
  ];

  // Hàm helper để render tag loại nội dung
  const renderTypeTag = (type: string) => {
    return <span className={`tag tag-${type === 'Sự kiện' ? 'event' : 'person'}`}>{type}</span>;
  };

  // Hàm helper để render tag trạng thái
  const renderStatusTag = (status: string) => {
    let className = 'status-tag';
    if (status === 'Chờ duyệt') className += ' status-pending';
    if (status === 'Đang xem xét') className += ' status-reviewing';
    if (status === 'Đã xuất bản') className += ' status-published';
    if (status === 'Bản nháp') className += ' status-draft';
    if (status === 'Từ chối') className += ' status-rejected';
    return <span className={className}>{status}</span>;
  };

  // Hàm helper để render các nút hành động
  const renderActions = (item: ContentItem) => {
    switch (item.status) {
      case 'Chờ duyệt':
        return (
          <div className="action-buttons">
            <button className="btn btn-approve">Duyệt</button>
            <button className="btn btn-reject">Từ chối</button>
            <button className="btn btn-edit">Sửa</button>
          </div>
        );
      case 'Đang xem xét':
        return (
          <div className="action-buttons">
            <button className="btn btn-approve">Duyệt</button>
            <button className="btn btn-reject">Từ chối</button>
            <button className="btn btn-edit">Sửa</button>
          </div>
        );
      case 'Đã xuất bản':
        return (
          <div className="action-buttons">
            <button className="btn btn-edit-pub">Chỉnh sửa</button>
            <button className="btn btn-view">Xem</button>
          </div>
        );
      case 'Bản nháp':
        return (
          <div className="action-buttons">
            <button className="btn btn-edit-pub">Chỉnh sửa</button>
            <button className="btn btn-view">Xem</button>
          </div>
        );
      case 'Từ chối':
        return (
          <div className="action-buttons">
            <button className="btn btn-reason">Lý do</button>
            <button className="btn btn-edit-pub">Chỉnh sửa</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      {/* 1. Stat Cards */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="card-header">
            <h3>TỔNG BÀI VIẾT</h3>
          </div>
          <div className="card-body">
            <p className="large-stat-value">1,284</p>
            <p className="stat-subtext"><span className="text-success">↑ +18</span> trong tuần này</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <h3>CHỜ XÁC MINH</h3>
          </div>
          <div className="card-body">
            <p className="stat-value">47</p>
            <p className="stat-subtext"><span className="text-danger">5 ưu tiên cao</span></p>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <h3>BÁO CÁO LỖI</h3>
          </div>
          <div className="card-body">
            <p className="stat-value text-danger">8</p>
            <p className="stat-subtext">Chờ xử lý</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="card-header">
            <h3>ĐÃ XUẤT BẢN HÔM NAY</h3>
          </div>
          <div className="card-body">
            <p className="stat-value">6</p>
            <p className="stat-subtext">Mục tiêu: 10</p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${(6/10) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Table */}
      <section className="content-table-section">
        <div className="section-header">
          <h3>NỘI DUNG CẦN XỬ LÝ</h3>
          <div className="tab-filters">
            {['TẤT CẢ', 'SỰ KIỆN', 'NHÂN VẬT'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="table-container">
          <table className="content-table">
            <thead>
              <tr>
                {/* <th><input type="checkbox" /></th> */}
                <th>TIÊU ĐỀ</th>
                <th>LOẠI</th>
                <th>TRIỀU ĐẠI</th>
                <th>NGƯỜI PHỤ TRÁCH</th>
                <th>NGÀY</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map(item => (
                <tr key={item.id}>
                  {/* <td><input type="checkbox" /></td> */}
                  <td className="title-cell">
                    <p className="main-title">{item.title}</p>
                    {item.subtitle && <p className="sub-title"><span className="text-danger">⚠</span> {item.subtitle}</p>}
                  </td>
                  <td>{renderTypeTag(item.type)}</td>
                  <td>{item.dynasty}</td>
                  <td>
                    {item.assignee === 'Admin' ? (
                      <div className="admin-assignee">Admin </div>
                    ) : (
                      item.assignee
                    )}
                  </td>
                  <td>{item.date}</td>
                  <td>{renderStatusTag(item.status)}</td>
                  <td>{renderActions(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Bottom Section */}
      <section className="bottom-section">
        {/* Left: Recent Error Reports */}
        <div className="reports-column">
          <div className="section-header">
            <h3>BÁO CÁO LỖI GẦN ĐÂY</h3>
            <a href="#" className="view-all-link">Xem tất cả →</a>
          </div>
          <div className="reports-list">
            {[
              { id: 1, title: 'Ngày tháng Trận Bạch Đằng sai (936 → 938)', subtitle: 'Chiến thắng Bạch Đằng (938)', tags: ['Mới', 'Nghiêm trọng'], time: '2 giờ' },
              { id: 2, title: 'Thiếu thông tin Hội Nghị Diên Hồng', subtitle: 'Nhà Trần — kháng chiến Nguyên Mông', tags: ['Đang xem', 'Trung bình'], time: '5 giờ' },
              { id: 3, title: 'Tên địa danh Lam Sơn viết sai', subtitle: 'Khởi nghĩa Lam Sơn (1418–1427)', tags: ['Mới', 'Nhỏ'], time: '1 ngày' },
            ].map(report => (
              <div key={report.id} className="report-item">
                <div className="report-main">
                  <p className="report-title">{report.title}</p>
                  <p className="report-subtitle">{report.subtitle}</p>
                  <div className="report-tags">
                    {report.tags.map(tag => (
                      <span key={tag} className={`report-tag report-tag-${tag.toLowerCase().replace(' ', '-')}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="report-time">{report.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Activity Log */}
        <div className="activity-column">
          <div className="section-header">
            <h3>NHẬT KÝ HOẠT ĐỘNG</h3>
          </div>
          <div className="activity-list">
            {[
              { id: 1, text: 'Xuất bản "Triều đại nhà Lý"', user: 'Nguyễn Minh', time: '30 phút trước', color: '#689f38' },
              { id: 2, text: 'Từ chối báo cáo #BC-0339', user: 'Nguyễn Minh', time: '1 giờ trước', color: '#c62828' },
              { id: 3, text: 'Chỉnh sửa "Trận Đống Đa 1789"', user: 'Trần Thị B', time: '2 giờ trước', color: '#1565c0' },
              { id: 4, text: 'Xuất bản "Vương triều Hùng Vương"', user: 'Lê Văn C', time: '3 giờ trước', color: '#689f38' },
              { id: 5, text: 'Gắn cờ kiểm tra nguồn "Văn Lang"', user: 'Nguyễn Minh', time: '5 giờ trước', color: '#ff8f00' },
            ].map(log => (
              <div key={log.id} className="activity-item">
                <span className="dot" style={{ backgroundColor: log.color }}></span>
                <div className="activity-details">
                  <p className="activity-text">{log.text}</p>
                  <p className="activity-subtext">{log.user} — {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;