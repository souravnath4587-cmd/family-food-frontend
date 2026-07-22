"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiEye, FiSearch, FiPackage, FiRefreshCw } from "react-icons/fi";

// import { Order } from "@/app/types/Order";
// import { updateOrderStatus } from "@/app/services/orderApi";
import { Order } from "@/app/types/order";
import { updateOrderStatus } from "@/app/lib/api/order";

interface ManageOrdersProps {
  orders: Order[];
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
    month: "short",
    day: "numeric",
  });
};

export default function ManageOrders({
  orders: initialOrders,
}: ManageOrdersProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        order._id.toLowerCase().includes(searchValue) ||
        order.customer?.fullName?.toLowerCase().includes(searchValue) ||
        order.customer?.phone?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      setIsUpdating(orderId);
      setError(null);

      const updatedOrder = await updateOrderStatus(orderId, newStatus);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? updatedOrder : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Orders</h1>

          <p className="mt-1 text-sm text-gray-400">
            View and manage all customer orders.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <FiPackage className="text-gray-400" />

          <span className="text-sm text-gray-300">Total Orders:</span>

          <span className="font-semibold text-white">{orders.length}</span>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Toolbar */}

      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#181D19] p-4 md:flex-row">
        {/* Search */}

        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer or phone..."
            className="w-full rounded-xl border border-white/10 bg-[#111510] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#E3A73E]"
          />
        </div>

        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#111510] px-4 py-3 text-sm text-white outline-none focus:border-[#E3A73E]"
        >
          <option value="all">All Status</option>

          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181D19]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000]">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4">Order</th>

                <th className="px-5 py-4">Customer</th>

                <th className="px-5 py-4">Items</th>

                <th className="px-5 py-4">Total</th>

                <th className="px-5 py-4">Payment</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Date</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <FiPackage size={40} className="mx-auto text-gray-600" />

                    <p className="mt-4 text-gray-400">No orders found.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="transition hover:bg-white/0.02"
                  >
                    {/* Order */}

                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        #{order._id.slice(-8)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">{order._id}</p>
                    </td>

                    {/* Customer */}

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-200">
                        {order.customer?.fullName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.customer?.phone}
                      </p>
                    </td>

                    {/* Items */}

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-300">
                        {order.items.length} items
                      </span>
                    </td>

                    {/* Total */}

                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#E3A73E]">
                        ৳{order.totalAmount}
                      </span>
                    </td>

                    {/* Payment */}

                    <td className="px-5 py-4">
                      <p className="text-sm capitalize text-gray-300">
                        {order.paymentMethod.replace(/_/g, " ")}
                      </p>

                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {order.paymentStatus}
                      </p>
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      <select
                        value={order.orderStatus}
                        disabled={isUpdating === order._id}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value as OrderStatus,
                          )
                        }
                        className={`rounded-full border-none px-3 py-2 text-xs font-semibold capitalize outline-none ${getStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {isUpdating === order._id && (
                        <FiRefreshCw
                          className="ml-2 inline animate-spin text-gray-400"
                          size={14}
                        />
                      )}
                    </td>

                    {/* Date */}

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>

                    {/* Action */}

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/admin/manageOrders/${order._id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition hover:bg-[#E3A73E] hover:text-[#111510]"
                        title="View Order"
                      >
                        <FiEye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
