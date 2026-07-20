"use client";

import Link from "next/link";
// import { useProducts } from "@/app/context/Productscontext";
import ProductGrid from "../ui/ProductGrid";
import { getProducts } from "@/app/lib/api/Products";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";

export default function FeaturedProducts() {
  // const { products, isLoading, error } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setLoadError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Failed to load products.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="w-full bg-white px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F6B52]">
              Fresh picks
            </span>
            <h2
              className="mt-1 text-2xl text-[#20261F] sm:text-3xl"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              Featured products
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-[#274235] hover:underline sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="mt-7">
          <ProductGrid
            products={products.slice(0, 8)}
            isLoading={isLoading}
            error={loadError}
            skeletonCount={8}
          />
        </div>
      </div>
    </section>
  );
}
