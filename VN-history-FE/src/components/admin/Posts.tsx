import React, { useState, useMemo } from "react";
import "../../styles/Posts.css";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { highlightText } from "../../utils/highlightText";
import { httpClient } from "../../lib/http";
import {
  useAdminArticlesQuery,
  usePublishArticleMutation,
  useRejectArticleMutation,
} from "../../hooks/api/useAdminArticles";

type PublishTab = "TẤT CẢ" | "XUẤT BẢN" | "CHỜ DUYỆT" | "BẢN NHÁP";

const STATUS_MAP: Record<PublishTab, string | undefined> = {
  "TẤT CẢ": undefined,
  "XUẤT BẢN": "published",
  "CHỜ DUYỆT": "pending",
  "BẢN NHÁP": "draft",
};

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PublishTab>("TẤT CẢ");
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const { data: allArticles = [] } = useAdminArticlesQuery({ limit: 100 });
  const publishMutation = usePublishArticleMutation();
  const rejectMutation = useRejectArticleMutation();

  const filteredData = useMemo(() => {
    const statusFilter = STATUS_MAP[activeTab];
    return statusFilter
      ? allArticles.filter((a: any) => a.status === statusFilter)
      : allArticles;
  }, [allArticles, activeTab]);

  const counts = useMemo(() => ({
    all: allArticles.length,
    published: allArticles.filter((a: any) => a.status === "published").length,
    pending: allArticles.filter((a: any) => a.status === "pending").length,
    draft: allArticles.filter((a: any) => a.status === "draft").length,
  }), [allArticles]);

  const handleViewPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate("/post-detail", { state: { article: res.data.data } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate("/post-edit", { state: { article: res.data.data } });
    } catch (error) {
      console.log(error);
    }
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
      pending: "Chờ duyệt",
      published: "Đã xuất bản",
      draft: "Bản nháp",
      rejected: "Từ chối",
    };
    return map[status] || status;
  };

  const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      pending: "pending",
      published: "published",
      draft: "draft",
      rejected: "rejected",
    };
    return map[status] || "draft";
  };

  const renderActions = (item: any) => {
    if (item.status === "published") {
      return (
        <div className="action-group">
          <button className="btn-action btn-gray-text" onClick={() => handleViewPost(item.id)}>Xem</button>
          <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
        </div>
      );
    }
    if (item.status === "draft") {
      return (
        <div className="action-group">
          <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
        </div>
      );
    }
    if (item.status === "rejected") {
      return (
        <div className="action-group">
          <button className="btn-action btn-blue-text" onClick={() => handleEditPost(item.id)}>Chỉnh sửa</button>
        </div>
      );
    }
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
      <div className="posts-toolbar">
        <div className="tabs-container">
          {(["TẤT CẢ", "XUẤT BẢN", "CHỜ DUYỆT", "BẢN NHÁP"] as PublishTab[]).map((tab) => {
            const countMap = { "TẤT CẢ": counts.all, "XUẤT BẢN": counts.published, "CHỜ DUYỆT": counts.pending, "BẢN NHÁP": counts.draft };
            return (
              <button
                key={tab}
                className={`tab-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} ({countMap[tab]})
              </button>
            );
          })}
        </div>
        <button className="btn-create-primary" onClick={() => navigate("/create-post")}>
          + TẠO BÀI MỚI
        </button>
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
                  <div className="title-main">{highlightText(item.title, searchText)}</div>
                </td>
                <td>
                  <span className={`type-badge ${item.type === "event" ? "type-event" : item.type === "person" ? "type-person" : "type-event"}`}>
                    {item.type === "event" ? "SỰ KIỆN" : item.type === "person" ? "NHÂN VẬT" : item.type === "place" ? "DI SẢN" : "KHÁC"}
                  </span>
                </td>
                <td>{highlightText(item.dynasty_name || "", searchText)}</td>
                <td>{highlightText(item.created_by_name || "", searchText)}</td>
                <td>{highlightText(new Date(item.created_at).toLocaleDateString("vi-VN"), searchText)}</td>
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
