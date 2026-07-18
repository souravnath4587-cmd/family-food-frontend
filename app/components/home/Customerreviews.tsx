import { REVIEWS } from "@/app/lib/mock-data";
import { Star } from "lucide-react";

export default function CustomerReviews() {
  return (
    <section className="w-full bg-white px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F6B52]">
            Word of mouth
          </span>
          <h2
            className="mt-1 text-2xl text-[#20261F] sm:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
          >
            What families are saying
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col rounded-2xl border border-[#E4DCC8] bg-[#FBF3E7] p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-[#E3A73E] text-[#E3A73E]"
                        : "text-[#E4DCC8]"
                    }
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#20261F]">
                “{review.text}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.avatarSeed}`}
                  alt=""
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-[#20261F]">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#7A7368]">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
