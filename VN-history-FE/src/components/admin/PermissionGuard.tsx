import React from "react";
import { Navigate } from "react-router-dom";
import { usePermissions } from "../../context/PermissionContext";

interface Props {
  permissionKey: string;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<Props> = ({ permissionKey, children }) => {
  const { hasPermission, isLoading } = usePermissions();

  if (isLoading) return null;

  if (!hasPermission(permissionKey)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PermissionGuard;
