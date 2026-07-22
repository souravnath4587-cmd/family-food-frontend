"use client";

import { Order } from "@/app/types/order";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";

interface OrderDetailsProps {
  order: Order;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "confirmed":
      return "bg-blue-100 text-blue-700";

    case "processing":
      return "bg-purple-100 text-purple-700";

    case "shipped":
      return "bg-indigo-100 text-indigo-700";

    case "delivered":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <section className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/user/myOrders"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#274235] hover:underline"
          >
            <FiArrowLeft />
            Back to My Orders
          </Link>

          <h1
            className="text-4xl font-bold text-[#20261F]"
            style={{
              fontFamily: "var(--font-fraunces)",
            }}
          >
            Order Details
          </h1>

          <p className="mt-2 text-sm text-[#7A7368]">Order ID: #{order._id}</p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full px-5 py-2 text-sm font-semibold capitalize ${getStatusStyle(
            order.orderStatus,
          )}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Order Summary */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
          <p className="text-sm text-[#7A7368]">Order Date</p>

          <p className="mt-2 font-semibold text-[#20261F]">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
          <p className="text-sm text-[#7A7368]">Payment Method</p>

          <p className="mt-2 font-semibold capitalize text-[#20261F]">
            {order.paymentMethod.replace(/_/g, " ")}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
          <p className="text-sm text-[#7A7368]">Payment Status</p>

          <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold capitalize text-yellow-700">
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Customer + Shipping */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
          <h2 className="mb-5 text-xl font-bold text-[#20261F]">
            Customer Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FiUser className="mt-1 text-[#274235]" />

              <div>
                <p className="text-xs text-[#7A7368]">Name</p>

                <p className="font-semibold text-[#20261F]">
                  {order.customer.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone className="mt-1 text-[#274235]" />

              <div>
                <p className="text-xs text-[#7A7368]">Phone</p>

                <p className="font-semibold text-[#20261F]">
                  {order.customer.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping */}

        <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
          <h2 className="mb-5 text-xl font-bold text-[#20261F]">
            Shipping Address
          </h2>

          <div className="flex items-start gap-3">
            <FiMapPin className="mt-1 text-[#274235]" />

            <div>
              <p className="text-xs text-[#7A7368]">Delivery Address</p>

              <p className="mt-1 text-sm leading-6 text-[#20261F]">
                {order.shippingAddress.address}
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-[#274235]">
                {order.deliveryLocation.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items */}

      <div className="rounded-2xl border border-[#E4DCC8] bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <FiPackage size={24} className="text-[#274235]" />

          <h2 className="text-xl font-bold text-[#20261F]">Ordered Products</h2>
        </div>

        <div className="space-y-4">
          {order.items.map((item: any) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-xl bg-[#F8F4EC] p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name || "Product image"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-[#20261F]">{item.name}</h3>

                <p className="mt-1 text-sm text-[#7A7368]">
                  ৳{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-bold text-[#274235]">
                ৳{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}

      <div className="ml-auto max-w-md rounded-2xl border border-[#E4DCC8] bg-white p-6">
        <h2 className="mb-5 text-xl font-bold text-[#20261F]">Price Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#7A7368]">Subtotal</span>

            <span className="font-bold text-[#7A7368]">৳{order.subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#7A7368]">Shipping</span>

            <span className=" font-bold text-[#7A7368]">
              ৳{order.shippingCost}
            </span>
          </div>

          <div className="border-t border-[#EFE6D4] pt-4">
            <div className="flex justify-between">
              <span className="font-bold text-[#20261F]">Total</span>

              <span className="text-2xl font-bold text-[#274235]">
                ৳{order.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}

      <div className="flex justify-center">
        <Link
          href="/products"
          className="rounded-xl bg-[#274235] px-8 py-3 font-semibold text-white transition hover:brightness-110"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
