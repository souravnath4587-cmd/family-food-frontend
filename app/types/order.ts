export type DeliveryLocation = "inside_feni" | "outside_feni";

export interface CreateOrderData {
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };

  shippingAddress: {
    address: string;
    city: string;
    postalCode?: string;
  };

  deliveryLocation: DeliveryLocation;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  _id: string;
  userId: string;

  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };

  shippingAddress: {
    address: string;
    city: string;
    postalCode?: string;
  };

  deliveryLocation: DeliveryLocation;

  items: OrderItem[];

  subtotal: number;
  shippingCost: number;
  totalAmount: number;

  paymentMethod: "cash_on_delivery";

  paymentStatus: "pending" | "paid" | "failed";

  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  createdAt: string;
  updatedAt: string;
}
