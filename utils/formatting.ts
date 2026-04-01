/**
 * Formatting Utilities for NeuroGrowth
 * Handles Indian Rupee (₹) and Indian Number System formatting
 */

/**
 * Formats a number as currency in Indian Rupees with Indian numbering system
 * Examples: 
 * - 100000 → "₹1,00,000"
 * - 1000000 → "₹10,00,000"
 * - 10000000 → "₹1,00,00,000"
 */
export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a number using Indian numbering system without currency
 * Examples:
 * - 100000 → "1,00,000"
 * - 1000000 → "10,00,000"
 */
export function formatIndianNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a number as compact currency (for UI space-saving)
 * Examples:
 * - 100000 → "₹1L"
 * - 1000000 → "₹10L"
 * - 10000000 → "₹1Cr"
 */
export function formatCompactCurrencyINR(amount: number): string {
  if (amount >= 10000000) {
    // Crore
    return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")}Cr`;
  } else if (amount >= 100000) {
    // Lakh
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  } else if (amount >= 1000) {
    // Thousand
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `₹${Math.round(amount)}`;
}

/**
 * Formats percentage with proper prefix
 * Examples:
 * - 15 → "+15%"
 * - -5 → "-5%"
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}%`;
}

/**
 * Formats percentage with Indian numbering system
 * Examples:
 * - 150 → "+150%"
 * - 1500 → "+15,00%"
 */
export function formatIndianPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${formatIndianNumber(value)}%`;
}
