import Image from "next/image";
import { Product } from "@/app/types/Product";
import StatusBadge from "./Statusbadge";
import ActionButtons from "./Actionbuttons";

interface ProductsTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

// const dateFormatter = new Intl.DateTimeFormat("en-US", {
//   month: "short",
//   day: "numeric",
//   year: "numeric",
// });

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductsTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  console.log(products);

  return (
    <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#18181B] shadow-lg md:block">
      <div className="max-h-[640] overflow-auto">
        <table className="table w-full">
          <thead className="sticky top-0 z-10 bg-[#1D1D21]">
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3.5 font-medium">Product</th>
              <th className="px-6 py-3.5 font-medium">Category</th>
              <th className="px-6 py-3.5 font-medium">Price</th>
              <th className="px-6 py-3.5 font-medium">Stock</th>
              <th className="px-6 py-3.5 font-medium">Status</th>
              <th className="px-6 py-3.5 font-medium">Created</th>
              <th className="px-6 py-3.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product._id}
                className={`border-b border-white/5 transition-colors duration-150 hover:bg-white/5 ${
                  idx % 2 === 1 ? "bg-white/0.015" : ""
                }`}
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-600">
                          N/A
                        </div>
                      )}
                    </div>
                    <span className="max-w-[220] truncate text-sm font-medium text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-300">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-sm font-medium text-gray-200">
                  {currencyFormatter.format(product.price)}
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-300">
                  {product.stock}
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={product.status} />
                </td>
                {/* <td className="px-6 py-3.5 text-sm text-gray-400">
                  {dateFormatter.format(new Date(product.createdAt))}
                </td> */}
                <td>
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-3.5">
                  <ActionButtons
                    product={product}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
