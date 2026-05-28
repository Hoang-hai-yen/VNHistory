import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface AdminDynastyRaw {
  id: string;
  name: string;
  year_display: string;
  event_count: number;
}

export interface AdminTimelineEventRaw {
  id: string;
  article_id?: string;
  title?: string;
  year_display?: string;
  category_name?: string;
  status: string;
}

export interface TimelineResponse {
  data: AdminDynastyRaw[];
}

export interface TimelineEventsResponse {
  data: any[];
}

export function useAdminTimelineQuery() {
  return useQuery<AdminDynastyRaw[]>({
    queryKey: ["adminTimeline"],
    queryFn: async () => {
      const res = await httpClient.get<TimelineResponse>("/admin/timeline");
      return res.data.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useAdminTimelineEventsQuery(dynastyId: string) {
  return useQuery<any[]>({
    queryKey: ["adminTimelineEvents", dynastyId],
    queryFn: async () => {
      const res = await httpClient.get<TimelineEventsResponse>(`/admin/timeline/${dynastyId}/events`);
      return res.data.data;
    },
    enabled: !!dynastyId,
    staleTime: 30 * 1000,
  });
}
