import { CATEGORIES } from "@/app/lib/mock-data";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section className="w-full bg-[#FBF3E7] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F6B52]">
              Browse
            </span>
            <h2
              className="mt-1 text-2xl text-[#20261F] sm:text-3xl"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              Shop by category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-[#274235] hover:underline sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-[#E4DCC8] bg-white px-4 py-6 text-center transition-colors hover:border-[#3F6B52]"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-semibold text-[#20261F]">
                {category.name}
              </span>
              <span className="text-xs text-[#7A7368]">
                {category.productCount} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
