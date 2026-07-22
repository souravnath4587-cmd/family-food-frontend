import { getProducts } from "@/app/lib/api/Products";
import ProductCard from "../products/Productcard";
// import ProductCard from "./Productcard";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#FBF3E7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#D1552C]">
            Fresh & Homemade
          </p>

          <h1
            className="text-3xl font-semibold text-[#20261F] sm:text-4xl"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Our Products
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#7A7368]">
            Discover our delicious collection of homemade Chanachur, Nimki, and
            Anguli snacks.
          </p>
        </div>

        {/* Product Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[#7A7368]">
            Showing{" "}
            <span className="font-semibold text-[#274235]">
              {products.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300] items-center justify-center rounded-2xl border border-[#E4DCC8] bg-white">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-[#20261F]">
                No Products Found
              </h2>

              <p className="mt-2 text-sm text-[#7A7368]">
                There are no products available right now.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// "use client";

// import Link from "next/link";
// // import { useProducts } from "@/app/context/Productscontext";
// import ProductGrid from "../ui/ProductGrid";
// import { getProducts } from "@/app/lib/api/Products";
// import { useEffect, useState } from "react";
// import { Product } from "@/app/types/Product";

// export default function FeaturedProducts() {
//   // const { products, isLoading, error } = useProducts();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadError, setLoadError] = useState<string | null>(null);

//   async function loadProducts() {
//     try {
//       setIsLoading(true);
//       setLoadError(null);
//       const data = await getProducts();
//       setProducts(data);
//     } catch (err) {
//       setLoadError(
//         err instanceof Error ? err.message : "Failed to load products.",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   return (
//     <section className="w-full bg-white px-6 py-14">
//       <div className="mx-auto max-w-6xl">
//         <div className="flex items-end justify-between">
//           <div>
//             <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F6B52]">
//               Fresh picks
//             </span>
//             <h2
//               className="mt-1 text-2xl text-[#20261F] sm:text-3xl"
//               style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
//             >
//               Featured products
//             </h2>
//           </div>
//           <Link
//             href="/products"
//             className="hidden text-sm font-semibold text-[#274235] hover:underline sm:inline"
//           >
//             View all
//           </Link>
//         </div>

//         <div className="mt-7">
//           <ProductGrid
//             products={products.slice(0, 8)}
//             isLoading={isLoading}
//             error={loadError}
//             skeletonCount={8}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
