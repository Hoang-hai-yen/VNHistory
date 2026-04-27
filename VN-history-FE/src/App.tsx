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
import GeographyPage from "./pages/GeographyPage";
import VideoLibraryPage from "./pages/VideoLibraryPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="trieu-dai" element={<DynastiesPage />} />
        <Route path="nhan-vat" element={<FiguresPage />} />
        <Route path="dong-thoi-gian" element={<TimelinePage />} />
        <Route path="dia-ly" element={<GeographyPage />} />
        <Route path="video" element={<VideoLibraryPage />} />
        <Route path="bao-cao-loi" element={<ReportPage />} />
        <Route path="bai-viet/:slug" element={<ArticleDetailPage />} />
      </Route>

      {/* Layout có Sidebar */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/posts" element={<Posts />} />
        <Route path="/admin/create-post" element={<CreatePost />} />
        <Route path="/admin/timeline" element={<Timeline />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/pending" element={<Pending />} />
        <Route path="/admin/management" element={<Management />} />
        <Route path="/admin/permissions" element={<Permissions />} />
        <Route path="/admin/history" element={<History />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
