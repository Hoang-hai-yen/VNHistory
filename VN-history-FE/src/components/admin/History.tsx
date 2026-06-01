import React from "react";
import "../../styles/History.css";
import { useAdminLogsQuery } from "../../hooks/api/useAdminLogs";

const ACTION_TYPE_MAP: Record<string, string> = {
  publish: "publish",
  reject: "reject",
  approve: "approve",
  lock: "lock",
  verify: "verify",
  edit: "edit",
  create: "publish",
  delete: "reject",
  update_permissions: "edit",
  assign_report: "approve",
  resolve_report: "approve",
  reject_report: "reject",
  flag_report: "verify",
  return_article: "verify",
  bulk_publish: "publish",
};

const History: React.FC = () => {
  const { data: logs = [], isLoading } = useAdminLogsQuery();

  return (
    <div className="history-page">
      <div className="history-header">
        <h2 className="history-title">NHẬT KÝ HOẠT ĐỘNG</h2>
        <div className="history-filters">
          <span className="filter-time">{logs.length} bản ghi</span>
        </div>
      </div>

      <div className="history-table-container">
        {isLoading ? (
          <p style={{ padding: 20 }}>Đang tải...</p>
        ) : (
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
              {logs.map((log) => {
                const actionType = ACTION_TYPE_MAP[log.action] || "edit";
                return (
                  <tr key={log.id}>
                    <td className="time-cell">
                      {new Date(log.created_at).toLocaleString("vi-VN")}
                    </td>
                    <td className="admin-cell">
                      <span>{log.admin_name}</span>
                    </td>
                    <td>
                      <span className={`action-status status-${actionType}`}>
                        ● {log.action}
                      </span>
                    </td>
                    <td className="target-cell">{log.target_title || log.target_type}</td>
                    <td className="details-cell">{log.detail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
