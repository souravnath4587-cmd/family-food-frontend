"use client";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "./Productcard";
import { Product } from "@/app/types/Product";

interface CategoryRowProps {
  category: string;
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function CategoryRow({
  category,
  products,
  onAddToCart,
}: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(distance: number) {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  }

  return (
    <section
      id={category.toLowerCase().replace(/\s+/g, "-")}
      className="scroll-mt-24"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{category}</h2>
          <p className="text-xs text-gray-500">
            {products.length} item{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-320)}
            aria-label={`Scroll ${category} left`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(320)}
            aria-label={`Scroll ${category} right`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide mt-4 flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x proximity" }}
      >
        {products.map((product) => (
          <div key={product._id} style={{ scrollSnapAlign: "start" }}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
