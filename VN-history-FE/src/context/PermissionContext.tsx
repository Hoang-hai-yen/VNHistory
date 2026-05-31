import React, { createContext, useContext } from "react";
import { useMyPermissionsQuery } from "../hooks/api/useAdminPermissions";
import { useMeQuery } from "../hooks/api/useAuth";

interface PermissionContextValue {
  permissions: string[];
  hasPermission: (key: string) => boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
  hasPermission: () => false,
  isSuperAdmin: false,
  isLoading: true,
});

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: meRes, isLoading: meLoading } = useMeQuery();
  const { data: permissions = [], isLoading: permLoading } = useMyPermissionsQuery();

  const isSuperAdmin = meRes?.data?.role === "super_admin";
  const isLoading = meLoading || permLoading;

  const hasPermission = (key: string) => isSuperAdmin || permissions.includes(key);

  return (
    <PermissionContext.Provider value={{ permissions, hasPermission, isSuperAdmin, isLoading }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);
