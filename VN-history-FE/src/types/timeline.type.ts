
export interface Timeline {
    id: string
    name: string
    slug: string
    year_start: number
    year_end: number
    year_display: string
    description: string
    sort_order: number
    event_count: number
    events: Event[]
}

export interface Event {
  id: string;
  dynasty_id: string;
  article_id: string;
  note: string;
  sort_order: number;
  title: string;
  slug: string;
  type: string;
  status: string;
  article_year: number;
  year_display: string;
  category_name: string;
  created_at: string;
}