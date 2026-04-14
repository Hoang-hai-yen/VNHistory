import React, { useState } from 'react';
import '../styles/Timeline.css';

interface TimelineEvent {
  id: number;
  year: string;
  name: string;
  category: string;
  status: 'Xuất bản' | 'Bản nháp' | 'Chờ duyệt';
}

const Timeline: React.FC = () => {
  const [activeDynasty, setActiveDynasty] = useState('Văn Lang - Âu Lạc');

  const dynasties = [
    { name: 'Văn Lang - Âu Lạc', period: '2879 TCN - 207 TCN' },
    { name: 'Bắc thuộc lần 1-3', period: '111 TCN - 938' },
    { name: 'Nhà Ngô', period: '939 - 965' },
    { name: 'Nhà Đinh', period: '968 - 980' },
    { name: 'Nhà Lý', period: '1009 - 1225' },
    { name: 'Nhà Trần', period: '1225 - 1400' },
    { name: 'Nhà Lê sơ', period: '1428 - 1527' },
    { name: 'Nhà Tây Sơn', period: '1778 - 1802' },
    { name: 'Nhà Nguyễn', period: '1802 - 1945' },
  ];

  const events: TimelineEvent[] = [
    { id: 1, year: '2879 TCN', name: 'Nhà nước Văn Lang ra đời', category: 'Chính trị', status: 'Xuất bản' },
    { id: 2, year: '258 TCN', name: 'An Dương Vương lập Âu Lạc', category: 'Chính trị', status: 'Xuất bản' },
    { id: 3, year: '208 TCN', name: 'Triệu Đà xâm chiếm Âu Lạc', category: 'Kháng chiến', status: 'Bản nháp' },
    { id: 4, year: '40 SCN', name: 'Khởi nghĩa Hai Bà Trưng', category: 'Kháng chiến', status: 'Chờ duyệt' },
  ];

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h2 className="page-title">QUẢN LÝ TIMELINE</h2>
        <button className="btn-add-event">+ THÊM SỰ KIỆN</button>
      </div>

      <div className="timeline-container">
        {/* Sidebar bên trái: Danh sách triều đại */}
        <aside className="dynasty-sidebar">
          {dynasties.map((d) => (
            <div 
              key={d.name} 
              className={`dynasty-item ${activeDynasty === d.name ? 'active' : ''}`}
              onClick={() => setActiveDynasty(d.name)}
            >
              <div className="dynasty-name">{d.name}</div>
              <div className="dynasty-period">{d.period}</div>
            </div>
          ))}
        </aside>

        {/* Nội dung bên phải: Bảng sự kiện */}
        <main className="event-content">
          <h3 className="content-heading">
            {activeDynasty.toUpperCase()} - {events.length} SỰ KIỆN
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
                  <td className="year-cell">{event.year}</td>
                  <td className="name-cell">{event.name}</td>
                  <td>
                    <span className="category-tag">{event.category}</span>
                  </td>
                  <td>
                    <span className={`status-pill pill-${event.status.toLowerCase().replace(' ', '-')}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="action-cell">
                    {event.status === 'Chờ duyệt' && <button className="btn-approve">Duyệt</button>}
                    <button className="btn-edit">Sửa</button>
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