import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { ApiListResponse, ApiResponse, Dynasty } from "../../types";

export const useDynasties = () => {
  return useQuery<ApiListResponse<Dynasty>>({
    queryKey: ["dynasties"],
    queryFn: async () => {
      const res = await httpClient.get<ApiListResponse<Dynasty>>("/dynasties");
      return res.data;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useDynastyDetail = (slug: string) => {
  return useQuery<ApiResponse<Dynasty>>({
    queryKey: ["dynasty", slug],
    queryFn: async () => {
      const res = await httpClient.get<ApiResponse<Dynasty>>(
        `/dynasties/${slug}`,
      );
      return res.data;
    },
    enabled: !!slug,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
