"use client";

import { Order } from "@/app/types/order";
import Link from "next/link";
import { FiPackage, FiArrowRight, FiCalendar } from "react-icons/fi";

// import { Order } from "@/app/types/Order";

interface MyOrdersProps {
  orders: Order[];
}

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

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function MyOrders({ orders }: MyOrdersProps) {
  return (
    <section>
      {/* Header */}

      <div className="mb-8">
        <h1
          className="text-4xl font-bold text-[#20261F]"
          style={{
            fontFamily: "var(--font-fraunces)",
          }}
        >
          My Orders
        </h1>

        <p className="mt-2 text-[#7A7368]">
          Track and manage all your FamilyFood orders.
        </p>
      </div>

      {/* Empty State */}

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-[#E4DCC8] bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EEDD]">
            <FiPackage size={36} className="text-[#274235]" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-[#20261F]">
            No Orders Yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[#7A7368]">
            You haven&#39;t placed any orders yet. Start shopping and your
            orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#274235] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Start Shopping
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        /* Orders */

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl border border-[#E4DCC8] bg-white shadow-sm"
            >
              {/* Order Header */}

              <div className="flex flex-col gap-4 border-b border-[#EFE6D4] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#7A7368]">
                    Order ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#20261F]">
                    #{order._id}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Body */}

              <div className="p-5">
                <div className="grid gap-6 sm:grid-cols-3">
                  {/* Date */}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEDD]">
                      <FiCalendar className="text-[#274235]" />
                    </div>

                    <div>
                      <p className="text-xs text-[#7A7368]">Order Date</p>

                      <p className="mt-1 text-sm font-semibold text-[#20261F]">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Products */}

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEDD]">
                      <FiPackage className="text-[#274235]" />
                    </div>

                    <div>
                      <p className="text-xs text-[#7A7368]">Products</p>

                      <p className="mt-1 text-sm font-semibold text-[#20261F]">
                        {order.items.length} Items
                      </p>
                    </div>
                  </div>

                  {/* Total */}

                  <div>
                    <p className="text-xs text-[#7A7368]">Total Amount</p>

                    <p className="mt-1 text-xl font-bold text-[#274235]">
                      ৳{order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Products Preview */}

                <div className="mt-6 flex flex-wrap gap-3">
                  {order.items.slice(0, 4).map((item: any) => (
                    <div
                      key={item.productId}
                      className="rounded-xl bg-[#F8F4EC] px-4 py-2"
                    >
                      <p className="text-sm font-medium text-[#20261F]">
                        {item.name}
                      </p>

                      <p className="text-xs text-[#7A7368]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}

                <div className="mt-6 flex flex-col gap-4 border-t border-[#EFE6D4] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-[#7A7368]">Payment</p>

                    <p className="mt-1 text-sm font-semibold capitalize text-[#20261F]">
                      {order.paymentMethod.replace(/_/g, " ")}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/user/myOrders/${order._id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#274235] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    View Details
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
