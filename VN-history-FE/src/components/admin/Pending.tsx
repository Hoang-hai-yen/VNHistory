import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Pending.css';

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
            article.dynasty?.name || "Không rõ",

          // articles.year_display
          year:
            article.year_display || "",

          // category.name
          category:
            article.category?.name || "Không rõ",

          // created_by
          editor:
            article.created_by || "Không rõ",

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

  return (
    <div className="pending-page">

      <div className="pending-header">

        <h2 className="pending-title">
          CHỜ XUẤT BẢN - {pendingData.length} BÀI
        </h2>

        <button className="btn-approve-all">
          DUYỆT TẤT CẢ
        </button>

      </div>

      <div className="pending-table-container">

        <table className="pending-table">

          <thead>
            <tr>

              <th>TIÊU ĐỀ</th>
              <th>EDITOR</th>
              <th>GỬI DUYỆT</th>
              <th>HÀNH ĐỘNG</th>

            </tr>
          </thead>

          <tbody>

            {pendingData.map((item) => (

              <tr key={item.id}>

                {/* Title */}
                <td className="title-cell">

                  <div className="main-title">
                    {item.title}
                  </div>

                  <div className="sub-info">
                    {item.dynasty}
                    {" - "}
                    {item.year}
                    {" - "}
                    {item.category}
                  </div>

                </td>

                {/* Editor */}
                <td>
                  {item.editor}
                </td>

                {/* Submit Date */}
                <td>
                  {item.submitDate}
                </td>

                {/* Actions */}
                <td className="action-cell">

                  <button className="btn-publish-final">
                    Duyệt & xuất bản
                  </button>

                  <button className="btn-reject-back">
                    Trả về
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Pending;
