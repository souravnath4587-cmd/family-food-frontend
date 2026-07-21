"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-black px-4 text-white">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
          <ShoppingCart className="h-10 w-10 text-zinc-400" />
        </div>

        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>

        <p className="mt-2 max-w-md text-zinc-400">
          Looks like you haven&#39;t added anything to your cart yet. Explore
          our delicious homemade food and find something you love.
        </p>

        <button
          type="button"
          onClick={() => router.push("/products")}
          className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
