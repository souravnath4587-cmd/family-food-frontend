"use client";

import { useCallback, useEffect, useState } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../lib/api/cart";
import EmptyCart from "../components/cart/EmptyCart";
import CartSummary from "../components/cart/CartSummary";
import { CartItem as cartItem } from "../types/cart";
import CartItem from "../components/cart/CartItem";

interface ShoppingCartPageProps {
  userId: string;
}

export default function ShoppingCartPage({ userId }: ShoppingCartPageProps) {
  const [items, setItems] = useState<cartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH CART
  // ============================================

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cart = await getCart(userId);

      setItems(cart.items ?? []);
    } catch (error) {
      console.error("Fetch cart error:", error);

      const message =
        error instanceof Error ? error.message : "Failed to load cart";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // ============================================
  // INITIAL FETCH
  // ============================================

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ============================================
  // UPDATE QUANTITY
  // ============================================

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    // Save previous items for rollback
    const previousItems = items;

    // Optimistic UI update
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );

    try {
      await updateCartItemQuantity(userId, productId, quantity);
    } catch (error) {
      console.error("Update quantity error:", error);

      // Rollback UI
      setItems(previousItems);

      toast.error(
        error instanceof Error ? error.message : "Failed to update quantity",
      );
    }
  };

  // ============================================
  // REMOVE ITEM
  // ============================================

  const handleRemoveItem = async (productId: string) => {
    // Save previous items for rollback
    const previousItems = items;

    // Optimistically remove item
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );

    try {
      await removeCartItem(userId, productId);

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove item error:", error);

      // Rollback
      setItems(previousItems);

      toast.error(
        error instanceof Error ? error.message : "Failed to remove item",
      );
    }
  };

  // ============================================
  // CLEAR CART
  // ============================================

  const handleClearCart = async () => {
    if (items.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove all items from your cart?",
    );

    if (!confirmed) {
      return;
    }

    const previousItems = items;

    // Optimistic update
    setItems([]);

    try {
      setIsClearing(true);

      await clearCart(userId);

      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Clear cart error:", error);

      // Rollback
      setItems(previousItems);

      toast.error(
        error instanceof Error ? error.message : "Failed to clear cart",
      );
    } finally {
      setIsClearing(false);
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-zinc-800" />

            <div className="mt-3 h-5 w-40 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-2xl bg-zinc-900"
                />
              ))}
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-zinc-900 p-8 text-center">
          <h2 className="text-xl font-semibold">Failed to load cart</h2>

          <p className="mt-3 text-sm text-zinc-400">{error}</p>

          <button
            type="button"
            onClick={fetchCart}
            className="mt-6 rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ============================================
  // EMPTY CART
  // ============================================

  if (items.length === 0) {
    return <EmptyCart />;
  }

  // ============================================
  // CART PAGE
  // ============================================

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8" />

              <h1 className="text-3xl font-bold sm:text-4xl">Shopping Cart</h1>
            </div>

            <p className="mt-2 text-zinc-400">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          {/* Clear Cart */}
          <button
            type="button"
            onClick={handleClearCart}
            disabled={isClearing}
            className="flex w-fit items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />

            {isClearing ? "Clearing..." : "Clear Cart"}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items */}
          <section className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </section>

          {/* Cart Summary */}
          <aside>
            <CartSummary items={items} />
          </aside>
        </div>
      </div>
    </main>
  );
}
