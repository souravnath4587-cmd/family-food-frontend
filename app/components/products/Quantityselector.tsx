"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div
      className={`flex items-center rounded-lg border border-white/10 ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiMinus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center text-gray-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
