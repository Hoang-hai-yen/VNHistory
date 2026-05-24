import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import Posts from "./components/Posts"; // 👈 thêm dòng này
import CreatePost from "./components/CreatePost"; // 👈 thêm dòng này
import Timeline from "./components/Timeline"; // 👈 thêm dòng này
import Pending from "./components/Pending"; // 👈 thêm dòng này
import Management from "./components/Management";
import Permissions from "./components/Permissions"; // 👈 thêm dòng này
import History from "./components/History"; // 👈 thêm dòng này
import Settings from "./components/Settings"; // 👈 thêm dòng này
import Reports from "./components/Reports"; // 👈 thêm dòng nà  y
import PostDetail from "./components/PostDetail"; // 👈 thêm dòng này
import PostEdit from "./components/PostEdit"; // 👈 thêm dòng này
import {
  SearchProvider
} from './context/searchContext';


function App() {
  return (
    <SearchProvider>
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

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
    </SearchProvider>
  );
}

export default App;