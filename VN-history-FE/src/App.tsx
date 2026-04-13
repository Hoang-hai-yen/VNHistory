import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import Posts from "./components/Posts"; // 👈 thêm dòng này
import CreatePost from "./components/CreatePost"; // 👈 thêm dòng này
import Timeline from "./components/Timeline"; // 👈 thêm dòng này
import Pending from "./components/Pending"; // 👈 thêm dòng này


function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Layout có Sidebar */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="reports" element={<div>Báo cáo lỗi</div>} />
        <Route path="pending" element={<Pending />} />
        <Route path="management" element={<div>Quản lý Admin</div>} />
        <Route path="permissions" element={<div>Phân quyền</div>} />
        <Route path="history" element={<div>Nhật ký</div>} />
        <Route path="settings" element={<div>Cài đặt</div>} />
      </Route>
    </Routes>
  );
}

export default App;