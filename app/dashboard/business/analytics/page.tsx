"use client";

import Card from "@/components/Card";

const analyticsMetrics = [
  { label: "Total Revenue", value: "₹5,24,870", icon: "💰", trend: "+12.5%", color: "from-green-500/10 to-green-400/10" },
  { label: "Growth Rate", value: "32.8%", icon: "📈", trend: "+4.2%", color: "from-blue-500/10 to-blue-400/10" },
  { label: "Engagement Score", value: "8.9/10", icon: "⭐", trend: "+0.5", color: "from-yellow-500/10 to-yellow-400/10" },
  { label: "Conversion Rate", value: "4.2%", icon: "✅", trend: "+0.8%", color: "from-purple-500/10 to-purple-400/10" },
];

const weeklyData = [
  { week: "Week 1", revenue: 45000, growth: 2.1 },
  { week: "Week 2", revenue: 52000, growth: 2.8 },
  { week: "Week 3", revenue: 48500, growth: 2.5 },
  { week: "Week 4", revenue: 58000, growth: 3.2 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-300 text-lg">Performance metrics and detailed insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsMetrics.map((metric, i) => (
          <Card key={i} className={`bg-gradient-to-br ${metric.color} border-white/10`}>
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{metric.icon}</div>
              <span className="text-green-400 text-sm font-semibold">{metric.trend}</span>
            </div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-2 font-semibold">
              {metric.label}
            </h3>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card title="📊 Weekly Revenue">
          <div className="space-y-4">
            {weeklyData.map((week, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-300">{week.week}</p>
                  <span className="text-sm font-semibold text-green-400">₹{week.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                    style={{ width: `${(week.revenue / 60000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Growth Trends */}
        <Card title="📈 Growth Trends">
          <div className="space-y-4">
            {weeklyData.map((week, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm text-white font-medium">{week.week}</p>
                  <p className="text-xs text-gray-400">Growth Rate</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-300">{week.growth}%</p>
                  </div>
                  <div className="w-16 h-8 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">➗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card title="📋 Detailed Performance">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Avg Session Duration</p>
              <p className="text-2xl font-bold text-white">4m 23s</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Bounce Rate</p>
              <p className="text-2xl font-bold text-white">32.4%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Page Views</p>
              <p className="text-2xl font-bold text-white">12.5K</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Unique Visitors</p>
              <p className="text-2xl font-bold text-white">8.2K</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
