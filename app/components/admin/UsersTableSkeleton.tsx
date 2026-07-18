export default function UsersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4DCC8] bg-white">
      <div className="flex items-center gap-4 border-b border-[#E4DCC8] px-4 py-3">
        {["User", "ID", "Email", "Role", "Status", "Actions"].map((h) => (
          <span
            key={h}
            className="text-xs uppercase tracking-wide text-[#7A7368]"
          >
            {h}
          </span>
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-[#E4DCC8] px-4 py-4 last:border-b-0"
        >
          <div className="skeleton h-8 w-8 shrink-0 rounded-full bg-[#F5EEDD]" />
          <div className="skeleton h-3 w-24 bg-[#F5EEDD]" />
          <div className="skeleton h-3 w-40 bg-[#F5EEDD]" />
          <div className="skeleton h-5 w-14 rounded-full bg-[#F5EEDD]" />
          <div className="skeleton h-5 w-14 rounded-full bg-[#F5EEDD]" />
          <div className="skeleton ml-auto h-6 w-32 bg-[#F5EEDD]" />
        </div>
      ))}
    </div>
  );
}
