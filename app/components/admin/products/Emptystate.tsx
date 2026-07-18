import { FiPackage } from "react-icons/fi";

interface EmptyStateProps {
  hasFilters: boolean;
  onAddProduct: () => void;
  onClearFilters: () => void;
}

export default function EmptyState({
  hasFilters,
  onAddProduct,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 bg-[#18181B] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
        <FiPackage className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="text-base font-semibold text-white">
        {hasFilters ? "No products match your filters" : "No products yet"}
      </h3>
      <p className="max-w-xs text-sm text-gray-400">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Add your first product to start building your catalog."}
      </p>
      {hasFilters ? (
        <button
          onClick={onClearFilters}
          className="mt-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
        >
          Clear filters
        </button>
      ) : (
        <button
          onClick={onAddProduct}
          className="mt-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
        >
          Add Product
        </button>
      )}
    </div>
  );
}
