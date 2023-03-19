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

export interface ReqCategories {
  image: string;
  name: string;
  description: string;
  slug: string;
  status: string;
}

export interface ResCategories {
  image: string;
  name: string;
  description: string;
  slug: string;
  status: string;
  deleted_at: null;
  parentId: null;
  id: string;
  created_at: string;
  updated_at: string;
}
