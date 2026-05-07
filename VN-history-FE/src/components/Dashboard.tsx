import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  dynasty: string;
  assignee: string;
  date: string;
  status: string;
}

interface Stats {
  total_published: number;
  total_pending: number;
  total_draft: number;
  total_rejected: number;
  reports_new: number;
  reports_reviewing: number;
  published_today: number;
  active_admins: number;
  total_dynasties: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
  'Tất cả' | 'Sự kiện' | 'Nhân vật' | 'Di sản' | 'Khác'
>('Tất cả');

  const [stats, setStats] = useState<Stats>({
    total_published: 0,
    total_pending: 0,
    total_draft: 0,
    total_rejected: 0,
    reports_new: 0,
    reports_reviewing: 0,
    published_today: 0,
    active_admins: 0,
    total_dynasties: 0,
  });

  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [openReports, setOpenReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:3000/api/admin/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        const dashboardData = res.data.data;

        setStats(dashboardData.stats);

        const formattedArticles = dashboardData.recent_articles.map(
          (article: any) => ({
            id: article.id,
            title: article.title,
            type:
              article.type === 'event'
                ? 'Sự kiện'
                : article.type === 'person'
                ? 'Nhân vật'
                : article.type === 'place'
                ? 'Di sản'
                : 'Khác',

            dynasty: article.dynasty_name,
            assignee: article.created_by_name,

            date: new Date(
              article.published_at || article.created_at
            ).toLocaleDateString('vi-VN'),

            status:
              article.status === 'published'
                ? 'Đã xuất bản'
                : article.status === 'pending'
                ? 'Chờ duyệt'
                : article.status === 'draft'
                ? 'Bản nháp'
                : 'Từ chối',
          })
        );

        setContentData(formattedArticles);

        setRecentLogs(dashboardData.recent_logs || []);
        setOpenReports(dashboardData.open_reports || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const filteredData =
  activeTab === 'Tất cả'
    ? contentData
    : contentData.filter(
        (item) => item.type === activeTab
      );

  const renderTypeTag = (type: string) => {
    let tagClass = 'other';

    if (type === 'Sự kiện') tagClass = 'event';
    else if (type === 'Nhân vật') tagClass = 'person';
    else if (type === 'Di sản') tagClass = 'place';

    return (
      <span className={`tag tag-${tagClass}`}>
        {type}
      </span>
    );
  };

  const renderStatusTag = (status: string) => {
    let className = 'status-tag';

    if (status === 'Chờ duyệt') className += ' status-pending';
    if (status === 'Đã xuất bản') className += ' status-published';
    if (status === 'Bản nháp') className += ' status-draft';
    if (status === 'Từ chối') className += ' status-rejected';

    return <span className={className}>{status}</span>;
  };

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

      case 'Đã xuất bản':
        return (
          <div className="action-buttons">
            <button className="btn btn-edit-pub">
              Chỉnh sửa
            </button>

            <button className="btn btn-view">Xem</button>
          </div>
        );

      case 'Bản nháp':
        return (
          <div className="action-buttons">
            <button className="btn btn-edit-pub">
              Chỉnh sửa
            </button>

            <button className="btn btn-view">Xem</button>
          </div>
        );

      case 'Từ chối':
        return (
          <div className="action-buttons">
            <button className="btn btn-reason">Lý do</button>

            <button className="btn btn-edit-pub">
              Chỉnh sửa
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">

      {/* Stats */}
      <section className="stats-section">

        <div className="stat-card">
          <div className="card-header">
            <h3>TỔNG BÀI VIẾT</h3>
          </div>

          <div className="card-body">
            <p className="large-stat-value">
              {stats.total_published}
            </p>

            <p className="stat-subtext">
              Đã xuất bản
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>CHỜ XÁC MINH</h3>
          </div>

          <div className="card-body">
            <p className="stat-value">
              {stats.total_pending}
            </p>

            <p className="stat-subtext">
              Bài viết chờ duyệt
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>BÁO CÁO LỖI</h3>
          </div>

          <div className="card-body">
            <p className="stat-value text-danger">
              {stats.reports_new}
            </p>

            <p className="stat-subtext">
              Chờ xử lý
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>ĐÃ XUẤT BẢN HÔM NAY</h3>
          </div>

          <div className="card-body">
            <p className="stat-value">
              {stats.published_today}
            </p>

            {/* <p className="stat-subtext">
              Admin hoạt động: {stats.active_admins}
            </p> */}

            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(stats.published_today / 10) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="content-table-section">
        <div className="section-header">
          <h3>NỘI DUNG CẦN XỬ LÝ</h3>

          <div className="tab-filters">
            {[
              'Tất cả',
              'Sự kiện',
              'Nhân vật',
              'Di sản',
              'Khác',
            ].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${
                  activeTab === tab ? 'active' : ''
                }`}
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
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="title-cell">
                    <p className="main-title">
                      {item.title}
                    </p>
                  </td>

                  <td>{renderTypeTag(item.type)}</td>

                  <td>{item.dynasty}</td>

                  <td>{item.assignee}</td>

                  <td>{item.date}</td>

                  <td>
                    {renderStatusTag(item.status)}
                  </td>

                  <td>{renderActions(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom */}
      <section className="bottom-section">

        {/* Reports */}
        <div className="reports-column">
          <div className="section-header">
            <h3>BÁO CÁO LỖI GẦN ĐÂY</h3>
          </div>

          <div className="reports-list">

            {openReports.length === 0 ? (
              <p>Không có báo cáo lỗi</p>
            ) : (
              openReports.map((report: any) => (
                <div
                  key={report.id}
                  className="report-item"
                >
                  <div className="report-main">
                    <p className="report-title">
                      {report.title}
                    </p>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Logs */}
        <div className="activity-column">
          <div className="section-header">
            <h3>NHẬT KÝ HOẠT ĐỘNG</h3>
          </div>

          <div className="activity-list">

            {recentLogs.length === 0 ? (
              <p>Không có hoạt động gần đây</p>
            ) : (
              recentLogs.map((log: any) => (
                <div
                  key={log.id}
                  className="activity-item"
                >
                  <span className="dot"></span>

                  <div className="activity-details">
                    <p className="activity-text">
                      {log.action}
                    </p>

                    <p className="activity-subtext">
                      {log.admin_name}
                    </p>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;