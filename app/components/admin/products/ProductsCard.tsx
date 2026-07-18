import Image from "next/image";
import { Product } from "@/app/types/Product";
import StatusBadge from "./Statusbadge";
import ActionButtons from "./Actionbuttons";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] p-4 shadow-lg transition-colors duration-150 hover:border-white/20">
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-600">
              N/A
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
            {product.name}
          </h3>
          <span className="mt-1 inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-300">
            {product.category}
          </span>
        </div>
        <StatusBadge status={product.status} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-medium text-gray-200">
            {currencyFormatter.format(product.price)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Stock</p>
          <p className="font-medium text-gray-200">{product.stock}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Created</p>
          <p className="font-medium text-gray-200">
            {isNaN(new Date(product.createdAt).getTime())
              ? "N/A"
              : new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(product.createdAt))}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end border-t border-white/5 pt-3">
        <ActionButtons
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
