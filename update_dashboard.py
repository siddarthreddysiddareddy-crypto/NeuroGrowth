import re

def rewrite():
    path = r'c:\Users\Ojas Bhayal\NeuroGrowth\app\dashboard\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Add imports and extract components
    import_line = 'import { motion } from "framer-motion";\nimport Card from "@/components/Card";'
    new_import = 'import React, { useMemo } from "react";\nimport { motion } from "framer-motion";\nimport Card from "@/components/Card";'
    content = content.replace(import_line, new_import)

    # We will build replacement lines.
    content = content.replace('const weeklyContentPlan', 'export const weeklyContentPlan')
    content = content.replace('const aiCaptions', 'export const aiCaptions')
    content = content.replace('const campaignMetrics', 'export const campaignMetrics')

    memoized_comps = """
const CampaignMetricsGrid = React.memo(function CampaignMetricsGrid({ metrics }: { metrics: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {metrics.map((metric, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
           className="relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02]"
           style={{
             background: "rgba(255,255,255,0.03)",
             border: "1px solid rgba(255,255,255,0.07)",
             backdropFilter: "blur(20px)",
           }}
        >
          <div
             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
             style={{ background: `radial-gradient(ellipse at top left, ${metric.accent}10 0%, transparent 60%)` }}
          />
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-3">{metric.icon}</div>
            <p className="text-white/35 text-xs uppercase tracking-wide font-semibold mb-2">{metric.label}</p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-3xl font-extrabold text-white tabular-nums">{metric.value}</p>
              <span
                 className="text-xs font-bold px-2 py-0.5 rounded-full"
                 style={{ background: `${metric.accent}18`, color: metric.accent, border: `1px solid ${metric.accent}30` }}
              >
                {metric.trend}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const WeeklyContentPlanList = React.memo(function WeeklyContentPlanList({ plan }: { plan: any[] }) {
  return (
    <div className="space-y-2">
      {plan.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] group"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-sm font-bold transition-all group-hover:scale-110"
            style={{
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.22)",
              color: "#60a5fa",
            }}
          >
            {i + 1}
          </div>
          <div className="flex-1">
            <p className="text-white/85 font-semibold text-sm">{item.day}</p>
            <p className="text-white/35 text-xs mt-0.5">{item.content}</p>
          </div>
          <span className="text-white/20 text-lg group-hover:text-white/50 transition-colors">✓</span>
        </div>
      ))}
    </div>
  );
});

const AICaptionsList = React.memo(function AICaptionsList({ captions }: { captions: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {captions.map((caption, i) => (
        <div
          key={i}
          className="rounded-xl p-4 cursor-pointer group transition-all duration-200 hover:scale-[1.02] bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/12 hover:border-blue-500/25"
        >
          <p className="font-bold text-blue-400 mb-2.5 text-xs uppercase tracking-wide">{caption.title}</p>
          <p className="text-white/55 text-sm leading-relaxed mb-4">{caption.text}</p>
          <button
            className="w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.30)", color: "#60a5fa" }}
          >
            Copy & Use
          </button>
        </div>
      ))}
    </div>
  );
});

export default function DashboardPage() {
"""

    content = content.replace("export default function DashboardPage() {\n", memoized_comps)

    # Initialize memoized arrays inside component
    hooks_init = """  const memoizedMetrics = useMemo(() => campaignMetrics, []);
  const memoizedPlan = useMemo(() => weeklyContentPlan, []);
  const memoizedCaptions = useMemo(() => aiCaptions, []);

  return (
"""
    content = content.replace("  return (\n", hooks_init)

    # Now replace the inline grids
    
    # 1. Campaign Metrics Grid
    cmg_pattern = re.compile(r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">.*?</div>', re.DOTALL)
    # The regex will match too much. Let's do exact substring replacement for grids.
    
    # Since I just moved them, let's substitute them with the component usage.
    # Wait, the best way in python without relying on flawless regex is finding index.
    
    # Let me just overwrite the whole file using my provided full code for the file because it's guaranteed to be clean.
    pass

def full_rewrite():
    full_code = '''"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";

const weeklyContentPlan = [
  { day: "Monday", content: "Announce new product feature" },
  { day: "Tuesday", content: "Share customer success story" },
  { day: "Wednesday", content: "Behind-the-scenes team video" },
  { day: "Thursday", content: "Tips & tricks blog post" },
  { day: "Friday", content: "Weekly roundup newsletter" },
  { day: "Saturday", content: "Community engagement post" },
  { day: "Sunday", content: "Upcoming events announcement" },
];

const aiCaptions = [
  {
    title: "Caption Variation 1",
    text: "🚀 Just launched our newest feature! Watch how it transforms your workflow. #AI #Automation #GrowthHacking",
  },
  {
    title: "Caption Variation 2",
    text: "Excited to share how our customers are scaling faster than ever before. See real results in real time. 📊✨",
  },
  {
    title: "Caption Variation 3",
    text: "Your business deserves to grow on autopilot. Discover the operating system that powers growth for 1000+ companies.",
  },
];

const campaignMetrics = [
  { label: "Click-Through Rate", value: "8.4%", icon: "📍", trend: "+2.3%", accent: "#60a5fa" },
  { label: "Engagement Rate", value: "12.7%", icon: "💬", trend: "+4.1%", accent: "#a78bfa" },
  { label: "Reach", value: "24.5K", icon: "👥", trend: "+18%", accent: "#34d399" },
  { label: "Conversions", value: "342", icon: "✅", trend: "+12%", accent: "#fbbf24" },
];

const CampaignMetricsGrid = React.memo(function CampaignMetricsGrid({ metrics }: { metrics: typeof campaignMetrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${metric.accent}10 0%, transparent 60%)` }}
          />
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-3">{metric.icon}</div>
            <p className="text-white/35 text-xs uppercase tracking-wide font-semibold mb-2">{metric.label}</p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-3xl font-extrabold text-white tabular-nums">{metric.value}</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${metric.accent}18`, color: metric.accent, border: `1px solid ${metric.accent}30` }}
              >
                {metric.trend}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const WeeklyContentPlanList = React.memo(function WeeklyContentPlanList({ plan }: { plan: typeof weeklyContentPlan }) {
  return (
    <div className="space-y-2">
      {plan.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] group"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-sm font-bold transition-all group-hover:scale-110"
            style={{
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.22)",
              color: "#60a5fa",
            }}
          >
            {i + 1}
          </div>
          <div className="flex-1">
            <p className="text-white/85 font-semibold text-sm">{item.day}</p>
            <p className="text-white/35 text-xs mt-0.5">{item.content}</p>
          </div>
          <span className="text-white/20 text-lg group-hover:text-white/50 transition-colors">✓</span>
        </div>
      ))}
    </div>
  );
});

const AICaptionsList = React.memo(function AICaptionsList({ captions }: { captions: typeof aiCaptions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {captions.map((caption, i) => (
        <div
          key={i}
          className="rounded-xl p-4 cursor-pointer group transition-all duration-200 hover:scale-[1.02] bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/12 hover:border-blue-500/25"
        >
          <p className="font-bold text-blue-400 mb-2.5 text-xs uppercase tracking-wide">{caption.title}</p>
          <p className="text-white/55 text-sm leading-relaxed mb-4">{caption.text}</p>
          <button
            className="w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.30)", color: "#60a5fa" }}
          >
            Copy & Use
          </button>
        </div>
      ))}
    </div>
  );
});

export default function DashboardPage() {
  const memoizedMetrics = useMemo(() => campaignMetrics, []);
  const memoizedPlan = useMemo(() => weeklyContentPlan, []);
  const memoizedCaptions = useMemo(() => aiCaptions, []);

  return (
    <div className="min-h-screen p-8" style={{ background: "#080f1e" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">
            Marketing Dashboard
          </h1>
          <p className="text-white/40 text-sm">Your AI-powered operating system for growth</p>
        </div>

        {/* Metrics Grid */}
        <CampaignMetricsGrid metrics={memoizedMetrics} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Content Plan */}
          <div className="lg:col-span-2">
            <Card title="📅 Weekly Content Plan">
              <WeeklyContentPlanList plan={memoizedPlan} />
              <button
                className="w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
                style={{
                  background: "rgba(59,130,246,0.10)",
                  border: "1px solid rgba(59,130,246,0.20)",
                  color: "#60a5fa",
                }}
              >
                Generate Next Week\\'s Plan
              </button>
            </Card>
          </div>

          {/* Campaign Status */}
          <Card title="🎯 Campaign Status">
            <div className="space-y-5">
              {[
                { name: "Spring Sale 2024", status: "Active", progress: 75 },
                { name: "Q2 Product Launch", status: "Planning", progress: 40 },
                { name: "Email Nurture", status: "Active", progress: 60 },
              ].map((campaign, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white/85 font-medium text-sm">{campaign.name}</p>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        campaign.status === "Active"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="w-full rounded-full h-1.5 mb-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${campaign.progress}%`,
                        background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                      }}
                    />
                  </div>
                  <p className="text-white/25 text-xs">{campaign.progress}% complete</p>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
              style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.20)", color: "#60a5fa" }}
            >
              + New Campaign
            </button>
          </Card>
        </div>

        {/* AI Captions */}
        <Card title="✨ AI Generated Captions">
          <p className="text-white/35 text-sm mb-5">
            Choose from these AI-generated caption variations for your next post:
          </p>
          <AICaptionsList captions={memoizedCaptions} />
          <button
            className="w-full mt-5 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 4px 20px rgba(59,130,246,0.3)" }}
          >
            🤖 Generate More Captions
          </button>
        </Card>

        {/* Bottom CTA */}
        <div
          className="mt-6 rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.14)",
          }}
        >
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Ready to Scale Your Growth?</h2>
            <p className="text-white/40 mb-6 text-sm">
              Connect your social accounts and let AI automate your marketing 24/7
            </p>
            <button
              className="px-7 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 4px 20px rgba(59,130,246,0.35)" }}
            >
              Connect Social Accounts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'''
    path = r'c:\Users\Ojas Bhayal\NeuroGrowth\app\dashboard\page.tsx'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(full_code)
    print("Done rewriting app/dashboard/page.tsx")

full_rewrite()
