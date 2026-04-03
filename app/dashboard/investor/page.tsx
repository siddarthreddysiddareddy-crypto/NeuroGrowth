"use client";

import { motion } from "framer-motion";
import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import Sparkline from "@/components/Sparkline";
import { useEffect } from "react";
import { useNeuroGrowth } from "../../../hooks/useNeuroGrowth";
import { Opportunity } from "@/types/database";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/Toast";
import { useInvestorLiveData } from "@/hooks/useLiveData";

const dealPipeline: Opportunity[] = [
  { id: "opp1", name: "TechStack AI", stage: "Series A", amountRaised: 5000000, amountDisplay: "₹50,00,000", valuation: 50000000, valuationDisplay: "₹5,00,00,000", matchScore: 92, industry: "AI", createdAt: new Date().toISOString() },
  { id: "opp2", name: "GreenFlow Solar", stage: "Seed", amountRaised: 2500000, amountDisplay: "₹25,00,000", valuation: 20000000, valuationDisplay: "₹2,00,00,000", matchScore: 87, industry: "GreenTech", createdAt: new Date().toISOString() },
  { id: "opp3", name: "CloudSync Solutions", stage: "Series B", amountRaised: 12000000, amountDisplay: "₹1,20,00,000", valuation: 250000000, valuationDisplay: "₹25,00,00,000", matchScore: 95, industry: "SaaS", createdAt: new Date().toISOString() },
];

const portfolioSummary = [
  { name: "DataViz Systems", investedDisplay: "₹30,00,000", currentDisplay: "₹45,00,000", return: "+150%", stage: "Growth" },
  { name: "HealthTech Labs", investedDisplay: "₹20,00,000", currentDisplay: "₹52,00,000", return: "+260%", stage: "On Track" },
  { name: "CloudNine Storage", investedDisplay: "₹25,00,000", currentDisplay: "₹68,00,000", return: "+172%", stage: "Exit Prep" },
];

