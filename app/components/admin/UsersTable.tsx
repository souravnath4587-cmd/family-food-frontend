"use client";

import { AdminUser } from "@/app/types/User";
import { FiShield, FiSlash, FiTrash2, FiUserCheck } from "react-icons/fi";
// import type { AdminUser } from "@/types/user";

interface UsersTableProps {
  users: AdminUser[];
  currentUserId?: string;
  actioningUserId: string | null; // user whose role/block action is in-flight
  onToggleRole: (user: AdminUser) => void;
  onToggleBlock: (user: AdminUser) => void;
  onRequestDelete: (user: AdminUser) => void;
}

export default function UsersTable({
  users,
  currentUserId,
  actioningUserId,
  onToggleRole,
  onToggleBlock,
  onRequestDelete,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E4DCC8] bg-white p-10 text-center text-sm text-[#7A7368]">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#18181B] text-white ">
      <table className="table">
        <thead className="bg-[#1D1D21]">
          <tr className="text-xs uppercase tracking-wide text-white">
            <th>User</th>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user._id === currentUserId;
            const isBusy = actioningUserId === user._id;

            return (
              <tr key={user._id} className="text-sm">
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                        user.name,
                      )}`}
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium text-white">
                      {user.name}
                      {isSelf && (
                        <span className="ml-1.5 text-xs font-normal text-[#7A7368]">
                          (you)
                        </span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="font-mono text-xs text-white" title={user._id}>
                  {user._id.slice(0, 8)}…
                </td>
                <td className="text-white">{user.email}</td>
                <td>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-[#274235]/5 text-[#b1b8b4]"
                        : "bg-[#E4DCC8]/30 text-[#c9b28e]"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.isBlocked
                        ? "bg-[#D1552C]/10 text-[#975038]"
                        : "bg-[#3F6B52]/10 text-[#2d5a3f]"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onToggleRole(user)}
                      disabled={isSelf || isBusy}
                      title={
                        isSelf
                          ? "You can't change your own role"
                          : user.role === "admin"
                            ? "Remove admin access"
                            : "Make this user an admin"
                      }
                      className="btn btn-ghost btn-xs gap-1 text-white disabled:opacity-40"
                    >
                      <FiShield size={13} />
                      {user.role === "admin" ? "Demote" : "Make admin"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleBlock(user)}
                      disabled={isSelf || isBusy}
                      title={
                        isSelf
                          ? "You can't block your own account"
                          : user.isBlocked
                            ? "Unblock this user"
                            : "Block this user"
                      }
                      className="btn btn-ghost btn-xs gap-1 text-[#E3A73E] disabled:opacity-40"
                    >
                      {user.isBlocked ? (
                        <FiUserCheck size={13} />
                      ) : (
                        <FiSlash size={13} />
                      )}
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRequestDelete(user)}
                      disabled={isSelf || isBusy}
                      title={
                        isSelf
                          ? "You can't delete your own account"
                          : "Delete user"
                      }
                      className="btn btn-ghost btn-xs gap-1 text-[#D1552C] disabled:opacity-40"
                    >
                      <FiTrash2 size={13} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
