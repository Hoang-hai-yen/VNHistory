import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Timeline.css';

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

  const [dynasties, setDynasties] = useState<Dynasty[]>([]);
  const [activeDynasty, setActiveDynasty] = useState<Dynasty | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  // =========================
  // FETCH DANH SÁCH TRIỀU ĐẠI
  // =========================
  useEffect(() => {

    const fetchDynasties = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/timeline",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("DYNASTIES:");
        console.log(res.data);

        setDynasties(res.data.data);

        // mặc định chọn triều đại đầu tiên
        if (res.data.data.length > 0) {
          setActiveDynasty(res.data.data[0]);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchDynasties();

  }, []);

  // =========================
  // FETCH EVENTS THEO TRIỀU ĐẠI
  // =========================
  useEffect(() => {

    if (!activeDynasty) return;

    const fetchEvents = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/admin/timeline/${activeDynasty.id}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("EVENTS:");
        console.log(res.data);

        const formattedEvents = res.data.data.map((article: any) => ({

          id: article.id,

          // articles.year_display
          year:
            article.year_display || "",

          // articles.title
          name:
            article.title || "",

          // articles.category_name
          category:
            article.category_name || "",

          // articles.status
          status:
            article.status === "published"
              ? "Xuất bản"
              : article.status === "pending"
              ? "Chờ duyệt"
              : "Bản nháp",

        }));

        setEvents(formattedEvents);

      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();

  }, [activeDynasty]);

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

        {/* SIDEBAR TRIỀU ĐẠI */}
        <aside className="dynasty-sidebar">

          {dynasties.map((d) => (

            <div
              key={d.id}
              className={`dynasty-item ${
                activeDynasty?.id === d.id
                  ? 'active'
                  : ''
              }`}
              onClick={() => setActiveDynasty(d)}
            >

              {/* dynasties.name */}
              <div className="dynasty-name">
                {d.name}
              </div>

              {/* dynasties.year_display */}
              <div className="dynasty-period">
                {d.year_display}
              </div>

            </div>

          ))}

        </aside>

        {/* CONTENT */}
        <main className="event-content">

          <h3 className="content-heading">

            {activeDynasty?.name.toUpperCase()}

            {" - "}

            {/* dynasties.event_count */}
            {activeDynasty?.event_count || 0}

            {" SỰ KIỆN"}

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

                  {/* articles.year_display */}
                  <td className="year-cell">
                    {event.year}
                  </td>

                  {/* articles.title */}
                  <td className="name-cell">
                    {event.name}
                  </td>

                  {/* articles.category_name */}
                  <td>

                    <span className="category-tag">
                      {event.category}
                    </span>

                  </td>

                  {/* articles.status */}
                  <td>

                    <span
                      className={`status-pill pill-${event.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {event.status}
                    </span>

                  </td>

                  {/* ACTION */}
                  <td className="action-cell">

                    {event.status === 'Chờ duyệt' && (
                      <button className="btn-approve">
                        Duyệt
                      </button>
                    )}

                    <button className="btn-edit">
                      Sửa
                    </button>

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