export default function InvestorDashboard() {
  const { walletAddress, userBalance, connectWallet, fetchBalance, stakeTokens, isPending } = useNeuroGrowth();
  const { setShowToast } = useAuth();
  const { portfolioDisplay, activeInvestments, roiAverage, stocks, activities, lastUpdated } = useInvestorLiveData();

  useEffect(() => {
    if (walletAddress) fetchBalance(walletAddress);
  }, [walletAddress, fetchBalance]);

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
    { label: "Portfolio Value", value: portfolioDisplay, icon: "📈", trend: "+30%", color: "#34d399" },
    { label: "Active Investments", value: `${activeInvestments}`, icon: "🎯", trend: "+2", color: "#60a5fa" },
    { label: "ROI Average", value: `${roiAverage.toFixed(1)}%`, icon: "✨", trend: "+4.2%", color: "#a78bfa" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">Investor Dashboard</h1>
          <p className="text-white/40 text-sm">Portfolio tracking, deal pipeline, and investment analytics</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-300 text-xs font-semibold">LIVE</span>
            <span className="text-white/30 text-xs">Updated {lastUpdated}</span>
          </div>
          {walletAddress && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div>
                <span className="text-white/35 text-[10px] uppercase tracking-wider block font-bold">Wallet</span>
                <span className="text-emerald-300 text-xs font-medium">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* NEURO Balance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-5 group flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
          style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.12)", backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse at top left, rgba(16,185,129,0.12) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="text-3xl mb-4">🪙</div>
            <p className="text-white/40 text-xs uppercase tracking-wide font-semibold mb-1">NEURO Balance</p>
            <p className="text-2xl font-extrabold text-white tabular-nums">
              {displayBalance} <span className="text-emerald-400 text-base">NGR</span>
            </p>
          </div>
          {walletAddress && (
            <button onClick={handleStake} disabled={isPending}
              className="relative z-10 mt-4 w-full py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }}>
              {isPending ? "Confirming..." : "Stake 100 NEURO"}
            </button>
          )}
        </motion.div>

        {/* Live Portfolio Metrics */}
        {portfolioMetrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
              style={{ background: `radial-gradient(ellipse at top left, ${metric.color}10 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                  {metric.trend}
                </span>
              </div>
              <p className="text-white/40 text-xs uppercase tracking-wide font-semibold mb-1">{metric.label}</p>
              <p className="text-2xl font-extrabold text-white tabular-nums transition-all duration-700">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Market Overview */}
      <div className="mb-8">
        <Card title="📊 Live Market Overview">
          <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400/70 font-medium">Real-time prices updating every 2s</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {stocks.map((stock, i) => (
              <div key={i} className="rounded-xl p-4 group cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                <div className="mb-2">
                  <p className="text-white/85 font-semibold text-sm leading-tight">{stock.name}</p>
                  <p className="text-white/25 text-xs mt-0.5">{stock.ticker}</p>
                </div>
                <div className="my-2">
                  <Sparkline data={stock.history} color={stock.isPositive ? "#4ade80" : "#f87171"} width={72} height={28} />
                </div>
                <p className="text-white/90 font-bold text-sm tabular-nums">₹{stock.price.toLocaleString()}</p>
                <p className={`text-sm font-bold tabular-nums mt-0.5 transition-colors duration-500 ${stock.isPositive ? "text-emerald-400" : "text-red-400"}`}>
                  {stock.growth}
                </p>
                <p className="text-white/25 text-xs mt-1">{stock.isPositive ? "📈 Bullish" : "📉 Bearish"}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Deal Pipeline + Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="🎯 Deal Pipeline">
            <div className="space-y-3">
              {dealPipeline.map((deal, i) => (
                <div key={i} className="p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-bold text-white/90 text-base">{deal.name}</p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
                          {deal.stage}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>
                          {deal.amountDisplay}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}>
                          {deal.industry}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-white/35 text-xs">Match</p>
                      <p className="text-2xl font-extrabold text-emerald-400">{deal.matchScore}%</p>
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5 mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${deal.matchScore}%`, background: "linear-gradient(90deg, #10b981, #34d399)" }} />
                  </div>
                  <p className="text-xs text-white/25">Valuation: {deal.valuationDisplay}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
              style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.20)", color: "#34d399" }}>
              View All Opportunities
            </button>
          </Card>
        </div>

        <Card title="📊 Portfolio Summary">
          <div className="space-y-3">
            {portfolioSummary.map((inv, i) => (
              <div key={i} className="p-3 rounded-xl transition-all hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-white/85 font-semibold text-sm mb-1.5">{inv.name}</p>
                <div className="flex justify-between text-xs text-white/35 mb-2">
                  <span>{inv.investedDisplay}</span>
                  <span className="text-emerald-400 font-bold">{inv.return}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa" }}>
                  {inv.stage}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.01]"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.20)", color: "#34d399" }}>
            View Full Portfolio
          </button>
        </Card>
      </div>

      {/* AI Advisor + Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 h-96">
          <ChatBox title="💰 Investor AI Advisor" placeholder="Ask about risks, returns, opportunities..." type="investor" />
        </div>
        <Card title="📢 Market Intelligence">
          <div className="space-y-3">
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p className="text-sm text-white/80 font-medium mb-1">🔥 Hot Sector: AI in Healthcare</p>
              <p className="text-xs text-white/35 leading-relaxed">3 new high-quality deals matching your criteria this week</p>
            </div>
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <p className="text-sm text-white/80 font-medium mb-1">💡 Exit Alert: DataViz Systems</p>
              <p className="text-xs text-white/35 leading-relaxed">Received acquisition offer at 3.5x valuation</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <LiveActivityFeed activities={activities} title="⚡ Investor Activity Feed" maxHeight="280px" />
      <Toast />
    </div>
  );
}
