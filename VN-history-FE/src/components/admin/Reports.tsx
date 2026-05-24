import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Reports.css';
import {
  useNavigate
} from 'react-router-dom';
import {
  useSearch
} from '../context/searchContext';
import {
  highlightText
} from '../utils/highlightText';

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
  const [adminNote, setAdminNote] =
    useState<string>('');

    const [activeTab, setActiveTab] =
        useState<
          'new' |
          'reviewing' |
          'resolved' |
          'flagged'
        >('new');

  const [admins, setAdmins] = useState<any[]>([]);
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const handleOpenPostEdit = async () => {
    if (!selectedReport) return;

    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `http://localhost:3000/api/admin/articles/${selectedReport.article_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/post-edit', {
        state: {
          article: res.data.data,
        },
      });

    } catch (error) {
      console.log(error);
      alert('Không thể mở bài viết');
    }
  };
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
      (report) => {

        if (activeTab === 'new') {
          return report.status === 'new';
        }
        if (activeTab === 'reviewing') {
          return report.status === 'reviewing';
        }
        if (activeTab === 'flagged') {
          return report.status === 'flagged';
        }
        if (activeTab === 'resolved') {
          return report.status === 'resolved' || report.status === 'rejected';}
        // return report.status === 'resolved';
      }
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

        case 'reviewing':
          return 'Đang xử lý';

        case 'resolved':
          return 'Đã xử lý';

        case 'flagged':
          return 'Đã gắn cờ';
        case 'rejected':
          return 'Đã từ chối';

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
      (r) =>
        r.status === 'new' ||
        r.status === 'reviewing' ||
        r.status === 'flagged'
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

      useEffect(() => {

      if (
        selectedReport?.assigned_to &&
        admins.length > 0
      ) {
        setSelectedAdmin(
          selectedReport.assigned_to
        );
      }

    }, [selectedReport, admins]);

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

    useEffect(() => {
      if (selectedReport) {
        setAdminNote(
          selectedReport.admin_note || ''
        );
      }
    }, [selectedReport]);

  const handleFlagReport = async () => {

    if (!selectedReport) return;

    try {

      const token =
        localStorage.getItem('token');

      const isFlagged =
        selectedReport.admin_note;

      // Gắn cờ
      if (!isFlagged) {

        await axios.patch(
          `http://localhost:3000/api/admin/reports/${selectedReport.id}/flag`,
          {
            admin_note: adminNote,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert("Đã gắn cờ");
        navigate('/reports');

        setReports(prev =>
          prev.map(report =>
            report.id === selectedReport.id
              ? {
                  ...report,
                  admin_note: adminNote,
                }
              : report
          )
        );

        setSelectedReport(prev =>
          prev
            ? {
                ...prev,
                admin_note: adminNote,
              }
            : null
        );

      }

      // Gỡ cờ
      else {

        await axios.patch(
          `http://localhost:3000/api/admin/reports/${selectedReport.id}/flag`,
          {
            admin_note: null,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert("Đã gỡ cờ");

        setReports(prev =>
          prev.map(report =>
            report.id === selectedReport.id
              ? {
                  ...report,
                  admin_note: null,
                }
              : report
          )
        );

        setSelectedReport(prev =>
          prev
            ? {
                ...prev,
                admin_note: null,
              }
            : null
        );

        setAdminNote('');

      }

    } catch(error) {

      console.log(error);
      alert('Thao tác thất bại');

    }

  };

    const handleResolveReport = async () => {

    if (!selectedReport) return;

    try {

      const token =
        localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/reports/${selectedReport.id}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Đã xử lý báo cáo');

      // cập nhật local state
      setReports(prev =>
        prev.map(report =>
          report.id === selectedReport.id
            ? {
                ...report,
                status: 'resolved',
                resolved_at:
                  new Date().toISOString(),
              }
            : report
        )
      );

      // chuyển sang report tiếp theo nếu có
      const remainingReports =
        reports.filter(
          report =>
            report.id !== selectedReport.id &&
            report.status !== 'resolved'
        );

      setSelectedReport(
        remainingReports.length > 0
          ? remainingReports[0]
          : null
      );

    } catch (error) {

      console.log(error);
      alert(
        'Xử lý báo cáo thất bại'
      );

    }

  };

  const handleRejectReport = async () => {

    if (!selectedReport) return;

    try {

      const token =
        localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/reports/${selectedReport.id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Đã từ chối báo cáo');

      // cập nhật local state
      setReports(prev =>
        prev.map(report =>
          report.id === selectedReport.id
            ? {
                ...report,
                status: 'rejected',
              }
            : report
        )
      );

      // chọn report tiếp theo
      const remainingReports =
        reports.filter(
          report =>
            report.id !== selectedReport.id &&
            report.status !== 'rejected'
        );

      setSelectedReport(
        remainingReports.length > 0
          ? remainingReports[0]
          : null
      );

    } catch (error) {

      console.log(error);
      alert(
        'Từ chối báo cáo thất bại'
      );

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
              activeTab === 'reviewing'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('reviewing')
            }
          >
            ĐANG XỬ LÝ
          </button>
          
          <button
            className={`tab ${
              activeTab === 'flagged'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('flagged')
            }
          >
            ĐÃ GẮN CỜ
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
                  {highlightText(report.error_type, searchText)}
                </div>

                <div className="item-meta">

                  {highlightText(report.article_title, searchText)}

                </div>

                <div className="item-footer">

                  <div className="status-pills">

                    <span className="pill-serious">
                      {highlightText(
                        getSeverityText(report.severity),
                        searchText
                      )}
                    </span>

                  </div>

                  <span className="item-time">

                    {highlightText(
                      new Date(
                        report.created_at
                      ).toLocaleString('vi-VN'),
                      searchText
                    )}

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

              {selectedReport?.status !== 'resolved' &&
                selectedReport?.status !== 'rejected' && (

                <div className="header-actions">

                  <button
                    className="btn-danger"
                    onClick={handleRejectReport}
                  >
                    Từ chối
                  </button>

                  {selectedReport?.status !== 'flagged' && (
                    <button
                      className="btn-warning"
                      onClick={handleFlagReport}
                    >
                      GẮN CỜ
                    </button>
                  )}

                  <button
                    className="btn-info"
                    onClick={handleOpenPostEdit}
                  >
                    Mở bài để sửa
                  </button>

                  <button
                    className="btn-success"
                    onClick={handleResolveReport}
                  >
                    Xử lý xong
                  </button>

                </div>

                )}

            </div>

            <div className="info-grid">

              <div className="info-box">

                <label>TRẠNG THÁI</label>

                <span className="tag-new">

                  {highlightText(
                    getStatusText(
                      selectedReport.status
                    ),
                    searchText
                  )}

                </span>

              </div>

              <div className="info-box">

                <label>MỨC ĐỘ</label>

                <span className="tag-urgent">

                  {highlightText(
                    getSeverityText(
                      selectedReport.severity
                    ),
                    searchText
                  )}

                </span>

              </div>

              <div className="info-box">

                <label>LOẠI LỖI</label>

                <span>
                  {highlightText(selectedReport.error_type, searchText)}
                </span>

              </div>

              <div className="info-box">

                <label>GỬI LÚC</label>

                <span>

                  {highlightText(
                    new Date(
                      selectedReport.created_at
                    ).toLocaleString('vi-VN'),
                    searchText
                  )}

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
                  {highlightText(selectedReport.article_title, searchText)}
                </h4>

                <span className="link-text">

                  lsvn.vn/
                  {highlightText(selectedReport.article_slug, searchText)}

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
                {highlightText(selectedReport.quoted_text, searchText)}
                "

              </blockquote>

            </section>

            <section className="detail-section">

              <label className="gold-text">

                MÔ TẢ LỖI TỪ NGƯỜI DÙNG

              </label>

              <p className="user-comment">

                {highlightText(selectedReport.description, searchText)}

              </p>

            </section>

            <section className="detail-section">

              <label className="gold-text">

                NGUỒN THAM KHẢO
                NGƯỜI DÙNG CUNG CẤP

              </label>

              <div className="source-box">

                {highlightText(selectedReport.suggested_source, searchText)}

              </div>

            </section>

            <div className="sender-grid">

              <div className="info-box">

                <label>NGƯỜI GỬI</label>

                <span>
                  {highlightText(selectedReport.reporter_email, searchText)}
                </span>

              </div>

            </div>

            <section className="detail-section">

              <label className="gold-text">

                GHI CHÚ NỘI BỘ
                (CHỈ ADMIN THẤY)

              </label>

              <textarea
                value={adminNote}
                onChange={(e) =>
                  setAdminNote(
                    e.target.value
                  )
                }
                placeholder={
                  selectedReport.admin_note ||
                  'Thêm ghi chú...'
                }
              />

            </section>

            <div className="detail-footer">
            {selectedReport?.status !== 'resolved' &&
                selectedReport?.status !== 'rejected' && (
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
                  {selectedReport?.assigned_to
                    ? `Đã giao: ${
                        admins.find(
                          (a) =>
                            a.id ===
                            selectedReport.assigned_to
                        )?.full_name || 'Không rõ'
                      }`
                    : '— Chọn moderator —'}
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

            </div> )}

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
