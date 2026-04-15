import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type { Article } from "../../types/article.type";

async function fetchArticleBySlug(slug: string) {
  const res = await httpClient.get<Article>(`/articles/${slug}`);
  return res.data;
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
  const searchParams = new URLSearchParams();

  if (params.type) searchParams.set("type", params.type);
  if (params.dynasty_id) searchParams.set("dynasty_id", params.dynasty_id);
  if (params.category_id) searchParams.set("category_id", params.category_id);
  if (typeof params.is_featured === "boolean")
    searchParams.set("is_featured", String(params.is_featured));
  if (typeof params.year_from === "number")
    searchParams.set("year_from", String(params.year_from));
  if (typeof params.year_to === "number")
    searchParams.set("year_to", String(params.year_to));
  if (params.q) searchParams.set("q", params.q);
  if (typeof params.page === "number")
    searchParams.set("page", String(params.page));
  if (typeof params.limit === "number")
    searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();
  const res = await httpClient.get<ArticlesResponse>(
    `/articles${query ? `?${query}` : ""}`,
  );
  return res.data;
}

export function useArticles(params: UseArticlesParams = {}) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => fetchArticles(params),
  });
}
