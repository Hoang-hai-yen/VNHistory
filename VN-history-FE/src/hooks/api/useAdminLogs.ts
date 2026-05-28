import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface HistoryLog {
  id: number;
  action: string;
  target_type: string;
  target_title: string;
  detail: string;
  admin_name: string;
  admin_role: string;
  created_at: string;
}

export interface LogsResponse {
  data: HistoryLog[];
}

export function useAdminLogsQuery() {
  return useQuery<HistoryLog[]>({
    queryKey: ["adminLogs"],
    queryFn: async () => {
      const res = await httpClient.get<LogsResponse>("/admin/logs");
      return res.data.data;
    },
    staleTime: 30 * 1000,
  });
}
