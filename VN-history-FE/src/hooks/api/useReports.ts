import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface CreateReportPayload {
  article_id: string;
  error_type: string;
  severity: "low" | "medium" | "high";
  description?: string;
  quoted_text?: string;
  suggested_source?: string;
  reporter_email?: string;
}

export interface CreateReportResponse {
  // Adjust fields based on actual API response structure if available
  message: string;
}

async function createReportApi(payload: CreateReportPayload) {
  const res = await httpClient.post<CreateReportResponse>("/reports", payload);
  return res.data;
}

export function useCreateReportMutation() {
  return useMutation({
    mutationFn: createReportApi,
  });
}
