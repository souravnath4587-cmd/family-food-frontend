export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#E4DCC8] bg-white">
      <div className="skeleton h-44 w-full rounded-none bg-[#F5EEDD]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="skeleton h-4 w-3/4 bg-[#F5EEDD]" />
        <div className="skeleton h-3 w-full bg-[#F5EEDD]" />
        <div className="skeleton h-3 w-2/3 bg-[#F5EEDD]" />
        <div className="skeleton mt-1 h-3 w-1/2 bg-[#F5EEDD]" />
        <div className="skeleton h-5 w-1/3 bg-[#F5EEDD]" />
        <div className="skeleton mt-auto h-10 w-full bg-[#F5EEDD]" />
      </div>
    </div>
  );
}
