export interface ResCountDashboard {
  data: CountDashboard;
  message: string;
}

export interface CountDashboard {
  count: Count;
  total_spent: { [key: string]: number };
  fiveMostSpentUsers: UserMostSpent[];
}

export interface Count {
  user_count: number;
  order_count: number;
  total_price: number;
  item_count: number;
}

export interface UserMostSpent {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  username: string;
  email: string;
  phone: null;
  avatar: null;
  role: string;
  cart_id: string;
  total_spent: string;
}
