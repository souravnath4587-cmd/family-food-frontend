// import { Product } from "@/types/product";

import { Product } from "@/app/types/Product";

const STATUS_STYLES: Record<Product["status"], string> = {
  "In Stock": "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30",
  "Low Stock": "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30",
  "Out of Stock": "bg-red-500/10 text-red-400 ring-1 ring-red-500/30",
};

export default function StatusBadge({ status }: { status: Product["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
