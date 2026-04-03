"use client";

import Card from "@/components/Card";

const analyticsMetrics = [
  { label: "Total Revenue", value: "₹5,24,870", icon: "💰", trend: "+12.5%", accent: "#34d399" },
  { label: "Growth Rate", value: "32.8%", icon: "📈", trend: "+4.2%", accent: "#60a5fa" },
  { label: "Engagement Score", value: "8.9/10", icon: "⭐", trend: "+0.5", accent: "#fbbf24" },
  { label: "Conversion Rate", value: "4.2%", icon: "✅", trend: "+0.8%", accent: "#a78bfa" },
];

const weeklyData = [
  { week: "Week 1", revenue: 45000, growth: 2.1 },
  { week: "Week 2", revenue: 52000, growth: 2.8 },
  { week: "Week 3", revenue: 48500, growth: 2.5 },
  { week: "Week 4", revenue: 58000, growth: 3.2 },
];

const detailStats = [
  { label: "Avg Session Duration", value: "4m 23s" },
  { label: "Bounce Rate", value: "32.4%" },
  { label: "Page Views", value: "12.5K" },
  { label: "Unique Visitors", value: "8.2K" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">Analytics</h1>
        <p className="text-white/40 text-sm">Performance metrics and detailed insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {analyticsMetrics.map((metric, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, ${metric.accent}10 0%, transparent 60%)`,
              }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${metric.accent}18`,
                    color: metric.accent,
                    border: `1px solid ${metric.accent}30`,
                  }}
                >
                  {metric.trend}
                </span>
              </div>
              <p className="text-white/35 text-xs uppercase tracking-wide font-semibold mb-1">{metric.label}</p>
              <p className="text-2xl font-extrabold text-white tabular-nums">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card title="📊 Weekly Revenue">
          <div className="space-y-4">
            {weeklyData.map((week, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-white/70 font-medium">{week.week}</p>
                  <span className="text-sm font-bold text-emerald-400 tabular-nums">
                    ₹{week.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${(week.revenue / 60000) * 100}%`,
                      background: "linear-gradient(90deg, #10b981, #34d399)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Growth Trends */}
        <Card title="📈 Growth Trends">
          <div className="space-y-3">
            {weeklyData.map((week, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <p className="text-sm text-white/85 font-semibold">{week.week}</p>
                  <p className="text-xs text-white/30">Growth Rate</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-extrabold text-blue-300 tabular-nums">{week.growth}%</p>
                  <div
                    className="w-12 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <span className="text-blue-400 text-sm">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Performance */}
      <Card title="📋 Detailed Performance">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {detailStats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-white/30 text-xs font-medium mb-2">{stat.label}</p>
              <p className="text-xl font-extrabold text-white tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
