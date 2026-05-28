import React, { useState, useMemo } from 'react';
import '../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { highlightText } from '../../utils/highlightText';
import { httpClient } from '../../lib/http';
import { useAdminDashboardQuery } from '../../hooks/api/useAdminDashboard';
import {
  usePublishArticleMutation,
  useRejectArticleMutation,
  useReturnArticleMutation
} from '../../hooks/api/useAdminArticles';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  dynasty: string;
  assignee: string;
  date: string;
  status: string;
  rejection_note?: string;
}



const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Tất cả" | "Sự kiện" | "Nhân vật" | "Di sản" | "Khác"
  >("Tất cả");

  const [showReturnModal, setShowReturnModal] =
    useState(false);

  const [selectedArticleId, setSelectedArticleId] =
    useState('');

  const [returnNote, setReturnNote] =
    useState('');

  const navigate = useNavigate();
  const {searchText} = useSearch();

  const { data: dashboardData } = useAdminDashboardQuery();
  const publishMutation = usePublishArticleMutation();
  const rejectMutation = useRejectArticleMutation();
  const returnMutation = useReturnArticleMutation();

  const stats = dashboardData?.stats || {
    total_published: 0,
    total_pending: 0,
    total_draft: 0,
    total_rejected: 0,
    reports_new: 0,
    reports_reviewing: 0,
    published_today: 0,
    active_admins: 0,
    total_dynasties: 0,
  };

  const contentData = useMemo(() => {
    if (!dashboardData?.recent_articles) return [];
    return dashboardData.recent_articles.map((article: any) => ({
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

      rejection_note:
        article.rejection_note || '',
    }));
  }, [dashboardData]);

  const recentLogs = dashboardData?.recent_logs || [];
  const openReports = dashboardData?.open_reports || [];

  const filteredData =
    activeTab === "Tất cả"
      ? contentData
      : contentData.filter((item) => item.type === activeTab);

  const renderTypeTag = (type: string) => {
    let tagClass = "other";

    if (type === "Sự kiện") tagClass = "event";
    else if (type === "Nhân vật") tagClass = "person";
    else if (type === "Di sản") tagClass = "place";

    return <span className={`tag tag-${tagClass}`}>{type}</span>;
  };

  const renderStatusTag = (status: string) => {
    let className = "status-tag";

    if (status === "Chờ duyệt") className += " status-pending";
    if (status === "Đã xuất bản") className += " status-published";
    if (status === "Bản nháp") className += " status-draft";
    if (status === "Từ chối") className += " status-rejected";

    return <span className={className}>{status}</span>;
  };

  const handleViewPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate('/post-detail', {
        state: {
          article: res.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate('/post-edit', {
        state: {
          article: res.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMutation.mutateAsync(id);
      alert('Xuất bản bài viết thành công!');
    } catch (error) {
      console.log(error);
      alert('Xuất bản thất bại!');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMutation.mutateAsync(id);
      alert('Đã từ chối bài viết!');
    } catch (error) {
      console.log(error);
      alert('Từ chối thất bại!');
    }
  };
  
  const handleOpenReturnModal = (id: string) => {
    setSelectedArticleId(id);
    setReturnNote('');
    setShowReturnModal(true);
  };

  const handleReturn = async () => {
    try {
      await returnMutation.mutateAsync({
        id: selectedArticleId,
        return_note: returnNote,
      });
      alert('Đã trả bài về cho admin');
      setShowReturnModal(false);
    } catch (error) {
      console.log(error);
      alert('Trả bài thất bại');
    }
  };

  const renderActions = (item: ContentItem) => {

      // Pending
      if (item.status === 'Chờ duyệt') {
        return (
          <div className="action-buttons">

            <button
              className="btn btn-view"
              onClick={() =>
                handleViewPost(item.id)
              }
            >
              Xem
            </button>

            <button
              className="btn btn-approve"
              onClick={() =>
                handlePublish(item.id)
              }
            >
              Duyệt & Xuất bản
            </button>

            <button
              className="btn btn-reject"
              onClick={() =>
                handleReject(item.id)
              }
            >
              Từ chối
            </button>
            <button
              className="btn btn-return"
              onClick={() =>
                handleOpenReturnModal(item.id)
              }
            >
              Trả về
            </button>

          </div>
        );
      }

      // Published
      if (item.status === 'Đã xuất bản') {
        return (
          <div className="action-buttons">

            <button
              className="btn btn-view"
              onClick={() => handleViewPost(item.id)}
            >
              Xem
            </button>
            <button
              className="btn btn-edit-pub"
              onClick={() => handleEditPost(item.id)}
            >
              Chỉnh sửa
            </button>
          </div>
        );
      }

      // Draft
      if (item.status === 'Bản nháp') {
        return (
          <div className="action-buttons">

            <button
              className="btn btn-edit-pub"
              onClick={() => handleEditPost(item.id)}
            >
              Chỉnh sửa
            </button>

          </div>
        );
      }

      // Rejected
      if (item.status === 'Từ chối') {
        return (
          <div className="action-buttons">

            {/* <button className="btn btn-reason">
              Lý do
            </button> */}

            {/* <button
              className="btn btn-edit-pub"
              onClick={() => handleEditPost(item.id)}
            >
              Chỉnh sửa
            </button> */}
            <button
              className="btn btn-view"
              onClick={() => handleViewPost(item.id)}
            >
              Xem
            </button>

          </div>
        );
      }

      return null;
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
            <p className="large-stat-value">{stats.total_published}</p>

            <p className="stat-subtext">Đã xuất bản</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>CHỜ XÁC MINH</h3>
          </div>

          <div className="card-body">
            <p className="stat-value">{stats.total_pending}</p>

            <p className="stat-subtext">Bài viết chờ duyệt</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>BÁO CÁO LỖI</h3>
          </div>

          <div className="card-body">
            <p className="stat-value text-danger">{stats.reports_new}</p>

            <p className="stat-subtext">Chờ xử lý</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-header">
            <h3>ĐÃ XUẤT BẢN HÔM NAY</h3>
          </div>

          <div className="card-body">
            <p className="stat-value">{stats.published_today}</p>

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
            {["Tất cả", "Sự kiện", "Nhân vật", "Di sản", "Khác"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
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
                <th>GHI CHÚ</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="title-cell">
                    <p className="main-title">
                      {
                        highlightText(
                          item.title,
                          searchText
                        )
                      }
                    </p>
                  </td>

                  <td>{renderTypeTag(item.type)}</td>

                  <td>{highlightText(item.dynasty, searchText)}</td>

                  <td>{highlightText(item.assignee, searchText)}</td>

                  <td>{highlightText(item.date, searchText)}</td>

                  <td>{renderStatusTag(item.status)}</td>

                  <td>{renderActions(item)}</td>
                  <td className="note-cell">
                    {highlightText(item.rejection_note || '', searchText)}
                  </td>
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
                <div key={report.id} className="report-item">
                  <div className="report-main">
                    <p className="report-title">{report.title}</p>
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
              recentLogs
                .slice(0, 5)
                .map((log: any) => (
                  <div
                    key={log.id}
                    className="activity-item"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flex: 1,
                      }}
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

                    <div
                      style={{
                        fontSize: '12px',
                        color: '#999',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(log.created_at)
                        .toLocaleString('vi-VN')}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>

      {
          showReturnModal && (
          <div className="modal-overlay">

            <div className="return-modal">

              <h3>
                Trả bài về cho Admin
              </h3>

              <textarea
                value={returnNote}
                onChange={(e) =>
                  setReturnNote(
                    e.target.value
                  )
                }
                placeholder="Nhập ghi chú..."
                rows={5}
              />

              <div className="modal-actions">

                <button
                  className="btn-cancel"
                  onClick={() =>
                    setShowReturnModal(
                      false
                    )
                  }
                >
                  Hủy
                </button>

                <button
                  className="btn-confirm-return"
                  onClick={
                    handleReturn
                  }
                >
                  Xác nhận trả về
                </button>

              </div>

            </div>

          </div>
          )}
    </div>
  );
};

export default Dashboard;
