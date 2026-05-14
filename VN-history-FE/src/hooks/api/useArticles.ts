import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type {
  ApiListResponse,
  ApiResponse,
  ArticleDetail,
  ArticleSummary,
  ArticleType,
} from "../../types";

async function fetchArticleBySlug(slug: string) {
  console.log("fetchArticleBySlug called with slug:", slug);
  const res = await httpClient.get<ApiResponse<ArticleDetail>>(
    `/articles/${slug}`,
  );
  console.log("fetchArticleBySlug", res.data);

  return res.data.data;
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => {
      if (!slug) throw new Error("slug is required");
      console.log("start");

      return fetchArticleBySlug(slug);
    },
  });
}

// List articles
export type ArticleTypeFilter = ArticleType;

export interface UseArticlesParams {
  type?: ArticleTypeFilter;
  dynasty_id?: string;
  category_id?: string;
  is_featured?: boolean;
  year_from?: number;
  year_to?: number;
  q?: string;
  page?: number; // default 1 on API
  limit?: number; // default 20 on API
}

async function fetchArticles(params: UseArticlesParams = {}) {
  // normalize: bỏ undefined/null/"" và stringify number/boolean
  const entries = Object.entries(params).flatMap(([key, value]) => {
    if (value === undefined || value === null) return [];
    if (typeof value === "string" && value.trim() === "") return [];
    return [[key, String(value)]];
  });

  const searchParams = new URLSearchParams(entries);
  const query = searchParams.toString();

  const res = await httpClient.get<ApiListResponse<ArticleSummary>>(
    `/articles${query ? `?${query}` : ""}`,
  );
  return res.data;
}

export function useArticles(params: UseArticlesParams = {}) {
  // queryKey ổn định hơn: dùng array primitive thay vì object (tránh object identity)
  const queryKey = [
    "articles",
    params.type ?? "",
    params.dynasty_id ?? "",
    params.category_id ?? "",
    params.is_featured ?? null,
    params.year_from ?? null,
    params.year_to ?? null,
    params.q ?? "",
    params.page ?? null,
    params.limit ?? null,
  ] as const;

  return useQuery({
    queryKey,
    queryFn: () => fetchArticles(params),
  });
}
