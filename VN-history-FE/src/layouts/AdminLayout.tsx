import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/TopBar";

const AdminLayout = () => {
  // Giả sử Sidebar của bạn rộng 260px (dựa trên các thiết kế trước đó)
  const sidebarWidth = "260px";
  const topbarHeight = "60px";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAFAF7" }}>
      {/* Sidebar - Cần fixed hoặc có chiều rộng cố định */}
      <div style={{ width: sidebarWidth, flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Right side - Phần còn lại của màn hình */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0, // Tránh tràn nội dung trong flexbox
        }}
      >
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main
          style={{
            padding: "30px", // Khoảng cách đệm cho nội dung
            background: "#FAFAF7", // Màu nền chuẩn palette
            minHeight: `calc(100vh - ${topbarHeight})`,
            overflowY: "auto", // Cho phép cuộn nội dung độc lập
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
