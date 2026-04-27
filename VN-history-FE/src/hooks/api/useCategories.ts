import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export type CategoryArticleType =
  | "event"
  | "person"
  | "place"
  | "video"
  | "culture";

export interface Category {
  id: string;
  name: string;
  slug: string;
  article_type: CategoryArticleType;
  sort_order: number;
}

interface CategoriesResponse {
  data: Category[];
  total: number;
}

async function fetchCategories(type?: CategoryArticleType) {
  const params = type ? `?type=${type}` : "";
  const res = await httpClient.get<CategoriesResponse>(`/categories${params}`);
  return res.data;
}

export function useCategories(type?: CategoryArticleType) {
  return useQuery({
    queryKey: [`categories-${type ?? "all"}`],
    queryFn: () => fetchCategories(type),
  });
}
