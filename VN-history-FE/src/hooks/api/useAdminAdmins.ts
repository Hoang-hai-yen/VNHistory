import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface AdminUserRaw {
  id: string;
  full_name: string;
  email: string;
  role: string;
  article_count: number;
  resolved_report_count: number;
  is_active: number;
  last_login_at: string | null;
}

export interface AdminsResponse {
  data: AdminUserRaw[];
}

export function useAdminAdminsQuery() {
  return useQuery<AdminUserRaw[]>({
    queryKey: ["adminAdmins"],
    queryFn: async () => {
      const res = await httpClient.get<AdminsResponse>("/admin/admins");
      return res.data.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useCreateAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationFn: async (payload) => {
      const res = await httpClient.post("/admin/admins", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdmins"] });
    },
  });
}

export function useUpdateAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; payload: any }>({
    mutationFn: async ({ id, payload }) => {
      const res = await httpClient.put(`/admin/admins/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdmins"] });
    },
  });
}

export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (id) => {
      const res = await httpClient.delete(`/admin/admins/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminAdmins"] });
    },
  });
}
