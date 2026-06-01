import React, { useState, useEffect } from "react";
import "../../styles/Permissions.css";
import {
  useAdminPermissionsQuery,
  useUpdateAdminPermissionsMutation,
} from "../../hooks/api/useAdminPermissions";

const Permissions: React.FC = () => {
  const { data } = useAdminPermissionsQuery();
  const updateMutation = useUpdateAdminPermissionsMutation();

  const [localPerms, setLocalPerms] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (!data) return;
    const map: Record<string, Record<string, boolean>> = {};
    data.data.forEach((roleData) => {
      map[roleData.role] = {};
      roleData.permissions.forEach((p) => {
        map[roleData.role][p.key] = p.granted;
      });
    });
    setLocalPerms(map);
  }, [data]);

  const handleToggle = (role: string, key: string) => {
    setLocalPerms((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [key]: !prev[role][key],
      },
    }));
  };

  const handleSave = async (role: string) => {
    try {
      await updateMutation.mutateAsync(localPerms[role]);
      alert("Lưu quyền thành công");
    } catch (error: any) {
      alert(error.response?.data?.message || "Lưu thất bại");
    }
  };

  if (!data) return <div style={{ padding: 40 }}>Đang tải...</div>;

  return (
    <div className="permission-page">
      <h2 className="page-title-gold">PHÂN QUYỀN HỆ THỐNG</h2>
      <div className="role-cards-container">
        {data.data.map((roleData) => (
          <div key={roleData.role} className="role-card">
            <div className="role-header">
              <div className="role-icon icon-shield">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="role-title">{roleData.label}</h3>
              <p className="role-description">{roleData.description}</p>
            </div>
            <div className="permission-list">
              {roleData.permissions.map((p) => (
                <label key={p.key} className="permission-item-simple">
                  <input
                    type="checkbox"
                    checked={localPerms[roleData.role]?.[p.key] ?? p.granted}
                    disabled={!p.configurable}
                    onChange={() => handleToggle(roleData.role, p.key)}
                  />
                  <span className="permission-label">{p.label}</span>
                </label>
              ))}
            </div>
            {data.current_role === "super_admin" && (
              <div style={{ marginTop: 16, textAlign: "right" }}>
                <button
                  className="btn-save-gold"
                  onClick={() => handleSave(roleData.role)}
                  disabled={updateMutation.isPending}
                >
                  LƯU
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permissions;
