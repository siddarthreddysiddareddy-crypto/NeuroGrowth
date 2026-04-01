"use client";

import Card from "@/components/Card";
import Link from "next/link";

// Mock Data for Investor Dashboard
const portfolioMetrics = [
  { label: "Total Invested", value: "$2.45M", icon: "💰", trend: "+12%" },
  { label: "Portfolio Value", value: "$3.18M", icon: "📈", trend: "+30%" },
  { label: "Active Investments", value: "12", icon: "🎯", trend: "+2" },
  { label: "ROI Average", value: "28.4%", icon: "✨", trend: "+4.2%" },
];

const dealPipeline = [
  {
    name: "TechStack AI",
    stage: "Series A",
    amount: "$500K",
    valuation: "$5M",
    match: "92%",
  },
  {
    name: "GreenFlow Solar",
    stage: "Seed",
    amount: "$250K",
    valuation: "$2M",
    match: "87%",
  },
  {
    name: "CloudSync solutions",
    stage: "Series B",
    amount: "$1.2M",
    valuation: "$25M",
    match: "95%",
  },
  {
    name: "FinanceAI Pro",
    stage: "Series A",
    amount: "$750K",
    valuation: "$8M",
    match: "89%",
  },
];

const portfolio = [
  {
    name: "DataViz Systems",
    invested: "$300K",
    current: "$450K",
    return: "+150%",
    stage: "Growth",
  },
  {
    name: "HealthTech Labs",
    invested: "$200K",
    current: "$520K",
    return: "+260%",
    stage: "On Track",
  },
  {
    name: "EcoMove Logistics",
    invested: "$400K",
    current: "$400K",
    return: "0%",
    stage: "Early",
  },
  {
    name: "CloudNine Storage",
    invested: "$250K",
    current: "$680K",
    return: "+172%",
    stage: "Exit Prep",
  },
];

const opportunities = [
  {
    title: "AI-Powered Healthcare",
    description: "Telemedicine platform with AI diagnostics",
    stage: "Seed",
    amount: "$300K - $500K",
    match: "94%",
  },
  {
    title: "Sustainable Fashion Tech",
    description: "Blockchain supply chain for ethical fashion",
    stage: "Series A",
    amount: "$750K - $1.2M",
    match: "88%",
  },
  {
    title: "Fintech for Emerging Markets",
    description: "Payment solutions for underbanked populations",
    stage: "Series B",
    amount: "$1.5M - $2.5M",
    match: "91%",
  },
];

export default function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Investor Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Portfolio tracking, deal pipeline, and investment analytics
              </p>
            </div>
            <Link href="/" className="btn-secondary text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Portfolio Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioMetrics.map((metric, i) => (
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
          {/* Deal Pipeline */}
          <div className="lg:col-span-2">
            <Card title="🎯 Deal Pipeline">
              <div className="space-y-3">
                {dealPipeline.map((deal, i) => (
                  <div
                    key={i}
                    className="p-4 bg-primary/30 rounded-lg hover:bg-primary/50 transition-colors group cursor-pointer border border-primary-light/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-lg">
                          {deal.name}
                        </p>
                        <div className="flex gap-4 flex-wrap mt-2">
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium">
                            {deal.stage}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                            Raise: {deal.amount}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Match Score</p>
                        <p className="text-2xl font-bold text-green-400">
                          {deal.match}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-primary/40 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                        style={{ width: deal.match }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Valuation: {deal.valuation}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
                View All Opportunities
              </button>
            </Card>
          </div>

          {/* Active Portfolio Summary */}
          <div>
            <Card title="📊 Portfolio Summary">
              <div className="space-y-3">
                {portfolio.slice(0, 3).map((investment, i) => (
                  <div
                    key={i}
                    className="p-3 bg-primary/30 border border-primary-light/20 rounded-lg hover:bg-primary/50 transition-colors"
                  >
                    <p className="font-medium text-white text-sm mb-1">
                      {investment.name}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>${investment.invested}</span>
                      <span className="text-green-400 font-semibold">
                        {investment.return}
                      </span>
                    </div>
                    <p className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full inline-block">
                      {investment.stage}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors text-sm font-medium">
                View Full Portfolio
              </button>
            </Card>
          </div>
        </div>

        {/* Recommended Opportunities */}
        <Card title="✨ AI-Recommended Opportunities">
          <div>
            <p className="text-gray-400 text-sm mb-6">
              Personalized investment opportunities matched to your profile:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {opportunities.map((opp, i) => (
                <div
                  key={i}
                  className="bg-primary/30 border border-green-500/20 rounded-lg p-4 hover:bg-primary/50 hover:border-green-500/40 transition-all group cursor-pointer"
                >
                  <p className="font-semibold text-green-400 mb-2 text-sm">
                    {opp.title}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {opp.description}
                  </p>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Stage: {opp.stage}</span>
                      <span className="text-green-400 font-semibold">
                        {opp.match}% match
                      </span>
                    </div>
                    <p className="text-blue-300 font-medium">Seeking: {opp.amount}</p>
                  </div>
                  <button className="w-full px-3 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-xs font-medium">
                    View Full Details
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2">
              🔍 Browse All Deals
            </button>
          </div>
        </Card>

        {/* Investment Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card title="🛠️ Investor Tools">
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-green-500/20 rounded-lg transition-colors text-green-300 font-medium">
                📋 Investment Agreement Templates
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-green-500/20 rounded-lg transition-colors text-green-300 font-medium">
                📊 Portfolio Analytics & Reports
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-green-500/20 rounded-lg transition-colors text-green-300 font-medium">
                💬 Direct Founder Access
              </button>
              <button className="w-full p-3 text-left bg-primary/30 hover:bg-primary/50 border border-green-500/20 rounded-lg transition-colors text-green-300 font-medium">
                📈 Performance Benchmarking
              </button>
            </div>
          </Card>

          <Card title="📢 Market Intelligence">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-400/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">
                  🔥 Hot Sector: AI in Healthcare
                </p>
                <p className="text-xs text-gray-400">
                  3 new high-quality deals matching your criteria this week
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">
                  💡 Exit Alert: Portfolio Company
                </p>
                <p className="text-xs text-gray-400">
                  DataViz Systems received acquisition offer at 3.5x valuation
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Connect with More Investment Opportunities
          </h2>
          <p className="text-gray-300 mb-6">
            Access our full deal flow and grow your investment portfolio
          </p>
          <button className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all hover:scale-105">
            Explore Investment Network →
          </button>
        </div>
      </div>
    </div>
  );
}
