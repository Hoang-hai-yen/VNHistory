import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/History.css';
import {
  useSearch
} from '../context/SearchContext';

import {
  highlightText
} from '../utils/highlightText';

interface HistoryLog {
  id: number;
  action: string;
  target_type: string;
  target_title: string;
  detail: string;
  admin_name: string;
  admin_role: string;
  created_at: string;
}

const History: React.FC = () => {

  const [historyData, setHistoryData] = useState<HistoryLog[]>([]);
  const {
    searchText
  } = useSearch();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/logs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        setHistoryData(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="history-page">
      <div className="history-header">
        <h2 className="history-title">
          NHẬT KÝ HOẠT ĐỘNG
        </h2>

        <div className="history-filters">
          <span className="filter-time">
            7 ngày qua
          </span>
        </div>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>THỜI GIAN</th>
              <th>ADMIN</th>
              <th>HÀNH ĐỘNG</th>
              <th>ĐỐI TƯỢNG</th>
              <th>CHI TIẾT</th>
            </tr>
          </thead>

          <tbody>
            {historyData.map((log) => (
              <tr key={log.id}>
                <td className="time-cell">
                  {highlightText(new Date(log.created_at).toLocaleString("vi-VN"), searchText)}
                </td>

                <td className="admin-cell">
                  <div className="admin-avatar"></div>
                  <span>{highlightText(log.admin_name, searchText)}</span>
                </td>

                <td>
                  <span className="action-status">
                    {highlightText(log.action, searchText)}
                  </span>
                </td>

                <td className="target-cell">
                  {highlightText(log.target_title, searchText)}
                </td>

                <td className="details-cell">
                  {highlightText(log.detail, searchText)}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default History;