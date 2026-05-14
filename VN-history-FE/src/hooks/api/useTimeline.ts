import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { ApiListResponse, Timeline } from "../../types";

export const useTimeline = () => {
  return useQuery<ApiListResponse<Timeline>>({
    queryKey: ["timeline"],
    queryFn: async () => {
      const res = await httpClient.get<ApiListResponse<Timeline>>("/timeline");
      return res.data;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
