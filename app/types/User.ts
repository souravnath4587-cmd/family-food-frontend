export type UserRole = "user" | "admin";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt?: string;
}
