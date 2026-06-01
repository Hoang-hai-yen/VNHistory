import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface ReportItem {
  id: string;
  report_code: string;
  article_id: string;
  error_type: string;
  severity: string;
  quoted_text: string;
  description: string;
  suggested_source: string;
  reporter_email: string;
  status: string;
  assigned_to: string | null;
  admin_note: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  article_title: string;
  article_slug: string;
}

export interface ReportsResponse {
  data: ReportItem[];
}

export function useAdminReportsQuery() {
  return useQuery<ReportItem[]>({
    queryKey: ["adminReports"],
    queryFn: async () => {
      const res = await httpClient.get<ReportsResponse>("/admin/reports");
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useAssignReportMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; admin_id: string }>({
    mutationFn: async ({ id, admin_id }) => {
      const res = await httpClient.patch(`/admin/reports/${id}/assign`, { admin_id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useFlagReportMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; admin_note: string | null }>({
    mutationFn: async ({ id, admin_note }) => {
      const res = await httpClient.patch(`/admin/reports/${id}/flag`, { admin_note });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useResolveReportMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; admin_note?: string }>({
    mutationFn: async ({ id, admin_note }) => {
      const res = await httpClient.patch(`/admin/reports/${id}/resolve`, { admin_note });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useRejectReportMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (id) => {
      const res = await httpClient.patch(`/admin/reports/${id}/reject`, {});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}

export function useSaveReportNoteMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; admin_note: string }>({
    mutationFn: async ({ id, admin_note }) => {
      const res = await httpClient.patch(`/admin/reports/${id}/save-note`, { admin_note });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
    },
  });
}

export function useMarkFixedReportMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, { id: string; admin_note?: string }>({
    mutationFn: async ({ id, admin_note }) => {
      const res = await httpClient.patch(`/admin/reports/${id}/mark-fixed`, { admin_note });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminReports"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
    },
  });
}
