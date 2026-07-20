interface StockBadgeProps {
  stock: number;
  lowStockThreshold?: number;
}

export default function StockBadge({
  stock,
  lowStockThreshold = 10,
}: StockBadgeProps) {
  const isOutOfStock = stock <= 0;
  const isLowStock = !isOutOfStock && stock <= lowStockThreshold;

  const label = isOutOfStock
    ? "Out of Stock"
    : isLowStock
      ? `Only ${stock} left`
      : "In Stock";

  const styles = isOutOfStock
    ? "bg-red-500/10 text-red-400 ring-red-500/30"
    : isLowStock
      ? "bg-amber-500/10 text-amber-400 ring-amber-500/30"
      : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
