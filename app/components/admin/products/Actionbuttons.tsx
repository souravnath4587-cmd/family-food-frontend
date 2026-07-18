import { Product } from "@/app/types/Product";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

interface ActionButtonsProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ActionButtons({
  product,
  onView,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <div className="tooltip" data-tip="View">
        <Link
          //   onClick={() => onView(product)}
          href={`/dashboard/admin/products/${product._id}`}
          aria-label={`View ${product?.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors duration-150 hover:border-white/20 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <FiEye className="h-4 w-4" />
        </Link>
      </div>

      <div className="tooltip" data-tip="Edit">
        <button
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors duration-150 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          <FiEdit2 className="h-4 w-4" />
        </button>
      </div>

      <div className="tooltip" data-tip="Delete">
        <button
          onClick={() => onDelete(product)}
          aria-label={`Delete ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
        >
          <FiTrash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
