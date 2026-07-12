"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const passwordTooShort = password.length > 0 && password.length < 8;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email || !password || !confirmPassword) {
      setError("Fill in every field to create your account.");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match. Check and try again.");
      return;
    }
    if (!agreeToTerms) {
      setError("Please agree to the terms to continue.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: wire up to your auth provider, e.g.:
      // await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
      // or a Supabase/Firebase signUp() call. Simulated here so the UI is testable.
      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
      });
      if (!data) {
        setError(
          error.message ?? "Something went wrong creating your account.",
        );
        setIsLoading(false);
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        router.push("/");
      }
    } catch {
      setError("Something went wrong creating your account. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      // TODO: e.g. await signIn("google")
      await new Promise((resolve) => setTimeout(resolve, 900));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className={`${fraunces.variable} ${jakarta.variable} min-h-screen w-full font-sans`}
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <div className="flex min-h-screen w-full">
        {/* ---------- Left: brand panel ---------- */}
        <div
          className="relative hidden w-1/2 flex-col justify-between overflow-hidden px-14 py-12 lg:flex"
          style={{ backgroundColor: "#274235" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FBF3E7 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative flex items-center gap-2">
            <BowlMark />
            <span
              className="text-2xl tracking-tight text-[#FBF3E7]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              familyFood
            </span>
          </div>

          <div className="relative max-w-md">
            <h1
              className="text-[2.75rem] leading-[1.1] text-[#FBF3E7]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
            >
              Snacks that taste
              <br />
              like <span className="italic text-[#E3A73E]">home</span>.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[#CFE0D5]">
              Create an account to order chanachur, nimki, and anguli made the
              way Bengali families have always made them — a little spicy, a lot
              of love.
            </p>
          </div>

          {/* signature: a recipe index card, tilted like the real thing */}
          <div className="relative h-40 w-64">
            <div className="absolute left-6 top-4 h-32 w-56 rotate-[-6] rounded-md border border-[#E3A73E]/30 bg-[#2F4A3C]" />
            <div className="absolute left-3 top-2 h-32 w-56 rotate-[3] rounded-md border border-[#E3A73E]/40 bg-[#345741]" />
            <div className="absolute left-0 top-0 flex h-32 w-56 flex-col justify-between rounded-md border border-[#E3A73E]/60 bg-[#3F6B52] p-4 shadow-lg">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#E3A73E]">
                Welcome to the kitchen
              </span>
              <span
                className="text-lg text-[#FBF3E7]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                }}
              >
                First order: classic chanachur
              </span>
              <span className="text-[11px] text-[#CFE0D5]">
                Crunchy · kid-approved · made fresh
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Right: signup form ---------- */}
        <div
          className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2"
          style={{ backgroundColor: "#FBF3E7" }}
        >
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <BowlMark small />
              <span
                className="text-xl text-[#20261F]"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
              >
                familyFood
              </span>
            </div>

            <h2
              className="text-3xl text-[#20261F]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              Create your account
            </h2>
            <p className="mt-2 text-sm text-[#7A7368]">
              Join FamilyFood and bring homemade Bengali snacks to your table.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-lg border border-[#D1552C]/30 bg-[#D1552C]/10 px-4 py-2.5 text-sm text-[#8A3418]"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-4">
              <label className="form-control w-full">
                <span className="label-text mb-1.5 text-sm font-medium text-[#20261F]">
                  Full name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="input w-full border-[#E4DCC8] bg-white text-[#20261F] focus:border-[#3F6B52] focus:outline-none"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1.5 text-sm font-medium text-[#20261F]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@family.com"
                  autoComplete="email"
                  className="input w-full border-[#E4DCC8] bg-white text-[#20261F] focus:border-[#3F6B52] focus:outline-none"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1.5 text-sm font-medium text-[#20261F]">
                  Password
                </span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    className={`input w-full bg-white pr-11 text-[#20261F] focus:outline-none ${
                      passwordTooShort
                        ? "border-[#D1552C]/50 focus:border-[#D1552C]"
                        : "border-[#E4DCC8] focus:border-[#3F6B52]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7368] hover:text-[#20261F]"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1.5 text-sm font-medium text-[#20261F]">
                  Repeat password
                </span>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Type your password again"
                    autoComplete="new-password"
                    className={`input w-full bg-white pr-11 text-[#20261F] focus:outline-none ${
                      confirmPassword.length > 0 && !passwordsMatch
                        ? "border-[#D1552C]/50 focus:border-[#D1552C]"
                        : "border-[#E4DCC8] focus:border-[#3F6B52]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7368] hover:text-[#20261F]"
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <span className="mt-1.5 text-xs text-[#8A3418]">
                    Passwords don&#39;t match yet.
                  </span>
                )}
              </label>

              <label className="mt-1 flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="checkbox checkbox-sm mt-0.5 border-[#E4DCC8] [--chkbg:#274235] [--chkfg:#FBF3E7]"
                />
                <span className="text-xs leading-relaxed text-[#7A7368]">
                  I agree to FamilyFood&#39;s{" "}
                  <Link
                    href="/terms"
                    className="text-[#274235] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-[#274235] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="btn mt-2 w-full border-none text-[#FBF3E7] hover:brightness-105"
                style={{ backgroundColor: "#274235" }}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E4DCC8]" />
              <span className="text-xs uppercase tracking-wide text-[#7A7368]">
                or
              </span>
              <div className="h-px flex-1 bg-[#E4DCC8]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
              className="btn w-full border-[#E4DCC8] bg-white text-[#20261F] hover:bg-[#F5EEDD]"
            >
              {isGoogleLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>

            <p className="mt-8 text-center text-sm text-[#7A7368]">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="font-semibold text-[#274235] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- small inline icons (no external icon dependency) ----------

function BowlMark({ small }: { small?: boolean }) {
  const size = small ? 22 : 26;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12h18a9 9 0 0 1-18 0Z" fill="#E3A73E" />
      <path
        d="M8 12c0-2 1.5-4 4-4s4 2 4 4"
        stroke="#274235"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a13.4 13.4 0 0 1-3.1 3.9M6.2 6.2C3.6 7.9 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.46H12v4.65h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.62H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
