import { RevenueData, RevenueRange } from "@/app/types/revenue";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface GetRevenueParams {
  range: RevenueRange;
  startDate?: string;
  endDate?: string;
}

export async function getRevenueData({
  range,
  startDate,
  endDate,
}: GetRevenueParams): Promise<RevenueData[]> {
  const params = new URLSearchParams();

  params.set("range", range);

  if (range === "custom") {
    if (startDate) {
      params.set("startDate", startDate);
    }

    if (endDate) {
      params.set("endDate", endDate);
    }
  }

  const res = await fetch(
    `${API_BASE_URL}/api/admin/revenue?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load revenue data.");
  }

  return data.data ?? [];
}
