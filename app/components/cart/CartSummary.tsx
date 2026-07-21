"use client";

import { CartItem } from "@/app/types/cart";
import { useRouter } from "next/navigation";

// import type { CartItem } from "@/types/cart";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const router = useRouter();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryCharge: number = 0;

  const grandTotal = subtotal + deliveryCharge;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="sticky top-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Subtotal</span>

          <span>৳{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Delivery Charge</span>

          <span>
            {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>

            <span className="text-xl font-bold">৳{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-zinc-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
