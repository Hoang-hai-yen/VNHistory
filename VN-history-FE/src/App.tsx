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
import VideoDetailPage from "./pages/VideoDetailPage";
import ReportPage from "./pages/ReportPage";
import PostDetail from "./components/PostDetail";
import PostEdit from "./components/PostEdit";
import { SearchProvider } from "./context/SearchContext";
import PermissionGuard from "./components/admin/PermissionGuard";



function App() {
  return (
    <SearchProvider>
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
        <Route path="video/:slug" element={<VideoDetailPage />} />
        <Route path="bao-cao-loi" element={<ReportPage />} />
        <Route path="bai-viet/:slug" element={<ArticleDetailPage />} />
      </Route>

      {/* Layout có Sidebar */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<PermissionGuard permissionKey="article.edit_own"><Posts /></PermissionGuard>} />
        <Route path="create-post" element={<PermissionGuard permissionKey="article.create"><CreatePost /></PermissionGuard>} />
        <Route path="timeline" element={<PermissionGuard permissionKey="timeline.manage"><Timeline /></PermissionGuard>} />
        <Route path="reports" element={<PermissionGuard permissionKey="report.view"><Reports /></PermissionGuard>} />
        <Route path="pending" element={<PermissionGuard permissionKey="article.publish"><Pending /></PermissionGuard>} />
        <Route path="management" element={<PermissionGuard permissionKey="admin.manage"><Management /></PermissionGuard>} />
        <Route path="permissions" element={<PermissionGuard permissionKey="permissions.manage"><Permissions /></PermissionGuard>} />
        <Route path="history" element={<PermissionGuard permissionKey="logs.view"><History /></PermissionGuard>} />
        <Route path="settings" element={<PermissionGuard permissionKey="settings.manage"><Settings /></PermissionGuard>} />
        <Route path="post-detail" element={<PostDetail />} />
        <Route path="post-edit" element={<PermissionGuard permissionKey="article.edit_own"><PostEdit /></PermissionGuard>} />
      </Route>
    </Routes>
    </SearchProvider>
  );
}

export default App;
