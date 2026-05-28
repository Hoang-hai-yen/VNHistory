import React from 'react';
import '../styles/Permissions.css';
import { useSearch } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';
import { useAdminPermissionsQuery, useUpdateAdminPermissionsMutation } from '../hooks/api/useAdminPermissions';



const Permissions: React.FC = () => {
  const { data: permissionsData } = useAdminPermissionsQuery();
  const updatePermissionsMutation = useUpdateAdminPermissionsMutation();
  const { searchText } = useSearch();

  const roles = permissionsData?.data || [];
  const currentRole = permissionsData?.current_role || "";

  const handleToggle = async (
    roleIndex: number,
    permissionKey: string
  ) => {
    // Chỉ Super Admin mới được chỉnh
    if (currentRole !== "super_admin") return;

    // Tìm role admin
    const targetRole = roles[roleIndex];
    if (!targetRole || targetRole.role !== "admin") return;

    // Tìm permission hiện tại
    const targetPermission = targetRole.permissions.find(
      (p) => p.key === permissionKey
    );

    if (
      !targetPermission ||
      !targetPermission.configurable
    ) {
      return;
    }

    // Giá trị mới
    const newGranted = !targetPermission.granted;

    try {
      await updatePermissionsMutation.mutateAsync({
        [permissionKey]: newGranted,
      });
    } catch (error) {
      console.log(error);
      alert("Cập nhật quyền thất bại");
    }
  };

  return (
    <div className="permission-page">

      <h2 className="page-title-gold">
        PHÂN QUYỀN HỆ THỐNG
      </h2>

      <div className="role-cards-container">

        {roles.map((role, roleIndex) => (

          <div
            className="role-card"
            key={role.role}
          >

            {/* Header */}
            <div className="role-header">

              <div
                className={`role-icon ${
                  role.role === "super_admin"
                    ? "icon-shield"
                    : "icon-edit"
                }`}
              >

                {role.role === "super_admin" ? (

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>

                ) : (

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>

                )}

              </div>

              <h3 className="role-title">
                {role.label}
              </h3>

              <p className="role-description">
                {role.description}
              </p>

            </div>

            {/* Permissions */}
            <div className="permission-list">

              {role.permissions.map((permission) => (

                <label
                  key={permission.key}
                  className="permission-item-simple"
                  style={{
                    opacity: permission.configurable
                      ? 1
                      : 0.5,
                    cursor: permission.configurable
                      ? "pointer"
                      : "not-allowed",
                  }}
                >

                  <input
                    type="checkbox"
                    checked={permission.granted}
                    disabled={
                      !permission.configurable ||
                      currentRole !== "super_admin" ||
                      role.role !== "admin"
                    }
                    onChange={() =>
                      handleToggle(
                        roleIndex,
                        permission.key
                      )
                    }
                  />

                  <span className="permission-label">
                    {highlightText(permission.label, searchText)}
                  </span>

                </label>

              ))}

            </div>
          </div>

        ))}

      </div>
    </div>
  );
};

export default Permissions;