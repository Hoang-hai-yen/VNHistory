import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Posts.css';
import { useSearch } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';


type PublishTab =
  | 'Tất cả'
  | 'Đã xuất bản'
  | 'Chờ duyệt'
  | 'Bản nháp'
  | 'Từ chối';

interface ContentItem {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  dynasty: string;
  assignee: string;
  date: string;
  status: string;
  rejection_note?: string;
}

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<PublishTab>('Tất cả');
  const navigate = useNavigate();
  const { searchText } = useSearch();

  const [contentData, setContentData] = useState<
    ContentItem[]
  >([]);

  const [showReturnModal, setShowReturnModal] =
    useState(false);

  const [selectedArticleId, setSelectedArticleId] =
    useState('');

  const [returnNote, setReturnNote] =
    useState('');

  const fetchArticles = async (
    status?: 'published'
    | 'pending'
    | 'draft'
    | 'rejected'
    ) => {
    try {
      const token = localStorage.getItem('token');

      let url =
        'http://localhost:3000/api/admin/articles?page=1&limit=20';

      if (status) {
        url = `http://localhost:3000/api/admin/articles?status=${status}&page=1&limit=20`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      const formattedData = res.data.data.map(
        (article: any) => ({
          id: article.id,
          title: article.title,
          subtitle: article.subtitle,

          type:
            article.type === 'event'
              ? 'Sự kiện'
              : article.type === 'person'
              ? 'Nhân vật'
              : article.type === 'place'
              ? 'Di sản'
              : 'Khác',

          dynasty: article.dynasty_name || '-',

          assignee: article.created_by_name || '-' ,

          date: new Date(
              article.published_at || article.created_at
            ).toLocaleDateString('vi-VN'),

          status:
            article.status === 'published'
              ? 'Đã xuất bản'
              : article.status === 'pending'
              ? 'Chờ duyệt'
              : article.status === 'draft'
              ? 'Bản nháp'
              : 'Từ chối',

          rejection_note:
                article.rejection_note || '',
        })
      );

      setContentData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab === 'Tất cả') {
      fetchArticles();
    }

    if (activeTab === 'Đã xuất bản') {
      fetchArticles('published');
    }

    if (activeTab === 'Chờ duyệt') {
      fetchArticles('pending');
    }

    if (activeTab === 'Bản nháp') {
      fetchArticles('draft');
    }

    if (activeTab === 'Từ chối') {
      fetchArticles('rejected' as any);
    }
  }, [activeTab]);

  const renderStatusTag = (status: string) => {
    const statusMap: Record<string, string> = {
      'Chờ duyệt': 'pending',
      'Đang xem xét': 'reviewing',
      'Đã xuất bản': 'published',
      'Bản nháp': 'draft',
      'Từ chối': 'rejected',
    };

    return (
      <span
        className={`status-tag status-${statusMap[status]}`}
      >
        {status}
      </span>
    );
  };

  const renderTypeTag = (type: string) => {
    let className = 'type-other';

    if (type === 'SỰ KIỆN') {
      className = 'type-event';
    }

    if (type === 'NHÂN VẬT') {
      className = 'type-person';
    }

    if (type === 'DI SẢN') {
      className = 'type-place';
    }

    return (
      <span className={`type-badge ${className}`}>
        {type}
      </span>
    );
  };

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

    const handleEditPost = async (id: string) => {

      try {

        const token =
          localStorage.getItem('token');

        const res = await axios.get(
          `http://localhost:3000/api/admin/articles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate('/post-edit', {
          state: {
            article: res.data.data,
          },
        });

      } catch (error) {
        console.log(error);
      }
    };

    const handlePublish = async (
  id:string
) => {
  try {

    const token =
      localStorage.getItem('token');

    await axios.patch(
      `http://localhost:3000/api/admin/articles/${id}/publish`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert(
      'Xuất bản thành công'
    );

    fetchArticles();

  } catch(error){
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

        fetchArticles();

      } catch(error){
        console.log(error);
      }
    };


    const handleOpenReturnModal = (
    id:string
    )=>{
      setSelectedArticleId(id);
      setReturnNote('');
      setShowReturnModal(true);
    };


    const handleReturn = async () => {

    try{

      const token =
      localStorage.getItem('token');

      await axios.patch(
        `http://localhost:3000/api/admin/articles/${selectedArticleId}/return`,
        {
          return_note:
          returnNote
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert(
        'Đã trả bài'
      );

      setShowReturnModal(false);

      fetchArticles();

    }
    catch(error){

      console.log(error);

    }

    };

    const renderActions = (item: ContentItem) => {

      // Published -> Xem
      if (item.status === 'Đã xuất bản') {
        return (
          <div className="action-group">

            <button
              className="btn-action btn-gray-text"
              onClick={() => handleViewPost(item.id)}
            >
              Xem
            </button>
            <button
              className="btn-action btn-blue-text"
              onClick={() => handleEditPost(item.id)}
            >
              Chỉnh sửa
            </button>

          </div>
        );
      }

      // Draft + Rejected -> Chỉnh sửa
      if (
        item.status === 'Bản nháp') {
        return (
          <div className="action-group">
            <button
              className="btn-action btn-blue-text"
              onClick={() => handleEditPost(item.id)}
            >
              Chỉnh sửa
            </button>

          </div>
        );
      }

      //Rejected -> Xem
      if (item.status === 'Từ chối') {
        return (
          <div className="action-group">
            <button
              className="btn-action btn-gray-text"
              onClick={() => handleViewPost(item.id)}
            >
              Xem
            </button>

          </div>
        );
      }

      // Pending
      return (
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
        );
    };

    

  return (
    <div className="posts-page">

      {/* Toolbar */}
      <div className="posts-toolbar">

        <div className="tabs-container">

          <button
            className={`tab-link ${
              activeTab === 'Tất cả'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Tất cả')
            }
          >
            Tất cả
          </button>

          <button
            className={`tab-link ${
              activeTab === 'Đã xuất bản'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Đã xuất bản')
            }
          >
            Đã xuất bản
          </button>

          <button
            className={`tab-link ${
              activeTab === 'Chờ duyệt'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Chờ duyệt')
            }
          >
            Chờ duyệt
          </button>

          <button
            className={`tab-link ${
              activeTab === 'Bản nháp'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setActiveTab('Bản nháp')
            }
          >
            Bản nháp
          </button>

          <button
            className={`tab-link ${
            activeTab==='Từ chối'
            ?'active':''
            }`}
            onClick={() =>
            setActiveTab(
            'Từ chối'
            )
            }
            >
            Từ chối
            </button>

        </div>

        <button
          className="btn-create-primary"
          onClick={() => navigate('/create-post')}
        >
          + TẠO BÀI MỚI
        </button>

      </div>

      {/* Table */}
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
              <th>GHI CHÚ</th>
            </tr>
          </thead>

          <tbody>

            {contentData.map((item) => (
              <tr key={item.id}>

                <td className="title-column">
                  <div className="title-main">
                    {highlightText(item.title, searchText)}
                  </div>

                  {/* {item.subtitle && (
                    <div className="title-sub">
                      ⚠ {item.subtitle}
                    </div>
                  )} */}
                </td>

                <td>
                  {renderTypeTag(item.type)}
                </td>

                <td>{highlightText(item.dynasty, searchText)}</td>

                <td>{highlightText(item.assignee, searchText)}</td>

                <td>{highlightText(item.date, searchText)}</td>

                <td>
                  {renderStatusTag(item.status)}
                </td>

                <td>
                  {renderActions(item)}
                </td>

                <td className="note-cell">
                    {highlightText(item.rejection_note || '', searchText)}
                  </td>

              </tr>
            ))}

          </tbody>

        </table>

      </section>

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

export default Posts;