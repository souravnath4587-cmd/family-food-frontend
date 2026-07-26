"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Product } from "../types/Product";
import { getProducts } from "../lib/api/Products";

interface ProductsContextValue {
  products: Product[];
  bestSellers: Product[];
  isLoading: boolean;
  error: string | null;
  refetchProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Couldn't load products. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const bestSellers = products.filter(
    (product) => product.isBestSeller === true,
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        bestSellers,
        isLoading,
        error,
        refetchProducts: loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
}
