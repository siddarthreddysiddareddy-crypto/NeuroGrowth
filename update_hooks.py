import re

def update_liver_data():
    with open('c:/Users/Ojas Bhayal/NeuroGrowth/hooks/useLiveData.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update imports
    content = content.replace(
        'import { useState, useEffect, useCallback, useRef } from "react";',
        'import { useReducer, useMemo, useEffect } from "react";'
    )
    
    # 2. Update useBusinessLiveData
    bus_reducer = """
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
"""
    # Replace useBusinessLiveData function entirely
    bus_pattern = re.compile(r'export function useBusinessLiveData\(\) \{.*?\n\}', re.DOTALL)
    content = bus_pattern.sub(bus_reducer.strip(), content)

    # 3. Update useInvestorLiveData
    inv_reducer = """
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
"""
    inv_pattern = re.compile(r'export function useInvestorLiveData\(\) \{.*?\n\}', re.DOTALL)
    content = inv_pattern.sub(inv_reducer.strip(), content)
    
    # 4. Update usePlatformLiveStats
    plat_reducer = """
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
"""
    plat_pattern = re.compile(r'export function usePlatformLiveStats\(\) \{.*?\n\}', re.DOTALL)
    content = plat_pattern.sub(plat_reducer.strip(), content)

    with open('c:/Users/Ojas Bhayal/NeuroGrowth/hooks/useLiveData.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Done editing useLiveData.ts")

update_liver_data()
