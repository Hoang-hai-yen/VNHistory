import React, { useMemo } from 'react';
import '../../styles/Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from '../../hooks/api/useAuth';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { data: meRes } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const user = useMemo(() => {
    if (!meRes?.data) {
      return { name: "", role: "", rawRole: "" };
    }
    const rawRole = meRes.data.role;
    const roleFormatted = rawRole.replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    return {
      name: meRes.data.full_name,
      rawRole,
      role: roleFormatted,
    };
  }, [meRes]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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

      <div className="status-badge" style={{marginLeft: 20}}>● {user.role}</div>

      {/* Menu Content */}
      <nav className="menu-section" style={{ background: "#FAFAF7" }}>
        <div className="menu-group-label">TỔNG QUAN</div>
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <div className="menu-group-label">NỘI DUNG</div>
        <NavLink to="/posts" className={navLinkClass}>
          Bài viết
          {/* <span className="badge" style={{ color: '#d4af37' }}>47</span> */}
        </NavLink>

        <NavLink to="/create-post" className={navLinkClass}>
          Tạo bài mới
        </NavLink>

        <NavLink to="/timeline" className={navLinkClass}>
          Timeline
        </NavLink>

        <div className="menu-group-label">XÉT DUYỆT</div>
        <NavLink to="/reports" className={navLinkClass}>
          Báo cáo lỗi
          {/* <span className="badge" style={{ color: '#ff4d4d' }}>8</span> */}
        </NavLink>

        <NavLink to="/pending" className={navLinkClass}>
          Chờ xuất bản{" "}
          {/* <span className="badge" style={{ color: '#4da6ff' }}>5</span> */}
        </NavLink>

        {user.rawRole === "super_admin" && (
          <>
            <div className="menu-group-label">HỆ THỐNG</div>

            <NavLink to="/management" className={navLinkClass}>
              Quản lý Admin
            </NavLink>

            <NavLink to="/permissions" className={navLinkClass}>
              Phân quyền
            </NavLink>

            <NavLink to="/history" className={navLinkClass}>
              Nhật ký
            </NavLink>

            <NavLink to="/settings" className={navLinkClass}>
              Cài đặt
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer */}
      <footer className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar-circle">NM</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>{user.role}</div>
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
