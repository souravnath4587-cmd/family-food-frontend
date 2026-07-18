"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiAlertTriangle,
  FiBookOpen,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import {
  HiSquares2X2,
  HiPlusCircle,
  HiBookOpen,
  HiShoppingBag,
  HiHeart,
  HiUser,
} from "react-icons/hi2";

export default function DashboardSideBar({
  user,
}: {
  user: {
    name?: string;
    email?: string;
    role?: "user" | "admin";
    plan?: "user_free" | "user_pro" | "user_premium";
    image?: string | null;
  };
}) {
  const pathname = usePathname();
  console.log(user);

  const userLinks = [
    {
      name: "Overview",
      href: "/dashboard/user/userMenu",
      icon: HiSquares2X2,
    },
    {
      name: "Orders",
      href: "/dashboard/user/myOrders",
      icon: HiPlusCircle,
    },
    {
      name: "Wishlist",
      href: "/dashboard/user/myWishlists",
      icon: HiBookOpen,
    },
    {
      name: "Reviews",
      href: "/dashboard/user/myReviews",
      icon: HiShoppingBag,
    },
    {
      name: "Profile",
      href: "/dashboard/user/myProfile",
      icon: HiHeart,
    },
    {
      name: "Setting",
      href: "/dashboard/user/setting",
      icon: HiUser,
    },
  ];
  const adminLinks = [
    {
      name: "Overview",
      href: "/dashboard/admin/overView",
      icon: HiSquares2X2,
    },
    {
      name: "Add Product",
      href: "/dashboard/admin/addProduct",
      icon: HiSquares2X2,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manageUsers",
      icon: FiUser,
    },
    {
      name: "Manage Orders",
      href: "/dashboard/admin/manageOrders",
      icon: FiBookOpen,
    },
    {
      name: "Products",
      href: "/dashboard/admin/products",
      icon: FiAlertTriangle,
    },
    {
      name: "Revenue Charts",
      href: "/dashboard/admin/revenueCharts",
      icon: FiDollarSign,
    },
    {
      name: "Sales Analytics",
      href: "/dashboard/admin/salesAnalytics",
      icon: FiDollarSign,
    },
  ];

  const roleBaseMap = {
    user: userLinks,
    admin: adminLinks,
  };
  const navItems = roleBaseMap[user?.role || "user"];
  return (
    <aside className="hidden md:flex w-64 bg-zinc-950 border-r border-white/10 flex-col p-5">
      <h1 className="text-2xl font-bold mb-4">FamilyFood</h1>
      <div className="mb-4">
        <div className=" flex flex-col gap-2 items-left relative">
          <div className="absolute t-0 right-0 w-[60] text-white badge badge-warning ">
            {user?.plan === "user_free"
              ? "FREE"
              : user?.plan === "user_pro"
                ? "PRO"
                : "PREMIUM"}
          </div>
          <div>
            <h2 className="font-bold text-xl">{user?.name}</h2>
            <p className=" text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
