import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Management.css';
import {
  useSearch
} from '../context/searchContext';

import {
  highlightText
} from '../utils/highlightText';

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
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [creating, setCreating] = useState(false);
  const {
  searchText
} = useSearch();

  const [newAdmin, setNewAdmin] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const [isEditModalOpen, setIsEditModalOpen] =
  useState(false);

  const [selectedAdmin, setSelectedAdmin] =
    useState<AdminUser | null>(null);

  const [editForm, setEditForm] = useState({
    full_name: '',
    old_password: '',
    new_password: '',
    role: 'admin',
  });

  useEffect(() => {

    const fetchAdmins = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/admins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ADMINS RESPONSE:");
        console.log(res.data);

        const formattedData = res.data.data.map((admin: any) => ({
          id: admin.id,
          name: admin.full_name,
          email: admin.email,

          role:
            admin.role === "super_admin"
              ? "Super Admin"
              : "Admin",

          postsCount: admin.article_count,

          reportsHandled:
            admin.resolved_report_count,

          status:
            admin.is_active === 1
              ? "Đang hoạt động"
              : "Không hoạt động",

          lastLogin: admin.last_login_at,
        }));

        setAdminUsers(formattedData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchAdmins();

  }, []);

  const handleCreateAdmin = async () => {
    try {
      setCreating(true);

      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:3000/api/admin/admins',
        newAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Tạo admin thành công');

      setShowCreateModal(false);

      setNewAdmin({
        full_name: '',
        email: '',
        password: '',
        role: 'admin',
      });

      // reload list
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert('Tạo admin thất bại');
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEdit = (user: AdminUser) => {
    setSelectedAdmin(user);

    setEditForm({
      full_name: user.name,
      old_password: '',
      new_password: '',
      role:
        user.role === 'Super Admin'
          ? 'super_admin'
          : 'admin',
    });

    setIsEditModalOpen(true);
  };

  const handleUpdateAdmin = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:3000/api/admin/admins/${selectedAdmin?.id}`,
        {
          full_name: editForm.full_name,
          old_password: editForm.old_password,
          new_password: editForm.new_password,
          role: editForm.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Cập nhật admin thành công');

      setIsEditModalOpen(false);

      window.location.reload();

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          'Cập nhật thất bại'
      );
    }
  };

  const handleDeleteAdmin = async () => {
    const confirmDelete = window.confirm(
      `Xóa tài khoản ${selectedAdmin?.name}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `http://localhost:3000/api/admin/admins/${selectedAdmin?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Xóa admin thành công');

      setIsEditModalOpen(false);

      setAdminUsers((prev) =>
        prev.filter(
          (item) => item.id !== selectedAdmin?.id
        )
      );

    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          'Xóa thất bại'
      );
    }
  };

  return (
    <div className="admin-mgmt-page">

      <div className="admin-mgmt-header">

        <h2 className="admin-mgmt-title">
          QUẢN LÝ TÀI KHOẢN ADMIN
        </h2>

        <button
          className="btn-add-admin"
          onClick={() => setShowCreateModal(true)}
        >
          + THÊM ADMIN
        </button>

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

                    <div className="user-name">
                      {highlightText(user.name, searchText)}
                    </div>

                    <div className="user-email">
                      {highlightText(user.email, searchText)}
                    </div>

                  </div>

                </td>

                {/* Role */}
                <td>

                  <span
                    className={`role-badge ${
                      user.role === 'Super Admin'
                        ? 'bg-gold'
                        : 'bg-blue'
                    }`}
                  >
                    {highlightText(user.role, searchText)}
                  </span>

                </td>

                {/* Posts */}
                <td className="text-center">
                  {highlightText(user.postsCount.toString(), searchText)}
                </td>

                {/* Reports */}
                <td className="text-center">
                  {highlightText(user.reportsHandled.toString(), searchText)}
                </td>

                {/* Status */}
                <td>

                  <span
                    className={`status-indicator status-${getStatusKey(user.status)}`}
                  >
                    ● {highlightText(user.status, searchText)}
                  </span>

                </td>

                {/* Last Login */}
                <td>

                  {user.lastLogin
                    ? highlightText(new Date(user.lastLogin).toLocaleString("vi-VN"), searchText)
                    : highlightText("Chưa đăng nhập", searchText)}

                </td>

                {/* Actions */}
                <td className="action-buttons">

                  <button
                    className="btn-action-outline"
                    onClick={() => handleOpenEdit(user)}
                  >
                    Chỉnh sửa
                  </button>

                </td>

              </tr>

            ))}

          </tbody>
        </table>
      </div>
      {showCreateModal && (
        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">
              <h3 style={{ color: '#C5A028', fontSize: '14px', fontFamily: 'Source Sans Pro' }}>TẠO TÀI KHOẢN ADMIN</h3>

              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal-body">

              <div className="form-group">
                <label>HỌ VÀ TÊN<span className="required">*</span></label>

                <input
                  type="text"
                  value={newAdmin.full_name}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      full_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>EMAIL<span className="required">*</span></label>

                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>MẬT KHẨU<span className="required">*</span></label>

                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>VAI TRÒ<span className="required">*</span></label>

                <select
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="admin">
                    Admin
                  </option>

                  <option value="super_admin">
                    Super Admin
                  </option>
                </select>
              </div>

            </div>

            <div className="admin-modal-footer">

              <button
                className="btn-cancel"
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </button>

              <button
                className="btn-save"
                onClick={handleCreateAdmin}
                disabled={creating}
              >
                {creating
                  ? 'ĐANG TẠO...'
                  : 'LƯU'}
              </button>

            </div>

          </div>

        </div>
      )}
      {isEditModalOpen && selectedAdmin && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h3 className="modal-title" style={{ color: '#C5A028', fontSize: '14px', fontFamily: 'Source Sans Pro' }}>
              CHỈNH SỬA TÀI KHOẢN{' '}
              {selectedAdmin.name.toUpperCase()}
            </h3>

            <div className="form-group">
              <label>Họ tên</label>

              <input
                type="text"
                value={editForm.full_name}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    full_name: e.target.value,
                  })
                }
              />
            </div>

            {/* <div className="form-group">
              <label>Mật khẩu cũ</label>

              <input
                type="password"
                value={editForm.old_password}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    old_password: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>

              <input
                type="password"
                value={editForm.new_password}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    new_password: e.target.value,
                  })
                }
              />
            </div> */}

            <div className="form-group">
              <label>Role</label>

              <select
                value={editForm.role}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    role: e.target.value,
                  })
                }
              >
                <option value="admin">
                  Admin
                </option>

                <option value="super_admin">
                  Super Admin
                </option>
              </select>
            </div>

            <div className="modal-actions">

              <button
                className="btn-save-admin"
                onClick={handleUpdateAdmin}
              >
                Lưu
              </button>

              <button
                className="btn-delete-admin"
                onClick={handleDeleteAdmin}
              >
                Xóa
              </button>

              <button
                className="btn-cancel-admin"
                onClick={() =>
                  setIsEditModalOpen(false)
                }
              >
                Hủy
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper status css
const getStatusKey = (status: string) => {

  if (status === 'Đang hoạt động') {
    return 'active';
  }

  if (status === 'Không hoạt động') {
    return 'inactive';
  }

  return 'locked';
};

export default Management;