export interface IPost {
  id: number;
  title: string;
  author_name: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  total: number;
}
