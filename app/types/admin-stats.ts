export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;

  pendingOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;

  revenueChangePercent?: number;
  ordersChangePercent?: number;
  productsChangePercent?: number;
  usersChangePercent?: number;
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
