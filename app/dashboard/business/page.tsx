"use client";

import { useState } from "react";
import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import { formatCurrencyINR, formatCompactCurrencyINR } from "@/utils/formatting";
import { useNeuroGrowth } from "../../../hooks/useNeuroGrowth";

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
  const { walletAddress, balance, status, loading, connectWallet, sendTokens } = useNeuroGrowth();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1E3A] via-[#0E2650] to-[#0B1E3A] ml-64 pt-20">
      <div className="p-8">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Business Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Marketing automation, analytics, and growth tools
          </p>
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
                    className="flex items-start gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer border border-white/10"
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
                    <div className="w-full bg-white/10 rounded-full h-2 mb-2">
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

        {/* AI Agent & Insights */}
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card title="🎯 Quick Actions">
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-blue-300 font-medium">
                📊 View Detailed Analytics
              </button>
              <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-blue-300 font-medium">
                📱 Manage Social Accounts
              </button>
              <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-blue-300 font-medium">
                📧 Email Campaign Builder
              </button>
              <button className="w-full p-3 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-blue-300 font-medium">
                ⚙️ Automation Settings
              </button>
            </div>
          </Card>

          <Card title="🚀 Growth Opportunities">
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm font-semibold text-white">Partner Integration</p>
                <p className="text-xs text-gray-400 mt-1">Connect with complementary services</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm font-semibold text-white">Referral Program</p>
                <p className="text-xs text-gray-400 mt-1">Earn commissions on new client referrals</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm font-semibold text-white">Scale Module</p>
                <p className="text-xs text-gray-400 mt-1">Advanced features for growth scaling</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-gray-300 mb-6">
            Connect your marketing tools and let AI automate your campaigns 24/7
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Connect Your Tools →
          </button>
        </div>
      </div>
    </div>
  );
}
