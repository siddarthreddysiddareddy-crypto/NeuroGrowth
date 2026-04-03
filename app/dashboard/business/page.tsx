"use client";

import { motion } from "framer-motion";
import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import { useBusinessLiveData } from "@/hooks/useLiveData";

export default function MainDashboard() {
  const {
    engagementRate,
    reach,
    conversions,
    campaigns,
    activities,
    lastUpdated,
  } = useBusinessLiveData();

  const campaignMetrics = [
    { label: "Engagement Rate", value: `${engagementRate.toFixed(1)}%`, icon: "💬", trend: "+4.1%", color: "#60a5fa" },
    { label: "Reach", value: reach >= 1000 ? `${(reach / 1000).toFixed(1)}K` : `${reach}`, icon: "👥", trend: "+18%", color: "#a78bfa" },
    { label: "Conversions", value: `${conversions}`, icon: "✅", trend: "+12%", color: "#34d399" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">
            Business Dashboard
          </h1>
          <p className="text-white/40 text-sm">
            Marketing automation, analytics, and growth tools
          </p>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-blue-300 text-xs font-semibold">LIVE</span>
          <span className="text-white/30 text-xs">Updated {lastUpdated}</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {campaignMetrics.map((metric, i) => (
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
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top left, ${metric.color}0A 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                  {metric.trend}
                </span>
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wide font-semibold mb-1">{metric.label}</p>
              <p className="text-3xl font-extrabold text-white tabular-nums">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign ROI */}
      <div className="mb-8">
        <Card title="💰 Campaign ROI" className="border-white/[0.07]">
          <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            <span className="text-xs text-blue-400/70 font-medium">Live campaign data</span>
          </div>
          <div className="space-y-5">
            {campaigns.map((campaign, i) => (
              <div key={campaign.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-white/90 text-sm">{campaign.name}</p>
                    {campaign.status === "Active" && (
                      <p className="text-xs text-white/30 mt-0.5">
                        Reach: {campaign.reach >= 1000 ? `${(campaign.reach / 1000).toFixed(1)}K` : campaign.reach} · Eng: {campaign.engagementRate.toFixed(1)}%
                      </p>
                    )}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    campaign.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-yellow-500/15 text-yellow-400"
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="w-full rounded-full h-1.5 mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${campaign.progress}%`, background: "linear-gradient(90deg, #3b82f6, #6366f1)" }} />
                </div>
                <div className="flex justify-between text-xs text-white/30">
                  <span>{campaign.progress.toFixed(1)}% complete</span>
                  <span className="text-emerald-400 font-semibold">ROI: {campaign.roiDisplay}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-300 transition-all hover:scale-[1.01]"
            style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.20)" }}>
            + New Campaign
          </button>
        </Card>
      </div>

      {/* AI Advisor + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 h-96">
          <ChatBox title="🤖 Business AI Advisor" placeholder="Ask about revenue, growth, equity..." type="business" />
        </div>
        <Card title="📈 Growth Insights">
          <div className="space-y-3">
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p className="text-sm text-white/80 mb-1.5 font-medium">📈 Engagement up 18%</p>
              <p className="text-xs text-white/35 leading-relaxed">Continue with video content to maintain momentum</p>
            </div>
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <p className="text-sm text-white/80 mb-1.5 font-medium">💡 AI Insights Ready</p>
              <p className="text-xs text-white/35 leading-relaxed">New growth recommendations based on your data</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <LiveActivityFeed activities={activities} title="⚡ Platform Activity Feed" />
    </div>
  );
}
