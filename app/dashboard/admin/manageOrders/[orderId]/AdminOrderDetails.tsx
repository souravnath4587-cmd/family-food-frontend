"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiCalendar,
  FiCreditCard,
  FiRefreshCw,
} from "react-icons/fi";

// import { Order } from "@/app/types/Order";
// import { updateOrderStatus } from "@/app/services/orderApi";
import { Order } from "@/app/types/order";
import { updateOrderStatus } from "@/app/lib/api/order";

interface AdminOrderDetailsProps {
  order: Order;
}

type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-400";

    case "confirmed":
      return "bg-blue-500/10 text-blue-400";

    case "processing":
      return "bg-purple-500/10 text-purple-400";

    case "shipped":
      return "bg-indigo-500/10 text-indigo-400";

    case "delivered":
      return "bg-green-500/10 text-green-400";

    case "cancelled":
      return "bg-red-500/10 text-red-400";

    default:
      return "bg-gray-500/10 text-gray-400";
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function AdminOrderDetails({
  order: initialOrder,
}: AdminOrderDetailsProps) {
  const [order, setOrder] = useState<Order>(initialOrder);

  const [isUpdating, setIsUpdating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      setIsUpdating(true);
      setError(null);

      const updatedOrder = await updateOrderStatus(order._id, newStatus);

      setOrder(updatedOrder);
    } catch (error) {
      console.error("Failed to update status:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/dashboard/admin/manageOrders"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          <h1 className="text-3xl font-bold text-white">Order Details</h1>

          <p className="mt-2 text-sm text-gray-500">Order ID: #{order._id}</p>
        </div>

        {/* Status */}

        <div className="flex items-center gap-3">
          <select
            value={order.orderStatus}
            disabled={isUpdating}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className={`rounded-xl border-none px-5 py-3 text-sm font-semibold capitalize outline-none ${getStatusStyle(
              order.orderStatus,
            )}`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {isUpdating && (
            <FiRefreshCw className="animate-spin text-gray-400" size={18} />
          )}
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Overview */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-5">
          <FiCalendar className="text-[#E3A73E]" />

          <p className="mt-4 text-xs text-gray-500">Order Date</p>

          <p className="mt-1 text-sm font-semibold text-white">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-5">
          <FiPackage className="text-[#E3A73E]" />

          <p className="mt-4 text-xs text-gray-500">Products</p>

          <p className="mt-1 text-sm font-semibold text-white">
            {order.items.length} Items
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-5">
          <FiCreditCard className="text-[#E3A73E]" />

          <p className="mt-4 text-xs text-gray-500">Payment</p>

          <p className="mt-1 text-sm font-semibold capitalize text-white">
            {order.paymentMethod.replace(/_/g, " ")}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-5">
          <p className="text-xs text-gray-500">Total Amount</p>

          <p className="mt-2 text-2xl font-bold text-[#E3A73E]">
            ৳{order.totalAmount}
          </p>
        </div>
      </div>

      {/* Customer + Shipping */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}

        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Customer Information
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <FiUser className="mt-1 text-[#E3A73E]" />

              <div>
                <p className="text-xs text-gray-500">Customer Name</p>

                <p className="mt-1 font-medium text-gray-200">
                  {order.customer?.fullName}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiPhone className="mt-1 text-[#E3A73E]" />

              <div>
                <p className="text-xs text-gray-500">Phone Number</p>

                <p className="mt-1 font-medium text-gray-200">
                  {order.customer?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping */}

        <div className="rounded-2xl border border-white/10 bg-[#181D19] p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Shipping Information
          </h2>

          <div className="flex gap-4">
            <FiMapPin className="mt-1 text-[#E3A73E]" />

            <div>
              <p className="text-xs text-gray-500">Delivery Location</p>

              <p className="mt-1 capitalize text-gray-200">
                {order.deliveryLocation.replace(/_/g, " ")}
              </p>

              <p className="mt-3 text-xs text-gray-500">Address</p>

              <p className="mt-1 leading-6 text-gray-300">
                {order.shippingAddress?.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}

      <div className="rounded-2xl border border-white/10 bg-[#181D19] p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Ordered Products</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-xl bg-white/5 p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">{item.name}</h3>

                <p className="mt-2 text-sm text-gray-500">
                  ৳{item.price} × {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-[#E3A73E]">
                  ৳{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}

      <div className="ml-auto max-w-md rounded-2xl border border-white/10 bg-[#181D19] p-6">
        <h2 className="mb-5 text-xl font-bold text-white">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>

            <span className="text-gray-200">৳{order.subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping Cost</span>

            <span className="text-gray-200">৳{order.shippingCost}</span>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span className="font-bold text-white">Total</span>

              <span className="text-2xl font-bold text-[#E3A73E]">
                ৳{order.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
