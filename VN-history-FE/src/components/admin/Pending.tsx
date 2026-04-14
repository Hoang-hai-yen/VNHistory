import React from "react";
import "../../styles/Pending.css";

interface Pending {
  id: number;
  title: string;
  dynasty: string;
  year: string;
  category: string;
  editor: string;
  submitDate: string;
  reviewer: string;
  note: string;
}

const Pending: React.FC = () => {
  const pendingData: Pending[] = [
    {
      id: 1,
      title: "Lý Thái Tổ dời đô về Thăng Long",
      dynasty: "Nhà Lý",
      year: "1010",
      category: "Chính trị",
      editor: "Lê Văn C",
      submitDate: "24/03/2026",
      reviewer: "Chưa phân công",
      note: "-",
    },
  ];

  return (
    <div className="pending-page">
      <div className="pending-header">
        <h2 className="pending-title">
          CHỜ XUẤT BẢN - {pendingData.length} BÀI
        </h2>
        <button className="btn-approve-all">DUYỆT TẤT CẢ</button>
      </div>

      <div className="pending-table-container">
        <table className="pending-table">
          <thead>
            <tr>
              <th>TIÊU ĐỀ</th>
              <th>EDITOR</th>
              <th>GỬI DUYỆT</th>
              <th>REVIEWER</th>
              <th>GHI CHÚ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {pendingData.map((item) => (
              <tr key={item.id}>
                <td className="title-cell">
                  <div className="main-title">{item.title}</div>
                  <div className="sub-info">
                    {item.dynasty} - {item.year} - {item.category}
                  </div>
                </td>
                <td>{item.editor}</td>
                <td>{item.submitDate}</td>
                <td className="status-text">{item.reviewer}</td>
                <td>{item.note}</td>
                <td className="action-cell">
                  <button className="btn-publish-final">
                    Duyệt & xuất bản
                  </button>
                  <button className="btn-reject-back">Trả về</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending;
