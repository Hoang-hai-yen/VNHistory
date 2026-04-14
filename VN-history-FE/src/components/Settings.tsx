import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings: React.FC = () => {
  const [siteName, setSiteName] = useState('Lịch Sử Việt Nam - Bách Khoa Toàn Thư');
  const [description, setDescription] = useState(
    'Sứ mệnh của chúng tôi là gìn giữ và truyền tải những giá trị lịch sử cao quý của dân tộc Việt Nam đến mọi thế hệ qua nền tảng số hiện đại.'
  );

  return (
    <div className="settings-page">
      <h2 className="settings-main-title">CÀI ĐẶT HỆ THỐNG</h2>
      
      <div className="settings-grid">
        {/* Cột 1: Thông tin Website */}
        <div className="settings-card">
          <h3 className="card-header-title">THÔNG TIN WEBSITE</h3>
          <div className="form-group">
            <label>TÊN WEBSITE</label>
            <input 
              type="text" 
              value={siteName} 
              onChange={(e) => setSiteName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>MÔ TẢ WEBSITE</label>
            <textarea 
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="btn-save-gold">LƯU THAY ĐỔI</button>
        </div>

        {/* Cột 2: Cài đặt xuất bản */}
        <div className="settings-card">
          <h3 className="card-header-title">CÀI ĐẶT XUẤT BẢN</h3>
          
          <div className="switch-group">
            <label className="switch-container">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
            <span className="switch-label">Yêu cầu Reviewer duyệt trước khi xuất bản</span>
          </div>

          <div className="switch-group">
            <label className="switch-container">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
            <span className="switch-label">Thông báo qua email khi có báo cáo mới</span>
          </div>

          <div className="switch-group">
            <label className="switch-container">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <span className="switch-label">Cho phép người dùng xem bài nháp</span>
          </div>

          <div className="form-group mt-20">
            <label>EMAIL NHẬN THÔNG BÁO</label>
            <input type="email" placeholder="admin@lsvn.vn" />
          </div>
          
          <button className="btn-save-gold">LƯU THAY ĐỔI</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;