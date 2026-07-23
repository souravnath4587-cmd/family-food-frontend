"use client";

import { useEffect, useMemo, useState } from "react";

import { getProducts } from "../lib/api/Products";
import CategoryNav from "../components/products/Categorynav";
import CategoryRow from "../components/products/Categoryrow";
import ProductsPageSkeleton from "../components/products/Productspageskeleton";
import { Product } from "../types/Product";
import { addToWishlist } from "../lib/api/cart";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";

// Categories appear in this order first, anything else found in the
// data is appended alphabetically after.
const PREFERRED_ORDER = ["Chanachur", "Nimki", "Anguli"];

export default function ProductsPage() {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data as unknown as Product[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  }

  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, Product[]>();

    for (const product of products) {
      const key = product.category?.trim() || "Other";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(product);
    }

    const knownCategories = PREFERRED_ORDER.filter((c) => groups.has(c));
    const remaining = Array.from(groups.keys())
      .filter((c) => !PREFERRED_ORDER.includes(c))
      .sort();

    return [...knownCategories, ...remaining].map((category) => ({
      category,
      items: groups.get(category)!,
    }));
  }, [products]);

  const handleAddToWishlist = async (product: Product) => {
    try {
      if (!userId) {
        console.log("Please login first");
        return;
      }

      const data = await addToWishlist(userId, product._id);

      if (data) {
        toast.success(data.message);
      }
      console.log("Wishlist added:", data);
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Our Products
          </h1>
          <p className="text-sm text-gray-400">
            Browse our snacks by category — Chanachur, Nimki, and Anguli.
          </p>
        </div>

        {!isLoading && !error && groupedByCategory.length > 0 && (
          <div className="mt-6">
            <CategoryNav
              categories={groupedByCategory.map((g) => g.category)}
            />
          </div>
        )}

        <div className="mt-6">
          {isLoading ? (
            <ProductsPageSkeleton />
          ) : error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
              >
                Try again
              </button>
            </div>
          ) : groupedByCategory.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-[#18181B] px-6 py-16 text-center">
              <p className="text-sm text-gray-400">
                No products available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {groupedByCategory.map(({ category, items }) => (
                <CategoryRow
                  key={category}
                  category={category}
                  products={items}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
