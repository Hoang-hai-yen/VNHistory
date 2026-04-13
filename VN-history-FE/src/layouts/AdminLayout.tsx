import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar"; // 👈 thêm dòng này

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main
          style={{
            paddingLeft: "280px"  , // để tránh bị che khuất bởi sidebar
            padding: "20px",
            background: "#FAFAF7",
            minHeight: "calc(100vh - 60px)", // trừ chiều cao topbar
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;