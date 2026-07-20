import { RecentOrder } from "@/app/types/admin-stats";
import Link from "next/link";
import OrderStatusBadge from "./Orderstatusbadge";
// import { RecentOrder } from "@/types/admin-stats";
// import OrderStatusBadge from "./OrderStatusBadge";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export default function RecentOrdersTable({
  orders,
}: {
  orders: RecentOrder[];
}) {
  console.log(orders);

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-xs font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-gray-500">
          No orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3 text-left font-medium">Customer</th>
                <th className="px-5 py-3 text-left font-medium">Amount</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-white/5 transition-colors duration-150 last:border-b-0 hover:bg-white/5"
                >
                  <td className="px-5 py-3 font-medium text-gray-200">
                    {order.customerName}
                  </td>
                  <td className="px-5 py-3 text-gray-300">
                    {currencyFormatter.format(order.totalAmount)}
                  </td>
                  <td className="px-5 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3 text-gray-400">
                    {dateFormatter.format(new Date(order.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
