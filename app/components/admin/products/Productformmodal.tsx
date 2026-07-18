"use client";

import { Product, ProductFormValues } from "@/app/types/Product";
import { FormEvent, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface ProductFormModalProps {
  mode: "add" | "edit";
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues, id?: string) => Promise<void>;
}

const EMPTY_FORM: ProductFormValues = {
  name: "",
  image: "",
  category: "",
  price: 0,
  stock: 0,
};

export default function ProductFormModal({
  mode,
  product,
  isOpen,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [values, setValues] = useState<ProductFormValues>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && product) {
      setValues({
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setError(null);
  }, [mode, product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!values.name.trim() || !values.category.trim()) {
      setError("Name and category are required.");
      return;
    }

    try {
      setIsSaving(true);
      await onSubmit(values, product?._id);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#18181B] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2
            id="product-form-title"
            className="text-base font-semibold text-white"
          >
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Product name
              </label>
              <input
                type="text"
                value={values.name}
                onChange={(e) =>
                  setValues((v) => ({ ...v, name: e.target.value }))
                }
                placeholder="e.g. Wireless Headphones"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Image URL
              </label>
              <input
                type="text"
                value={values.image}
                onChange={(e) =>
                  setValues((v) => ({ ...v, image: e.target.value }))
                }
                placeholder="https://..."
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Category
              </label>
              <input
                type="text"
                value={values.category}
                onChange={(e) =>
                  setValues((v) => ({ ...v, category: e.target.value }))
                }
                placeholder="e.g. Electronics"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Price ($)
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={values.price}
                onChange={(e) =>
                  setValues((v) => ({ ...v, price: Number(e.target.value) }))
                }
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Stock quantity
              </label>
              <input
                type="number"
                min={0}
                value={values.stock}
                onChange={(e) =>
                  setValues((v) => ({ ...v, stock: Number(e.target.value) }))
                }
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors duration-150 hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Saving..."
                : mode === "add"
                  ? "Add Product"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
