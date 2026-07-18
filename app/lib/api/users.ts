import { AdminUser, UserRole } from "@/app/types/User";

// Your Express server's base URL — set this in .env.local
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchUsers(): Promise<AdminUser[]> {
  const res = await fetch(`${API_BASE}/api/users`);
  return handleResponse<AdminUser[]>(res);
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<AdminUser> {
  const res = await fetch(`${API_BASE}/api/users/${userId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  return handleResponse<AdminUser>(res);
}

export async function updateUserBlockStatus(
  userId: string,
  isBlocked: boolean,
): Promise<AdminUser> {
  const res = await fetch(`${API_BASE}/api/users/${userId}/block`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isBlocked }),
  });
  return handleResponse<AdminUser>(res);
}

export async function deleteUser(userId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/users/${userId}`, {
    method: "DELETE",
    // credentials: "include",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed with status ${res.status}`);
  }
}
