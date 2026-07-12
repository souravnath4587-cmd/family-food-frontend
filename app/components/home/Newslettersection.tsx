"use client";

import { useState, type FormEvent } from "react";
import { FiCheck, FiMail } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      // TODO: replace with a real endpoint, e.g.
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="w-full px-6 py-16"
      style={{ backgroundColor: "#3F6B52" }}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBF3E7]/15 text-[#FBF3E7]">
          <FiMail size={20} />
        </div>
        <h2
          className="mt-4 text-2xl text-[#FBF3E7] sm:text-3xl"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
        >
          Get new flavors before anyone else
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#E4EFE7]">
          One email a month — new snacks, seasonal sweets, and family discounts.
          No spam, ever.
        </p>

        {status === "success" ? (
          <div className="mt-6 flex items-center gap-2 rounded-full bg-[#FBF3E7]/15 px-5 py-2.5 text-sm text-[#FBF3E7]">
            <FiCheck /> You&#39;re on the list — welcome!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@family.com"
              className="input flex-1 border-none bg-white text-[#20261F] focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn border-none text-[#20261F] hover:brightness-105"
              style={{ backgroundColor: "#E3A73E" }}
            >
              {status === "loading" ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs text-[#FBD8CB]">
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </section>
  );
}
