import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/TopBar.css";

const TopBar: React.FC = () => {
  const location = useLocation();

  // Hàm chuyển đổi path thành Title
  const getTitle = (path: string) => {
    switch (path) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/posts":
        return "Quản lý bài viết";
      case "/admin/create-post":
        return "Tạo/Sửa bài viết";
      case "/admin/timeline":
        return "Quản lý Timeline";
      case "/admin/reports":
        return "Báo cáo lỗi";
      case "/admin/pending":
        return "Chờ xuất bản";
      case "/admin/management":
        return "Quản lý Admin";
      case "/admin/permissions":
        return "Phân quyền";
      case "/admin/history":
        return "Nhật ký";
      case "/admin/settings":
        return "Cài đặt hệ thống";
      default:
        return "Admin Portal";
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="headpage-title">{getTitle(location.pathname)}</h2>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          {/* <span className="search-icon">🔍</span> */}
          <input type="text" placeholder="Tìm kiếm..." />
        </div>

        <button className="btn-outline">+ BÀI VIẾT MỚI</button>
        <button className="btn-primary">XUẤT BẢN NGAY</button>

        <div className="notification-icon">
          🔔
          {/* <span className="dot"></span> */}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
