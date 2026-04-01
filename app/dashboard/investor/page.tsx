"use client";

import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import { formatCurrencyINR, formatCompactCurrencyINR } from "@/utils/formatting";
import { useEffect } from "react";
import { useNeuroGrowth } from "../../../hooks/useNeuroGrowth";

// Mock Data for Investor Dashboard
const portfolioMetricsRaw = [
  { label: "Portfolio Value", amount: 3180000, icon: "📈", trend: "+30%" },
  { label: "Active Investments", value: "12", icon: "🎯", trend: "+2" },
  { label: "ROI Average", value: "28.4%", icon: "✨", trend: "+4.2%" },
];

// Mock Stock Data
const stocks = [
  { name: "NeuroTech Labs", growth: "+3.4%" },
  { name: "Growthify", growth: "+2.1%" },
  { name: "FinGrow Solutions", growth: "-1.2%" },
  { name: "VyaparX", growth: "+4.0%" },
  { name: "TrendHive", growth: "-0.6%" },
];

const dealPipeline = [
  {
    name: "TechStack AI",
    stage: "Series A",
    amountNum: 5000000,
    amountDisplay: "₹50,00,000",
    valuationNum: 50000000,
    valuationDisplay: "₹5,00,00,000",
    match: "92%",
  },
  {
    name: "GreenFlow Solar",
    stage: "Seed",
    amountNum: 2500000,
    amountDisplay: "₹25,00,000",
    valuationNum: 20000000,
    valuationDisplay: "₹2,00,00,000",
    match: "87%",
  },
  {
    name: "CloudSync solutions",
    stage: "Series B",
    amountNum: 12000000,
    amountDisplay: "₹1,20,00,000",
    valuationNum: 250000000,
    valuationDisplay: "₹25,00,00,000",
    match: "95%",
  },
];

const portfolio = [
  {
    name: "DataViz Systems",
    investedNum: 3000000,
    investedDisplay: "₹30,00,000",
    currentNum: 4500000,
    currentDisplay: "₹45,00,000",
    return: "+150%",
    stage: "Growth",
  },
  {
    name: "HealthTech Labs",
    investedNum: 2000000,
    investedDisplay: "₹20,00,000",
    currentNum: 5200000,
    currentDisplay: "₹52,00,000",
    return: "+260%",
    stage: "On Track",
  },
  {
    name: "CloudNine Storage",
    investedNum: 2500000,
    investedDisplay: "₹25,00,000",
    currentNum: 6800000,
    currentDisplay: "₹68,00,000",
    return: "+172%",
    stage: "Exit Prep",
  },
];

const opportunities = [
  {
    title: "AI-Powered Healthcare",
    description: "Telemedicine platform with AI diagnostics",
    stage: "Seed",
    amountRange: "₹30,00,000 - ₹50,00,000",
    match: "94%",
  },
  {
    title: "Sustainable Fashion Tech",
    description: "Blockchain supply chain for ethical fashion",
    stage: "Series A",
    amountRange: "₹75,00,000 - ₹1,20,00,000",
    match: "88%",
  },
  {
    title: "Fintech for Emerging Markets",
    description: "Payment solutions for underbanked populations",
    stage: "Series B",
    amountRange: "₹1,50,00,000 - ₹2,50,00,000",
    match: "91%",
  },
];

export default function InvestorDashboard() {
  const { walletAddress, balance, connectWallet, fetchBalance } = useNeuroGrowth();

  useEffect(() => {
    if (walletAddress) fetchBalance(walletAddress);
  }, [walletAddress]);

  const displayBalance = balance ? parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1E3A] via-[#0E2650] to-[#0B1E3A] ml-64 pt-20">
      <div className="p-8">
        {/* Dashboard Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Investor Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Portfolio tracking, deal pipeline, and investment analytics
            </p>
          </div>
          {walletAddress && (
            <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 px-5 py-3 rounded-xl shadow-lg shadow-blue-500/5">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Connected Wallet</span>
                <span className="text-blue-300 text-sm font-medium tracking-wide">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Live Token Balance Card */}
          <Card className="text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-4xl mb-3">🪙</div>
            <h3 className="text-gray-400 text-sm mb-2">NEURO Balance</h3>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-3xl font-bold text-white">
                {displayBalance} <span className="text-lg text-blue-400">NGR</span>
              </p>
            </div>
          </Card>

          {/* Static Metrics */}
          {portfolioMetricsRaw.map((metric, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl mb-3">{metric.icon}</div>
              <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
              <div className="flex items-baseline justify-center gap-2">
                <p className="text-3xl font-bold text-white">
                  {metric.amount ? formatCompactCurrencyINR(metric.amount) : metric.value}
                </p>
                <span className="text-green-400 text-sm font-semibold">
                  {metric.trend}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Market Overview Section */}
        <div className="mb-8">
          <Card title="📊 Market Overview">
            <p className="text-gray-400 text-sm mb-6">
              Real-time market movements for promising startup ecosystem companies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {stocks.map((stock, i) => {
                const isPositive = stock.growth.startsWith("+");
                return (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:scale-105 transition duration-300 cursor-pointer hover:bg-white/15"
                  >
                    <p className="font-semibold text-white mb-2 text-sm">
                      {stock.name}
                    </p>
                    <div
                      className={`text-2xl font-bold ${isPositive ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {stock.growth}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {isPositive ? "📈 Bullish" : "📉 Bearish"}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
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
                    className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer border border-white/10"
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
                            Raise: {deal.amountDisplay}
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
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                        style={{ width: deal.match }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Valuation: {deal.valuationDisplay}
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
                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <p className="font-medium text-white text-sm mb-1">
                      {investment.name}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{investment.investedDisplay}</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* AI Advisor */}
          <div className="lg:col-span-2 h-96">
            <ChatBox 
              title="💰 Investor AI Advisor" 
              placeholder="Ask about risks, returns, opportunities..." 
              type="investor"
            />
          </div>

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
                  className="bg-white/5 border border-green-500/20 rounded-lg p-4 hover:bg-white/10 hover:border-green-500/40 transition-all group cursor-pointer"
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
                    <p className="text-blue-300 font-medium">Seeking: {opp.amountRange}</p>
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

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Connect with More Investment Opportunities
          </h2>
          <p className="text-gray-300 mb-6">
            Access our full deal flow and grow your investment portfolio
          </p>
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
            Explore Investment Network →
          </button>
        </div>
      </div>
    </div>
  );
}
