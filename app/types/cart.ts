export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShoppingCart {
  _id?: string;
  userId: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  data: ShoppingCart;
}

export interface CartItemType {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
