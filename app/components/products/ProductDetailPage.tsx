"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiPackage,
  FiThermometer,
  FiUsers,
  FiTag,
} from "react-icons/fi";

import {
  getAvailableStock,
  getPriceInfo,
  Product,
  resolveProductImage,
} from "@/app/types/Product";
import { getProductById } from "@/app/lib/api/Products";
import QuantitySelector from "./Quantityselector";
import Image from "next/image";
import StockBadge from "./Stockbadge";
import { addToCart } from "@/app/lib/api/cart";
import { authClient } from "@/app/lib/auth-client";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SPICY_STYLES: Record<string, string> = {
  mild: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  medium: "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  hot: "bg-red-500/10 text-red-400 ring-red-500/30",
};

interface ProductDetailPageProps {
  id: string;
  userId: string;
}

export default function ProductDetailPage({ id }: ProductDetailPageProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const userId = session?.user?.id;
  console.log(userId);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProductById(id);
        if (!cancelled) {
          setProduct(data);
          setImgError(false);
          setQuantity(1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load product.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
          <p className="text-sm text-red-400">
            {error ?? "Product not found."}
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = resolveProductImage(product);
  const stock = getAvailableStock(product);
  const isOutOfStock = stock <= 0;
  const { hasDiscount, finalPrice, originalPrice } = getPriceInfo(product);
  const spicyStyle =
    SPICY_STYLES[product.spicyLevel?.toLowerCase()] ??
    "bg-white/5 text-gray-300 ring-white/10";

  async function handleAddToCart() {
    // Wire this up to your actual cart logic (context, Zustand, API, etc.)
    console.log("Add to cart:", product?._id, "qty:", quantity, userId);
    if (!product?._id) {
      return;
    }

    try {
      const data = await addToCart(product._id, quantity, userId as string);

      console.log("Product added to cart:", data);

      // Toast
      // toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);

      // toast.error("Failed to add product to cart.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Products
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Main image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#18181B]">
            {imageUrl && !imgError ? (
              <Image
                src={imageUrl}
                alt={product.name}
                width={400}
                height={400}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-600">
                <FiPackage className="h-10 w-10" />
                <span className="text-xs">No image available</span>
              </div>
            )}

            {hasDiscount && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black shadow">
                Save {currencyFormatter.format(originalPrice - finalPrice)}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
              <FiTag className="h-3.5 w-3.5" />
              {product.category}
            </span>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {product.shortDescription}
            </p>

            {/* Price + stock */}
            <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-white/5 py-4">
              {hasDiscount ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-amber-400">
                    {currencyFormatter.format(finalPrice)}
                  </span>
                  <span className="text-base text-gray-500 line-through">
                    {currencyFormatter.format(originalPrice)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-semibold text-white">
                  {currencyFormatter.format(originalPrice)}
                </span>
              )}
              <StockBadge stock={stock} />
            </div>

            {/* Specs */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Spec
                icon={<FiPackage className="h-4 w-4" />}
                label="Weight"
                value={product.weight}
              />
              <Spec
                icon={<FiThermometer className="h-4 w-4" />}
                label="Spicy Level"
                value={capitalize(product.spicyLevel)}
              />
              <Spec
                icon={<FiUsers className="h-4 w-4" />}
                label="Age"
                value={product.ageRecommendation}
              />
            </div>

            <div className="mt-3">
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${spicyStyle}`}
              >
                {product.spicyLevel}
              </span>
            </div>

            {/* Ingredients */}
            {product.ingredients?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Ingredients
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <span
                      key={ingredient + idx}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full description */}
            <div className="mt-6">
              <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Description
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Add to cart */}
            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                max={stock || 1}
                disabled={isOutOfStock}
              />
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition-colors duration-150 hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-600"
              >
                <FiShoppingCart className="h-4 w-4" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-3">
      <div className="flex items-center gap-1.5 text-gray-500">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-1 truncate text-sm font-medium text-gray-200">{value}</p>
    </div>
  );
}

function capitalize(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-white/5" />
          <div>
            <div className="h-5 w-24 animate-pulse rounded bg-white/5" />
            <div className="mt-3 h-8 w-2/3 animate-pulse rounded bg-white/5" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="mt-6 h-9 w-40 animate-pulse rounded bg-white/5" />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-lg bg-white/5"
                />
              ))}
            </div>
            <div className="mt-8 h-12 w-full animate-pulse rounded-lg bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
