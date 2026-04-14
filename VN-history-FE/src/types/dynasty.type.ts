export interface Dynasty {
  id: string;
  name: string;
  period: string;
  title: string;
  description: string;
  era: string;
  videos?: {
    title: string;
    desc: string;
    duration: string;
    icon: string;
  }[];
}
