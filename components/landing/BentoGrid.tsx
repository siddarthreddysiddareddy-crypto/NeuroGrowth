"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { useView } from "./ViewToggle";
import StatsStreamCard from "./StatsStreamCard";
import StatsSkeleton from "./StatsSkeleton";

// ─── Animation variants ───────────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};


// ─── Reusable bento card wrapper ──────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
  style = {},
  index = 0,
  colorClass = "",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
  colorClass?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`bento-card ${colorClass} ${className}`}
      style={style}
      whileHover={{ scale: 1.012, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Card (large, left) ──────────────────────────────────────────────────
function HeroCard() {
  const { view } = useView();
  const isInvestor = view === "investor";

  return (
    <BentoCard
      index={0}
      colorClass={isInvestor ? "bento-card-emerald" : "bento-card-blue"}
      className="col-span-12 lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between min-h-[320px] lg:min-h-[400px] relative overflow-hidden"
    >
      {/* Radial glow behind */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{
          background: isInvestor
            ? "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Badge */}
      <div className="flex items-center gap-2 w-fit">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            layoutId="hero-badge"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: isInvestor
                ? "rgba(16,185,129,0.12)"
                : "rgba(59,130,246,0.12)",
              border: isInvestor
                ? "1px solid rgba(16,185,129,0.25)"
                : "1px solid rgba(59,130,246,0.25)",
              color: isInvestor ? "#34d399" : "#60a5fa",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: isInvestor ? "#34d399" : "#60a5fa" }}
            />
            {isInvestor ? "Investor Intelligence Platform" : "AI Growth Operating System"}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main headline */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + "-headline"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-4">
              {isInvestor ? (
                <>
                  Discover{" "}
                  <span className="gradient-text-emerald">High-Alpha</span>
                  <br />
                  Opportunities
                </>
              ) : (
                <>
                  Grow Faster with{" "}
                  <span className="gradient-text-blue">NeuroGrowth</span>
                  <br />
                  Intelligence
                </>
              )}
            </h1>
            <p className="text-base md:text-lg text-white/55 max-w-md leading-relaxed">
              {isInvestor
                ? "Access AI-screened deal flow, portfolio analytics, and market intelligence powering the next generation of smart capital deployment."
                : "AI-powered marketing automation, growth analytics, and investor matchmaking — all in one intelligent platform."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTAs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view + "-cta"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href={isInvestor ? "/auth/investor/register" : "/auth/business/register"}
            id={`hero-cta-register-${view}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              background: isInvestor
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              boxShadow: isInvestor
                ? "0 4px 20px rgba(16,185,129,0.35)"
                : "0 4px 20px rgba(59,130,246,0.35)",
            }}
          >
            {isInvestor ? "Start Investing →" : "Get Started Free →"}
          </Link>
          <Link
            href={isInvestor ? "/auth/investor/login" : "/auth/business/login"}
            id={`hero-cta-login-${view}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Sign In
          </Link>
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
}

// ─── Stats Card (right, Suspense streamed) ────────────────────────────────────
function StatsCard() {
  return (
    <BentoCard
      index={1}
      className="col-span-12 lg:col-span-5 min-h-[280px] lg:min-h-[400px]"
      style={{
        background: "rgba(255,255,255,0.025)",
      }}
    >
      <Suspense fallback={<StatsSkeleton />}>
        <StatsStreamCard />
      </Suspense>
    </BentoCard>
  );
}

// ─── Mini pill badge ──────────────────────────────────────────────────────────
function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        color,
      }}
    >
      {label}
    </span>
  );
}

// ─── Features Card ─────────────────────────────────────────────────────────────
function FeaturesCard() {
  const { view } = useView();
  const isInvestor = view === "investor";

  const businessFeatures = [
    { icon: "✨", title: "AI Content Engine", desc: "Generate campaigns in seconds", tag: "GPT-4o" },
    { icon: "📊", title: "Growth Analytics", desc: "Real-time performance tracking", tag: "Live" },
    { icon: "🎯", title: "Smart Targeting", desc: "Reach the right audience always", tag: "ML" },
    { icon: "⚡", title: "Automation Flows", desc: "Set once, scale forever", tag: "No-code" },
  ];

  const investorFeatures = [
    { icon: "🔍", title: "AI Deal Screening", desc: "Pre-vetted high-potential startups", tag: "AI" },
    { icon: "📈", title: "Portfolio Tracker", desc: "Real-time investment performance", tag: "Live" },
    { icon: "🧠", title: "Market Intelligence", desc: "Sector trends & opportunity maps", tag: "ML" },
    { icon: "🤝", title: "Network Matching", desc: "Co-invest with aligned angels", tag: "Smart" },
  ];

  const features = isInvestor ? investorFeatures : businessFeatures;
  const accentColor = isInvestor ? "#34d399" : "#60a5fa";

  return (
    <BentoCard
      index={2}
      className="col-span-12 md:col-span-6 lg:col-span-4 p-6 flex flex-col gap-4"
      colorClass={isInvestor ? "bento-card-emerald" : "bento-card-blue"}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {isInvestor ? "Investor Tools" : "Business Tools"}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-lg"
          >
            {isInvestor ? "💼" : "🚀"}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view + "-features"}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 p-3 rounded-xl group cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              whileHover={{
                background: `${accentColor}08`,
                borderColor: `${accentColor}20`,
                transition: { duration: 0.15 },
              }}
            >
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                    {f.title}
                  </span>
                  <Pill label={f.tag} color={accentColor} />
                </div>
                <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </BentoCard>
  );
}

