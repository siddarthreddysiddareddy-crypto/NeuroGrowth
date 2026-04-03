"use client";

import { useSimulatedGrowth } from "@/hooks/useSimulatedGrowth";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "./ViewToggle";

// ─── Animated number ──────────────────────────────────────────────────────────
function AnimatedValue({ value, suffix = "" }: { value: string | number; suffix?: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={String(value)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-block tabular-nums"
      >
        {value}
        {suffix}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── Stat row ─────────────────────────────────────────────────────────────────
function StatRow({
  icon,
  label,
  value,
  suffix,
  accentClass,
}: {
  icon: string;
  label: string;
  value: string | number;
  suffix?: string;
  accentClass: string;
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg text-base ${accentClass}`}
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {icon}
        </span>
        <span className="text-sm text-white/55 group-hover:text-white/75 transition-colors">
          {label}
        </span>
      </div>
      <span className="text-sm font-bold text-white stat-number">
        <AnimatedValue value={value} suffix={suffix} />
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StatsStreamCard() {
  const stats = useSimulatedGrowth(4000);
  const { view } = useView();

  const isInvestor = view === "investor";

  const rows = isInvestor
    ? [
        {
          icon: "💼",
          label: "Active Investors",
          value: stats.totalInvestors.toLocaleString(),
          accentClass: "text-emerald-400",
        },
        {
          icon: "🤝",
          label: "Deals Closed",
          value: stats.totalDeals.toLocaleString(),
          accentClass: "text-emerald-300",
        },
        {
          icon: "💰",
          label: "Funding Raised",
          value: stats.totalFundingDisplay,
          accentClass: "text-yellow-400",
        },
        {
          icon: "📈",
          label: "Avg. ROI",
          value: "28.4",
          suffix: "%",
          accentClass: "text-emerald-400",
        },
      ]
    : [
        {
          icon: "🏢",
          label: "Active Businesses",
          value: stats.totalBusinesses.toLocaleString(),
          accentClass: "text-blue-400",
        },
        {
          icon: "🤝",
          label: "Deals Matched",
          value: stats.totalDeals.toLocaleString(),
          accentClass: "text-blue-300",
        },
        {
          icon: "🚀",
          label: "Funding Raised",
          value: stats.totalFundingDisplay,
          accentClass: "text-yellow-400",
        },
        {
          icon: "✨",
          label: "AI Campaigns",
          value: (stats.totalBusinesses * 3).toLocaleString(),
          accentClass: "text-purple-400",
        },
      ];

  return (
    <div className="w-full h-full flex flex-col p-6 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
          Live Platform Stats
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-green-400">Live</span>
        </div>
      </div>

      {/* Users online — prominent */}
      <div
        className="rounded-xl px-4 py-3 flex items-center justify-between"
        style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">👥</span>
          <span className="text-sm font-medium text-white/70">Users Online</span>
        </div>
        <span
          className="text-2xl font-bold stat-number"
          style={{
            background: isInvestor
              ? "linear-gradient(90deg,#34d399,#60a5fa)"
              : "linear-gradient(90deg,#60a5fa,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedValue value={stats.usersOnline} />
        </span>
      </div>

      {/* Stat rows */}
      <div className="flex-1 flex flex-col justify-center gap-3.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3.5"
          >
            {rows.map((row) => (
              <StatRow key={row.label} {...row} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div
        className="pt-3 flex items-center gap-2 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
        <span className="text-xs text-white/30">Updating every 4s</span>
      </div>
    </div>
  );
}
