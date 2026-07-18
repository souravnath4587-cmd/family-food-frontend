"use client";

import { AdminUser } from "@/app/types/User";
import { FiAlertTriangle } from "react-icons/fi";
// import type { AdminUser } from "@/types/user";

interface DeleteUserModalProps {
  user: AdminUser | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteUserModal({
  user,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteUserModalProps) {
  if (!user) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-sm rounded-2xl border border-[#E4DCC8] bg-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D1552C]/10 text-[#D1552C]">
          <FiAlertTriangle size={20} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#20261F]">
          Delete this user?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#7A7368]">
          This permanently removes{" "}
          <span className="font-medium text-[#20261F]">{user.name}</span> (
          {user.email}) from your database. This can&#39;t be undone.
        </p>
        <div className="modal-action">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn border-none text-white hover:brightness-105"
            style={{ backgroundColor: "#D1552C" }}
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Delete user"
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onCancel} disabled={isDeleting}>
          close
        </button>
      </form>
    </dialog>
  );
}
