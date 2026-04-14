import React from 'react';
import '../styles/History.css';

interface HistoryLog {
  id: number;
  time: string;
  adminName: string;
  action: string;
  actionType: 'publish' | 'reject' | 'approve' | 'lock' | 'verify' | 'edit';
  target: string;
  details: string;
}

const History: React.FC = () => {
  const historyData: HistoryLog[] = [
    { id: 1, time: '28/03 09:14', adminName: 'Nguyễn Minh', action: 'Xuất bản', actionType: 'publish', target: 'Triều đại nhà Lý', details: 'Bài ID #1284 đã xuất bản' },
    { id: 2, time: '28/03 08:55', adminName: 'Nguyễn Minh', action: 'Từ chối BC', actionType: 'reject', target: 'Báo cáo #BC-0339', details: 'Lý do: Đã kiểm tra, thông tin đúng' },
    { id: 3, time: '28/03 08:55', adminName: 'Nguyễn Minh', action: 'Duyệt BC', actionType: 'approve', target: 'Báo cáo #BC-0337', details: 'Xác nhận lỗi đúng, đã sửa bài' },
    { id: 4, time: '28/03 08:55', adminName: 'Nguyễn Minh', action: 'Khóa TK', actionType: 'lock', target: 'Admin: Nguyễn Thị A', details: 'Tạm khoá tài khoản — vi phạm quy tắc' },
    { id: 5, time: '28/03 08:55', adminName: 'Nguyễn Minh', action: 'Cần kiểm tra', actionType: 'verify', target: 'Văn Lang – Nguồn gốc', details: 'Gắn cờ yêu cầu kiểm tra nguồn tài liệu' },
    { id: 6, time: '28/03 08:30', adminName: 'Nguyễn Minh', action: 'Chỉnh sửa', actionType: 'edit', target: 'Trận Đống Đa 1789', details: 'Cập nhật nội dung và nguồn tài liệu' },
  ];

  return (
    <div className="history-page">
      <div className="history-header">
        <h2 className="history-title">NHẬT KÝ HOẠT ĐỘNG</h2>
        <div className="history-filters">
          {/* <button className="btn-filter-outline">TẤT CẢ ADMIN</button> */}
          <span className="filter-time">7 ngày qua</span>
        </div>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>THỜI GIAN</th>
              <th>ADMIN</th>
              <th>HÀNH ĐỘNG</th>
              <th>ĐỐI TƯỢNG</th>
              <th>CHI TIẾT</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((log) => (
              <tr key={log.id}>
                <td className="time-cell">{log.time}</td>
                <td className="admin-cell">
                  <div className="admin-avatar"></div>
                  <span>{log.adminName}</span>
                </td>
                <td>
                  <span className={`action-status status-${log.actionType}`}>
                    ● {log.action}
                  </span>
                </td>
                <td className="target-cell">{log.target}</td>
                <td className="details-cell">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;