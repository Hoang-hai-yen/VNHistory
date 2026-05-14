import type { ArticleType } from "./article.type";

export interface Category {
  id: string;
  name: string;
  slug: string;
  article_type: ArticleType;
  sort_order: number;
}
