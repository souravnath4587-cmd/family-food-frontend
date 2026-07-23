"use client";

import { useEffect, useState } from "react";

import {
  FiDollarSign,
  FiShoppingBag,
  FiPackage,
  FiUsers,
} from "react-icons/fi";

import { AdminStats } from "@/app/types/admin-stats";

import { getAdminStats } from "@/app/lib/api/admin-stats";

import OverviewSkeleton from "@/app/components/admin/overview/Overviewskeleton";

import MetricCard from "@/app/components/admin/overview/MetricCard";

import RecentOrdersTable from "@/app/components/admin/overview/Recentorderstable";

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US");

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAdminStats();

      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load overview.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =========================
            Header
        ========================== */}

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Overview
          </h1>

          <p className="text-sm text-gray-400">
            A quick snapshot of your store&apos;s performance.
          </p>
        </div>

        <div className="mt-6">
          {/* =========================
              Loading
          ========================== */}

          {isLoading ? (
            <OverviewSkeleton />
          ) : error || !stats ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
              <p className="text-sm text-red-400">
                {error ?? "Something went wrong."}
              </p>

              <button
                onClick={loadStats}
                className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              {/* =========================
                  Metric Cards
              ========================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  icon={<FiDollarSign className="h-5 w-5" />}
                  label="Total Revenue"
                  value={currencyFormatter.format(stats.totalRevenue)}
                />

                <MetricCard
                  icon={<FiShoppingBag className="h-5 w-5" />}
                  label="Total Orders"
                  value={numberFormatter.format(stats.totalOrders)}
                />

                <MetricCard
                  icon={<FiPackage className="h-5 w-5" />}
                  label="Total Products"
                  value={numberFormatter.format(stats.totalProducts)}
                />

                <MetricCard
                  icon={<FiUsers className="h-5 w-5" />}
                  label="Total Users"
                  value={numberFormatter.format(stats.totalUsers)}
                />
              </div>

              {/* =========================
                  Order Statistics
              ========================== */}

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <OrderStatusCard label="Pending" value={stats.pendingOrders} />

                <OrderStatusCard
                  label="Confirmed"
                  value={stats.confirmedOrders}
                />

                <OrderStatusCard
                  label="Processing"
                  value={stats.processingOrders}
                />

                <OrderStatusCard label="Shipped" value={stats.shippedOrders} />

                <OrderStatusCard
                  label="Delivered"
                  value={stats.deliveredOrders}
                />

                <OrderStatusCard
                  label="Cancelled"
                  value={stats.cancelledOrders}
                />
              </div>

              {/* =========================
                  Recent Orders
              ========================== */}

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <RecentOrdersTable orders={[]} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Order Status Card
========================= */

interface OrderStatusCardProps {
  label: string;
  value: number;
}

function OrderStatusCard({ label, value }: OrderStatusCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] p-4">
      <p className="text-xs text-gray-500">{label}</p>

      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