// ─── Social Proof Card ─────────────────────────────────────────────────────────
const COMPANIES = ["TechStack AI", "GrowthHub", "ScaleUp", "FinGrow", "VyaparX", "CloudNine"];

function SocialProofCard() {
  const { view } = useView();
  const isInvestor = view === "investor";

  return (
    <BentoCard
      index={3}
      className="col-span-12 md:col-span-6 lg:col-span-4 p-6 flex flex-col gap-5"
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/35">
          {isInvestor ? "Backed by" : "Trusted by"}
        </span>
        <p className="text-sm text-white/50 mt-1">
          {isInvestor
            ? "Leading VCs & angel networks"
            : "Fast-growing teams across India"}
        </p>
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-3 gap-2">
        {COMPANIES.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center justify-center px-2 py-2.5 rounded-xl text-xs font-bold text-white/35 hover:text-white/60 transition-colors cursor-default select-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            whileHover={{
              background: "rgba(255,255,255,0.07)",
              borderColor: "rgba(255,255,255,0.12)",
              scale: 1.04,
            }}
          >
            {name}
          </motion.div>
        ))}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="text-yellow-400 text-sm"
            >
              ★
            </motion.span>
          ))}
        </div>
        <span className="text-xs text-white/40">4.9 / 5 from 200+ reviews</span>
      </div>
    </BentoCard>
  );
}

// ─── CTA Card ──────────────────────────────────────────────────────────────────
function CTACard() {
  const { view } = useView();
  const isInvestor = view === "investor";

  return (
    <BentoCard
      index={4}
      className="col-span-12 lg:col-span-4 p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: isInvestor
            ? [
                "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 70% 60%, rgba(16,185,129,0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.3) 0%, transparent 60%)",
              ]
            : [
                "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 70% 60%, rgba(59,130,246,0.3) 0%, transparent 60%)",
                "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%)",
              ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 space-y-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl"
        >
          {isInvestor ? "📡" : "🧠"}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view + "-cta-text"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white">
              {isInvestor ? "Ready to Deploy Capital Smarter?" : "Ready to Scale Faster?"}
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              {isInvestor
                ? "Join 1,200+ investors accessing AI-curated deal flow from ₹10L to ₹10Cr."
                : "Join 400+ businesses using AI automation to grow 3x faster."}
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href={isInvestor ? "/auth/investor/register" : "/onboard"}
          id={`cta-card-link-${view}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105"
          style={{
            background: isInvestor
              ? "linear-gradient(135deg, #10b981, #059669)"
              : "linear-gradient(135deg, #3b82f6, #6366f1)",
            boxShadow: isInvestor
              ? "0 4px 24px rgba(16,185,129,0.4)"
              : "0 4px 24px rgba(99,102,241,0.4)",
          }}
        >
          {isInvestor ? "Join Investor Network →" : "Start for Free →"}
        </Link>
      </div>
    </BentoCard>
  );
}

// ─── Main Bento Grid ──────────────────────────────────────────────────────────
export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-12 gap-4 w-full max-w-[1400px] mx-auto px-4"
    >
      <HeroCard />
      <StatsCard />
      <FeaturesCard />
      <SocialProofCard />
      <CTACard />
    </motion.div>
  );
}
