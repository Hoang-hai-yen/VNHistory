import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";
import type {
  ApiListResponse,
  ApiResponse,
  ArticleDetailOfType,
  ArticleSummaryOfType,
  ArticleType,
} from "../../types";
import {
  normalizeArticleDetail,
  normalizeArticleListResponse,
} from "../../utils/article.utils";

async function fetchArticleBySlug(slug: string) {
  const res = await httpClient.get<ApiResponse<ArticleDetailOfType>>(
    `/articles/${slug}`,
  );

  return normalizeArticleDetail(res.data.data);
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => {
      if (!slug) throw new Error("slug is required");

      return fetchArticleBySlug(slug);
    },
    enabled: !!slug,
  });
}

export type ArticleTypeFilter = ArticleType;

export interface UseArticlesParams<T extends ArticleType = ArticleType> {
  type?: T;
  dynasty_id?: string;
  category_id?: string;
  is_featured?: boolean;
  year_from?: number;
  year_to?: number;
  q?: string;
  page?: number;
  limit?: number;
}

async function fetchArticles<T extends ArticleType = ArticleType>(
  params: UseArticlesParams<T> = {},
) {
  const entries = Object.entries(params).flatMap(([key, value]) => {
    if (value === undefined || value === null) return [];
    if (typeof value === "string" && value.trim() === "") return [];
    return [[key, String(value)]];
  });

  const searchParams = new URLSearchParams(entries);
  const query = searchParams.toString();

  const res = await httpClient.get<ApiListResponse<ArticleSummaryOfType<T>>>(
    `/articles${query ? `?${query}` : ""}`,
  );

  return normalizeArticleListResponse(res.data);
}

export function useArticles<T extends ArticleType = ArticleType>(
  params: UseArticlesParams<T> = {},
) {
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
