export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#18181B] md:block">
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-white/5" />
            <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
            <div className="ml-auto h-3 w-16 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-14 animate-pulse rounded bg-white/5" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-white/5" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-[#18181B] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
            </div>
          </div>
          <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}
