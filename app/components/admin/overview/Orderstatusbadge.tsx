
import { OrderStatus } from "@/app/types/admin-stats";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gray-500/10 text-gray-300 ring-1 ring-gray-500/30",
  processing: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30",
  delivered: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30",
  cancelled: "bg-red-500/10 text-red-400 ring-1 ring-red-500/30",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}
