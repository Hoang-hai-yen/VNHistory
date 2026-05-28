import React, { useState, useMemo } from 'react';
import '../../styles/Pending.css';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { highlightText } from '../../utils/highlightText';
import { httpClient } from '../../lib/http';
import {
  useAdminArticlesQuery,
  usePublishArticleMutation,
  useRejectArticleMutation,
  useReturnArticleMutation,
  useBulkPublishArticlesMutation
} from '../../hooks/api/useAdminArticles';



const Pending: React.FC = () => {
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const [showReturnModal, setShowReturnModal] =
    useState(false);

  const [selectedArticleId, setSelectedArticleId] =
    useState('');

  const [returnNote, setReturnNote] =
    useState('');

  const { data: rawArticles = [] } = useAdminArticlesQuery({ status: 'pending' });
  const publishMutation = usePublishArticleMutation();
  const rejectMutation = useRejectArticleMutation();
  const returnMutation = useReturnArticleMutation();
  const bulkPublishMutation = useBulkPublishArticlesMutation();

  const pendingData = useMemo(() => {
    return rawArticles.map((article: any) => ({
      id: article.id,
      title: article.title,
      dynasty: article.dynasty_name || "Không rõ",
      year: article.year_display || "",
      category: article.category_name || "Không rõ",
      editor: article.created_by_name || "Không rõ",
      submitDate: new Date(article.created_at).toLocaleDateString("vi-VN"),
    }));
  }, [rawArticles]);

  const handleViewPost = async (id: string) => {
    try {
      const res = await httpClient.get<any>(`/admin/articles/${id}`);
      navigate('/post-detail', {
        state: {
          article: res.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishMutation.mutateAsync(id);
      alert("Xuất bản thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectMutation.mutateAsync(id);
      alert('Đã từ chối');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenReturnModal = (id: string) => {
    setSelectedArticleId(id);
    setReturnNote('');
    setShowReturnModal(true);
  };

  const handleReturn = async () => {
    try {
      await returnMutation.mutateAsync({
        id: selectedArticleId,
        return_note: returnNote,
      });
      alert("Đã trả bài về");
      setShowReturnModal(false);
    } catch (error) {
      console.log(error);
      alert("Trả bài thất bại");
    }
  };

  const handleBulkPublish = async () => {
    const confirmPublish = window.confirm("Xuất bản toàn bộ bài viết đang chờ duyệt?");
    if (!confirmPublish) return;

    try {
      await bulkPublishMutation.mutateAsync();
      alert("Đã duyệt tất cả thành công");
    } catch (error) {
      console.log(error);
      alert("Duyệt tất cả thất bại");
    }
  };

  return (
    <div className="pending-page">

      <div className="pending-header">

        <h2 className="pending-title">
          CHỜ XUẤT BẢN - {pendingData.length} BÀI
        </h2>

        <button
          className="btn-approve-all"
          onClick={handleBulkPublish}
        >
          DUYỆT TẤT CẢ
        </button>

      </div>

      <div className="pending-table-container">

        <table className="pending-table">

          <thead>
            <tr>

              <th>TIÊU ĐỀ</th>
              <th>NGƯỜI VIẾT</th>
              <th>NGÀY VIẾT</th>
              <th>HÀNH ĐỘNG</th>

            </tr>
          </thead>

          <tbody>

            {pendingData.map((item) => (

              <tr key={item.id}>

                {/* Title */}
                <td className="title-cell">

                  <div className="main-title">
                    {highlightText(item.title, searchText)}
                  </div>

                  <div className="sub-info">
                    {highlightText(item.dynasty, searchText)}
                    {" - "}
                    {highlightText(item.year.toString(), searchText)}
                    {" - "}
                    {highlightText(item.category, searchText)}
                  </div>

                </td>

                {/* Editor */}
                <td>
                  {highlightText(item.editor, searchText)}
                </td>

                {/* Submit Date */}
                <td>
                  {highlightText(item.submitDate, searchText)}
                </td>

                {/* Actions */}
                <td className="action-cell">
                  <div className="action-group">

                    <button
                    className="btn-action btn-gray-text"
                    onClick={() =>
                    handleViewPost(item.id)
                    }
                    >
                    Xem
                    </button>

                    <button
                    className="btn-action btn-green-text"
                    onClick={() =>
                    handlePublish(item.id)
                    }
                    >
                    Duyệt & xuất bản
                    </button>

                    <button
                    className="btn-action btn-red-text"
                    onClick={() =>
                    handleReject(item.id)
                    }
                    >
                    Từ chối
                    </button>

                    <button
                    className="btn-action btn-return"
                    onClick={() =>
                    handleOpenReturnModal(
                    item.id
                    )
                    }
                    >
                    Trả về
                    </button>

                    </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {
        showReturnModal && (

        <div className="modal-overlay">

        <div className="return-modal">

        <h3 style={{color:'#333', marginBottom:'15px'}}>
        Trả bài về cho Admin
        </h3>

        <textarea
        rows={5}
        value={returnNote}
        onChange={(e)=>
        setReturnNote(
        e.target.value
        )
        }
        placeholder="Nhập ghi chú..."
        />

        <div
        className="modal-actions"
        >

        <button
        className="btn-cancel"
        onClick={() =>
        setShowReturnModal(
        false
        )
        }
        >
        Huỷ
        </button>

        <button
        className="btn-confirm-return"
        onClick={
        handleReturn
        }
        >
        Xác nhận trả về
        </button>

        </div>

        </div>

        </div>

        )
        }
    </div>
  );
};

export default Pending;
