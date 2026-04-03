"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  accent?: "blue" | "emerald";
}

export default function Input({ label, error, className, accent = "blue", ...props }: InputProps) {
  const focusRing = accent === "emerald"
    ? "focus:border-emerald-500/60 focus:ring-emerald-500/20"
    : "focus:border-blue-500/60 focus:ring-blue-500/20";

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-white/60 mb-2 tracking-wide">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm
          bg-white/[0.05] border border-white/[0.10]
          focus:outline-none focus:ring-2 ${focusRing}
          transition-all duration-200
          ${error ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20" : ""}
          ${className || ""}`}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
