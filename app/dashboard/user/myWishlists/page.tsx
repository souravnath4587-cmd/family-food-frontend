import { redirect } from "next/navigation";
import { getWishlist } from "@/app/lib/api/wishlist";
import { getUserSession } from "@/app/lib/core/session";
import MyWishlistTable from "./MyWishlistTable";

const MyWishlistPage = async () => {
  const user = await getUserSession();
  const userId = user?.id;

  if (!user?.id) {
    redirect("/login");
  }

  const wishlistItems = await getWishlist(userId as string);

  return (
    <div className="container mx-auto px-4 py-10">
      <MyWishlistTable items={wishlistItems} userId={userId as string} />
    </div>
  );
};

export default MyWishlistPage;
