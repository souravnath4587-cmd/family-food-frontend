"use client";

import {
  getAvailableStock,
  Product,
  resolveProductImage,
} from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { FiShoppingCart, FiPackage } from "react-icons/fi";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const SPICY_STYLES: Record<string, string> = {
  mild: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  medium: "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  hot: "bg-red-500/10 text-red-400 ring-red-500/30",
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = resolveProductImage(product);
  const stock = getAvailableStock(product);
  const isOutOfStock = stock <= 0;

  const hasDiscount =
    !!product.discountPrice &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price;
  const finalPrice = hasDiscount
    ? product.price - (product.discountPrice ?? 0)
    : product.price;

  const spicyStyle =
    SPICY_STYLES[product.spicyLevel?.toLowerCase()] ??
    "bg-white/5 text-gray-300 ring-white/10";

  return (
    <Link
      href={`/products/${product._id}`}
      className="flex w-56 shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#18181B] shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:border-white/20 sm:w-64"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/40">
        {imageUrl && !imgError ? (
          // Plain <img> on purpose: image hosts here are mixed
          // (ibb.co, i.ibb.co, example.com placeholders), so we
          // fall back gracefully on load errors instead of
          // requiring every domain to be whitelisted in next.config.
          <Image
            src={
              product?.image || "https://i.ibb.co.com/WWNvp1Bp/chanachur4.jpg"
            }
            alt={product?.name || "chanachur image"}
            width={400}
            height={400}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-600">
            <FiPackage className="h-8 w-8" />
            <span className="text-[11px]">No image</span>
          </div>
        )}

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-semibold text-black">
            -{currencyFormatter.format(product.discountPrice ?? 0)}
          </span>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300 ring-1 ring-red-500/40">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-sm font-semibold text-white">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
          {product.shortDescription}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${spicyStyle}`}
          >
            {product.spicyLevel}
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-300 ring-1 ring-white/10">
            {product.weight}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {hasDiscount ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-amber-400">
                  {currencyFormatter.format(finalPrice)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {currencyFormatter.format(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-base font-semibold text-white">
                {currencyFormatter.format(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart?.(product)}
            disabled={isOutOfStock}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-black transition-colors duration-150 hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-600"
          >
            <FiShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
