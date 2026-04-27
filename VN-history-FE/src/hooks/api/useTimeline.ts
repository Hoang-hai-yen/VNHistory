import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { ApiResponse } from "../../types/api.type";
import type { Timeline } from "../../types/timeline.type";

export const useTimeline = () => {
  return useQuery<ApiResponse<Timeline[]>>({
    queryKey: ["timeline"],
    queryFn: async () => {
      const res = await httpClient.get<ApiResponse<Timeline[]>>("/timeline");
      return res.data;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
