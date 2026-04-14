import React from "react";
import "../../styles/Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Thêm logic xóa token/session ở đây nếu cần
    navigate("/login");
  };

  // Helper function để quản lý class active một cách sạch sẽ
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "menu-item active" : "menu-item";

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-square">★</div>
        <div>
          <div className="brand-title">Lịch Sử Việt Nam</div>
          <div className="admin-label">ADMIN PORTAL</div>
        </div>
      </div>

      <div className="status-badge" style={{ marginLeft: 20 }}>
        ● Super Admin
      </div>

      {/* Menu Content */}
      <nav className="menu-section" style={{ background: "#FAFAF7" }}>
        <div className="menu-group-label">TỔNG QUAN</div>
        <NavLink to="/admin/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <div className="menu-group-label">NỘI DUNG</div>
        <NavLink to="/admin/posts" className={navLinkClass}>
          Bài viết
          {/* <span className="badge" style={{ color: '#d4af37' }}>47</span> */}
        </NavLink>

        <NavLink to="/admin/create-post" className={navLinkClass}>
          Tạo bài mới
        </NavLink>

        <NavLink to="/admin/timeline" className={navLinkClass}>
          Timeline
        </NavLink>

        <div className="menu-group-label">XÉT DUYỆT</div>
        <NavLink to="/admin/reports" className={navLinkClass}>
          Báo cáo lỗi
          {/* <span className="badge" style={{ color: '#ff4d4d' }}>8</span> */}
        </NavLink>

        <NavLink to="/admin/pending" className={navLinkClass}>
          Chờ xuất bản{" "}
          {/* <span className="badge" style={{ color: '#4da6ff' }}>5</span> */}
        </NavLink>

        <div className="menu-group-label">HỆ THỐNG</div>
        <NavLink to="/admin/management" className={navLinkClass}>
          Quản lý Admin
        </NavLink>
        <NavLink to="/admin/permissions" className={navLinkClass}>
          Phân quyền
        </NavLink>
        <NavLink to="/admin/history" className={navLinkClass}>
          Nhật ký
        </NavLink>
        <NavLink to="/admin/settings" className={navLinkClass}>
          Cài đặt
        </NavLink>
      </nav>

      {/* Footer */}
      <footer className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar-circle">NM</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              Nguyễn Minh
            </div>
            <div style={{ fontSize: "11px", color: "#666" }}>Super Admin</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
