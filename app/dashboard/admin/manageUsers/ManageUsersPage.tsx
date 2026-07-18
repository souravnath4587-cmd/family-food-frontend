"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { authClient } from "@/app/lib/auth-client";
import UsersTable from "@/app/components/admin/UsersTable";
import UsersTableSkeleton from "@/app/components/admin/UsersTableSkeleton";
import DeleteUserModal from "@/app/components/admin/DeleteUserModalProps";
import { AdminUser } from "@/app/types/User";
import {
  updateUserRole,
  deleteUser,
  fetchUsers,
  updateUserBlockStatus,
} from "@/app/lib/api/users";

export default function ManageUsersPage() {
  const { data: session } = authClient.useSession();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actioningUserId, setActioningUserId] = useState<string | null>(null);
  const [userPendingDelete, setUserPendingDelete] = useState<AdminUser | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleRole(user: AdminUser) {
    const nextRole = user.role === "admin" ? "user" : "admin";
    setActioningUserId(user._id);
    try {
      const updated = await updateUserRole(user._id, nextRole);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? updated : u)));
      toast.success(
        nextRole === "admin"
          ? `${user.name} is now an admin.`
          : `${user.name} is no longer an admin.`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update role.");
    } finally {
      setActioningUserId(null);
    }
  }

  async function handleToggleBlock(user: AdminUser) {
    const nextBlocked = !user.isBlocked;
    setActioningUserId(user._id);
    try {
      const updated = await updateUserBlockStatus(user._id, nextBlocked);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? updated : u)));
      toast.success(
        nextBlocked
          ? `${user.name} has been blocked.`
          : `${user.name} has been unblocked.`,
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't update status.",
      );
    } finally {
      setActioningUserId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!userPendingDelete) return;
    setIsDeleting(true);
    console.log(userPendingDelete);

    try {
      await deleteUser(userPendingDelete._id);
      setUsers((prev) => prev.filter((u) => u._id !== userPendingDelete._id));
      toast.success(`${userPendingDelete.name} was deleted.`);
      setUserPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete user.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h1
          className="text-2xl "
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
        >
          Manage Users
        </h1>
        <p className="mt-1 text-sm ">
          View every account, promote admins, block bad actors, or remove a user
          entirely.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-[#D1552C]/30 bg-[#D1552C]/10 px-4 py-2.5 text-sm text-[#8A3418]"
        >
          {error}{" "}
          <button onClick={loadUsers} className="ml-2 font-semibold underline">
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <UsersTable
          users={users}
          currentUserId={session?.user?.id}
          actioningUserId={actioningUserId}
          onToggleRole={handleToggleRole}
          onToggleBlock={handleToggleBlock}
          onRequestDelete={setUserPendingDelete}
        />
      )}

      <DeleteUserModal
        user={userPendingDelete}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setUserPendingDelete(null)}
      />
    </div>
  );
}
