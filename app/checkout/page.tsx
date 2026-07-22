import { redirect } from "next/navigation";

// import { getUserSession } from "@/app/lib/getUserSession";
// import { getCart } from "@/app/services/cartApi";

// import CheckoutForm from "./CheckoutForm";
import { getUserSession } from "../lib/core/session";
import CheckOutForm from "./CheckOutForm";
import { getCart } from "../lib/api/cart";

export default async function CheckoutPage() {
  const user = await getUserSession();

  if (!user?.id) {
    redirect("/login");
  }

  const userId: string = user?.id;

  const cart = await getCart(userId);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#B56A3B]">
            Complete your purchase
          </p>

          <h1
            className="mt-1 text-3xl font-bold text-[#20261F] sm:text-4xl"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Checkout
          </h1>

          <p className="mt-2 text-sm text-[#7A7368]">
            Enter your delivery information and review your order before placing
            it.
          </p>
        </div>

        <CheckOutForm userId={userId} cart={cart} />
      </div>
    </main>
  );
}
