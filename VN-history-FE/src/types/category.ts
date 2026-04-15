export interface Category {
  id: string;
  name: string;
  slug: string;
  article_type: ArticleType;
  sort_order: number;
}
export type ArticleType = "event" | "person" | "place" | "video" | "culture";
