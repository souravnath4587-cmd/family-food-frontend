"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SLIDES = [
  {
    id: "slide-1",
    eyebrow: "Made fresh, not stocked",
    title: "Snacks that taste like home",
    highlight: "home",
    body: "Small-batch chanachur, nimki, and anguli — made the way Bengali families have always made them.",
    image:
      "https://images.unsplash.com/photo-1599490659213-e0b2604aa9a2?w=1200&q=80",
  },
  {
    id: "slide-2",
    eyebrow: "For the whole family",
    title: "Kid-approved, elder-trusted",
    highlight: "trusted",
    body: "From mild nimki for the little ones to jhal chanachur for the heat-seekers — everyone's covered.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
  },
  {
    id: "slide-3",
    eyebrow: "Gifting made easy",
    title: "A box worth sharing",
    highlight: "sharing",
    body: "Curated gift boxes for Eid, pujo, or just because — packed fresh and shipped nationwide.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) =>
    setActive((index + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <section className="relative flex h-[65vh] min-h-[420] w-full items-center overflow-hidden bg-[#274235]">
      {/* background image, crossfades between slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#20261F]/85 via-[#20261F]/55 to-[#20261F]/20" />
        </div>
      ))}

      {/* content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3A73E]">
            {slide.eyebrow}
          </span>
          <h1
            className="mt-3 text-4xl leading-[1.1] text-[#FBF3E7] sm:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
          >
            {slide.title.split(slide.highlight)[0]}
            <span className="italic text-[#E3A73E]">{slide.highlight}</span>
            {slide.title.split(slide.highlight)[1]}
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#CFE0D5]">
            {slide.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="btn border-none text-[#20261F] hover:brightness-105"
              style={{ backgroundColor: "#E3A73E" }}
            >
              Shop now
            </Link>
            <Link
              href="/about"
              className="btn btn-outline border-[#FBF3E7]/40 text-[#FBF3E7] hover:bg-[#FBF3E7]/10 hover:border-[#FBF3E7]/40"
            >
              Our story
            </Link>
          </div>
        </div>
      </div>

      {/* slide controls */}
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-[#FBF3E7] hover:bg-white/20 sm:flex"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-[#FBF3E7] hover:bg-white/20 sm:flex"
      >
        <FiChevronRight size={20} />
      </button>

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-[#E3A73E]" : "w-1.5 bg-[#FBF3E7]/40"
            }`}
          />
        ))}
      </div>

      {/* visual flow cue into the next section */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 animate-bounce pb-3 text-[#FBF3E7]/70">
        <FiChevronDown size={22} />
      </div>
    </section>
  );
}
