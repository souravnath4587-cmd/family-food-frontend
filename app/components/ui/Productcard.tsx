"use client";

import Link from "next/link";
import { FiHeart, FiStar } from "react-icons/fi";
import { Product } from "@/app/types/Product";
import { useFavorites } from "@/app/context/FavoritesContext";
import { GiChiliPepper } from "react-icons/gi";
import Image from "next/image";

const SPICE_LABEL: Record<Product["spiceLevel"], string> = {
  1: "Mild",
  2: "Medium",
  3: "Spicy",
};

export default function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#E4DCC8] bg-white">
      {/* image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#F5EEDD]">
        <Image
          src={product?.image}
          alt={product.slug}
          width={400}
          height={400}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {product.isBestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-[#E3A73E] px-2.5 py-1 text-[11px] font-semibold text-[#20261F]">
            Best seller
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#274235] shadow-sm hover:bg-white"
        >
          <FiHeart
            className={favorited ? "fill-[#D1552C] text-[#D1552C]" : ""}
            size={15}
          />
        </button>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="line-clamp-1 text-base text-[#20261F]"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
        >
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#7A7368]">
          {product.description}
        </p>

        {/* meta row */}
        <div className="mt-3 flex items-center gap-3 text-xs text-[#7A7368]">
          <span className="flex items-center gap-1 text-[#20261F]">
            <FiStar className="fill-[#E3A73E] text-[#E3A73E]" size={13} />
            {product.rating?.toFixed(1)}
            <span className="text-[#7A7368]">({product.reviewCount})</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>{product.weight}</span>
          <span aria-hidden="true">·</span>
          <span className="flex flex-row gap-2 capitalize">
            {/* {SPICE_LABEL[product.spicyLevel]} */}
            <GiChiliPepper />
            {product.spicyLevel}
          </span>
        </div>

        {/* price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-[#274235]">
            ৳{product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[#B8AF9C] line-through">
              ৳{product.compareAtPrice}
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="btn mt-4 w-full border-none text-sm text-[#FBF3E7] hover:brightness-105"
          style={{ backgroundColor: "#274235" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
