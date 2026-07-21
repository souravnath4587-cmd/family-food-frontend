// import type {
//   CartApiResponse,
//   ShoppingCart,
// } from "@/types/cart";

import { CartApiResponse, ShoppingCart } from "@/app/types/cart";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface CartItem {
  userId: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

/**
 * Adds a product to the user's cart.
 */
export async function addToCart(
  productId: string,
  quantity: number,
  userId: string,
): Promise<CartItem> {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add product to cart.");
  }

  const data = await res.json();

  return data.data ?? data;
}

export async function getCart(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "Failed to fetch cart.");
  }

  const data = await res.json();

  return data.data ?? data;
}

// ============================================
// UPDATE CART ITEM QUANTITY
// ============================================

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number,
): Promise<ShoppingCart> {
  const response = await fetch(`${API_BASE_URL}/api/cart/items/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  const result: CartApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update cart item quantity");
  }

  return result.data;
}

// ============================================
// REMOVE CART ITEM
// ============================================

export async function removeCartItem(
  userId: string,
  productId: string,
): Promise<ShoppingCart> {
  const response = await fetch(`${API_BASE_URL}/api/cart/items/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  });

  const result: CartApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to remove cart item");
  }

  return result.data;
}

// ============================================
// CLEAR CART
// ============================================

export async function clearCart(userId: string): Promise<ShoppingCart> {
  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  });

  const result: CartApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to clear cart");
  }

  return result.data;
}
