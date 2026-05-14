export type ArticleType = "event" | "person" | "place" | "video" | "culture";

export type ArticleStatus = "draft" | "pending" | "published" | "rejected";

export type ReportSeverity = "low" | "medium" | "high";

export type RelationType = "previous" | "next" | "related";

export type ArticleMediaType = "image" | "video" | "audio" | "document";

export interface ArticleSummary {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  summary: string;
  content: string;
  quote: string;
  type: ArticleType;
  status: ArticleStatus;
  year_start: number;
  year_end: number;
  year_display: string;
  dynasty_id: string;
  category_id: string;
  cover_image_url: string;
  is_featured: boolean;
  allow_comments: boolean;
  rejection_note: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ArticleSummaryOfType<T extends ArticleType = ArticleType> = Omit<
  ArticleSummary,
  "type"
> & {
  type: T;
};

export interface ArticleDetail extends ArticleSummary {
  dynasty_name: string;
  category_name: string;
  media: Media[];
  persons: ArticlePerson[];
  places: Place[];
  sources: Source[];
  related: RelatedArticle[];
}

export type ArticleDetailOfType<T extends ArticleType = ArticleType> = Omit<
  ArticleDetail,
  "type"
> & {
  type: T;
};

export interface Media {
  id: string;
  article_id: string;
  media_type: ArticleMediaType;
  url: string;
  thumbnail_url: string | null;
  caption: string;
  duration_sec: number | null;
  is_cover: 0 | 1;
  sort_order: number;
  created_at: string;
}

export interface ArticlePerson {
  id: string;
  full_name: string;
  slug: string;
  role: string | null;
  year_display: string | null;
}

export interface Place {
  id: string;
  article_id: string;
  place_name: string;
  province: string;
  place_type: string;
  latitude: string;
  longitude: string;
  unesco_status: 0 | 1;
}

export interface Source {
  id: string;
  article_id: string;
  title: string;
  author: string;
  year: string;
  publisher: string;
  url: string | null;
  sort_order: number;
  created_at: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  type: ArticleType;
  year_display: string;
  relation_type: RelationType;
}

export type RelatedArticleOfType<T extends ArticleType = ArticleType> = Omit<
  RelatedArticle,
  "type"
> & {
  type: T;
};

export interface ArticleDisplay {
  type_label: string;
  status_label: string;
  published_at_label: string | null;
}

export interface ArticleDetailDisplay extends ArticleDisplay {
  location_label: string | null;
  period_label: string | null;
  category_label: string | null;
  dynasty_label: string | null;
}

export type NormalizedRelatedArticle<T extends ArticleType = ArticleType> =
  RelatedArticleOfType<T> & {
    display: Pick<ArticleDisplay, "type_label">;
  };

export type NormalizedArticleSummary<T extends ArticleType = ArticleType> =
  ArticleSummaryOfType<T> & {
    display: ArticleDisplay;
  };

export type NormalizedArticleDetail<T extends ArticleType = ArticleType> =
  Omit<ArticleDetailOfType<T>, "related"> & {
    related: NormalizedRelatedArticle[];
    display: ArticleDetailDisplay;
  };

export type VideoArticle = NormalizedArticleSummary<"video">;
