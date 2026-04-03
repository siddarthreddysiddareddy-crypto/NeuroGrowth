import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: "blue" | "emerald" | "purple" | "none";
}

export default function Card({
  title,
  children,
  className = "",
  accentColor = "none",
}: CardProps) {
  const accentStyles: Record<string, string> = {
    blue: "border-blue-500/15 bg-blue-500/[0.04]",
    emerald: "border-emerald-500/15 bg-emerald-500/[0.04]",
    purple: "border-purple-500/15 bg-purple-500/[0.04]",
    none: "border-white/[0.07] bg-white/[0.03]",
  };

  return (
    <div
      className={`relative overflow-hidden backdrop-blur-xl rounded-2xl border p-6 transition-all duration-300 group
        ${accentStyles[accentColor]}
        hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${className}`}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
      />
      {title && (
        <h3 className="text-base font-semibold text-white/90 mb-4 flex items-center gap-2 relative z-10">
          {title}
        </h3>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
