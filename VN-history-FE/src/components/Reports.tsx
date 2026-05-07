import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Reports.css';

interface ReportItem {
  id: string;
  report_code: string;
  article_id: string;
  error_type: string;
  severity: string;
  quoted_text: string;
  description: string;
  suggested_source: string;
  reporter_email: string;
  status: string;
  assigned_to: string | null;
  admin_note: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  article_title: string;
  article_slug: string;
  // article_type?: string;
}

const Reports: React.FC = () => {

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedReport, setSelectedReport] =
    useState<ReportItem | null>(null);

  const [activeTab, setActiveTab] =
    useState<'new' | 'resolved'>('new');

  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] =
    useState<string>('');

  useEffect(() => {

    const fetchReports = async () => {

      try {

        const token =
          localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:3000/api/admin/reports',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        setReports(res.data.data);

        // mặc định chọn report đầu tiên theo tab
        const defaultReport = res.data.data.find(
          (r: ReportItem) =>
            r.status === 'new'
        );

        if (defaultReport) {
          setSelectedReport(defaultReport);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchReports();

  }, []);

  const filteredReports = reports.filter(
    (report) =>
      activeTab === 'new'
        ? report.status === 'new'
        : report.status === 'resolved'
  );

  useEffect(() => {

    if (
      filteredReports.length > 0 &&
      !filteredReports.find(
        (r) => r.id === selectedReport?.id
      )
    ) {
      setSelectedReport(filteredReports[0]);
    }

  }, [activeTab, reports]);

  const getSeverityText = (
    severity: string
  ) => {

    switch (severity) {
      case 'high':
        return 'Nghiêm trọng';

      case 'medium':
        return 'Trung bình';

      case 'low':
        return 'Bình thường';

      default:
        return severity;
    }
  };

  const getStatusText = (
    status: string
  ) => {

    switch (status) {
      case 'new':
        return 'Mới';

      case 'resolved':
        return 'Đã xử lý';

      default:
        return status;
    }
  };

  // const getCategoryText = (
  //   type?: string
  // ) => {

  //   switch (type) {
  //     case 'event':
  //       return 'Sự kiện';

  //     case 'person':
  //       return 'Nhân vật';

  //     case 'place':
  //       return 'Di sản';

  //     default:
  //       return 'Khác';
  //   }
  // };

  const unresolvedCount = reports.filter(
    (r) => r.status === 'new'
  ).length;

  useEffect(() => {

    const fetchAdmins = async () => {

      try {

        const token =
          localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:3000/api/admin/admins',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('ADMINS');
        console.log(res.data);

        // chỉ lấy admin active
        const activeAdmins =
          res.data.data.filter(
            (admin: any) =>
              admin.is_active === 1
          );

        setAdmins(activeAdmins);

      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmins();

  }, []);

  const handleAssignReport = async () => {

    if (!selectedReport) return;

    if (!selectedAdmin) {
      alert('Vui lòng chọn admin');
      return;
    }

    try {

      const token =
        localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/reports/${selectedReport.id}/assign`,
        {
          admin_id: selectedAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Phân công thành công');

      // cập nhật local state
      setReports((prev) =>
        prev.map((report) =>
          report.id === selectedReport.id
            ? {
                ...report,
                assigned_to: selectedAdmin,
              }
            : report
        )
      );

    } catch (error) {
      console.log(error);
      alert('Phân công thất bại');
    }
  };

  return (
    <div className="reports-page">

      {/* Sidebar */}
      <div className="reports-sidebar">

        <div className="sidebar-header">

          <h3 className="gold-text">
            BÁO CÁO LỖI
          </h3>

          <span className="count-hint">
            {unresolvedCount} chưa xử lý
          </span>

        </div>

        <div className="filter-tabs">

          <button
            className={`tab ${
              activeTab === 'new'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('new')
            }
          >
            MỚI
          </button>

          <button
            className={`tab ${
              activeTab === 'resolved'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('resolved')
            }
          >
            ĐÃ XONG
          </button>

        </div>

        <div className="report-items-list">

          {filteredReports.map((report) => (

            <div
              key={report.id}
              className={`report-item-card ${
                selectedReport?.id === report.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                setSelectedReport(report)
              }
            >

              {selectedReport?.id ===
                report.id && (
                <div className="active-indicator"></div>
              )}

              <div className="item-content">

                <div className="item-title">
                  {report.error_type}
                </div>

                <div className="item-meta">
                  {report.article_title}
                </div>

                <div className="item-footer">

                  <div className="status-pills">

                    <span className="pill-serious">
                      {getSeverityText(
                        report.severity
                      )}
                    </span>

                  </div>

                  <span className="item-time">

                    {new Date(
                      report.created_at
                    ).toLocaleString('vi-VN')}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Detail */}
      <div className="report-detail">

        {selectedReport ? (
          <>

            <div className="detail-header">

              <h2 className="detail-title gold-text">

                Chi tiết báo cáo #
                {selectedReport.report_code}

              </h2>

              <div className="header-actions">

                <button className="btn-danger">
                  Từ chối
                </button>

                <button className="btn-info">
                  Mở bài để sửa
                </button>

                <button className="btn-success">
                  Xử lý xong
                </button>

              </div>

            </div>

            <div className="info-grid">

              <div className="info-box">

                <label>TRẠNG THÁI</label>

                <span className="tag-new">

                  {getStatusText(
                    selectedReport.status
                  )}

                </span>

              </div>

              <div className="info-box">

                <label>MỨC ĐỘ</label>

                <span className="tag-urgent">

                  {getSeverityText(
                    selectedReport.severity
                  )}

                </span>

              </div>

              <div className="info-box">

                <label>LOẠI LỖI</label>

                <span>
                  {selectedReport.error_type}
                </span>

              </div>

              <div className="info-box">

                <label>GỬI LÚC</label>

                <span>

                  {new Date(
                    selectedReport.created_at
                  ).toLocaleString('vi-VN')}

                </span>

              </div>

            </div>

            <section className="detail-section">

              <label className="gold-text">
                BÀI VIẾT LIÊN QUAN
              </label>

              <div className="related-post-card">

                {/* <span className="category-tag">

                  {getCategoryText(
                    selectedReport.article_type
                  )}

                </span> */}

                <h4>
                  {selectedReport.article_title}
                </h4>

                <span className="link-text">

                  lsvn.vn/
                  {selectedReport.article_slug}

                </span>

              </div>

            </section>

            <section className="detail-section">

              <label className="gold-text">

                ĐOẠN NỘI DUNG BỊ LỖI
                (NGƯỜI DÙNG TRÍCH DẪN)

              </label>

              <blockquote className="error-quote">

                "
                {selectedReport.quoted_text}
                "

              </blockquote>

            </section>

            <section className="detail-section">

              <label className="gold-text">

                MÔ TẢ LỖI TỪ NGƯỜI DÙNG

              </label>

              <p className="user-comment">

                {selectedReport.description}

              </p>

            </section>

            <section className="detail-section">

              <label className="gold-text">

                NGUỒN THAM KHẢO
                NGƯỜI DÙNG CUNG CẤP

              </label>

              <div className="source-box">

                {selectedReport.suggested_source}

              </div>

            </section>

            <div className="sender-grid">

              <div className="info-box">

                <label>NGƯỜI GỬI</label>

                <span>
                  {selectedReport.reporter_email}
                </span>

              </div>

            </div>

            <section className="detail-section">

              <label className="gold-text">

                GHI CHÚ NỘI BỘ
                (CHỈ ADMIN THẤY)

              </label>

              <textarea
                defaultValue={
                  selectedReport.admin_note || ''
                }
                placeholder="Thêm ghi chú..."
              ></textarea>

            </section>

            <div className="detail-footer">

            <div className="assign-action">

              <span>Chuyển cho:</span>

              <select
                className="moderator-select"
                value={selectedAdmin}
                onChange={(e) =>
                  setSelectedAdmin(e.target.value)
                }
              >

                <option value="">
                  — Chọn moderator —
                </option>

                {admins.map((admin) => (

                  <option
                    key={admin.id}
                    value={admin.id}
                  >
                    {admin.full_name}
                  </option>

                ))}

              </select>

              <button
                className="btn-gold"
                onClick={handleAssignReport}
              >
                Chuyển
              </button>

            </div>

          </div>

          </>
        ) : (
          <div
            style={{
              padding: '40px',
            }}
          >
            Không có báo cáo
          </div>
        )}

      </div>

    </div>
  );
};

export default Reports;