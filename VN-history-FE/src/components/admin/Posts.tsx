import React, { useState } from "react";
import "../../styles/Posts.css";

// Định nghĩa các loại Tab lọc theo trạng thái xuất bản
type PublishTab = "TẤT CẢ" | "XUẤT BẢN" | "CHỜ DUYỆT" | "BẢN NHÁP";

interface ContentItem {
  id: number;
  title: string;
  subtitle?: string;
  type: "SỰ KIỆN" | "NHÂN VẬT";
  dynasty: string;
  assignee: string;
  date: string;
  status: "Chờ duyệt" | "Đang xem xét" | "Đã xuất bản" | "Bản nháp" | "Từ chối";
}

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PublishTab>("TẤT CẢ");

  const contentData: ContentItem[] = [
    {
      id: 1,
      title: "Trận Bạch Đằng (938)",
      type: "SỰ KIỆN",
      dynasty: "Nhà Ngô",
      assignee: "Trần Thị B",
      date: "25/03/2026",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      title: "Nguyễn Trãi — Nhà văn hoá lớn",
      type: "NHÂN VẬT",
      dynasty: "Lê sơ",
      assignee: "Lê Văn C",
      date: "24/03/2026",
      status: "Đang xem xét",
    },
    {
      id: 3,
      title: "Khởi nghĩa Lam Sơn (1418–1427)",
      type: "SỰ KIỆN",
      dynasty: "Hậu Lê",
      assignee: "Admin",
      date: "23/03/2026",
      status: "Đã xuất bản",
    },
    {
      id: 4,
      title: "Nhà Trần và kháng chiến Nguyên Mông",
      subtitle: "Có báo cáo lỗi: Ngày tháng sai",
      type: "SỰ KIỆN",
      dynasty: "Trần",
      assignee: "Lê Văn C",
      date: "22/03/2026",
      status: "Chờ duyệt",
    },
    {
      id: 5,
      title: "Đinh Bộ Lĩnh thống nhất đất nước",
      type: "NHÂN VẬT",
      dynasty: "Đinh",
      assignee: "Nguyễn Thị A",
      date: "21/03/2026",
      status: "Bản nháp",
    },
    {
      id: 6,
      title: "Văn hoá Đông Sơn — nguồn gốc trống đồng",
      type: "SỰ KIỆN",
      dynasty: "Hùng Vương",
      assignee: "Admin",
      date: "20/03/2026",
      status: "Từ chối",
    },
  ];

  const renderStatusTag = (status: string) => {
    const statusMap: Record<string, string> = {
      "Chờ duyệt": "pending",
      "Đang xem xét": "reviewing",
      "Đã xuất bản": "published",
      "Bản nháp": "draft",
      "Từ chối": "rejected",
    };
    return (
      <span className={`status-tag status-${statusMap[status]}`}>{status}</span>
    );
  };

  const renderActions = (item: ContentItem) => {
    if (item.status === "Đã xuất bản" || item.status === "Bản nháp") {
      return (
        <div className="action-group">
          <button className="btn-action btn-blue-text">Chỉnh sửa</button>
          <button className="btn-action btn-gray-text">Xem</button>
        </div>
      );
    }
    if (item.status === "Từ chối") {
      return (
        <div className="action-group">
          <button className="btn-action btn-red-text">Lý do</button>
          <button className="btn-action btn-blue-text">Chỉnh sửa</button>
        </div>
      );
    }
    return (
      <div className="action-group">
        <button className="btn-action btn-green-text">Duyệt</button>
        <button className="btn-action btn-red-text">Từ chối</button>
        <button className="btn-action btn-blue-text">Sửa</button>
      </div>
    );
  };

  return (
    <div className="posts-page">
      {/* Header điều hướng và nút tạo bài mới */}
      <div className="posts-toolbar">
        <div className="tabs-container">
          <button
            className={`tab-link ${activeTab === "TẤT CẢ" ? "active" : ""}`}
            onClick={() => setActiveTab("TẤT CẢ")}
          >
            TẤT CẢ (1,284)
          </button>
          <button
            className={`tab-link ${activeTab === "XUẤT BẢN" ? "active" : ""}`}
            onClick={() => setActiveTab("XUẤT BẢN")}
          >
            XUẤT BẢN (1,102)
          </button>
          <button
            className={`tab-link ${activeTab === "CHỜ DUYỆT" ? "active" : ""}`}
            onClick={() => setActiveTab("CHỜ DUYỆT")}
          >
            CHỜ DUYỆT (47)
          </button>
          <button
            className={`tab-link ${activeTab === "BẢN NHÁP" ? "active" : ""}`}
            onClick={() => setActiveTab("BẢN NHÁP")}
          >
            BẢN NHÁP (135)
          </button>
        </div>
        <button className="btn-create-primary">+ TẠO BÀI MỚI</button>
      </div>

      {/* Bảng dữ liệu */}
      <section className="posts-table-section">
        <table className="posts-main-table">
          <thead>
            <tr>
              {/* <th style={{ width: '40px' }}><input type="checkbox" /></th> */}
              <th>TIÊU ĐỀ</th>
              <th>LOẠI</th>
              <th>TRIỀU ĐẠI</th>
              <th>NGƯỜI PHỤ TRÁCH</th>
              <th>NGÀY</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {contentData.map((item) => (
              <tr key={item.id}>
                {/* <td><input type="checkbox" /></td> */}
                <td className="title-column">
                  <div className="title-main">{item.title}</div>
                  {item.subtitle && (
                    <div className="title-sub">⚠ {item.subtitle}</div>
                  )}
                </td>
                <td>
                  <span
                    className={`type-badge ${item.type === "SỰ KIỆN" ? "type-event" : "type-person"}`}
                  >
                    {item.type}
                  </span>
                </td>
                <td>{item.dynasty}</td>
                <td>{item.assignee}</td>
                <td>{item.date}</td>
                <td>{renderStatusTag(item.status)}</td>
                <td>{renderActions(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Posts;
