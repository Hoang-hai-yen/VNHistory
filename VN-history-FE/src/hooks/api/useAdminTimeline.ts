import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface AdminDynastyRaw {
  id: string;
  name: string;
  year_display: string;
  year_start: number;
  year_end: number;
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

export function useAddTimelineEventMutation(dynastyId: string) {
  const queryClient = useQueryClient();
  return useMutation<any, any, { article_id: string; note?: string; sort_order?: number }>({
    mutationFn: async (payload) => {
      const res = await httpClient.post(`/admin/timeline/${dynastyId}/events`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTimelineEvents", dynastyId] });
      queryClient.invalidateQueries({ queryKey: ["adminTimeline"] });
    },
  });
}

export function useRemoveTimelineEventMutation(dynastyId: string) {
  const queryClient = useQueryClient();
  return useMutation<any, any, string>({
    mutationFn: async (eventId) => {
      const res = await httpClient.delete(`/admin/timeline/events/${eventId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTimelineEvents", dynastyId] });
      queryClient.invalidateQueries({ queryKey: ["adminTimeline"] });
    },
  });
}
