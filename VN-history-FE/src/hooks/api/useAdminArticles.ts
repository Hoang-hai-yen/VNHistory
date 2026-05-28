import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface AdminArticleListParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface AdminArticleResponse {
  data: any[];
}

export interface AdminArticleDetailResponse {
  data: any;
}

export function useAdminArticlesQuery(params: AdminArticleListParams = {}) {
  return useQuery<any[]>({
    queryKey: ["adminArticles", params.status ?? "all", params.page ?? 1, params.limit ?? 20],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.status) searchParams.append("status", params.status);
      if (params.page) searchParams.append("page", String(params.page));
      if (params.limit) searchParams.append("limit", String(params.limit));

      const query = searchParams.toString();
      const res = await httpClient.get<AdminArticleResponse>(`/admin/articles${query ? `?${query}` : ""}`);
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAdminArticleDetailQuery(id: string) {
  return useQuery<any>({
    queryKey: ["adminArticle", id],
    queryFn: async () => {
      const res = await httpClient.get<AdminArticleDetailResponse>(`/admin/articles/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>({
    mutationFn: async (payload) => {
      const res = await httpClient.post("/admin/articles", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useUpdateArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; payload: any }>({
    mutationFn: async ({ id, payload }) => {
      const res = await httpClient.put(`/admin/articles/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticle", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useSubmitReviewArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (id) => {
      const res = await httpClient.patch(`/admin/articles/${id}/submit`, {});
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticle", id] });
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function usePublishArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (id) => {
      const res = await httpClient.patch(`/admin/articles/${id}/publish`, {});
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticle", id] });
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useRejectArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (id) => {
      const res = await httpClient.patch(`/admin/articles/${id}/reject`, {});
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticle", id] });
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useReturnArticleMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; return_note: string }>({
    mutationFn: async ({ id, return_note }) => {
      const res = await httpClient.patch(`/admin/articles/${id}/return`, { return_note });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminArticle", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useBulkPublishArticlesMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, void>({
    mutationFn: async () => {
      const res = await httpClient.post("/admin/articles/bulk-publish", {});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminArticles"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}
