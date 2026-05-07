import { Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import Posts from "./components/admin/Posts";
import CreatePost from "./components/admin/CreatePost";
import Timeline from "./components/admin/Timeline";
import Pending from "./components/admin/Pending";
import Management from "./components/admin/Management";
import Permissions from "./components/admin/Permissions";
import History from "./components/admin/History";
import Settings from "./components/admin/Settings";
import Reports from "./components/admin/Reports";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import DynastiesPage from "./pages/DynastiesPage";
import FiguresPage from "./pages/FiguresPage";
import TimelinePage from "./pages/TimelinePage";
import GeographyPage from "./pages/CulturePage";
import VideoLibraryPage from "./pages/VideoLibraryPage";
import ReportPage from "./pages/ReportPage";
import PostDetail from "./components/PostDetail";
import PostEdit from "./components/PostEdit";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="kham-pha" element={<DynastiesPage />} />
        <Route path="nhan-vat" element={<FiguresPage />} />
        <Route path="dong-thoi-gian" element={<TimelinePage />} />
        <Route path="van-hoa" element={<GeographyPage />} />
        <Route path="video" element={<VideoLibraryPage />} />
        <Route path="bao-cao-loi" element={<ReportPage />} />
        <Route path="bai-viet/:slug" element={<ArticleDetailPage />} />
      </Route>

      {/* Layout có Sidebar */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="reports" element={<Reports />} />
        <Route path="pending" element={<Pending />} />
        <Route path="management" element={<Management />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
        <Route path="post-detail" element={<PostDetail />} /> {/* 👈 thêm dòng này */}
        <Route path="post-edit" element={<PostEdit />} /> {/* 👈 thêm dòng này */}
      </Route>
    </Routes>
  );
}

export default App;
