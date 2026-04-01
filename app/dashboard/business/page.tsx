"use client";

import Card from "@/components/Card";
import Link from "next/link";
import { formatCurrencyINR, formatCompactCurrencyINR } from "@/utils/formatting";

// Mock Data for Business Dashboard
const weeklyContentPlan = [
  { day: "Monday", content: "Announce new product feature", status: "published" },
  { day: "Tuesday", content: "Share customer success story", status: "draft" },
  { day: "Wednesday", content: "Behind-the-scenes team video", status: "scheduled" },
  { day: "Thursday", content: "Tips & tricks blog post", status: "draft" },
  { day: "Friday", content: "Weekly roundup newsletter", status: "draft" },
  { day: "Saturday", content: "Community engagement post", status: "scheduled" },
  { day: "Sunday", content: "Upcoming events announcement", status: "draft" },
];

const aiCaptions = [
  {
    title: "Caption Variation 1",
    text: "🚀 Just launched our newest feature! Watch how it transforms your workflow. #AI #Automation #GrowthHacking",
  },
  {
    title: "Caption Variation 2",
    text:
      "Excited to share how our customers are scaling faster than ever before. See real results in real time. 📊✨",
  },
  {
    title: "Caption Variation 3",
    text:
      "Your business deserves to grow on autopilot. Discover the platform that powers growth for 1000+ companies.",
  },
];

const campaignMetrics = [
  { label: "Click-Through Rate", value: "8.4%", icon: "📍", trend: "+2.3%" },
  { label: "Engagement Rate", value: "12.7%", icon: "💬", trend: "+4.1%" },
  { label: "Reach", value: "24.5K", icon: "👥", trend: "+18%" },
  { label: "Conversions", value: "342", icon: "✅", trend: "+12%" },
];

const activeCampaigns = [
  { name: "Spring Sale 2024", status: "Active", progress: 75, roiNum: 1542000, roiDisplay: "₹15,42,000" },
  { name: "Q2 Product Launch", status: "Planning", progress: 40, roiDisplay: "TBD" },
  { name: "Email Nurture Sequence", status: "Active", progress: 60, roiNum: 895000, roiDisplay: "₹8,95,000" },
];

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Business Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Marketing automation, analytics, and growth tools
              </p>
            </div>
            <Link href="/" className="btn-secondary text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {campaignMetrics.map((metric, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl mb-3">{metric.icon}</div>
              <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <span className="text-green-400 text-sm font-semibold">
                  {metric.trend}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Weekly Content Plan */}
          <div className="lg:col-span-2">
            <Card title="📅 Weekly Content Plan">
              <div className="space-y-3">
                {weeklyContentPlan.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-3 bg-primary/30 rounded-lg hover:bg-primary/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                      <span className="text-lg font-bold text-blue-400">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.day}</p>
                      <p className="text-sm text-gray-400">{item.content}</p>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-semibold ${
                          item.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "scheduled"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors text-sm font-medium">
                Generate Next Week's Plan
              </button>
            </Card>
          </div>

          {/* Campaign ROI */}
          <div>
            <Card title="💰 Campaign ROI">
              <div className="space-y-4">
                {activeCampaigns.map((campaign, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-white text-sm">
                        {campaign.name}
                      </p>
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
                    <div className="w-full bg-primary/40 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{campaign.progress}% complete</span>
                      <span className="text-green-400 font-semibold">
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
        </div>

        {/* AI Generated Captions */}
        <Card title="✨ AI Generated Captions">
          <div>
            <p className="text-gray-400 text-sm mb-6">
              Choose from these AI-generated caption variations for your next
              post:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiCaptions.map((caption, i) => (
                <div
                  key={i}
                  className="bg-primary/30 border border-blue-500/20 rounded-lg p-4 hover:bg-primary/50 hover:border-blue-500/40 transition-all group cursor-pointer"
                >
                  <p className="font-semibold text-blue-400 mb-3 text-sm">
                    {caption.title}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {caption.text}
                  </p>
                  <button className="w-full px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors text-xs font-medium">
                    Copy & Use
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2">
              🤖 Generate More Captions
            </button>
          </div>
        </Card>

        {/* Growth Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card title="🎯 Quick Actions">
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-blue-500/20 rounded-lg transition-colors text-blue-300 font-medium">
                📊 View Detailed Analytics
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-blue-500/20 rounded-lg transition-colors text-blue-300 font-medium">
                📱 Manage Social Accounts
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-blue-500/20 rounded-lg transition-colors text-blue-300 font-medium">
                📧 Email Campaign Builder
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-blue-500/20 rounded-lg transition-colors text-blue-300 font-medium">
                ⚙️ Automation Settings
              </button>
            </div>
          </Card>

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

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-gray-300 mb-6">
            Connect your marketing tools and let AI automate your campaigns 24/7
          </p>
          <button className="btn-primary">
            Connect Your Tools →
          </button>
        </div>
      </div>
    </div>
  );
}
