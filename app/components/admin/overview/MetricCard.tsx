import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  changePercent?: number;
}

export default function MetricCard({
  icon,
  label,
  value,
  changePercent,
}: MetricCardProps) {
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] p-5 shadow-lg transition-colors duration-150 hover:border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
          {icon}
        </div>
        {changePercent !== undefined && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                : "bg-red-500/10 text-red-400 ring-red-500/30"
            }`}
          >
            {isPositive ? (
              <FiArrowUp className="h-3 w-3" />
            ) : (
              <FiArrowDown className="h-3 w-3" />
            )}
            {Math.abs(changePercent).toFixed(1)}%
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}
