import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { Article } from "../../types/article.type";
import type { ApiResponse } from "../../types/api.type";

async function fetchArticleBySlug(slug: string) {
  const res = await httpClient.get<ApiResponse<Article>>(`/articles/${slug}`);
  return res.data.data;
}

export function useArticleBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => {
      if (!slug) throw new Error("slug is required");
      return fetchArticleBySlug(slug);
    },
    enabled: !!slug,
  });
}

// List articles
export type ArticleTypeFilter = Article["type"];

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

interface ArticlesResponse {
  data: Article[];
  total: number;
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

  const res = await httpClient.get<ArticlesResponse>(
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
