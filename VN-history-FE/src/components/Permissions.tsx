import React, { useState } from 'react';
import '../styles/Permissions.css';

const INITIAL_ROLES = {
  superAdmin: [
    { id: 'sa1', label: 'Tạo / sửa / xoá bài viết', enabled: true },
    { id: 'sa2', label: 'Duyệt và xuất bản bài', enabled: true },
    { id: 'sa3', label: 'Xử lý báo cáo lỗi', enabled: true },
    { id: 'sa4', label: 'Quản lý tài khoản admin', enabled: true },
    { id: 'sa5', label: 'Phân quyền', enabled: true },
    { id: 'sa6', label: 'Xem nhật ký hệ thống', enabled: true },
    { id: 'sa7', label: 'Cài đặt hệ thống', enabled: true },
  ],
  editor: [
    { id: 'ed1', label: 'Tạo / sửa bài viết của mình', enabled: true },
    { id: 'ed2', label: 'Duyệt và xuất bản bài', enabled: false },
    { id: 'ed3', label: 'Xử lý báo cáo lỗi', enabled: true },
    { id: 'ed4', label: 'Quản lý tài khoản admin', enabled: false },
    { id: 'ed5', label: 'Phân quyền', enabled: false },
    { id: 'ed6', label: 'Xem nhật ký hệ thống', enabled: true },
    { id: 'ed7', label: 'Cài đặt hệ thống', enabled: false },
  ]
};

const Permissions: React.FC = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);

  const handleToggle = (roleKey: 'superAdmin' | 'editor', permissionId: string) => {
    setRoles(prev => ({
      ...prev,
      [roleKey]: prev[roleKey].map(p => 
        p.id === permissionId ? { ...p, enabled: !p.enabled } : p
      )
    }));
  };

  return (
    <div className="permission-page">
      <h2 className="page-title-gold">PHÂN QUYỀN HỆ THỐNG</h2>
      <div className="role-cards-container">
        
        {/* Card cho Super Admin */}
        <div className="role-card">
          <div className="role-header">
            <div className="role-icon icon-shield">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="role-title">Super Admin</h3>
            <p className="role-description">Toàn quyền hệ thống. Quản lý tài khoản và cấu hình.</p>
          </div>
          <div className="permission-list">
            {roles.superAdmin.map((p) => (
              <label key={p.id} className="permission-item-simple">
                <input 
                  type="checkbox" 
                  checked={p.enabled} 
                  onChange={() => handleToggle('superAdmin', p.id)} 
                />
                <span className="permission-label">{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Card cho Editor */}
        <div className="role-card">
          <div className="role-header">
            <div className="role-icon icon-edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <h3 className="role-title">Editor</h3>
            <p className="role-description">Soạn thảo và chỉnh sửa nội dung.</p>
          </div>
          <div className="permission-list">
            {roles.editor.map((p) => (
              <label key={p.id} className="permission-item-simple">
                <input 
                  type="checkbox" 
                  checked={p.enabled} 
                  onChange={() => handleToggle('editor', p.id)} 
                />
                <span className="permission-label">{p.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;