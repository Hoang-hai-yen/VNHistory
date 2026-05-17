import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { ApiListResponse, ApiResponse, Dynasty } from "../../types";

export interface UseDynastiesParams {
  page?: number;
  limit?: number;
}

async function fetchDynasties(params: UseDynastiesParams = {}) {
  const entries = Object.entries(params).flatMap(([key, value]) => {
    if (value === undefined || value === null) return [];
    return [[key, String(value)]];
  });

  const searchParams = new URLSearchParams(entries);
  const query = searchParams.toString();
  const res = await httpClient.get<ApiListResponse<Dynasty>>(
    `/dynasties${query ? `?${query}` : ""}`,
  );

  return res.data;
}

export const useDynasties = (params: UseDynastiesParams = {}) => {
  return useQuery({
    queryKey: ["dynasties", params.page ?? null, params.limit ?? null],
    queryFn: () => fetchDynasties(params),
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
