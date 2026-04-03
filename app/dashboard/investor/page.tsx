"use client";

import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import Sparkline from "@/components/Sparkline";
import { formatCurrencyINR, formatCompactCurrencyINR } from "@/utils/formatting";
import { useEffect } from "react";
import { useNeuroGrowth } from "../../../hooks/useNeuroGrowth";
import { Opportunity } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/Toast";
import { useInvestorLiveData } from "@/hooks/useLiveData";

// Static data
const dealPipeline: Opportunity[] = [
  {
    id: "opp1",
    name: "TechStack AI",
    stage: "Series A",
    amountRaised: 5000000,
    amountDisplay: "₹50,00,000",
    valuation: 50000000,
    valuationDisplay: "₹5,00,00,000",
    matchScore: 92,
    industry: "AI",
    createdAt: new Date().toISOString()
  },
  {
    id: "opp2",
    name: "GreenFlow Solar",
    stage: "Seed",
    amountRaised: 2500000,
    amountDisplay: "₹25,00,000",
    valuation: 20000000,
    valuationDisplay: "₹2,00,00,000",
    matchScore: 87,
    industry: "GreenTech",
    createdAt: new Date().toISOString()
  },
  {
    id: "opp3",
    name: "CloudSync solutions",
    stage: "Series B",
    amountRaised: 12000000,
    amountDisplay: "₹1,20,00,000",
    valuation: 250000000,
    valuationDisplay: "₹25,00,00,000",
    matchScore: 95,
    industry: "SaaS",
    createdAt: new Date().toISOString()
  },
];

const portfolioSummary = [
  {
    name: "DataViz Systems",
    investedDisplay: "₹30,00,000",
    currentDisplay: "₹45,00,000",
    return: "+150%",
    stage: "Growth",
  },
  {
    name: "HealthTech Labs",
    investedDisplay: "₹20,00,000",
    currentDisplay: "₹52,00,000",
    return: "+260%",
    stage: "On Track",
  },
  {
    name: "CloudNine Storage",
    investedDisplay: "₹25,00,000",
    currentDisplay: "₹68,00,000",
    return: "+172%",
    stage: "Exit Prep",
  },
];

export default function InvestorDashboard() {
  const { walletAddress, userBalance, connectWallet, fetchBalance, stakeTokens, isPending } = useNeuroGrowth();
  const { setShowToast } = useAuth();
  const {
    portfolioDisplay,
    activeInvestments,
    roiAverage,
    stocks,
    activities,
    lastUpdated,
  } = useInvestorLiveData();

  useEffect(() => {
    if (walletAddress) fetchBalance(walletAddress);
  }, [walletAddress]);

  const displayBalance = userBalance ? parseFloat(userBalance).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0";

  const handleStake = async () => {
    try {
      setShowToast("Transaction Pending...", "success");
      await stakeTokens("100");
      setShowToast("Success! Staked 100 NEURO.", "success");
    } catch (error: any) {
      setShowToast(error.message || "Transaction Rejected", "error");
    }
  };

  const portfolioMetrics = [
    { label: "Portfolio Value", value: portfolioDisplay, icon: "📈", trend: "+30%", trendPositive: true },
    { label: "Active Investments", value: `${activeInvestments}`, icon: "🎯", trend: "+2", trendPositive: true },
    { label: "ROI Average", value: `${roiAverage.toFixed(1)}%`, icon: "✨", trend: "+4.2%", trendPositive: true },
  ];

  return (
    <div className="p-8 pt-20">
      {/* Dashboard Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Investor Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Portfolio tracking, deal pipeline, and investment analytics
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2.5 rounded-xl text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-300 font-semibold">LIVE</span>
            <span className="text-gray-400 text-xs">Updated {lastUpdated}</span>
          </div>

          {walletAddress && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 px-5 py-3 rounded-xl shadow-lg shadow-green-500/5">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Connected Wallet</span>
                <span className="text-green-300 text-sm font-medium tracking-wide">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Live Token Balance Card */}
        <Card className="text-center relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div>
            <div className="text-4xl mb-3">🪙</div>
            <h3 className="text-gray-400 text-sm mb-2">NEURO Balance</h3>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <p className="text-3xl font-bold text-white tabular-nums">
                {displayBalance} <span className="text-lg text-green-400">NGR</span>
              </p>
            </div>
          </div>
          {walletAddress && (
            <button
              onClick={handleStake}
              disabled={isPending}
              className="w-full mt-auto bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-green-500/20"
            >
              {isPending ? "Confirming..." : "Stake 100 NEURO"}
            </button>
          )}
        </Card>

        {/* Live Portfolio Metrics */}
        {portfolioMetrics.map((metric, i) => (
          <Card key={i} className="text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="text-4xl mb-3">{metric.icon}</div>
            <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-3xl font-bold text-white tabular-nums transition-all duration-700">
                {metric.value}
              </p>
              <span className="text-green-400 text-sm font-semibold">{metric.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Live Market Overview */}
      <div className="mb-8">
        <Card title="📊 Live Market Overview">
          <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-medium">Real-time prices updating every 2s</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stocks.map((stock, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-white/15 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm leading-tight">{stock.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stock.ticker}</p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="my-2">
                  <Sparkline
                    data={stock.history}
                    color={stock.isPositive ? "#4ade80" : "#f87171"}
                    width={72}
                    height={28}
                  />
                </div>

                {/* Price */}
                <p className="text-white font-bold text-base tabular-nums">
                  ₹{stock.price.toLocaleString()}
                </p>
                <div
                  className={`text-lg font-bold mt-1 tabular-nums transition-colors duration-500 ${
                    stock.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stock.growth}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {stock.isPositive ? "📈 Bullish" : "📉 Bearish"}
                </p>
              </div>
            ))}
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
                      <p className="font-semibold text-white text-lg">{deal.name}</p>
                      <div className="flex gap-4 flex-wrap mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full font-medium">
                          {deal.stage}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                          Raise: {deal.amountDisplay}
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full font-medium">
                          {deal.industry}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Match Score</p>
                      <p className="text-2xl font-bold text-green-400">{deal.matchScore}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${deal.matchScore}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Valuation: {deal.valuationDisplay}</p>
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
              {portfolioSummary.slice(0, 3).map((investment, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <p className="font-medium text-white text-sm mb-1">{investment.name}</p>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>{investment.investedDisplay}</span>
                    <span className="text-green-400 font-semibold">{investment.return}</span>
                  </div>
                  <p className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full inline-block">
                    {investment.stage}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
              View Full Portfolio
            </button>
          </Card>
        </div>
      </div>

      {/* AI Advisor & Live Feed */}
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
              <p className="text-sm text-gray-300 mb-2">🔥 Hot Sector: AI in Healthcare</p>
              <p className="text-xs text-gray-400">
                3 new high-quality deals matching your criteria this week
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">💡 Exit Alert: Portfolio Company</p>
              <p className="text-xs text-gray-400">
                DataViz Systems received acquisition offer at 3.5x valuation
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <div>
        <LiveActivityFeed activities={activities} title="⚡ Investor Activity Feed" maxHeight="280px" />
      </div>

      <Toast />
    </div>
  );
}
