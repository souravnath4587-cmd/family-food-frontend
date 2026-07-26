"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteModalProduct {
  _id: string;
  name: string;
}

interface DeleteModalProps {
  product: DeleteModalProduct | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export default function DeleteModal({
  product,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!product) return null;

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(product._id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#18181B] p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/30">
            <FiAlertTriangle className="h-5 w-5 text-red-400" />
          </div>

          <div className="flex-1">
            <h2
              id="delete-modal-title"
              className="text-base font-semibold text-white"
            >
              Delete Product?
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-300">{product.name}</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
