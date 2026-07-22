import { getAllOrders } from "@/app/lib/api/order";
import ManageOrders from "./ManageOrders";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <main className="min-h-screen bg-[#111510] p-6">
      <div className="mx-auto max-w-[1600px]">
        <ManageOrders orders={orders} />
      </div>
    </main>
  );
}
