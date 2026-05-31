import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface PermissionItem {
  key: string;
  label: string;
  granted: boolean;
  configurable: boolean;
}

export interface RoleData {
  role: string;
  label: string;
  description: string;
  permissions: PermissionItem[];
}

export interface PermissionsResponse {
  data: RoleData[];
  current_role: string;
}

export function useMyPermissionsQuery() {
  const token = localStorage.getItem("token");
  return useQuery<string[]>({
    queryKey: ["myPermissions", token],
    queryFn: async () => {
      const res = await httpClient.get<{ permissions: string[] }>("/admin/permissions/me");
      return res.data.permissions;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminPermissionsQuery() {
  return useQuery<PermissionsResponse>({
    queryKey: ["adminPermissions"],
    queryFn: async () => {
      const res = await httpClient.get<PermissionsResponse>("/admin/permissions");
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useUpdateAdminPermissionsMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, Record<string, boolean>>({
    mutationFn: async (payload) => {
      const res = await httpClient.patch("/admin/permissions", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPermissions"] });
    },
  });
}
