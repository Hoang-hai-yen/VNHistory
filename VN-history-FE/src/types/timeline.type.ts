import type { Event } from "./event.type"

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