import React, { useMemo } from 'react';
import '../../styles/Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from '../../hooks/api/useAuth';
import { usePermissions } from '../../context/PermissionContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { data: meRes } = useMeQuery();
  const logoutMutation = useLogoutMutation();
  const { hasPermission, isSuperAdmin } = usePermissions();

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

        {(hasPermission("article.create") || hasPermission("article.edit_own") || hasPermission("article.edit_any")) && (
          <>
            <div className="menu-group-label">NỘI DUNG</div>
            <NavLink to="/posts" className={navLinkClass}>Bài viết</NavLink>
            {hasPermission("article.create") && (
              <NavLink to="/create-post" className={navLinkClass}>Tạo bài mới</NavLink>
            )}
            {hasPermission("timeline.manage") && (
              <NavLink to="/timeline" className={navLinkClass}>Timeline</NavLink>
            )}
          </>
        )}

        {(hasPermission("report.view") || hasPermission("report.handle") || hasPermission("article.publish")) && (
          <>
            <div className="menu-group-label">XÉT DUYỆT</div>
            {(hasPermission("report.view") || hasPermission("report.handle")) && (
              <NavLink to="/reports" className={navLinkClass}>Báo cáo lỗi</NavLink>
            )}
            {hasPermission("article.publish") && (
              <NavLink to="/pending" className={navLinkClass}>Chờ xuất bản</NavLink>
            )}
          </>
        )}

        {(isSuperAdmin || hasPermission("admin.manage") || hasPermission("permissions.manage") || hasPermission("logs.view") || hasPermission("settings.manage")) && (
          <>
            <div className="menu-group-label">HỆ THỐNG</div>
            {hasPermission("admin.manage") && (
              <NavLink to="/management" className={navLinkClass}>Quản lý Admin</NavLink>
            )}
            {hasPermission("permissions.manage") && (
              <NavLink to="/permissions" className={navLinkClass}>Phân quyền</NavLink>
            )}
            {hasPermission("logs.view") && (
              <NavLink to="/history" className={navLinkClass}>Nhật ký</NavLink>
            )}
            {hasPermission("settings.manage") && (
              <NavLink to="/settings" className={navLinkClass}>Cài đặt</NavLink>
            )}
          </>
        )}
      </nav>

      {/* Footer */}
      <footer className="sidebar-footer">
        <div className="user-profile">
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
