"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiPackage,
  FiThermometer,
  FiUsers,
  FiPercent,
} from "react-icons/fi";

import { getStockStatus, ProductDetail } from "@/app/types/Product";
import { deleteProduct, getProductById } from "@/app/lib/api/Products";
import StatusBadge from "./Statusbadge";
import DeleteModal from "./Deletemodal";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface ViewProductPageProps {
  id: string;
}

export default function ViewProductPage({ id }: ViewProductPageProps) {
  const router = useRouter();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadProduct() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
      setActiveImage(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load product.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    await deleteProduct(id);
    router.push("/dashboard/admin/products");
  }

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
          <p className="text-sm text-red-400">
            {error ?? "Product not found."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => router.push("/dashboard/admin/products")}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
            >
              Back to Products
            </button>
            <button
              onClick={loadProduct}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const status = getStockStatus(product.stockQuantity);
  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice < product.price;
  const images = product.images?.length ? product.images : [];

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb / back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard/admin/products")}
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Products
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                router.push(`/dashboard/admin/products/${product._id}/edit`)
              }
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-gray-200 transition-colors duration-150 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
            >
              <FiEdit2 className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-gray-200 transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
            >
              <FiTrash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Image gallery */}
          <div className="lg:col-span-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-[#18181B]">
              {images.length > 0 ? (
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-600">
                  No image available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-colors duration-150 ${
                      activeImage === idx
                        ? "border-amber-500"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
                    <FiTag className="h-3.5 w-3.5" />
                    {product.category}
                  </span>
                  <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {product.name}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">/{product.slug}</p>
                </div>
                <StatusBadge status={status} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-end gap-3 border-y border-white/5 py-4">
                {hasDiscount ? (
                  <>
                    <span className="text-2xl font-semibold text-amber-400">
                      {currencyFormatter.format(product.discountPrice)}
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      {currencyFormatter.format(product.price)}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                      <FiPercent className="h-3 w-3" />
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100,
                      )}
                      % off
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-white">
                    {currencyFormatter.format(product.price)}
                  </span>
                )}
              </div>

              {/* Specs grid */}
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Spec
                  icon={<FiPackage className="h-4 w-4" />}
                  label="Stock"
                  value={`${product.stockQuantity} units`}
                />
                <Spec
                  icon={<FiPackage className="h-4 w-4" />}
                  label="Weight"
                  value={`${product.weight}g`}
                />
                <Spec
                  icon={<FiThermometer className="h-4 w-4" />}
                  label="Spicy Level"
                  value={capitalize(product.spicyLevel)}
                />
                <Spec
                  icon={<FiUsers className="h-4 w-4" />}
                  label="Age"
                  value={product.ageRecommendation}
                />
              </div>

              {/* Ingredients */}
              {product.ingredients?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Ingredients
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, idx) => (
                      <span
                        key={ingredient + idx}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Full description */}
              <div className="mt-6">
                <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Description
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        product={
          showDeleteModal
            ? {
                _id: product._id,
                name: product.name,
                image: images[0] ?? "",
                category: product.category,
                price: product.price,
                stock: product.stockQuantity,
                status,
                createdAt: product.createdAt ?? new Date().toISOString(),
              }
            : null
        }
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-3">
      <div className="flex items-center gap-1.5 text-gray-500">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-gray-200">{value}</p>
    </div>
  );
}

function capitalize(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-white/5" />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
              <div className="mt-3 h-7 w-2/3 animate-pulse rounded bg-white/5" />
              <div className="mt-4 h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-white/5" />
              <div className="mt-6 h-8 w-32 animate-pulse rounded bg-white/5" />
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-lg bg-white/5"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
