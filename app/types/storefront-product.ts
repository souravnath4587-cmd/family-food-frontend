// // Matches your real /api/products data, including its inconsistencies:
// // - `images` items are sometimes plain URL strings, sometimes
// //   `{ file, previewUrl }` objects (from an upload widget).
// // - Some documents have `stock`, some have `stockQuantity`, some have both.
// // - `image` (singular) sometimes exists as a legacy fallback field.
// // - `updatedAt` is not always present.
// // resolveProductImage() and getAvailableStock() below normalize all of this.

// export type ProductImage = string | { file?: unknown; previewUrl?: string };

// export interface Product {
//   _id: string;
//   name: string;
//   slug: string;
//   description: string;
//   shortDescription: string;
//   images?: ProductImage[];
//   image?: string;
//   category: string;
//   price: number;
//   discountPrice?: number;
//   stockQuantity?: number;
//   stock?: number;
//   ingredients: string[];
//   weight: string;
//   spicyLevel: "mild" | "medium" | "hot" | string;
//   ageRecommendation: string;
//   updatedAt?: string;
// }

// /**
//  * Resolves the best available image URL for a product, falling back
//  * through images[0] (string or object), then the legacy `image` field.
//  * Returns null if nothing usable is found, so callers can show a
//  * placeholder instead of a broken <img>.
//  */
// export function resolveProductImage(product: Product): string | null {
//   const first = product.images?.[0];

//   if (typeof first === "string" && first.trim()) {
//     return first;
//   }

//   if (first && typeof first === "object" && first.previewUrl) {
//     return first.previewUrl;
//   }

//   if (product.image && product.image.trim()) {
//     return product.image;
//   }

//   return null;
// }

// /** Prefers `stockQuantity`, falls back to the legacy `stock` field. */
// export function getAvailableStock(product: Product): number {
//   if (typeof product.stockQuantity === "number") return product.stockQuantity;
//   if (typeof product.stock === "number") return product.stock;
//   return 0;
// }
