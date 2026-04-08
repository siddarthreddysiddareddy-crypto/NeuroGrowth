"use client";

import { useReducer, useMemo, useEffect } from "react";

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

type BusinessState = {
  engagementRate: number;
  reach: number;
  conversions: number;
  campaigns: LiveCampaign[];
  activities: ActivityEvent[];
  lastUpdated: string;
};

type BusinessAction = { type: 'TICK_METRICS' } | { type: 'TICK_ACTIVITY' };

function businessReducer(state: BusinessState, action: BusinessAction): BusinessState {
  switch (action.type) {
    case 'TICK_METRICS':
      return {
        ...state,
        engagementRate: parseFloat((state.engagementRate + randomBetween(-0.3, 0.5)).toFixed(1)),
        reach: Math.round(state.reach + randomBetween(-50, 120)),
        conversions: Math.round(state.conversions + randomBetween(-1, 3)),
        lastUpdated: now(),
        campaigns: state.campaigns.map((c) =>
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
      };
    case 'TICK_ACTIVITY':
      return {
        ...state,
        activities: [generateEvent(), ...state.activities].slice(0, 12)
      };
    default:
      return state;
  }
}

export function useBusinessLiveData() {
  const [state, dispatch] = useReducer(businessReducer, null, () => ({
    engagementRate: 12.7,
    reach: 24500,
    conversions: 342,
    campaigns: INITIAL_CAMPAIGNS,
    activities: Array.from({ length: 5 }, generateEvent),
    lastUpdated: now()
  }));

  useEffect(() => {
    const metricTick = setInterval(() => {
      dispatch({ type: 'TICK_METRICS' });
    }, 3000);
    return () => clearInterval(metricTick);
  }, []);

  useEffect(() => {
    const activityTick = setInterval(() => {
      dispatch({ type: 'TICK_ACTIVITY' });
    }, randomBetween(5000, 10000));
    return () => clearInterval(activityTick);
  }, []);

  return useMemo(() => state, [state]);
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

type InvestorState = {
  portfolioValue: number;
  activeInvestments: number;
  roiAverage: number;
  stocks: LiveStock[];
  activities: ActivityEvent[];
  lastUpdated: string;
};

type InvestorAction = { type: 'TICK_STOCKS' } | { type: 'TICK_PORTFOLIO' } | { type: 'TICK_ACTIVITY' };

function investorReducer(state: InvestorState, action: InvestorAction): InvestorState {
  switch (action.type) {
    case 'TICK_STOCKS':
      return {
        ...state,
        stocks: state.stocks.map((s) => {
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
        }),
        lastUpdated: now()
      };
    case 'TICK_PORTFOLIO':
      return {
        ...state,
        portfolioValue: Math.round(state.portfolioValue + randomBetween(-15000, 40000)),
        roiAverage: parseFloat((state.roiAverage + randomBetween(-0.1, 0.15)).toFixed(1))
      };
    case 'TICK_ACTIVITY':
      return {
        ...state,
        activities: [generateEvent(), ...state.activities].slice(0, 12)
      };
    default:
      return state;
  }
}

export function useInvestorLiveData() {
  const [state, dispatch] = useReducer(investorReducer, null, () => ({
    portfolioValue: 31800000,
    activeInvestments: 12,
    roiAverage: 28.4,
    stocks: INITIAL_STOCKS,
    activities: Array.from({ length: 5 }, generateEvent),
    lastUpdated: now()
  }));

  useEffect(() => {
    const stockTick = setInterval(() => {
      dispatch({ type: 'TICK_STOCKS' });
    }, 2000);
    return () => clearInterval(stockTick);
  }, []);

  useEffect(() => {
    const portfolioTick = setInterval(() => {
      dispatch({ type: 'TICK_PORTFOLIO' });
    }, 5000);
    return () => clearInterval(portfolioTick);
  }, []);

  useEffect(() => {
    const activityTick = setInterval(() => {
      dispatch({ type: 'TICK_ACTIVITY' });
    }, randomBetween(6000, 11000));
    return () => clearInterval(activityTick);
  }, []);

  return useMemo(() => ({
    ...state,
    portfolioDisplay: formatINR(state.portfolioValue)
  }), [state]);
}

// ──────────────────────────────────────────────
// Hook: usePlatformLiveStats (for landing page)
// ──────────────────────────────────────────────
type PlatformState = {
  totalBusinesses: number;
  totalInvestors: number;
  totalDeals: number;
  totalFunding: number;
  activeUsers: number;
  isLive: boolean;
};

type PlatformAction = { type: 'TICK' };

function platformReducer(state: PlatformState, action: PlatformAction): PlatformState {
  if (action.type === 'TICK') {
    return {
      ...state,
      totalBusinesses: state.totalBusinesses + (Math.random() > 0.85 ? 1 : 0),
      totalInvestors: state.totalInvestors + (Math.random() > 0.80 ? 1 : 0),
      totalDeals: state.totalDeals + (Math.random() > 0.90 ? 1 : 0),
      totalFunding: Math.round(state.totalFunding + randomBetween(0, 50000)),
      activeUsers: Math.max(50, Math.round(state.activeUsers + randomBetween(-3, 5)))
    };
  }
  return state;
}

export function usePlatformLiveStats() {
  const [state, dispatch] = useReducer(platformReducer, null, () => ({
    totalBusinesses: 428,
    totalInvestors: 1247,
    totalDeals: 89,
    totalFunding: 23400000,
    activeUsers: 73,
    isLive: true
  }));

  useEffect(() => {
    const tick = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 4000);
    return () => clearInterval(tick);
  }, []);

  return useMemo(() => ({
    ...state,
    totalFundingDisplay: formatINR(state.totalFunding)
  }), [state]);
}
