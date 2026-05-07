import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    role: "",
  });

  console.log("USER STATE:", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ME API RESPONSE:");
        console.log(res.data);

        setUser({
          name: res.data.data.full_name,
          role: res.data.data.role.replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        });
        console.log("SETTING USER");

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  console.log("USER STATE:", user);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");

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
