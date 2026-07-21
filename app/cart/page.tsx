import { redirect } from "next/navigation";
import ShoppingCartPage from "./ShoppingCartPage";
import { getUserSession } from "../lib/core/session";

// import ShoppingCartPage from "@/components/cart/ShoppingCartPage";
// import { getUserSession } from "@/lib/auth/getUserSession";

export default async function CartPage() {
  const user = await getUserSession();

  // User logged out
  if (!user) {
    redirect("/login");
  }

  // Get logged-in user's ID
  const userId = user.id;

  return <ShoppingCartPage userId={userId} />;
}
