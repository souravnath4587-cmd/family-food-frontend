export default function OverviewSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-[#18181B] p-5"
          >
            <div className="h-10 w-10 animate-pulse rounded-lg bg-white/5" />
            <div className="mt-4 h-3 w-20 animate-pulse rounded bg-white/5" />
            <div className="mt-2 h-6 w-28 animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-5 lg:col-span-2">
          <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-full animate-pulse rounded bg-white/5"
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-5">
          <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-full animate-pulse rounded bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
