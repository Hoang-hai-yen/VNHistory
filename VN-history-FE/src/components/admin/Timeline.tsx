import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Timeline.css';
import { highlightText } from '../../utils/highlightText';
import { useSearch } from '../../context/SearchContext';
import { httpClient } from '../../lib/http';
import { useAdminTimelineQuery, useAdminTimelineEventsQuery } from '../../hooks/api/useAdminTimeline';

interface Dynasty {
  id: string;
  name: string;
  year_display: string;
  event_count: number;
}

interface TimelineEvent {
  id: string;
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

  const events = useMemo(() => {
    return rawEvents.map((article: any) => ({
      id: article.article_id || article.id,
      year: article.year_display || '',
      name: article.title || '',
      category: article.category_name || '',
      status:
        article.status === 'published'
          ? 'Đã xuất bản'
          : article.status === 'pending'
          ? 'Chờ duyệt'
          : article.status === 'draft'
          ? 'Bản nháp'
          : 'Từ chối',
    }));
  }, [rawEvents]);

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

  // =========================
  // ACTIONS
  // =========================
  const renderActions = (
    item: TimelineEvent
  ) => {

    // Pending
    if (item.status === 'Chờ duyệt') {

      return (
        <div className="action-buttons">

          <button className="btn btn-approve">
            Duyệt & Xuất bản
          </button>

          <button className="btn btn-reject">
            Từ chối
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
            onClick={() =>
              handleViewPost(item.id)
            }
          >
            Xem
          </button>

        </div>
      );
    }

    // Draft
    if (item.status === 'Bản nháp') {

      return (
        <div className="action-buttons">

          <button className="btn btn-edit-pub">
            Chỉnh sửa
          </button>

        </div>
      );
    }

    // Rejected
    if (item.status === 'Từ chối') {

      return (
        <div className="action-buttons">

          <button className="btn btn-reason">
            Lý do
          </button>

          <button className="btn btn-edit-pub">
            Chỉnh sửa
          </button>

        </div>
      );
    }

    return null;
  };

  return (

    <div className="timeline-page">

      {/* HEADER */}
      <div className="timeline-header">

        <h2 className="page-title">
          QUẢN LÝ TIMELINE
        </h2>

        <button className="btn-add-event">
          + THÊM SỰ KIỆN
        </button>

      </div>

      <div className="timeline-container">

        {/* SIDEBAR */}
        <aside className="dynasty-sidebar">

          {dynasties.map((d) => (

            <div
              key={d.id}
              className={`dynasty-item ${
                activeDynasty?.id === d.id
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setActiveDynastyState(d)
              }
            >

              <div className="dynasty-name">
                {highlightText(d.name, searchText)}
              </div>

              <div className="dynasty-period">
                {highlightText(d.year_display, searchText)}
              </div>

            </div>

          ))}

        </aside>

        {/* CONTENT */}
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

                  <td className="year-cell">
                    {highlightText(event.year, searchText)}
                  </td>

                  <td className="name-cell">
                    {highlightText(event.name, searchText)}
                  </td>

                  <td>

                    <span className="category-tag">
                      {highlightText(event.category, searchText)}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`status-pill pill-${event.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {highlightText(event.status, searchText)}
                    </span>

                  </td>

                  <td>
                    {renderActions(event)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </main>

      </div>

    </div>
  );
};

export default Timeline;
