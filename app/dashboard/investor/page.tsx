"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import Button from "@/components/Button";

export default function InvestorDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const portfolioMetrics = [
    {
      title: "Total Invested",
      value: "₹2,50,00,000",
      change: "+12%",
      icon: "💰",
    },
    {
      title: "Portfolio Value",
      value: "₹3,18,00,000",
      change: "+30%",
      icon: "📈",
    },
    {
      title: "Active Investments",
      value: "12",
      change: "+2",
      icon: "🎯",
    },
    {
      title: "Average ROI",
      value: "28.4%",
      change: "+4.2%",
      icon: "✨",
    },
  ];

  const investmentOpportunities = [
    {
      name: "TechStack AI",
      stage: "Series A",
      riskLevel: "Low",
      equityAvailable: "15%",
      valuation: "₹5,00,00,000",
      raiseAmount: "₹50,00,000",
      description: "AI-powered analytics platform for enterprises",
    },
    {
      name: "GreenFlow Solar",
      stage: "Seed",
      riskLevel: "Medium",
      equityAvailable: "12%",
      valuation: "₹2,00,00,000",
      raiseAmount: "₹25,00,000",
      description: "Renewable energy solutions provider",
    },
    {
      name: "CloudSync Solutions",
      stage: "Series B",
      riskLevel: "Medium",
      equityAvailable: "8%",
      valuation: "₹25,00,00,000",
      raiseAmount: "₹1,20,00,000",
      description: "Cloud infrastructure and DevOps tools",
    },
  ];

  const activePortfolio = [
    {
      name: "DataViz Systems",
      invested: "₹30,00,000",
      currentValue: "₹45,00,000",
      return: "+50%",
      stage: "Growth",
    },
    {
      name: "HealthTech Labs",
      invested: "₹20,00,000",
      currentValue: "₹52,00,000",
      return: "+160%",
      stage: "Series C",
    },
    {
      name: "EcoMove Logistics",
      invested: "₹40,00,000",
      currentValue: "₹40,00,000",
      return: "0%",
      stage: "Early",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0E2650] to-[#0B1F3A]">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Investor Dashboard
              </h1>
              <p className="text-gray-300">
                Welcome back, {user?.name}! Manage your investment portfolio and find new opportunities.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="md">
                📋 Portfolio Summary
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Portfolio Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {portfolioMetrics.map((metric, idx) => (
            <Card key={idx} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    {metric.title}
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {metric.value}
                  </h3>
                </div>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-semibold text-sm">
                  {metric.change}
                </span>
                <span className="text-gray-400 text-sm">this month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Investment Opportunities & Active Investments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Investment Opportunities */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-xl font-bold text-white mb-6">
                Investment Opportunities
              </h3>
              <div className="space-y-4">
                {investmentOpportunities.map((opportunity, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-green-400/30 hover:bg-green-500/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">
                            {opportunity.name}
                          </h4>
                          <span className="text-xs px-2 py-1 bg-blue-500/30 text-blue-300 rounded-full font-medium">
                            {opportunity.stage}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          {opportunity.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-400">Equity Available</p>
                            <p className="font-semibold text-white">
                              {opportunity.equityAvailable}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Valuation</p>
                            <p className="font-semibold text-white">
                              {opportunity.valuation}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                        <p
                          className={`font-semibold text-sm ${
                            opportunity.riskLevel === "Low"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {opportunity.riskLevel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <p className="text-sm font-medium text-gray-300">
                        Raising: {opportunity.raiseAmount}
                      </p>
                      <Button variant="primary" size="sm">
                        Invest Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Market Overview */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">
              Market Overview
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900 font-medium">
                  📈 Top Performing Sector
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  AI & Machine Learning up 34% this quarter
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
                <p className="text-sm text-green-900 font-medium">
                  🚀 Emerging Opportunity
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Green tech startups attracting major fund flows
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-900 font-medium">
                  💡 Market Trend
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  Series A fundraising at 3-year high
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Portfolio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-xl font-bold text-white mb-6\">
                Active Portfolio (3 of 12)
              </h3>
              <div className="space-y-4">
                {activePortfolio.map((investment, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {investment.name}
                        </h4>
                        <span
                          className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                            investment.stage === "Growth"
                              ? "bg-green-500/30 text-green-300"
                              : investment.stage === "Series C"
                                ? "bg-blue-500/30 text-blue-300"
                                : "bg-yellow-500/30 text-yellow-300"
                          }`}
                        >
                          {investment.stage}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">
                          {investment.return}
                        </p>
                        <p className="text-xs text-gray-400">
                          {investment.invested} → {investment.currentValue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="primary" size="md" className="w-full">
                🔍 Browse Deals
              </Button>
              <Button variant="primary" size="md" className="w-full">
                💼 My Investments
              </Button>
              <Button variant="secondary" size="md" className="w-full">
                📊 View Analytics
              </Button>
              <Button variant="outline" size="md" className="w-full">
                ⚙️ Preferences
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Chat */}
        <div className="max-w-2xl">
          <ChatBox title="Investment Advisor" placeholder="Ask me about investment opportunities..." />
        </div>
      </div>
    </div>
  );
}
