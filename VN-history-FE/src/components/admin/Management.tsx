import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Management.css";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  postsCount: number;
  reportsHandled: number;
  status: string;
  lastLogin: string | null;
}

const Management: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/admin/admins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ADMINS RESPONSE:");
        console.log(res.data);

        const formattedData = res.data.data.map((admin: any) => ({
          id: admin.id,
          name: admin.full_name,
          email: admin.email,

          role: admin.role === "super_admin" ? "Super Admin" : "Admin",

          postsCount: admin.article_count,

          reportsHandled: admin.resolved_report_count,

          status: admin.is_active === 1 ? "Đang hoạt động" : "Không hoạt động",

          lastLogin: admin.last_login_at,
        }));

        setAdminUsers(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="admin-mgmt-page">
      <div className="admin-mgmt-header">
        <h2 className="admin-mgmt-title">QUẢN LÝ TÀI KHOẢN ADMIN</h2>

        <button className="btn-add-admin">+ THÊM ADMIN</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>NGƯỜI DÙNG</th>
              <th>VAI TRÒ</th>
              <th>BÀI ĐÃ ĐĂNG</th>
              <th>BÁO CÁO XỬ LÝ</th>
              <th>TRẠNG THÁI</th>
              <th>LẦN ĐĂNG NHẬP CUỐI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id}>
                {/* User */}
                <td className="user-profile-cell">
                  <div className="avatar-placeholder"></div>

                  <div className="user-info">
                    <div className="user-name">{user.name}</div>

                    <div className="user-email">{user.email}</div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span
                    className={`role-badge ${
                      user.role === "Super Admin" ? "bg-gold" : "bg-blue"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Posts */}
                <td className="text-center">{user.postsCount}</td>

                {/* Reports */}
                <td className="text-center">{user.reportsHandled}</td>

                {/* Status */}
                <td>
                  <span
                    className={`status-indicator status-${getStatusKey(user.status)}`}
                  >
                    ● {user.status}
                  </span>
                </td>

                {/* Last Login */}
                <td>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString("vi-VN")
                    : "Chưa đăng nhập"}
                </td>

                {/* Actions */}
                <td className="action-buttons">
                  <button className="btn-action-outline">Xem</button>

                  <button className="btn-action-outline">Sửa quyền</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper status css
const getStatusKey = (status: string) => {
  if (status === "Đang hoạt động") {
    return "active";
  }

  if (status === "Không hoạt động") {
    return "inactive";
  }

  return "locked";
};

export default Management;
