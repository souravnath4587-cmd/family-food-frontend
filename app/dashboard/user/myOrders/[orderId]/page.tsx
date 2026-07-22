import { redirect } from "next/navigation";

import { getUserSession } from "@/app/lib/core/session";
import { getOrderById } from "@/app/lib/api/order";
import OrderDetails from "./OrderDetails";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params;
  console.log(orderId);

  const user = await getUserSession();

  if (!user?.id) {
    redirect("/login");
  }

  const userId = user.id;
  console.log(userId);

  const order = await getOrderById(orderId, userId);

  return (
    <main className="min-h-screen bg-[#F8F4EC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OrderDetails order={order} />
      </div>
    </main>
  );
}
