"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { TbHandClick } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import { getCart } from "../lib/api/cart";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const userRole =
    user && "role" in user
      ? (
          user as typeof user & {
            role?: "admin" | "user";
          }
        ).role
      : undefined;

  const userId = user?.id;

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!userId) return;

      try {
        const cart = await getCart(userId);

        setCartItemCount(cart.items?.length ?? 0);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
        setCartItemCount(0);
      }
    };

    fetchCartCount();
  }, [userId]);

  const LOGGED_OUT_ROUTES = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blogs", label: "Blogs" },
  ];

  const LOGGED_IN_ROUTES = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blogs", label: "Blogs" },
    {
      href:
        userRole === "admin"
          ? "/dashboard/admin/overView"
          : "/dashboard/user/userMenu",
      label: "Dashboard",
    },
    {
      href: "/profile",
      label: "Profile",
    },
  ];

  const routes = user ? LOGGED_IN_ROUTES : LOGGED_OUT_ROUTES;

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 w-full px-4 md:px-8">
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow"
          >
            {routes.map((route) => (
              <li key={route.href}>
                <Link href={route.href}>{route.label}</Link>
              </li>
            ))}

            {user ? (
              <li className="mt-2">
                <button
                  className="btn btn-warning"
                  onClick={() => authClient.signOut()}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="mt-2 border-t border-base-200 pt-2">
                  <Link href="/signIn">Sign In</Link>
                </li>

                <li>
                  <Link href="/signUp" className="font-semibold">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link href="/" className="font-bold text-xl">
          FamilyFood
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center cursor-pointer"
            >
              <h1 className="font-bold">Welcome, {user.name}</h1>

              <TbHandClick size={25} className="mx-2" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow"
            >
              <li>
                <Link href="/profile">Profile</Link>
              </li>

              <li>
                <Link href="/settings">Settings</Link>
              </li>

              {userRole === "admin" && (
                <li>
                  <Link href="/dashboard/admin/overView">Admin Dashboard</Link>
                </li>
              )}

              <li>
                <button onClick={() => authClient.signOut()}>Log out</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              href="/signIn"
              className="btn btn-ghost hidden sm:inline-flex"
            >
              Log in
            </Link>

            <Link href="/signUp" className="btn btn-primary">
              Sign up
            </Link>
          </>
        )}

        {/* Cart */}
        <Link href="/cart" className="relative btn btn-secondary btn-sm">
          {cartItemCount > 0 && (
            <span className="badge badge-warning absolute -top-2 -right-2">
              {cartItemCount}
            </span>
          )}
          <IoCart />
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
