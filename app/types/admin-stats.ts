export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;

  // Optional trend percentages vs. the previous period.
  // Leave these off your API response and the cards will just
  // hide the trend pill instead of breaking.
  revenueChangePercent?: number;
  ordersChangePercent?: number;
  productsChangePercent?: number;
  usersChangePercent?: number;

  recentOrders: RecentOrder[];
  lowStockProducts: LowStockProduct[];
}

export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export interface RecentOrder {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  image?: string;
  category: string;
  stockQuantity: number;
}
