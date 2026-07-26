const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getWishlist(userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }

  return data.items;
}

export async function removeFromWishlist(productId: string, userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to remove from wishlist");
  }

  return data;
}
