import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Clock3,
  CheckCircle2,
  UserRound,
  Mail,
  Pencil,
  ArrowRight,
  Package,
} from "lucide-react";

// import { getUserSession } from "@/lib/getUserSession";
// import { getUserProfile } from "@/lib/api/profile";
import { getUserSession } from "@/app/lib/core/session";
import { getUserProfile } from "@/app/lib/api/profile";
import Image from "next/image";

const ProfilePage = async () => {
  // Get logged-in user from BetterAuth session
  const user = await getUserSession();

  // If user is not logged in
  if (!user?.id) {
    redirect("/login");
  }
  console.log(user.id);

  // Only get additional profile statistics from API
  const profile = await getUserProfile(user.id);
  console.log(profile);

  const { stats } = profile;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ========================================
            PAGE HEADER
        ======================================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account, orders, wishlist, and personal information.
          </p>
        </div>

        {/* ========================================
            PROFILE HEADER
        ======================================== */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 sm:h-40" />

          {/* User Information */}
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 text-3xl font-bold text-gray-700 shadow-md sm:h-28 sm:w-28">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              {/* Name and Email */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Edit Profile */}
              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                <Pencil size={17} />
                Edit Profile
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================
            PROFILE STATS
        ======================================== */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.totalOrders}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <ShoppingBag size={24} className="text-gray-700" />
              </div>
            </div>

            <Link
              href="/my-orders"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black"
            >
              View orders
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Pending Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.pendingOrders}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
                <Clock3 size={24} className="text-yellow-600" />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Orders waiting for processing
            </p>
          </div>

          {/* Completed Orders */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Orders</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.completedOrders}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2 size={24} className="text-green-600" />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Successfully delivered orders
            </p>
          </div>

          {/* Wishlist */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Wishlist</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.wishlistItems}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <Heart size={24} className="text-red-500" />
              </div>
            </div>

            <Link
              href="/wishlist"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black"
            >
              View wishlist
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ========================================
            MAIN CONTENT
        ======================================== */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* ======================================
              PERSONAL INFORMATION
          ======================================= */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your account information
                  </p>
                </div>

                <Link
                  href="/profile/edit"
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                >
                  <Pencil size={19} />
                </Link>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <UserRound size={20} className="text-gray-500" />

                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>

                      <p className="mt-1 font-medium text-gray-900">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-gray-500" />

                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>

                      <p className="mt-1 break-all font-medium text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================
              QUICK ACTIONS
          ======================================= */}
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>

              <div className="mt-5 space-y-3">
                {/* Orders */}
                <Link
                  href="/my-orders"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} className="text-gray-600" />

                    <span className="text-sm font-medium">My Orders</span>
                  </div>

                  <ArrowRight size={17} />
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-red-500" />

                    <span className="text-sm font-medium">My Wishlist</span>
                  </div>

                  <ArrowRight size={17} />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-gray-600" />

                    <span className="text-sm font-medium">Shopping Cart</span>
                  </div>

                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            ORDER CTA
        ======================================== */}
        <section className="mt-6 rounded-2xl bg-gray-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Package size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold">Track Your Orders</h3>

                <p className="mt-1 text-sm text-gray-300">
                  Check your recent orders and track your delivery status.
                </p>
              </div>
            </div>

            <Link
              href="/my-orders"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
            >
              View Orders
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
