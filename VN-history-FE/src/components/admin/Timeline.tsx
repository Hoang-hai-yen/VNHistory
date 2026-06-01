import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Timeline.css';
import { highlightText } from '../../utils/highlightText';
import { useSearch } from '../../context/SearchContext';
import { httpClient } from '../../lib/http';
import {
  useAdminTimelineQuery,
  useAdminTimelineEventsQuery,
  useAddTimelineEventMutation,
  useRemoveTimelineEventMutation,
} from '../../hooks/api/useAdminTimeline';
import { usePublishArticleMutation, useRejectArticleMutation } from '../../hooks/api/useAdminArticles';
import { useAdminArticlesQuery } from '../../hooks/api/useAdminArticles';

interface Dynasty {
  id: string;
  name: string;
  year_display: string;
  year_start: number;
  year_end: number;
  event_count: number;
}

interface TimelineEvent {
  id: string;
  eventId: string;
  year: string;
  name: string;
  category: string;
  status: string;
}

const Timeline: React.FC = () => {
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const { data: dynasties = [] } = useAdminTimelineQuery();
  const [activeDynastyState, setActiveDynastyState] = useState<Dynasty | null>(null);
  const activeDynasty = activeDynastyState || dynasties[0] || null;

  const { data: rawEvents = [] } = useAdminTimelineEventsQuery(activeDynasty?.id || "");
  const publishMutation = usePublishArticleMutation();
  const rejectMutation = useRejectArticleMutation();
  const addEventMutation = useAddTimelineEventMutation(activeDynasty?.id || "");
  const removeEventMutation = useRemoveTimelineEventMutation(activeDynasty?.id || "");

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [note, setNote] = useState('');

  // Load published articles để chọn khi thêm
  const { data: publishedArticles = [] } = useAdminArticlesQuery({ status: 'published', limit: 200 });

  const events = useMemo(() => {
    return rawEvents.map((article: any) => ({
      id: article.article_id || article.id,
      eventId: article.id,
      year: article.year_display || '',
      name: article.title || '',
      category: article.category_name || '',
      status:
        article.status === 'published' ? 'Đã xuất bản'
        : article.status === 'pending' ? 'Chờ duyệt'
        : article.status === 'draft' ? 'Bản nháp'
        : 'Từ chối',
    }));
  }, [rawEvents]);

  // IDs đã có trong timeline để lọc khỏi danh sách chọn
  const existingArticleIds = useMemo(() => new Set(events.map(e => e.id)), [events]);

  const availableArticles = useMemo(() => {
    return (publishedArticles as any[])
      .filter((a) => {
        if (existingArticleIds.has(a.id)) return false;
        if (!activeDynasty) return true;
        const ys = activeDynasty.year_start;
        const ye = activeDynasty.year_end;
        // Lọc bài viết nằm trong khoảng thời gian của triều đại
        if (ys != null && ye != null) {
          return a.year_start >= ys && a.year_start <= ye;
        }
        return true;
      })
      .sort((a, b) => (a.year_start ?? 0) - (b.year_start ?? 0));
  }, [publishedArticles, existingArticleIds, activeDynasty]);

  const handleViewPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate('/post-preview', { state: { article: res.data.data } });
    } catch (error) { console.log(error); }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMutation.mutateAsync(id);
      alert("Xuất bản thành công");
    } catch (error: any) {
      alert(error.response?.data?.message || "Xuất bản thất bại");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMutation.mutateAsync(id);
      alert("Đã từ chối");
    } catch (error: any) {
      alert(error.response?.data?.message || "Từ chối thất bại");
    }
  };

  const handleEditPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate('/post-edit', { state: { article: res.data.data } });
    } catch (error) { console.log(error); }
  };

  const handleRemoveEvent = async (eventId: string) => {
    if (!window.confirm("Xóa sự kiện này khỏi timeline?")) return;
    try {
      await removeEventMutation.mutateAsync(eventId);
      alert("Đã xóa khỏi timeline");
    } catch (error: any) {
      alert(error.response?.data?.message || "Xóa thất bại");
    }
  };

  const handleAddEvent = async () => {
    if (!selectedArticleId) { alert("Vui lòng chọn bài viết"); return; }
    try {
      await addEventMutation.mutateAsync({ article_id: selectedArticleId, note });
      alert("Đã thêm vào timeline");
      setShowAddModal(false);
      setSelectedArticleId('');
      setNote('');
    } catch (error: any) {
      alert(error.response?.data?.message || "Thêm thất bại");
    }
  };

  const renderActions = (item: TimelineEvent) => {
    return (
      <div className="action-buttons">
        {item.status === 'Chờ duyệt' && (
          <>
            <button className="btn btn-approve" onClick={() => handlePublish(item.id)}>Duyệt & Xuất bản</button>
            <button className="btn btn-reject" onClick={() => handleReject(item.id)}>Từ chối</button>
          </>
        )}
        {item.status === 'Đã xuất bản' && (
          <button className="btn btn-view" onClick={() => handleViewPost(item.id)}>Xem</button>
        )}
        {(item.status === 'Bản nháp' || item.status === 'Từ chối') && (
          <button className="btn btn-edit-pub" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
        )}
        <button className="btn btn-reject" onClick={() => handleRemoveEvent(item.eventId)}>Xóa</button>
      </div>
    );
  };

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h2 className="page-title">QUẢN LÝ TIMELINE</h2>
        <button className="btn-add-event" onClick={() => setShowAddModal(true)}>
          + THÊM SỰ KIỆN
        </button>
      </div>

      <div className="timeline-container">
        <aside className="dynasty-sidebar">
          {dynasties.map((d) => (
            <div
              key={d.id}
              className={`dynasty-item ${activeDynasty?.id === d.id ? 'active' : ''}`}
              onClick={() => setActiveDynastyState(d)}
            >
              <div className="dynasty-name">{highlightText(d.name, searchText)}</div>
              <div className="dynasty-period">{highlightText(d.year_display, searchText)}</div>
            </div>
          ))}
        </aside>

        <main className="event-content">
          <h3 className="content-heading">
            {highlightText(activeDynasty?.name?.toUpperCase() || "", searchText)}
            {' - '}
            {highlightText(activeDynasty?.event_count?.toString() || '0', searchText)}
            {' SỰ KIỆN'}
          </h3>

          <table className="timeline-table">
            <thead>
              <tr>
                <th>NĂM</th>
                <th>SỰ KIỆN</th>
                <th>DANH MỤC</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="year-cell">{highlightText(event.year, searchText)}</td>
                  <td className="name-cell">{highlightText(event.name, searchText)}</td>
                  <td><span className="category-tag">{highlightText(event.category, searchText)}</span></td>
                  <td>
                    <span className={`status-pill pill-${event.status.toLowerCase().replace(' ', '-')}`}>
                      {highlightText(event.status, searchText)}
                    </span>
                  </td>
                  <td>{renderActions(event)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 className="modal-title" style={{ color: '#C5A028', fontSize: '14px' }}>
              THÊM SỰ KIỆN VÀO TIMELINE — {activeDynasty?.name?.toUpperCase()}
            </h3>

            <div className="form-group">
              <label>Chọn bài viết</label>
              <select
                value={selectedArticleId}
                onChange={(e) => setSelectedArticleId(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '6px' }}
              >
                <option value="">— {availableArticles.length} bài trong khoảng thời gian này —</option>
                {availableArticles.map((a: any) => (
                  <option key={a.id} value={a.id}>
                    {a.title} ({a.year_display || ''})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '12px' }}>
              <label>Ghi chú (tùy chọn)</label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú..."
                style={{ width: '100%', marginTop: '6px' }}
              />
            </div>

            <div className="modal-actions" style={{ marginTop: '16px' }}>
              <button
                className="btn-save"
                onClick={handleAddEvent}
                disabled={addEventMutation.isPending}
              >
                {addEventMutation.isPending ? 'ĐANG THÊM...' : 'THÊM'}
              </button>
              <button className="btn-cancel" onClick={() => setShowAddModal(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
