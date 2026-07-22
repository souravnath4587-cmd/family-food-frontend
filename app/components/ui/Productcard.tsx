"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { GiChiliPepper } from "react-icons/gi";

import { Product } from "@/app/types/Product";
import { useFavorites } from "@/app/context/FavoritesContext";

const SPICE_LABEL: Record<string, string> = {
  mild: "Mild",
  medium: "Medium",
  hot: "Hot",
};

const SPICE_COLOR: Record<string, string> = {
  mild: "text-green-600",
  medium: "text-yellow-600",
  hot: "text-red-600",
};

export default function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorited = isFavorite(product._id);

  // Get product image
  const productImage =
    product.image ||
    (product.images?.length ? product.images[0] : "/images/placeholder.jpg");

  // Check discount
  const hasDiscount =
    typeof product.discountPrice === "number" && product.discountPrice > 0;

  // Calculate final price
  const finalPrice = hasDiscount
    ? product.price - product.discountPrice!
    : product.price;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#E4DCC8] bg-white">
      {/* Image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#F5EEDD]">
        <Image
          src={productImage as string}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-[#D1552C] px-2.5 py-1 text-[11px] font-semibold text-white">
            Save ৳{product.discountPrice}
          </span>
        )}

        {/* Favorite */}
        <button
          type="button"
          onClick={() => toggleFavorite(product._id)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#274235] shadow-sm hover:bg-white"
        >
          <FiHeart
            size={15}
            className={favorited ? "fill-[#D1552C] text-[#D1552C]" : ""}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Name */}
        <h3
          className="line-clamp-1 text-base text-[#20261F]"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 600,
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#7A7368]">
          {product.shortDescription || product.description}
        </p>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#7A7368]">
          <span className="font-medium text-[#274235]">{product.category}</span>

          <span>·</span>

          <span>{product.weight}</span>

          <span>·</span>

          <span
            className={`flex items-center gap-1 ${
              SPICE_COLOR[product.spicyLevel] || "text-[#7A7368]"
            }`}
          >
            <GiChiliPepper size={15} />

            {SPICE_LABEL[product.spicyLevel] || product.spicyLevel}
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-[#274235]">
            ৳{finalPrice}
          </span>

          {hasDiscount && (
            <span className="text-sm text-[#B8AF9C] line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-2 text-xs">
          {product.stockQuantity > 0 ? (
            <span className="text-green-600">
              In stock ({product.stockQuantity})
            </span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>

        {/* Details */}
        <Link
          href={`/products/${product._id}`}
          className="btn mt-4 w-full border-none text-sm text-[#FBF3E7] hover:brightness-105"
          style={{ backgroundColor: "#274235" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
