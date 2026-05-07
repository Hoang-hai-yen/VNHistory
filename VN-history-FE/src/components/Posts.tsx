import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Posts.css';

type PublishTab =
  | 'Tất cả'
  | 'Đã xuất bản'
  | 'Chờ duyệt'
  | 'Bản nháp';

interface ContentItem {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  dynasty: string;
  assignee: string;
  date: string;
  status: string;
}

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<PublishTab>('Tất cả');

  const [contentData, setContentData] = useState<
    ContentItem[]
  >([]);

  const fetchArticles = async (
    status?: 'published' | 'pending' | 'draft'
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

          assignee: 'Admin',

          date: new Date(
            article.published_at
          ).toLocaleDateString('vi-VN'),

          status:
            article.status === 'published'
              ? 'Đã xuất bản'
              : article.status === 'pending'
              ? 'Chờ duyệt'
              : article.status === 'draft'
              ? 'Bản nháp'
              : 'Từ chối',
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

  const renderActions = (item: ContentItem) => {
    if (
      item.status === 'Đã xuất bản' ||
      item.status === 'Bản nháp'
    ) {
      return (
        <div className="action-group">
          <button className="btn-action btn-blue-text">
            Chỉnh sửa
          </button>

          <button className="btn-action btn-gray-text">
            Xem
          </button>
        </div>
      );
    }

    if (item.status === 'Từ chối') {
      return (
        <div className="action-group">
          <button className="btn-action btn-red-text">
            Lý do
          </button>

          <button className="btn-action btn-blue-text">
            Chỉnh sửa
          </button>
        </div>
      );
    }

    return (
      <div className="action-group">
        <button className="btn-action btn-green-text">
          Duyệt
        </button>

        <button className="btn-action btn-red-text">
          Từ chối
        </button>

        <button className="btn-action btn-blue-text">
          Sửa
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

        </div>

        <button className="btn-create-primary">
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
            </tr>
          </thead>

          <tbody>

            {contentData.map((item) => (
              <tr key={item.id}>

                <td className="title-column">
                  <div className="title-main">
                    {item.title}
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

                <td>{item.dynasty}</td>

                <td>{item.assignee}</td>

                <td>{item.date}</td>

                <td>
                  {renderStatusTag(item.status)}
                </td>

                <td>
                  {renderActions(item)}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </section>
    </div>
  );
};

export default Posts;