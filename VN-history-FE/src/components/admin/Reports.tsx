import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/Reports.css';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { highlightText } from '../../utils/highlightText';
import { httpClient } from '../../lib/http';
import { useAdminAdminsQuery } from '../../hooks/api/useAdminAdmins';
import {
  useAdminReportsQuery,
  useAssignReportMutation,
  useFlagReportMutation,
  useResolveReportMutation,
  useRejectReportMutation,
  useSaveReportNoteMutation,
  useMarkFixedReportMutation,
} from '../../hooks/api/useAdminReports';
import { usePermissions } from '../../context/PermissionContext';



const Reports: React.FC = () => {
  const { isSuperAdmin } = usePermissions();
  const { data: reports = [] } = useAdminReportsQuery();
  const { data: adminsRaw = [] } = useAdminAdminsQuery();

  const assignReportMutation = useAssignReportMutation();
  const flagReportMutation = useFlagReportMutation();
  const resolveReportMutation = useResolveReportMutation();
  const rejectReportMutation = useRejectReportMutation();
  const saveNoteMutation = useSaveReportNoteMutation();
  const markFixedMutation = useMarkFixedReportMutation();

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'new' | 'reviewing' | 'fixed' | 'resolved' | 'flagged'>('new');
  const [selectedAdmin, setSelectedAdmin] = useState<string>('');

  const navigate = useNavigate();
  const { searchText } = useSearch();

  const admins = useMemo(() => {
    return adminsRaw.filter((admin: any) => admin.is_active === 1);
  }, [adminsRaw]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      if (activeTab === 'new') return report.status === 'new';
      if (activeTab === 'reviewing') return report.status === 'reviewing';
      if (activeTab === 'flagged') return report.status === 'flagged';
      if (activeTab === 'fixed') return report.status === 'fixed';
      if (activeTab === 'resolved') return report.status === 'resolved' || report.status === 'rejected';
      return false;
    });
  }, [reports, activeTab]);

  const selectedReport = useMemo(() => {
    if (!reports.length) return null;
    if (selectedReportId) {
      return reports.find((r) => r.id === selectedReportId) || null;
    }
    return filteredReports[0] || null;
  }, [reports, selectedReportId, filteredReports]);

  // Sync selectedAdmin with selectedReport.assigned_to when selectedReport changes
  useEffect(() => {
    if (selectedReport?.assigned_to) {
      setSelectedAdmin(selectedReport.assigned_to);
    } else {
      setSelectedAdmin('');
    }
    if (selectedReport) {
      setAdminNote(selectedReport.admin_note || '');
    } else {
      setAdminNote('');
    }
  }, [selectedReport]);

  const handleOpenPostEdit = async () => {
    if (!selectedReport) return;
    try {
      const res = await httpClient.get<any>(`/admin/articles/${selectedReport.article_id}`);
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

  const getSeverityText = (severity: string) => {
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

  const getStatusText = (status: string) => {
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

  const unresolvedCount = useMemo(() => {
    return reports.filter(
      (r) =>
        r.status === 'new' ||
        r.status === 'reviewing' ||
        r.status === 'flagged'
    ).length;
  }, [reports]);

  const handleAssignReport = async () => {
    if (!selectedReport) return;
    if (!selectedAdmin) {
      alert('Vui lòng chọn admin');
      return;
    }
    try {
      await assignReportMutation.mutateAsync({
        id: selectedReport.id,
        admin_id: selectedAdmin,
      });
      alert('Phân công thành công');
    } catch (error) {
      console.log(error);
      alert('Phân công thất bại');
    }
  };

  const handleFlagReport = async () => {
    if (!selectedReport) return;
    try {
      const isFlagged = !!selectedReport.admin_note;
      if (!isFlagged) {
        await flagReportMutation.mutateAsync({
          id: selectedReport.id,
          admin_note: adminNote,
        });
        alert("Đã gắn cờ");
      } else {
        await flagReportMutation.mutateAsync({
          id: selectedReport.id,
          admin_note: null,
        });
        alert("Đã gỡ cờ");
      }
    } catch (error) {
      console.log(error);
      alert('Thao tác thất bại');
    }
  };

  const handleResolveReport = async () => {
    if (!selectedReport) return;
    try {
      await resolveReportMutation.mutateAsync({ id: selectedReport.id, admin_note: adminNote || undefined });
      alert('Đã xử lý báo cáo');
    } catch (error) {
      console.log(error);
      alert('Xử lý báo cáo thất bại');
    }
  };

  const handleSaveNote = async () => {
    if (!selectedReport) return;
    try {
      await saveNoteMutation.mutateAsync({ id: selectedReport.id, admin_note: adminNote });
      alert('Đã lưu ghi chú');
    } catch (error) {
      alert('Lưu ghi chú thất bại');
    }
  };

  const handleMarkFixed = async () => {
    if (!selectedReport) return;
    try {
      await markFixedMutation.mutateAsync({ id: selectedReport.id, admin_note: adminNote || undefined });
      alert('Đã đánh dấu sửa xong, chờ super admin xác nhận');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Thất bại');
    }
  };

  const handleRejectReport = async () => {
    if (!selectedReport) return;
    try {
      await rejectReportMutation.mutateAsync(selectedReport.id);
      alert('Đã từ chối báo cáo');
    } catch (error) {
      console.log(error);
      alert('Từ chối báo cáo thất bại');
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
            className={`tab ${activeTab === 'reviewing' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviewing')}
          >
            ĐANG XỬ LÝ
          </button>

          {isSuperAdmin && (
            <button
              className={`tab ${activeTab === 'fixed' ? 'active' : ''}`}
              onClick={() => setActiveTab('fixed')}
            >
              CHỜ XÁC NHẬN
            </button>
          )}

          <button
            className={`tab ${activeTab === 'flagged' ? 'active' : ''}`}
            onClick={() => setActiveTab('flagged')}
          >
            ĐÃ GẮN CỜ
          </button>

          <button
            className={`tab ${activeTab === 'resolved' ? 'active' : ''}`}
            onClick={() => setActiveTab('resolved')}
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
                setSelectedReportId(report.id)
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

                  {/* Admin được giao: chỉ thấy Mở bài sửa + Đã sửa xong */}
                  {!isSuperAdmin && selectedReport?.status === 'reviewing' && (
                    <>
                      <button className="btn-info" onClick={handleOpenPostEdit}>
                        Mở bài để sửa
                      </button>
                      <button className="btn-success" onClick={handleMarkFixed}>
                        ĐÃ SỬA XONG
                      </button>
                    </>
                  )}

                  {/* Super admin: toàn quyền */}
                  {isSuperAdmin && (
                    <>
                      <button className="btn-danger" onClick={handleRejectReport}>
                        Từ chối
                      </button>
                      {selectedReport?.status !== 'flagged' && selectedReport?.status !== 'fixed' && (
                        <button className="btn-warning" onClick={handleFlagReport}>
                          GẮN CỜ
                        </button>
                      )}
                      <button className="btn-info" onClick={handleOpenPostEdit}>
                        Mở bài để sửa
                      </button>
                      {selectedReport?.status === 'fixed' && (
                        <button className="btn-success" onClick={handleResolveReport}>
                          XÁC NHẬN XONG
                        </button>
                      )}
                      {selectedReport?.status !== 'fixed' && (
                        <button className="btn-success" onClick={handleResolveReport}>
                          Xử lý xong
                        </button>
                      )}
                    </>
                  )}

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
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder={selectedReport.admin_note || 'Thêm ghi chú...'}
                style={{ color: '#333', background: '#fff' }}
              />
              <button
                className="btn-gold"
                style={{ marginTop: '8px' }}
                onClick={handleSaveNote}
                disabled={saveNoteMutation.isPending}
              >
                {saveNoteMutation.isPending ? 'Đang lưu...' : 'Lưu ghi chú'}
              </button>

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
