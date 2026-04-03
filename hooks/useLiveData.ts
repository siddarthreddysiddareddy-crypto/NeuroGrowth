"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
export interface LiveMetric {
  label: string;
  value: number;
  display: string;
  trend: string;
  trendPositive: boolean;
  icon: string;
}

export interface LiveStock {
  name: string;
  ticker: string;
  price: number;
  growth: string;
  growthNum: number;
  isPositive: boolean;
  history: number[];
}

export interface ActivityEvent {
  id: string;
  type: "investment" | "campaign" | "conversion" | "signup" | "ai_insight" | "deal";
  message: string;
  time: string;
  amount?: string;
  icon: string;
}

export interface LiveCampaign {
  id: string;
  name: string;
  status: "Active" | "Planning";
  progress: number;
  roiDisplay: string;
  roiValue: number;
  engagementRate: number;
  reach: number;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toFixed(0)}`;
}

function formatK(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return `${Math.round(num)}`;
}

function now(): string {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ──────────────────────────────────────────────
// Activity event pool
// ──────────────────────────────────────────────
const eventTemplates = [
  { type: "investment" as const, icon: "💰", messages: [
    "New investor joined TechStack AI round",
    "₹45,00,000 invested in GreenFlow Solar",
    "Series A deal closed for CloudSync",
    "Angel investor backed HealthTech Labs",
    "Seed funding secured by NeuroTech startup",
  ]},
  { type: "campaign" as const, icon: "📣", messages: [
    "Spring Sale campaign hit 80% target",
    "Email nurture sequence open rate: 42%",
    "New ad campaign launched on LinkedIn",
    "Social media campaign reached 50K users",
    "Q2 Product Launch campaign goes live",
  ]},
  { type: "conversion" as const, icon: "✅", messages: [
    "12 new sign-ups from campaign referral",
    "Conversion rate jumped to 14.2%",
    "Landing page A/B test: Variant B wins",
    "Lead magnet downloaded 203 times today",
    "5 free trial users converted to paid",
  ]},
  { type: "signup" as const, icon: "👤", messages: [
    "New business joined NeuroGrowth",
    "Investor onboarded from Mumbai",
    "Startup from Bengaluru signed up",
    "Angel network added 3 new members",
    "Enterprise account created",
  ]},
  { type: "ai_insight" as const, icon: "🤖", messages: [
    "AI detected growth opportunity in EdTech",
    "AI recommends increasing ad spend by 20%",
    "AI-generated campaign copy drafted",
    "Sentiment analysis: positive trend detected",
    "AI predicted Q3 revenue uplift of 18%",
  ]},
  { type: "deal" as const, icon: "🤝", messages: [
    "New deal added to pipeline: FinGrow",
    "Due diligence complete for VyaparX",
    "Term sheet signed for DataViz exit",
    "New opportunity: AI HealthCare startup",
    "Series B round opened for CloudNine",
  ]},
];

function generateEvent(): ActivityEvent {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  const message = template.messages[Math.floor(Math.random() * template.messages.length)];
  return {
    id: `${Date.now()}-${Math.random()}`,
    type: template.type,
    icon: template.icon,
    message,
    time: now(),
  };
}

// ──────────────────────────────────────────────
// Hook: useLiveData (Business)
// ──────────────────────────────────────────────
const INITIAL_CAMPAIGNS: LiveCampaign[] = [
  { id: "c1", name: "Spring Sale 2024", status: "Active", progress: 75, roiValue: 1542000, roiDisplay: "₹15,42,000", engagementRate: 12.7, reach: 24500 },
  { id: "c2", name: "Q2 Product Launch", status: "Planning", progress: 40, roiValue: 0, roiDisplay: "TBD", engagementRate: 0, reach: 0 },
  { id: "c3", name: "Email Nurture Sequence", status: "Active", progress: 60, roiValue: 895000, roiDisplay: "₹8,95,000", engagementRate: 9.1, reach: 11200 },
];

export function useBusinessLiveData() {
  const [engagementRate, setEngagementRate] = useState(12.7);
  const [reach, setReach] = useState(24500);
  const [conversions, setConversions] = useState(342);
  const [campaigns, setCampaigns] = useState<LiveCampaign[]>(INITIAL_CAMPAIGNS);
  const [activities, setActivities] = useState<ActivityEvent[]>(() =>
    Array.from({ length: 5 }, generateEvent)
  );
  const [lastUpdated, setLastUpdated] = useState(now());

  // Tick every 3 seconds — small metric fluctuations
  useEffect(() => {
    const metricTick = setInterval(() => {
      setEngagementRate((prev) => parseFloat((prev + randomBetween(-0.3, 0.5)).toFixed(1)));
      setReach((prev) => Math.round(prev + randomBetween(-50, 120)));
      setConversions((prev) => Math.round(prev + randomBetween(-1, 3)));
      setLastUpdated(now());

      // Animate progress of Active campaigns
      setCampaigns((prev) =>
        prev.map((c) =>
          c.status === "Active"
            ? {
                ...c,
                progress: Math.min(100, parseFloat((c.progress + randomBetween(0, 0.3)).toFixed(1))),
                roiValue: c.roiValue > 0 ? Math.round(c.roiValue + randomBetween(0, 5000)) : c.roiValue,
                roiDisplay: c.roiValue > 0 ? formatINR(Math.round(c.roiValue + randomBetween(0, 5000))) : "TBD",
                engagementRate: parseFloat((c.engagementRate + randomBetween(-0.2, 0.3)).toFixed(1)),
                reach: Math.round(c.reach + randomBetween(0, 80)),
              }
            : c
        )
      );
    }, 3000);

    return () => clearInterval(metricTick);
  }, []);

  // New activity event every 5–10 seconds
  useEffect(() => {
    const activityTick = setInterval(() => {
      setActivities((prev) => [generateEvent(), ...prev].slice(0, 12));
    }, randomBetween(5000, 10000));

    return () => clearInterval(activityTick);
  }, []);

  return {
    engagementRate,
    reach,
    conversions,
    campaigns,
    activities,
    lastUpdated,
  };
}

// ──────────────────────────────────────────────
// Hook: useInvestorLiveData
// ──────────────────────────────────────────────
const INITIAL_STOCKS: LiveStock[] = [
  { name: "NeuroTech Labs", ticker: "NTL", price: 1840, growthNum: 3.4, growth: "+3.4%", isPositive: true, history: [1750, 1780, 1800, 1820, 1840] },
  { name: "Growthify", ticker: "GRW", price: 965, growthNum: 2.1, growth: "+2.1%", isPositive: true, history: [940, 950, 960, 958, 965] },
  { name: "FinGrow Solutions", ticker: "FGS", price: 412, growthNum: -1.2, growth: "-1.2%", isPositive: false, history: [425, 420, 418, 415, 412] },
  { name: "VyaparX", ticker: "VYX", price: 2310, growthNum: 4.0, growth: "+4.0%", isPositive: true, history: [2200, 2240, 2270, 2290, 2310] },
  { name: "TrendHive", ticker: "TRH", price: 678, growthNum: -0.6, growth: "-0.6%", isPositive: false, history: [690, 686, 683, 681, 678] },
];

export function useInvestorLiveData() {
  const [portfolioValue, setPortfolioValue] = useState(31800000);
  const [activeInvestments, setActiveInvestments] = useState(12);
  const [roiAverage, setRoiAverage] = useState(28.4);
  const [stocks, setStocks] = useState<LiveStock[]>(INITIAL_STOCKS);
  const [activities, setActivities] = useState<ActivityEvent[]>(() =>
    Array.from({ length: 5 }, generateEvent)
  );
  const [lastUpdated, setLastUpdated] = useState(now());

  // Stock price ticks every 2 seconds
  useEffect(() => {
    const stockTick = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const delta = randomBetween(-12, 15);
          const newPrice = parseFloat((s.price + delta).toFixed(0));
          const newGrowth = parseFloat((s.growthNum + randomBetween(-0.15, 0.15)).toFixed(2));
          const isPos = newGrowth >= 0;
          return {
            ...s,
            price: newPrice,
            growthNum: newGrowth,
            growth: `${isPos ? "+" : ""}${newGrowth.toFixed(1)}%`,
            isPositive: isPos,
            history: [...s.history.slice(-8), newPrice],
          };
        })
      );
      setLastUpdated(now());
    }, 2000);

    return () => clearInterval(stockTick);
  }, []);

  // Portfolio value slow drift every 5 seconds
  useEffect(() => {
    const portfolioTick = setInterval(() => {
      setPortfolioValue((prev) => Math.round(prev + randomBetween(-15000, 40000)));
      setRoiAverage((prev) => parseFloat((prev + randomBetween(-0.1, 0.15)).toFixed(1)));
    }, 5000);

    return () => clearInterval(portfolioTick);
  }, []);

  // New activity event every 6–11 seconds
  useEffect(() => {
    const activityTick = setInterval(() => {
      setActivities((prev) => [generateEvent(), ...prev].slice(0, 12));
    }, randomBetween(6000, 11000));

    return () => clearInterval(activityTick);
  }, []);

  return {
    portfolioValue,
    portfolioDisplay: formatINR(portfolioValue),
    activeInvestments,
    roiAverage,
    stocks,
    activities,
    lastUpdated,
  };
}

// ──────────────────────────────────────────────
// Hook: usePlatformLiveStats (for landing page)
// ──────────────────────────────────────────────
export function usePlatformLiveStats() {
  const [totalBusinesses, setTotalBusinesses] = useState(428);
  const [totalInvestors, setTotalInvestors] = useState(1247);
  const [totalDeals, setTotalDeals] = useState(89);
  const [totalFunding, setTotalFunding] = useState(23400000);
  const [activeUsers, setActiveUsers] = useState(73);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const tick = setInterval(() => {
      // Rarely increment these for realism
      if (Math.random() > 0.85) setTotalBusinesses((p) => p + 1);
      if (Math.random() > 0.80) setTotalInvestors((p) => p + 1);
      if (Math.random() > 0.90) setTotalDeals((p) => p + 1);
      setTotalFunding((p) => Math.round(p + randomBetween(0, 50000)));
      setActiveUsers((p) => Math.max(50, Math.round(p + randomBetween(-3, 5))));
    }, 4000);

    return () => clearInterval(tick);
  }, []);

  return {
    totalBusinesses,
    totalInvestors,
    totalDeals,
    totalFunding,
    totalFundingDisplay: formatINR(totalFunding),
    activeUsers,
    isLive,
  };
}
