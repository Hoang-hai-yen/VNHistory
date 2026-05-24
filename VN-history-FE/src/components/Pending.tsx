import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Pending.css';
import { useNavigate } from 'react-router-dom';
import {
  useSearch
} from '../context/searchContext';
import {
  highlightText
} from '../utils/highlightText';

interface PendingItem {
  id: string;
  title: string;
  dynasty: string;
  year: string;
  category: string;
  editor: string;
  submitDate: string;
}

const Pending: React.FC = () => {

  const [pendingData, setPendingData] = useState<PendingItem[]>([]);
  const navigate = useNavigate();
  const {
    searchText
  } = useSearch();
  const [showReturnModal, setShowReturnModal] =
    useState(false);

  const [selectedArticleId, setSelectedArticleId] =
    useState('');

  const [returnNote, setReturnNote] =
    useState('');

  useEffect(() => {

    const fetchPendingArticles = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/articles?status=pending&page=1&limit=20",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PENDING ARTICLES:");
        console.log(res.data);

        const formattedData = res.data.data.map((article: any) => ({

          id: article.id,

          title: article.title,

          // dynasty.name
          dynasty:
            article.dynasty_name || "Không rõ",

          // articles.year_display
          year:
            article.year_display || "",

          // category.name
          category:
            article.category_name || "Không rõ",

          // created_by
          editor:
            article.created_by_name || "Không rõ",

          // created_at
          submitDate:
            new Date(article.created_at)
              .toLocaleDateString("vi-VN"),

        }));

        setPendingData(formattedData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchPendingArticles();

  }, []);

  const handleViewPost = async (id: string) => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `http://localhost:3000/api/admin/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const token = localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/articles/${id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Xuất bản thành công");

      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

    const handleReject = async (
        id:string
      ) => {
        try {

          const token =
            localStorage.getItem('token');

          await axios.patch(
            `http://localhost:3000/api/admin/articles/${id}/reject`,
            {},
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );

          alert(
            'Đã từ chối'
          );

          window.location.reload();

        } catch(error){
          console.log(error);
        }
      };


    const handleOpenReturnModal = (
      id: string
    ) => {
      setSelectedArticleId(id);
      setReturnNote('');
      setShowReturnModal(true);
    };
  
    const handleReturn = async () => {
      try {

        const token =
          localStorage.getItem('token');

        await axios.patch(
          `http://localhost:3000/api/admin/articles/${selectedArticleId}/return`,
          {
            return_note: returnNote
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert("Đã trả bài về");

        setShowReturnModal(false);

        window.location.reload();

      } catch (error) {
        console.log(error);
        alert("Trả bài thất bại");
      }
    };

    const handleBulkPublish = async () => {

      const confirmPublish =
        window.confirm(
          "Xuất bản toàn bộ bài viết đang chờ duyệt?"
        );

      if (!confirmPublish) return;

      try {

        const token =
          localStorage.getItem("token");

        await axios.post(
          "http://localhost:3000/api/admin/articles/bulk-publish",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Đã duyệt tất cả thành công"
        );

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          "Duyệt tất cả thất bại"
        );
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