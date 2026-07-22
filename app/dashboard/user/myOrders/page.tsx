import { redirect } from "next/navigation";

// import { getUserSession } from "@/app/lib/getUserSession";
// import { getOrders } from "@/app/services/orderApi";

// import MyOrders from "./MyOrders";
import { getUserSession } from "@/app/lib/core/session";
import MyOrders from "./MyOrders";
import { getOrders } from "@/app/lib/api/order";
import { Order } from "@/app/types/order";

export default async function MyOrdersPage() {
  const user = await getUserSession();

  if (!user?.id) {
    redirect("/login");
  }

  const userId = user.id;

  let orders: Order[] = [];

  try {
    orders = await getOrders(userId);
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MyOrders orders={orders} />
      </div>
    </main>
  );
}
