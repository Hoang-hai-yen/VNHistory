import type { ApiListResponse } from "../types";
import type {
  ArticleDetailOfType,
  ArticleStatus,
  ArticleSummaryOfType,
  ArticleType,
  NormalizedArticleDetail,
  NormalizedArticleSummary,
  NormalizedRelatedArticle,
  Place,
  RelatedArticle,
} from "../types";

const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  event: "Sự kiện",
  person: "Nhân vật",
  place: "Địa điểm",
  video: "Video",
  culture: "Văn hóa",
};

const ARTICLE_STATUS_LABELS: Record<ArticleStatus, string> = {
  draft: "Bản nháp",
  pending: "Chờ duyệt",
  published: "Đã xuất bản",
  rejected: "Từ chối",
};

export function getArticleTypeLabel(type: ArticleType) {
  return ARTICLE_TYPE_LABELS[type];
}

export function getArticleStatusLabel(status: ArticleStatus) {
  return ARTICLE_STATUS_LABELS[status];
}

export function formatPublishedAtLabel(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("vi-VN");
}

function formatPeriodLabel(
  yearStart: number,
  yearEnd: number,
  yearDisplay: string,
) {
  if (yearDisplay) return yearDisplay;
  if (yearStart && yearEnd) return `${yearStart} - ${yearEnd}`;
  if (yearStart) return String(yearStart);
  if (yearEnd) return String(yearEnd);
  return null;
}

function getLocationLabel(places: Place[]) {
  const firstPlace = places.find(
    (place) => Boolean(place.place_name || place.province),
  );
  if (!firstPlace) return null;

  return [firstPlace.place_name, firstPlace.province].filter(Boolean).join(", ");
}

export function normalizeRelatedArticle(
  article: RelatedArticle,
): NormalizedRelatedArticle {
  return {
    ...article,
    display: {
      type_label: getArticleTypeLabel(article.type),
    },
  };
}

export function normalizeArticleSummary<T extends ArticleType>(
  article: ArticleSummaryOfType<T>,
): NormalizedArticleSummary<T> {
  return {
    ...article,
    display: {
      type_label: getArticleTypeLabel(article.type),
      status_label: getArticleStatusLabel(article.status),
      published_at_label: formatPublishedAtLabel(article.published_at),
    },
  };
}

export function normalizeArticleDetail<T extends ArticleType>(
  article: ArticleDetailOfType<T>,
): NormalizedArticleDetail<T> {
  const summary = normalizeArticleSummary(article);

  return {
    ...article,
    related: article.related.map(normalizeRelatedArticle),
    display: {
      ...summary.display,
      location_label: getLocationLabel(article.places),
      period_label: formatPeriodLabel(
        article.year_start,
        article.year_end,
        article.year_display,
      ),
      category_label: article.category_name || null,
      dynasty_label: article.dynasty_name || null,
    },
  };
}

export function normalizeArticleListResponse<T extends ArticleType>(
  response: ApiListResponse<ArticleSummaryOfType<T>>,
): ApiListResponse<NormalizedArticleSummary<T>> {
  return {
    ...response,
    data: response.data.map(normalizeArticleSummary),
  };
}
