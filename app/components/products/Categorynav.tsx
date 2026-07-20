"use client";

interface CategoryNavProps {
  categories: string[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  function handleClick(category: string) {
    const id = category.toLowerCase().replace(/\s+/g, "-");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="scrollbar-hide sticky top-0 z-10 -mx-4 flex gap-2 overflow-x-auto bg-[#0F0F0F]/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className="shrink-0 rounded-full border border-white/10 bg-[#18181B] px-4 py-1.5 text-sm font-medium text-gray-300 transition-colors duration-150 hover:border-amber-500/40 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          {category}
        </button>
      ))}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
