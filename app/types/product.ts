export type ProductImage = string | { file?: unknown; previewUrl?: string };

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images?: ProductImage[];
  image: string;
  category: string;
  price: number;
  discountPrice?: number;
  stockQuantity?: number;
  stock: number;
  ingredients: string[];
  weight: string;
  spicyLevel: "mild" | "medium" | "hot" | string;
  ageRecommendation: string;
  updatedAt?: string;
}

// export interface Product {
//   id: string;
//   slug: string;
//   description: string;
//   images: string;
//   price: number;
//   compareAtPrice?: number;
//   weight: string; // e.g. "250g"
//   rating: number; // 0–5
//   reviewCount: number;
//   // spiceLevel: 1 | 2 | 3; // 1 mild – 3 spicy
//   spicyLevel: string;
//   category: string;
//   isBestSeller?: boolean;
//   stockQuantity: string;
// }

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

/**
 * Resolves the best available image URL for a product, falling back
 * through images[0] (string or object), then the legacy `image` field.
 * Returns null if nothing usable is found, so callers can show a
 * placeholder instead of a broken <img>.
 */
export function resolveProductImage(product: Product): string | null {
  const first = product.images?.[0];

  if (typeof first === "string" && first.trim()) {
    return first;
  }

  if (first && typeof first === "object" && first.previewUrl) {
    return first.previewUrl;
  }

  if (product.image && product.image.trim()) {
    return product.image;
  }

  return null;
}

// /** Picks the main image: first item of `images`, falling back to `image`. */
// export function resolveProductImage(product: Product): string | null {
//   const fromArray = product.images?.[0]?.trim();
//   if (fromArray) return fromArray;

//   const fallback = product.image?.trim();
//   if (fallback) return fallback;

//   return null;
// }

/** Prefers `stockQuantity`, falls back to the legacy `stock` field. */
export function getAvailableStock(product: Product): number {
  if (typeof product.stockQuantity === "number") return product.stockQuantity;
  if (typeof product.stock === "number") return product.stock;
  return 0;
}

export interface PriceInfo {
  hasDiscount: boolean;
  finalPrice: number;
  originalPrice: number;
  discountAmount: number;
}

/**
 * `discountPrice` is the amount taken OFF the price, not the final
 * price itself (e.g. price 250, discountPrice 20 -> final price 230).
 */
export function getPriceInfo(product: Product): PriceInfo {
  const discountAmount = product.discountPrice ?? 0;
  const hasDiscount = discountAmount > 0 && discountAmount < product.price;

  return {
    hasDiscount,
    originalPrice: product.price,
    discountAmount,
    finalPrice: hasDiscount ? product.price - discountAmount : product.price,
  };
}
