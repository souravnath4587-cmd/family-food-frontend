import { FAQS } from "@/app/lib/mock-data";

export default function FAQSection() {
  return (
    <section className="w-full bg-[#FBF3E7] px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F6B52]">
            Good to know
          </span>
          <h2
            className="mt-1 text-2xl text-[#20261F] sm:text-3xl"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.id}
              className="collapse collapse-plus rounded-xl border border-[#E4DCC8] bg-white"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={i === 0}
              />
              <div className="collapse-title text-[15px] font-semibold text-[#20261F]">
                {faq.question}
              </div>
              <div className="collapse-content text-sm leading-relaxed text-[#7A7368]">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
