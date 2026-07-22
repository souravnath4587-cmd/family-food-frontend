"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiUser,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

// import type { Cart } from "@/app/types/Cart";
import { createOrder } from "../lib/api/order";
import { Cart } from "../types/cart";
// import { createOrder } from "@/app/services/orderApi";

interface CheckoutFormProps {
  userId: string;
  cart: Cart;
}

type DeliveryLocation = "inside_feni" | "outside_feni";

const CheckoutForm = ({ userId, cart }: CheckoutFormProps) => {
  const router = useRouter();

  const [deliveryLocation, setDeliveryLocation] =
    useState<DeliveryLocation>("inside_feni");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const cartItems = cart?.items ?? [];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Calculate shipping
  const shippingCost = deliveryLocation === "inside_feni" ? 40 : 100;

  // Calculate total
  const totalAmount = subtotal + shippingCost;

  // Submit order
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const fullName = formData.get("fullName")?.toString().trim() || "";

      const phone = formData.get("phone")?.toString().trim() || "";

      const email = formData.get("email")?.toString().trim() || "";

      const address = formData.get("address")?.toString().trim() || "";

      const city = formData.get("city")?.toString().trim() || "";

      const postalCode = formData.get("postalCode")?.toString().trim() || "";

      // Frontend validation
      if (!fullName) {
        setError("Please enter your full name.");
        return;
      }

      if (!phone) {
        setError("Please enter your phone number.");
        return;
      }

      if (!address) {
        setError("Please enter your complete delivery address.");
        return;
      }

      if (!city) {
        setError("Please enter your city.");
        return;
      }

      if (cartItems.length === 0) {
        setError("Your cart is empty. Please add some products first.");
        return;
      }

      // Prepare order data
      const orderData = {
        customer: {
          fullName,
          phone,
          email: email || undefined,
        },

        shippingAddress: {
          address,
          city,
          postalCode: postalCode || undefined,
        },

        deliveryLocation,
      };

      // Create order
      const order = await createOrder(orderData, userId);

      // Redirect to success page
      router.push(`/order-success/${order._id}`);
    } catch (err) {
      console.error("Place order error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to place your order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_420px]"
    >
      {/* =========================
          LEFT SIDE
      ========================== */}
      <div className="space-y-6">
        {/* Customer Information */}
        <section className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2
              className="text-xl font-semibold text-[#20261F]"
              style={{
                fontFamily: "var(--font-fraunces)",
              }}
            >
              Customer Information
            </h2>

            <p className="mt-1 text-sm text-[#7A7368]">
              Enter your contact information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#20261F]"
              >
                Full Name
              </label>

              <div className="relative">
                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D877C]"
                  size={18}
                />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] py-3 pl-10 pr-4 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#20261F]"
              >
                Phone Number
              </label>

              <div className="relative">
                <FiPhone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D877C]"
                  size={18}
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] py-3 pl-10 pr-4 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#20261F]"
              >
                Email
                <span className="ml-1 text-xs text-[#9A9388]">(Optional)</span>
              </label>

              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D877C]"
                  size={18}
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] py-3 pl-10 pr-4 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2
              className="text-xl font-semibold text-[#20261F]"
              style={{
                fontFamily: "var(--font-fraunces)",
              }}
            >
              Shipping Address
            </h2>

            <p className="mt-1 text-sm text-[#7A7368]">
              Where should we deliver your order?
            </p>
          </div>

          <div className="space-y-5">
            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-[#20261F]"
              >
                Complete Address
              </label>

              <div className="relative">
                <FiMapPin
                  className="absolute left-3 top-3.5 text-[#8D877C]"
                  size={18}
                />

                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="House number, road, area..."
                  required
                  className="w-full resize-none rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] py-3 pl-10 pr-4 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-[#20261F]"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Feni"
                  required
                  className="w-full rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] px-4 py-3 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-sm font-medium text-[#20261F]"
                >
                  Postal Code
                  <span className="ml-1 text-xs text-[#9A9388]">
                    (Optional)
                  </span>
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="3900"
                  className="w-full rounded-xl border border-[#DCD4C3] bg-[#FFFCF6] px-4 py-3 text-sm text-[#20261F] outline-none transition focus:border-[#274235] focus:ring-2 focus:ring-[#274235]/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Location */}
        <section className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <FiTruck className="text-[#274235]" size={22} />

              <h2
                className="text-xl font-semibold text-[#20261F]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                }}
              >
                Delivery Location
              </h2>
            </div>

            <p className="mt-1 text-sm text-[#7A7368]">
              Choose your delivery area.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Inside Feni */}
            <button
              type="button"
              onClick={() => setDeliveryLocation("inside_feni")}
              className={`rounded-xl border p-4 text-left transition ${
                deliveryLocation === "inside_feni"
                  ? "border-[#274235] bg-[#274235]/5 ring-2 ring-[#274235]/10"
                  : "border-[#DCD4C3] bg-[#FFFCF6] hover:border-[#274235]/40"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#20261F]">Inside Feni</p>

                  <p className="mt-1 text-xs text-[#7A7368]">
                    Delivery within Feni
                  </p>
                </div>

                <span className="font-semibold text-[#274235]">৳40</span>
              </div>

              {deliveryLocation === "inside_feni" && (
                <FiCheckCircle className="mt-3 text-[#274235]" size={18} />
              )}
            </button>

            {/* Outside Feni */}
            <button
              type="button"
              onClick={() => setDeliveryLocation("outside_feni")}
              className={`rounded-xl border p-4 text-left transition ${
                deliveryLocation === "outside_feni"
                  ? "border-[#274235] bg-[#274235]/5 ring-2 ring-[#274235]/10"
                  : "border-[#DCD4C3] bg-[#FFFCF6] hover:border-[#274235]/40"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#20261F]">Outside Feni</p>

                  <p className="mt-1 text-xs text-[#7A7368]">
                    Delivery outside Feni
                  </p>
                </div>

                <span className="font-semibold text-[#274235]">৳100</span>
              </div>

              {deliveryLocation === "outside_feni" && (
                <FiCheckCircle className="mt-3 text-[#274235]" size={18} />
              )}
            </button>
          </div>
        </section>

        {/* Payment Method */}
        <section className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <FiCreditCard className="text-[#274235]" size={22} />

            <div>
              <h2
                className="text-xl font-semibold text-[#20261F]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                }}
              >
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-[#7A7368]">
                Choose your preferred payment method.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#274235] bg-[#274235]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#274235] text-white">
                <FiTruck size={18} />
              </div>

              <div>
                <p className="font-semibold text-[#20261F]">Cash on Delivery</p>

                <p className="text-xs text-[#7A7368]">
                  Pay when your order arrives.
                </p>
              </div>

              <FiCheckCircle className="ml-auto text-[#274235]" size={20} />
            </div>
          </div>
        </section>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <h2
            className="text-xl font-semibold text-[#20261F]"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Order Summary
          </h2>

          {/* Cart Items */}
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;

              return (
                <div key={item.productId} className="flex gap-3">
                  {/* Product Image */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5EEDD]">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-sm font-semibold text-[#20261F]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#7A7368]">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* Item Total */}
                  <p className="text-sm font-semibold text-[#274235]">
                    ৳{itemTotal}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#E4DCC8]" />

          {/* Price Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#7A7368]">Subtotal</span>

              <span className="font-medium text-[#20261F]">৳{subtotal}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#7A7368]">Shipping</span>

              <span className="font-medium text-[#20261F]">
                ৳{shippingCost}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-5 flex items-center justify-between border-t border-[#E4DCC8] pt-5">
            <span className="text-lg font-semibold text-[#20261F]">Total</span>

            <span className="text-2xl font-bold text-[#274235]">
              ৳{totalAmount}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <FiAlertCircle className="mt-0.5 shrink-0" size={18} />

              <p>{error}</p>
            </div>
          )}

          {/* Place Order */}
          <button
            type="submit"
            disabled={isSubmitting || cartItems.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#274235] px-5 py-3.5 text-sm font-semibold text-[#FBF3E7] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#FBF3E7] border-t-transparent" />
                Placing Order...
              </>
            ) : (
              <>
                <FiCheckCircle size={18} />
                Place Order · ৳{totalAmount}
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-[#8D877C]">
            By placing your order, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
