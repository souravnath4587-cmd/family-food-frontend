import { Product, ProductFormValues } from "@/app/types/Product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetches all products from the API.
 * Adjust the return shape here if your backend wraps the array
 * in an object like `{ data: Product[] }`.
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load products.");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : (data.data ?? []);
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to load product.");
  }

  const data = await res.json();
  return data.data ?? data;
}

// export async function getProductDetailById(id: string): Promise<ProductDetail> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to load product details.");
//   }

//   const data = await res.json();
//   return data.data ?? data;
// }

export async function updateProduct(
  id: string,
  values: Partial<ProductFormValues>,
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to update product.");
  }

  const data = await res.json();
  return data.data ?? data;
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product.");
  }
}

// import { Product, ProductFormValues } from "@/types/product";
// import { ProductDetail } from "@/types/product-detail";

// const API_BASE_URL = "http://localhost:5000/api/products";

// /**
//  * Fetches all products from the API.
//  * Adjust the return shape here if your backend wraps the array
//  * in an object like `{ data: Product[] }`.
//  */
// export async function getProducts(): Promise<Product[]> {
//   const res = await fetch(API_BASE_URL, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to load products.");
//   }

//   const data = await res.json();
//   return Array.isArray(data) ? data : data.data ?? [];
// }

// export async function getProductById(id: string): Promise<Product> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to load product.");
//   }

//   const data = await res.json();
//   return data.data ?? data;
// }

// /**
//  * Fetches a single product with the full detail schema
//  * (images, ingredients, weight, spicyLevel, etc.) for the
//  * product detail / view page.
//  */
// export async function getProductDetailById(id: string): Promise<ProductDetail> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to load product details.");
//   }

//   const data = await res.json();
//   return data.data ?? data;
// }

// export async function updateProduct(
//   id: string,
//   values: Partial<ProductFormValues>
// ): Promise<Product> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(values),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to update product.");
//   }

//   const data = await res.json();
//   return data.data ?? data;
// }

// export async function deleteProduct(id: string): Promise<void> {
//   const res = await fetch(`${API_BASE_URL}/${id}`, {
//     method: "DELETE",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to delete product.");
//   }
// }
