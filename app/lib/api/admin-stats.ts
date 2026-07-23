// import { AdminStats } from "@/types/admin-stats";

import { AdminStats } from "@/app/types/admin-stats";

// Adjust this to your actual stats endpoint if it lives somewhere else.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// const ADMIN_STATS_URL = "http://localhost:5000/api/admin/stats";

/**
 * Fetches the admin overview stats: revenue/order/product/user totals,
 * recent orders, and low-stock products.
 *
 * If your backend's response shape differs from `AdminStats`
 * (types/admin-stats.ts), either adjust the interface there to match,
 * or map the raw response into that shape here before returning it.
 */
export async function getAdminStats(): Promise<AdminStats> {
  const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load admin stats.");
  }

  return data.data;
}
