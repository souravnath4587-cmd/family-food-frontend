export default function ProductsPageSkeleton() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 3 }).map((_, rowIdx) => (
        <div key={rowIdx}>
          <div className="h-5 w-32 animate-pulse rounded bg-white/5" />
          <div className="mt-4 flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, cardIdx) => (
              <div
                key={cardIdx}
                className="w-56 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#18181B] sm:w-64"
              >
                <div className="aspect-square w-full animate-pulse bg-white/5" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-white/5" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-5 w-16 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
