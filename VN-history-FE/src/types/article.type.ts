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

  is_featured: boolean;
  allow_comments: boolean;
  rejection_note: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

type ArticleType = "event" | "person" | "place" | "video" | "culture";
type ArticleStatus = "draft" | "pending" | "published" | "rejected";

export interface Article extends ArticleSummary {
  dynasty_name: string;
  category_name: string;
  media: Medum[];
  persons: any[];
  places: Place[];
  sources: Source[];
  related: Related[];
}

export interface Medum {
  id: string;
  article_id: string;
  media_type: string;
  url: string;
  thumbnail_url: any;
  caption: string;
  duration_sec: any;
  is_cover: number;
  sort_order: number;
  created_at: string;
}

export interface Place {
  id: string;
  article_id: string;
  place_name: string;
  province: string;
  place_type: string;
  latitude: string;
  longitude: string;
  unesco_status: number;
}

export interface Source {
  id: string;
  article_id: string;
  title: string;
  author: string;
  year: string;
  publisher: string;
  url: any;
  sort_order: number;
  created_at: string;
}

export interface Related {
  id: string;
  title: string;
  slug: string;
  type: string;
  year_display: string;
  relation_type: string;
}
