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

export async function getAllOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data.data ?? [];
}

export async function updateOrderStatus(
  orderId: string,
  orderStatus: string,
): Promise<Order> {
  const res = await fetch(
    `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data.data;
}

export async function getAdminOrderById(orderId: string): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch order details");
  }

  return data.data;
}
