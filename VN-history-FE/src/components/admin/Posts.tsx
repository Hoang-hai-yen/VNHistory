import React, { useState, useMemo } from "react";
import "../../styles/Posts.css";
import { useNavigate } from "react-router-dom";
import { highlightText } from "../../utils/highlightText";
import { httpClient } from "../../lib/http";
import {
  useAdminArticlesQuery,
  usePublishArticleMutation,
  useRejectArticleMutation,
} from "../../hooks/api/useAdminArticles";
import { useMeQuery } from "../../hooks/api/useAuth";

type PublishTab = "TẤT CẢ" | "XUẤT BẢN" | "CHỜ DUYỆT" | "BẢN NHÁP";

const STATUS_MAP: Record<PublishTab, string | undefined> = {
  "TẤT CẢ": undefined,
  "XUẤT BẢN": "published",
  "CHỜ DUYỆT": "pending",
  "BẢN NHÁP": "draft",
};

const TYPE_LABELS: Record<string, string> = {
  event: "Sự kiện",
  person: "Nhân vật",
  place: "Di sản",
  culture: "Văn hóa",
  video: "Video/Khác",
};

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PublishTab>("TẤT CẢ");
  const [typeFilter, setTypeFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { data: meRes } = useMeQuery();
  const isAdmin = meRes?.data?.role === "admin";
  const myId = meRes?.data?.id;
  const { data: allArticles = [] } = useAdminArticlesQuery({
    limit: 200,
    ...(isAdmin && myId ? { created_by: myId } : {}),
  });
  const publishMutation = usePublishArticleMutation();
  const rejectMutation = useRejectArticleMutation();

  const filteredData = useMemo(() => {
    let result = allArticles as any[];
    const statusFilter = STATUS_MAP[activeTab];
    if (statusFilter) result = result.filter((a) => a.status === statusFilter);
    if (typeFilter) result = result.filter((a) => a.type === typeFilter);
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(kw) ||
          a.dynasty_name?.toLowerCase().includes(kw) ||
          a.created_by_name?.toLowerCase().includes(kw)
      );
    }
    return result;
  }, [allArticles, activeTab, typeFilter, keyword]);

  const counts = useMemo(() => ({
    all: allArticles.length,
    published: (allArticles as any[]).filter((a) => a.status === "published").length,
    pending: (allArticles as any[]).filter((a) => a.status === "pending").length,
    draft: (allArticles as any[]).filter((a) => a.status === "draft").length,
  }), [allArticles]);

  const handleViewPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate("/post-preview", { state: { article: res.data.data } });
    } catch (error) { console.log(error); }
  };

  const handleEditPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate("/post-edit", { state: { article: res.data.data } });
    } catch (error) { console.log(error); }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMutation.mutateAsync(id);
      alert("Xuất bản thành công");
    } catch (error: any) {
      alert(error.response?.data?.message || "Xuất bản thất bại");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMutation.mutateAsync(id);
      alert("Đã từ chối");
    } catch (error: any) {
      alert(error.response?.data?.message || "Từ chối thất bại");
    }
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: "Chờ duyệt", published: "Đã xuất bản", draft: "Bản nháp", rejected: "Từ chối",
    };
    return map[status] || status;
  };

  const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      pending: "pending", published: "published", draft: "draft", rejected: "rejected",
    };
    return map[status] || "draft";
  };

  const getTypeLabel = (type: string) => TYPE_LABELS[type] || type?.toUpperCase() || "KHÁC";

  const renderActions = (item: any) => {
    if (item.status === "published") return (
      <div className="action-group">
        <button className="btn-action btn-gray-text" onClick={() => handleViewPost(item.id)}>Xem</button>
        <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
      </div>
    );
    if (item.status === "draft" || item.status === "rejected") return (
      <div className="action-group">
        <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
      </div>
    );
    return (
      <div className="action-group">
        <button className="btn-action btn-gray-text" onClick={() => handleViewPost(item.id)}>Xem</button>
        <button className="btn-action btn-green-text" onClick={() => handlePublish(item.id)}>Duyệt</button>
        <button className="btn-action btn-red-text" onClick={() => handleReject(item.id)}>Từ chối</button>
        <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Sửa</button>
      </div>
    );
  };

  return (
    <div className="posts-page">
      {/* Tabs + nút tạo */}
      <div className="posts-toolbar">
        <div className="tabs-container">
          {(["TẤT CẢ", "XUẤT BẢN", "CHỜ DUYỆT", "BẢN NHÁP"] as PublishTab[]).map((tab) => {
            const countMap = { "TẤT CẢ": counts.all, "XUẤT BẢN": counts.published, "CHỜ DUYỆT": counts.pending, "BẢN NHÁP": counts.draft };
            return (
              <button key={tab} className={`tab-link ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab} ({countMap[tab]})
              </button>
            );
          })}
        </div>
        <button className="btn-create-primary" onClick={() => navigate("/create-post")}>
          + TẠO BÀI MỚI
        </button>
      </div>

      {/* Bộ lọc + tìm kiếm */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Tìm theo tiêu đề, triều đại, người viết..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1, minWidth: "220px", padding: "8px 12px",
            border: "1px solid #ddd", borderRadius: "6px",
            fontSize: "13px", outline: "none", color: "#333", background: "#fff",
          }}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "8px 12px", border: "1px solid #ddd",
            borderRadius: "6px", fontSize: "13px",
            background: "#fff", cursor: "pointer", color: "#333",
          }}
        >
          <option value="">Tất cả loại</option>
          <option value="event">Sự kiện</option>
          <option value="person">Nhân vật</option>
          <option value="place">Di sản</option>
          <option value="culture">Văn hóa</option>
          <option value="video">Video / Khác</option>
        </select>
        {(keyword || typeFilter) && (
          <button
            onClick={() => { setKeyword(""); setTypeFilter(""); }}
            style={{ padding: "8px 14px", border: "1px solid #C5A028", borderRadius: "6px", fontSize: "13px", cursor: "pointer", background: "#fff", color: "#C5A028", fontWeight: 500 }}
          >
            Xóa lọc
          </button>
        )}
        <span style={{ fontSize: "12px", color: "#999" }}>{filteredData.length} bài</span>
      </div>

      <section className="posts-table-section">
        <table className="posts-main-table">
          <thead>
            <tr>
              <th>TIÊU ĐỀ</th>
              <th>LOẠI</th>
              <th>TRIỀU ĐẠI</th>
              <th>NGƯỜI PHỤ TRÁCH</th>
              <th>NGÀY</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any) => (
              <tr key={item.id}>
                <td className="title-column">
                  <div className="title-main">{highlightText(item.title, keyword)}</div>
                </td>
                <td>
                  <span className="type-badge">
                    {getTypeLabel(item.type)}
                  </span>
                </td>
                <td>{highlightText(item.dynasty_name || "", keyword)}</td>
                <td>{highlightText(item.created_by_name || "", keyword)}</td>
                <td>{new Date(item.created_at).toLocaleDateString("vi-VN")}</td>
                <td>
                  <span className={`status-tag status-${getStatusClass(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </td>
                <td>{renderActions(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Posts;
