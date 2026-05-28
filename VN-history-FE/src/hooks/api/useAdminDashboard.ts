import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface Stats {
  total_published: number;
  total_pending: number;
  total_draft: number;
  total_rejected: number;
  reports_new: number;
  reports_reviewing: number;
  published_today: number;
  active_admins: number;
  total_dynasties: number;
}

export interface DashboardData {
  stats: Stats;
  recent_articles: any[];
  recent_logs: any[];
  open_reports: any[];
}

export interface DashboardResponse {
  data: DashboardData;
}

export function useAdminDashboardQuery() {
  return useQuery<DashboardData>({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await httpClient.get<DashboardResponse>("/admin/dashboard");
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}
