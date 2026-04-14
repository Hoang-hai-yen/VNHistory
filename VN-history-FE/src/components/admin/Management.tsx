import React from "react";
import "../../styles/Management.css";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Editor";
  postsCount: number;
  reportsHandled: number;
  status: "Đang hoạt động" | "Không hoạt động" | "Đã khóa";
  lastLogin: string;
}

const Management: React.FC = () => {
  const adminUsers: AdminUser[] = [
    {
      id: 1,
      name: "Nguyễn Minh",
      email: "minh@lsvn.com",
      role: "Super Admin",
      postsCount: 342,
      reportsHandled: 28,
      status: "Đang hoạt động",
      lastLogin: "Hôm nay, 09:14",
    },
    {
      id: 2,
      name: "Nguyễn Minh",
      email: "minh@lsvn.com",
      role: "Editor",
      postsCount: 342,
      reportsHandled: 28,
      status: "Không hoạt động",
      lastLogin: "Hôm nay, 09:14",
    },
    {
      id: 3,
      name: "Nguyễn Minh",
      email: "minh@lsvn.com",
      role: "Editor",
      postsCount: 342,
      reportsHandled: 28,
      status: "Đã khóa",
      lastLogin: "Hôm nay, 09:14",
    },
  ];

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
                <td className="user-profile-cell">
                  <div className="avatar-placeholder"></div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </td>
                <td>
                  <span
                    className={`role-badge ${user.role === "Super Admin" ? "bg-gold" : "bg-blue"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-center">{user.postsCount}</td>
                <td className="text-center">{user.reportsHandled}</td>
                <td>
                  <span
                    className={`status-indicator status-${getStatusKey(user.status)}`}
                  >
                    ● {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td className="action-buttons">
                  <button className="btn-action-outline">Xem</button>
                  {user.status === "Đã khóa" ? (
                    <button className="btn-action-outline btn-unlock">
                      Mở khóa
                    </button>
                  ) : (
                    <button className="btn-action-outline">Sửa quyền</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper để lấy key css cho trạng thái
const getStatusKey = (status: string) => {
  if (status === "Đang hoạt động") return "active";
  if (status === "Không hoạt động") return "inactive";
  return "locked";
};

export default Management;
