"use client";

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
    { label: "Engagement Rate", value: `${engagementRate.toFixed(1)}%`, icon: "💬", trend: "+4.1%" },
    { label: "Reach", value: reach >= 1000 ? `${(reach / 1000).toFixed(1)}K` : `${reach}`, icon: "👥", trend: "+18%" },
    { label: "Conversions", value: `${conversions}`, icon: "✅", trend: "+12%" },
  ];

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Business Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Marketing automation, analytics, and growth tools
          </p>
        </div>
        {/* Live Indicator */}
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-4 py-2.5 rounded-xl text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-green-300 font-semibold">LIVE</span>
          <span className="text-gray-400 text-xs">Updated {lastUpdated}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {campaignMetrics.map((metric, i) => (
          <Card key={i} className="text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="text-4xl mb-3">{metric.icon}</div>
            <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-3xl font-bold text-white tabular-nums transition-all duration-500">
                {metric.value}
              </p>
              <span className="text-green-400 text-sm font-semibold">{metric.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Campaign ROI */}
      <div className="mb-8">
        <Card title="💰 Campaign ROI">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs text-blue-400 font-medium">Live campaign data</span>
          </div>
          <div className="space-y-5">
            {campaigns.map((campaign, i) => (
              <div key={campaign.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-white text-sm">{campaign.name}</p>
                    {campaign.status === "Active" && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Reach: {campaign.reach >= 1000 ? `${(campaign.reach / 1000).toFixed(1)}K` : campaign.reach} · Eng: {campaign.engagementRate.toFixed(1)}%
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      campaign.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{campaign.progress.toFixed(1)}% complete</span>
                  <span className="text-green-400 font-semibold tabular-nums">
                    ROI: {campaign.roiDisplay}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors text-sm font-medium">
            + New Campaign
          </button>
        </Card>
      </div>

      {/* AI Agent & Insights + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* AI Advisor */}
        <div className="lg:col-span-2 h-96">
          <ChatBox
            title="🤖 Business AI Advisor"
            placeholder="Ask about revenue, growth, equity..."
            type="business"
          />
        </div>

        <Card title="📈 Growth Insights">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-400/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                📈 Your engagement rate is up 18% this week
              </p>
              <p className="text-xs text-gray-400">
                Continue with video content to maintain momentum
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">
                💡 AI-Generated Insights Ready
              </p>
              <p className="text-xs text-gray-400">
                New growth recommendations based on your data
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <div>
        <LiveActivityFeed activities={activities} title="⚡ Platform Activity Feed" />
      </div>
    </div>
  );
}
