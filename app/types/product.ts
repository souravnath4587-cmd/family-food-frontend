export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  weight: string; // e.g. "250g"
  rating: number; // 0–5
  reviewCount: number;
  // spiceLevel: 1 | 2 | 3; // 1 mild – 3 spicy
  spicyLevel: string;
  category: string;
  isBestSeller?: boolean;
  stockQuantity: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji, keeps this dependency-free
  productCount: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarSeed: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  createdAt: string;
}

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low-high"
  | "price-high-low";

export interface ProductFormValues {
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  ingredients: string[];
  weight: string;
  spicyLevel: string;
  ageRecommendation: string;
  createdAt?: string;
}

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

/**
 * Derives a stock badge from stockQuantity since this schema doesn't
 * store an explicit status field. Adjust the low-stock threshold (10)
 * to whatever your business rule actually is.
 */
export function getStockStatus(stockQuantity: number): StockStatus {
  if (stockQuantity <= 0) return "Out of Stock";
  if (stockQuantity <= 10) return "Low Stock";
  return "In Stock";
}
