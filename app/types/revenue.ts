export type RevenueRange =
  | "7days"
  | "30days"
  | "6months"
  | "12months"
  | "custom";

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface RevenueApiResponse {
  success: boolean;
  data: RevenueData[];
}
