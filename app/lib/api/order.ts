import { CreateOrderData, Order } from "@/app/types/order";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createOrder(
  orderData: CreateOrderData,
  userId: string,
): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },

    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to place order.");
  }

  return data.data;
}

// export async function getOrderById(id: string): Promise<Order> {
//   const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
//     cache: "no-store",
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message);
//   }

//   return data.data;
// }

export async function getOrders(userId: string): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return Array.isArray(data.data) ? data.data : [];
}

export async function getOrderById(
  orderId: string,
  userId: string,
): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data.data;
}
