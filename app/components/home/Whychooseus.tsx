import { FiClock, FiHeart, FiShield, FiTruck } from "react-icons/fi";

const REASONS = [
  {
    icon: FiHeart,
    title: "Real family recipes",
    body: "Every recipe comes from a real home kitchen — no shortcuts, no factory flavoring.",
  },
  {
    icon: FiClock,
    title: "Made fresh to order",
    body: "We batch-cook after you order, not weeks in advance, so it tastes like it just came off the stove.",
  },
  {
    icon: FiShield,
    title: "No artificial preservatives",
    body: "Simple, real ingredients — the same ones you'd use if you were frying it yourself.",
  },
  {
    icon: FiTruck,
    title: "Nationwide delivery",
    body: "Carefully packed to stay crunchy in transit, delivered across Bangladesh.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="w-full px-6 py-14"
      style={{ backgroundColor: "#274235" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3A73E]">
            Why families choose us
          </span>
          <h2
            className="mt-1 text-2xl text-[#FBF3E7] sm:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
          >
            Why choose FamilyFood
          </h2>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-[#FBF3E7]/10 bg-[#FBF3E7]/5 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E3A73E]/15 text-[#E3A73E]">
                <reason.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#FBF3E7]">
                {reason.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#CFE0D5]">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
