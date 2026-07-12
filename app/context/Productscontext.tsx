"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "../lib/mock-data";
import { Product } from "../types/Product";

interface ProductsContextValue {
  products: Product[];
  bestSellers: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        // TODO: replace with a real fetch, e.g.
        // const res = await fetch("/api/products");
        // const data = await res.json();
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (!cancelled) setProducts(PRODUCTS);
      } catch {
        if (!cancelled) setError("Couldn't load products. Please try again.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <ProductsContext.Provider
      value={{ products, bestSellers, isLoading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
}
