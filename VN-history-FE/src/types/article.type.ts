export interface Article {
  id: string;

  // Basic info
  title: string;
  subtitle?: string | null;
  slug: string;
  summary?: string | null;
  content?: string | null;
  quote?: string | null;

  // Classification
  type: "event" | "person" | "place" | "video" | "culture";
  category_id?: string | null;
  dynasty_id?: string | null;

  // Timeline
  year_start?: number | null; // có thể âm (TCN)
  year_end?: number | null;
  year_display?: string | null;

  // Workflow
  status: "draft" | "pending" | "published" | "rejected";
  rejection_note?: string | null;

  // UI control
  is_featured: boolean;
  allow_comments: boolean;

  // Metadata
  view_count: number;

  // Audit
  created_by: string;
  updated_by?: string | null;
  published_by?: string | null;

  published_at?: string | null; // ISO datetime

  created_at: string;
  updated_at: string;
}
