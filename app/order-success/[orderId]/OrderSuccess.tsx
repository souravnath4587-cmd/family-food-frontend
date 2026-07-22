"use client";

import { Order } from "@/app/types/order";
import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiHash } from "react-icons/fi";

interface OrderSuccessProps {
  order: Order;
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  return (
    <section className="space-y-8">
      {/* Success Banner */}
      <div className="rounded-3xl bg-linear-to-br from-[#274235] to-[#355B47] px-8 py-12 text-center text-white shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white">
          <FiCheckCircle size={60} className="text-green-600" />
        </div>

        <h1
          className="mt-6 text-4xl font-bold"
          style={{
            fontFamily: "var(--font-fraunces)",
          }}
        >
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#E9E9E9]">
          Thank you for shopping with FamilyFood. Your order has been received
          successfully. We will contact you before delivery.
        </p>
      </div>

      {/* Order Information */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EEDD]">
            <FiHash size={22} className="text-[#274235]" />
          </div>

          <p className="text-sm text-[#7A7368]">Order ID</p>

          <p className="mt-2 break-all text-sm font-semibold text-[#20261F]">
            {order?._id}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#7A7368]">Payment</p>

          <p className="mt-2 font-semibold text-[#20261F]">Cash on Delivery</p>
        </div>

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#7A7368]">Delivery</p>

          <p className="mt-2 font-semibold text-[#20261F]">
            Pending Confirmation
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#7A7368]">Status</p>

          <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            Pending
          </span>
        </div>
      </div>

      {/* ========================================= */}
      {/* Customer + Shipping */}
      {/* ========================================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Information */}

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <h2
            className="mb-5 text-2xl font-semibold text-[#20261F]"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Customer Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                Full Name
              </p>

              <p className="mt-1 text-base font-semibold text-[#20261F]">
                {order.customer.fullName}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                Phone
              </p>

              <p className="mt-1 text-base font-medium text-[#20261F]">
                {order.customer.phone}
              </p>
            </div>

            {order.customer.email && (
              <div>
                <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                  Email
                </p>

                <p className="mt-1 text-base font-medium text-[#20261F]">
                  {order.customer.email}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Address */}

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
          <h2
            className="mb-5 text-2xl font-semibold text-[#20261F]"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Shipping Address
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                Address
              </p>

              <p className="mt-1 text-base text-[#20261F]">
                {order.shippingAddress.address}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                City
              </p>

              <p className="mt-1 text-base text-[#20261F]">
                {order.shippingAddress.city}
              </p>
            </div>

            {order.shippingAddress.postalCode && (
              <div>
                <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                  Postal Code
                </p>

                <p className="mt-1 text-base text-[#20261F]">
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                Delivery Area
              </p>

              <span className="mt-2 inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                {order.deliveryLocation === "inside_feni"
                  ? "Inside Feni"
                  : "Outside Feni"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* Ordered Products */}
      {/* ========================================= */}

      <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6 shadow-sm">
        <h2
          className="mb-6 text-2xl font-semibold text-[#20261F]"
          style={{
            fontFamily: "var(--font-fraunces)",
          }}
        >
          Ordered Products
        </h2>

        <div className="space-y-5">
          {order.items.map((item: any) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 rounded-xl border border-[#EFE6D4] p-4"
            >
              {/* Product Image */}

              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[#F5EEDD]">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#20261F]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-[#7A7368]">
                  Quantity : {item.quantity}
                </p>

                <p className="mt-1 text-sm text-[#7A7368]">
                  Price : ৳{item.price}
                </p>
              </div>

              {/* Total */}

              <div className="text-right">
                <p className="text-xs uppercase text-[#7A7368]">Total</p>

                <p className="mt-1 text-xl font-bold text-[#274235]">
                  ৳{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/dashboard/user/myOrders" className="my-2">
        <button className="btn btn-primary w-full">My Orders</button>
      </Link>
    </section>
  );
}
