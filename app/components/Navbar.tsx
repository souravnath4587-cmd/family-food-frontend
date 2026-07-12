"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { MdAdsClick } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";

// Routes shown when the user is logged out (minimum 3 required)
const LOGGED_OUT_ROUTES = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
];

// Routes shown when the user is logged in (minimum 5 required)
const LOGGED_IN_ROUTES = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

const Navbar = () => {
  // Swap this out for your real auth state (e.g. from a session hook/context).
  // Kept as local state here so the component is runnable/testable on its own.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const routes = isLoggedIn ? LOGGED_IN_ROUTES : LOGGED_OUT_ROUTES;

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 w-full px-4 md:px-8">
      {/* ---------- Left: mobile menu + brand ---------- */}
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
              <>
                <li>
                  <p>sourav</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => authClient.signOut()}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mt-2 border-t border-base-200 pt-2">
                  <Link href="/signIn">SignIn</Link>
                </li>
                <li>
                  <Link href="/signUp" className="font-semibold">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link href="/" className=" font-bold text-xl">
          FamilyFood
        </Link>
      </div>

      {/* ---------- Center: routes (desktop only) ---------- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Right: auth actions ---------- */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <h1 className="font-bold cursor-pointer">
                wellcome , {user?.name}
              </h1>
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

        {/* Demo-only toggle — remove once real auth is wired up */}
        {/* <button
          className="btn btn-outline btn-xs ml-2 hidden md:inline-flex"
          onClick={() => setIsLoggedIn((prev) => !prev)}
        >
          {isLoggedIn ? "Simulate logout" : "Simulate login"}
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
