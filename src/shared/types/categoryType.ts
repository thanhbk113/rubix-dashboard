export interface ResCategory {
  data: Category[];
  meta: Meta;
  message: string;
}

export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  description: string;
  parentId: null | string;
  slug: string;
  status: string;
  children?: Category | null;
}

export interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
