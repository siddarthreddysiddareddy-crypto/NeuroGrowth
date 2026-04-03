"use client";

import { useReducer, useEffect, useRef, useMemo } from "react";

// ─────────────────────────────────────────────────────────
// Linear Congruential Generator (LCG)
// Parameters: Numerical Recipes constants
// m=2^32, a=1664525, c=1013904223
// Produces a deterministic, non-repeating sequence for a given seed
// ─────────────────────────────────────────────────────────
class LCG {
  private state: number;
  private readonly a = 1664525;
  private readonly c = 1013904223;
  private readonly m = 2 ** 32;

  constructor(seed: number) {
    this.state = seed >>> 0; // force uint32
  }

  /** Returns a float in [0, 1) */
  next(): number {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state / this.m;
  }

  /** Returns a float in [min, max) */
  between(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /** Returns an integer in [min, max] */
  intBetween(min: number, max: number): number {
    return Math.floor(this.between(min, max + 1));
  }
}

// ─────────────────────────────────────────────────────────
// State shape
// ─────────────────────────────────────────────────────────
export interface GrowthStats {
  usersOnline: number;
  totalBusinesses: number;
  totalInvestors: number;
  totalDeals: number;
  totalFundingRaw: number;
  totalFundingDisplay: string;
  isLive: boolean;
}

type GrowthAction =
  | { type: "TICK"; delta: Partial<Omit<GrowthStats, "totalFundingDisplay" | "isLive">> }
  | { type: "SET_LIVE"; value: boolean };

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(1)}K`;
  return `₹${amount.toFixed(0)}`;
}

const INITIAL_STATE: GrowthStats = {
  usersOnline: 73,
  totalBusinesses: 428,
  totalInvestors: 1247,
  totalDeals: 89,
  totalFundingRaw: 23_400_000,
  totalFundingDisplay: "₹2.34 Cr",
  isLive: true,
};

// ─────────────────────────────────────────────────────────
// Reducer — all state updates batched in a single dispatch
// ─────────────────────────────────────────────────────────
function growthReducer(state: GrowthStats, action: GrowthAction): GrowthStats {
  switch (action.type) {
    case "TICK": {
      const newFunding =
        action.delta.totalFundingRaw !== undefined
          ? action.delta.totalFundingRaw
          : state.totalFundingRaw;

      return {
        ...state,
        ...action.delta,
        totalFundingRaw: newFunding,
        totalFundingDisplay: formatINR(newFunding),
      };
    }
    case "SET_LIVE":
      return { ...state, isLive: action.value };
    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────
// useSimulatedGrowth
// ─────────────────────────────────────────────────────────
export function useSimulatedGrowth(tickMs = 4000): GrowthStats {
  const [state, dispatch] = useReducer(growthReducer, INITIAL_STATE);

  // Seed based on session start time — deterministic within a page visit
  const lcgRef = useRef<LCG | null>(null);
  if (lcgRef.current === null) {
    lcgRef.current = new LCG(Date.now() & 0xffffffff);
  }

  useEffect(() => {
    const lcg = lcgRef.current!;

    const interval = setInterval(() => {
      const lcgNext = lcg.next();

      // Batch all deltas into a single dispatch — no cascading renders
      dispatch({
        type: "TICK",
        delta: {
          usersOnline: Math.max(
            45,
            Math.round(state.usersOnline + lcg.between(-4, 7))
          ),
          totalBusinesses:
            lcgNext > 0.85
              ? state.totalBusinesses + 1
              : state.totalBusinesses,
          totalInvestors:
            lcgNext > 0.80
              ? state.totalInvestors + 1
              : state.totalInvestors,
          totalDeals:
            lcgNext > 0.92
              ? state.totalDeals + 1
              : state.totalDeals,
          totalFundingRaw: Math.round(
            state.totalFundingRaw + lcg.between(0, 55_000)
          ),
        },
      });
    }, tickMs);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickMs, state.usersOnline, state.totalBusinesses, state.totalInvestors, state.totalDeals, state.totalFundingRaw]);

  // Stable reference — only changes when actual values change (not on every render tick that
  // doesn't produce new values). Children subscribed to this won't re-render spuriously.
  return useMemo(() => state, [state]);
}
