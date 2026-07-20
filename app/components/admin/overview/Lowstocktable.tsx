import { LowStockProduct } from "@/app/types/admin-stats";
import Image from "next/image";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function LowStockTable({
  products,
}: {
  products: LowStockProduct[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">
          Low Stock Products
        </h2>
        <Link
          href="/admin/products"
          className="text-xs font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          View all
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
          <p className="text-sm text-gray-500">
            All products are well stocked.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/5">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center gap-3 px-5 py-3 transition-colors duration-150 hover:bg-white/5"
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-600">
                    N/A
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-200">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/30">
                <FiAlertTriangle className="h-3 w-3" />
                {product.stockQuantity} left
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}