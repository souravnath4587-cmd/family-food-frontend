// import { getAdminOrderById } from "@/app/services/orderApi";

import { getAdminOrderById } from "@/app/lib/api/order";
import AdminOrderDetails from "./AdminOrderDetails";

interface AdminOrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function AdminOrderDetailsPage({
  params,
}: AdminOrderDetailsPageProps) {
  const { orderId } = await params;

  const order = await getAdminOrderById(orderId);

  return (
    <main className="min-h-screen bg-[#111510] p-6">
      <div className="mx-auto max-w-7xl">
        <AdminOrderDetails order={order} />
      </div>
    </main>
  );
}
