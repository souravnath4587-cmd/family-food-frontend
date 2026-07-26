"use client";

import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { removeFromWishlist } from "@/app/lib/api/wishlist";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addToCart } from "@/app/lib/api/cart";

interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  image?: string;
  imageUrl?: string;
  stockQuantity?: number;
}

interface MyWishlistTableProps {
  items: WishlistProduct[];
  userId: string;
}

const MyWishlistTable = ({ items, userId }: MyWishlistTableProps) => {
  const [wishlistItems, setWishlistItems] = useState(items);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = async (product: WishlistProduct) => {
    try {
      setLoadingId(product._id);

      await addToCart(product._id, 1, userId);

      await removeFromWishlist(product._id, userId);

      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== product._id),
      );
      router.refresh();
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemoveWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId, userId);

      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));

      toast.success("Product removed from wishlist");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>

          <p className="mt-2 text-gray-500">
            Add products to your wishlist and they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>

        <p className="mt-2 text-gray-500">
          {items.length} products in your wishlist
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[800]">
          <thead className=" border-white/10 bg-[#181D19]">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>

              <th className="px-6 py-4 text-left">Price</th>

              <th className="px-6 py-4 text-left">Stock</th>

              <th className="px-6 py-4 text-center">Action</th>

              <th className="px-6 py-4 text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            {wishlistItems.map((product) => {
              const finalPrice = product.price - product.discountPrice;

              return (
                <tr key={product._id} className="border-t">
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={
                            product.image ||
                            product.imageUrl ||
                            "/images/placeholder.jpg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold">{product.name}</h3>

                        <p className="text-sm text-gray-500">
                          ID: {product._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">৳{finalPrice}</td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    {product.stockQuantity && product.stockQuantity > 0 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </td>

                  {/* Add to Cart */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        loadingId === product._id ||
                        !product.stockQuantity ||
                        product.stockQuantity <= 0
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ShoppingCart size={17} />

                      {loadingId === product._id ? "Adding..." : "Add to Cart"}
                    </button>
                  </td>

                  {/* Remove */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveWishlist(product._id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlistTable;
