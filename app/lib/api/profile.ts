export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface ProfileStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  wishlistItems: number;
}

export interface ProfileResponse {
  success: boolean;
  user: UserProfile;
  stats: ProfileStats;
}
interface UpdateProfileData {
  name: string;
  phone?: string;
  image?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getUserProfile(userId: string): Promise<ProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  profileData: UpdateProfileData,
) {
  const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
}
