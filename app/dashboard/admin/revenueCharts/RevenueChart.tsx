"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// import {
//   getRevenueData,
// } from "@/app/lib/api/revenue";

import { RevenueData, RevenueRange } from "@/app/types/revenue";
import { getRevenueData } from "@/app/lib/api/revenue";

export default function RevenueChart() {
  const [range, setRange] = useState<RevenueRange>("12months");

  const [data, setData] = useState<RevenueData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (range === "custom") {
      return;
    }

    loadRevenue();
  }, [range]);

  async function loadRevenue() {
    try {
      setIsLoading(true);

      setError(null);

      const revenue = await getRevenueData({
        range,
      });

      setData(revenue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load revenue.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCustomSearch() {
    if (!startDate || !endDate) {
      setError("Please select start and end dates.");

      return;
    }

    try {
      setIsLoading(true);

      setError(null);

      const revenue = await getRevenueData({
        range: "custom",

        startDate,

        endDate,
      });

      setData(revenue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load revenue.");
    } finally {
      setIsLoading(false);
    }
  }

  const formattedData = data.map((item) => ({
    ...item,

    formattedDate: new Date(item.date).toLocaleDateString("en-BD", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] p-5">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Revenue Analytics
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Revenue and delivered orders overview.
          </p>
        </div>

        {/* Range Select */}

        <select
          value={range}
          onChange={(e) => setRange(e.target.value as RevenueRange)}
          className="rounded-lg border border-white/10 bg-[#0F0F0F] px-4 py-2 text-sm text-white outline-none focus:border-[#E3A73E]"
        >
          <option value="7days">Last 7 days</option>

          <option value="30days">Last 30 days</option>

          <option value="6months">Last 6 months</option>

          <option value="12months">Last 12 months</option>

          <option value="custom">Custom range</option>
        </select>
      </div>

      {/* Custom Date */}

      {range === "custom" && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0F0F0F] px-3 py-2 text-sm text-white outline-none"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0F0F0F] px-3 py-2 text-sm text-white outline-none"
          />

          <button
            onClick={handleCustomSearch}
            className="rounded-lg bg-[#E3A73E] px-5 py-2 text-sm font-medium text-black transition hover:brightness-110"
          >
            Apply
          </button>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Chart */}

      <div className="mt-6 h-[350] w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Loading revenue data...
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No delivered orders found for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={formattedData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />

              <XAxis
                dataKey="formattedDate"
                stroke="#71717A"
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                yAxisId="revenue"
                stroke="#71717A"
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                yAxisId="orders"
                orientation="right"
                stroke="#71717A"
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181B",
                  border: "1px solid #27272A",
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: "#FFFFFF",
                }}
              />

              <Legend />

              <Bar
                yAxisId="orders"
                dataKey="orders"
                name="Orders"
                fill="#E3A73E"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />

              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#FFFFFF"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
