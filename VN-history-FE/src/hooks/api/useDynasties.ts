import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { Dynasty } from "../../types/dynasty.type";
import type { ApiResponse } from "../../types/api.type";

export const useDynasties = () => {
  return useQuery<ApiResponse<Dynasty[]>>({
    queryKey: ["dynasties"],
    queryFn: async () => {
      const res = await httpClient.get<ApiResponse<Dynasty[]>>("/dynasties");
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
