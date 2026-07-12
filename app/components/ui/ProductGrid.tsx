import { Product } from "@/app/types/Product";
import ProductCard from "./Productcard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error?: string | null;
  skeletonCount?: number;
}

export default function ProductGrid({
  products,
  isLoading,
  error,
  skeletonCount = 4,
}: ProductGridProps) {
  if (error) {
    return (
      <p className="rounded-xl border border-[#D1552C]/30 bg-[#D1552C]/10 px-4 py-3 text-sm text-[#8A3418]">
        {error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
