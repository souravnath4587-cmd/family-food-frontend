"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiChevronDown } from "react-icons/fi";

import { Product, ProductFormValues, SortOption } from "@/app/types/Product";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/app/lib/api/Products";
import ProductsTable from "@/app/components/admin/products/ProductsToolbar";
import DeleteModal from "@/app/components/admin/products/Deletemodal";
import ProductFormModal from "@/app/components/admin/products/Productformmodal";
import EmptyState from "@/app/components/admin/products/Emptystate";
import Pagination from "@/app/components/admin/products/Pagination";
import {
  CardSkeleton,
  TableSkeleton,
} from "@/app/components/admin/products/Tableskeleton";
import ProductCard from "@/app/components/admin/products/ProductsCard";
import Link from "next/link";

const PAGE_SIZE = 8;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
];

export default function AdminProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    product: Product | null;
  }>({ isOpen: false, mode: "add", product: null });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setLoadError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Failed to load products.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, searchTerm, categoryFilter, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortOption]);

  const hasActiveFilters =
    Boolean(searchTerm.trim()) || categoryFilter !== "all";

  function handleClearFilters() {
    setSearchTerm("");
    setCategoryFilter("all");
  }

  function handleView(product: Product) {
    router.push(`/admin/products/${product._id}`);
  }

  function handleOpenAdd() {
    setFormState({ isOpen: true, mode: "add", product: null });
  }

  function handleOpenEdit(product: Product) {
    setFormState({ isOpen: true, mode: "edit", product });
  }

  function handleCloseForm() {
    setFormState((s) => ({ ...s, isOpen: false }));
  }

  async function handleFormSubmit(values: ProductFormValues, id?: string) {
    if (formState.mode === "edit" && id) {
      const updated = await updateProduct(id, values);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updated } : p)),
      );
    } else {
      // Adding a product depends on your create-product endpoint.
      // Wire this up to POST http://localhost:5000/api/products
      // once that route is available, then refresh the list:
      // const created = await createProduct(values);
      // setProducts((prev) => [created, ...prev]);
      await loadProducts();
    }
  }

  async function handleConfirmDelete(id: string) {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Products
          </h1>
          <p className="text-sm text-gray-400">
            Manage all products from one place.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-white/10 bg-[#18181B] py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              />
            </div>

            {/* Category filter */}
            <div className="relative w-full sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-white/10 bg-[#18181B] py-2 pl-3 pr-9 text-sm text-gray-200 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Sort */}
            <div className="relative w-full sm:w-52">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full appearance-none rounded-lg border border-white/10 bg-[#18181B] py-2 pl-3 pr-9 text-sm text-gray-200 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <Link
            // onClick={handleOpenAdd}
            href="/dashboard/admin/addProduct"
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors duration-150 hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <FiPlus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Content */}
        <div className="mt-6">
          {isLoading ? (
            <>
              <TableSkeleton />
              <CardSkeleton />
            </>
          ) : loadError ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
              <p className="text-sm text-red-400">{loadError}</p>
              <button
                onClick={loadProducts}
                className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
              >
                Try again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              hasFilters={hasActiveFilters}
              onAddProduct={handleOpenAdd}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <>
              {/* Desktop table */}
              <ProductsTable
                products={paginatedProducts}
                onView={handleView}
                onEdit={handleOpenEdit}
                onDelete={setProductToDelete}
              />

              {/* Mobile cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onView={handleView}
                    onEdit={handleOpenEdit}
                    onDelete={setProductToDelete}
                  />
                ))}
              </div>

              <div className="mt-2 hidden overflow-hidden rounded-b-xl border border-t-0 border-white/10 bg-[#18181B] md:block">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-[#18181B] md:hidden">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <ProductFormModal
        mode={formState.mode}
        product={formState.product}
        isOpen={formState.isOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
