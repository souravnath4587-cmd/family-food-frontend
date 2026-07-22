"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as cartItem } from "@/app/types/cart";

interface CartItemProps {
  item: cartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const itemTotal = item.price * item.quantity;

  const decreaseQuantity = () => {
    if (item.quantity <= 1) {
      return;
    }

    onQuantityChange(item.productId, item.quantity - 1);
  };

  const increaseQuantity = () => {
    onQuantityChange(item.productId, item.quantity + 1);
  };

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center">
      {/* Product Image */}
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-900 sm:h-28 sm:w-28">
        <Image
          src={item?.image || "https://i.ibb.co.com/WWNvp1Bp/chanachur4.jpg"}
          alt={item?.name || "chanachur image"}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-semibold">{item.name}</h2>

        <p className="mt-1 text-sm text-zinc-400">
          ৳{item.price.toFixed(2)} each
        </p>

        {/* Quantity Controls */}
        <div className="mt-4 flex w-fit items-center overflow-hidden rounded-lg border border-zinc-700">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            className="p-2.5 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="min-w-12 px-3 text-center text-sm font-semibold">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
            className="p-2.5 transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
        <p className="text-lg font-bold">৳{itemTotal.toFixed(2)}</p>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          aria-label={`Remove ${item.name}`}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}
