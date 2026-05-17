import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { ApiListResponse, ArticleType, Category } from "../../types";

async function fetchCategories(type?: ArticleType) {
  const params = type ? `?type=${type}` : "";
  const res = await httpClient.get<ApiListResponse<Category>>(
    `/categories${params}`,
  );
  return res.data;
}

export function useCategories(type?: ArticleType) {
  return useQuery({
    queryKey: [`categories-${type ?? "all"}`],
    queryFn: () => fetchCategories(type),
  });
}
