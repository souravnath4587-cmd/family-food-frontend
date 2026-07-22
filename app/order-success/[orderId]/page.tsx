import { redirect, notFound } from "next/navigation";

import OrderSuccess from "./OrderSuccess";
// import { getOrderById } from "@/app/lib/api/order";
import { getUserSession } from "@/app/lib/core/session";
import { getOrderById } from "@/app/lib/api/order";

interface OrderSuccessPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  // Better Auth Session
  const user = await getUserSession();

  if (!user?.id) {
    redirect("/login");
  }

  const userId = user?.id;

  // Dynamic Route Param
  const { orderId } = await params;

  if (!orderId) {
    notFound();
  }

  let order;

  try {
    order = await getOrderById(orderId, userId);
    console.log(order);
  } catch (error) {
    console.error("Failed to fetch order:", error);
    notFound();
  }

  // Security Check
  if (order.userId !== userId) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OrderSuccess order={order} />
      </div>
    </main>
  );
}
