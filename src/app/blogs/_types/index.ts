export interface IBlog {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  img_url?: string;
  author: string;
  slug: string;
  read_time?:number;
}
