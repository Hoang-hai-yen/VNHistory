import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Permissions.css';
import { useSearch } from '../context/SearchContext';
import { highlightText } from '../utils/highlightText';

interface PermissionItem {
  key: string;
  label: string;
  granted: boolean;
  configurable: boolean;
}

interface RoleData {
  role: string;
  label: string;
  description: string;
  permissions: PermissionItem[];
}

const Permissions: React.FC = () => {

  const [roles, setRoles] = useState<RoleData[]>([]);
  const [currentRole, setCurrentRole] = useState("");
  const { searchText } = useSearch();

  useEffect(() => {

    const fetchPermissions = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/permissions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PERMISSIONS RESPONSE:");
        console.log(res.data);

        setRoles(res.data.data);
        setCurrentRole(res.data.current_role);

      } catch (error) {
        console.log(error);
      }
    };

    fetchPermissions();

  }, []);

  const handleToggle = async (
  roleIndex: number,
  permissionKey: string
) => {

  // Chỉ Super Admin mới được chỉnh
  if (currentRole !== "super_admin") return;

  // Tìm role admin
  const targetRole = roles[roleIndex];

  if (targetRole.role !== "admin") return;

  // Tìm permission hiện tại
  const targetPermission =
    targetRole.permissions.find(
      (p) => p.key === permissionKey
    );

  if (
    !targetPermission ||
    !targetPermission.configurable
  ) {
    return;
  }

  // Giá trị mới
  const newGranted =
    !targetPermission.granted;

  // Update UI trước
  setRoles((prev) =>
    prev.map((role, index) => {

      if (
        index !== roleIndex ||
        role.role !== "admin"
      ) {
        return role;
      }

      return {
        ...role,
        permissions: role.permissions.map(
          (permission) => {

            if (
              permission.key === permissionKey
            ) {
              return {
                ...permission,
                granted: newGranted,
              };
            }

            return permission;
          }
        ),
      };
    })
  );

  try {

    const token =
      localStorage.getItem("token");

    await axios.patch(
      "http://localhost:3000/api/admin/permissions",
      {
        [permissionKey]: newGranted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } catch (error) {

    console.log(error);

    // rollback nếu lỗi
    setRoles((prev) =>
      prev.map((role, index) => {

        if (
          index !== roleIndex ||
          role.role !== "admin"
        ) {
          return role;
        }

        return {
          ...role,
          permissions: role.permissions.map(
            (permission) => {

              if (
                permission.key === permissionKey
              ) {
                return {
                  ...permission,
                  granted:
                    !newGranted,
                };
              }

              return permission;
            }
          ),
        };
      })
    );

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