/**
 * Type definitions for NeuroGrowth application
 */

// ============ Auth & User Types ============

export type UserRole = "business" | "investor";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// ============ Profile Types ============

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  gst_number: string;
  sector: string;
  city: string;
  founding_year: number;
  funding_target: number;
  equity_offered: number;
  created_at: string;
  updated_at: string;
}

export interface InvestorProfile {
  id: string;
  user_id: string;
  wallet_address: string | null;
  created_at: string;
  updated_at: string;
}

// ============ Investment Types ============

export type InvestmentStatus = "pending" | "confirmed" | "failed";

export interface Investment {
  id: string;
  investor_id: string;
  business_id: string;
  amount_invested: number;
  tokens_received: number;
  status: InvestmentStatus;
  transaction_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvestmentInput {
  investor_id: string;
  business_id: string;
  amount_invested: number;
  tokens_to_mint: number;
}

// ============ Risk Score Types ============

export type RiskLabel = "LOW" | "MEDIUM" | "HIGH";

export interface RiskScore {
  id: string;
  business_id: string;
  revenue: number;
  business_age: number;
  sector_score: number | null;
  location_score: number | null;
  final_label: RiskLabel;
  created_at: string;
  updated_at: string;
}

export interface RiskScoreInput {
  business_id: string;
  revenue: number;
  business_age: number;
  competitors?: number;
  market_size?: number;
}

export interface CalculatedScores {
  sector_score: number;
  location_score: number;
  revenue_score: number;
  age_score: number;
  final_score: number;
}

// ============ Governance Types ============

export type VoteOption = "yes" | "no" | "abstain";

export interface GovernanceVote {
  id: string;
  business_id: string;
  investor_id: string;
  proposal: string;
  vote: VoteOption;
  token_weight: number;
  created_at: string;
  updated_at: string;
}

export interface GovernanceVoteInput {
  business_id: string;
  investor_id: string;
  proposal: string;
  vote: VoteOption;
  token_weight: number;
}

export interface Proposal {
  proposal: string;
  yes_votes: number;
  no_votes: number;
  abstain_votes: number;
  total_weight: number;
  votes: GovernanceVote[];
}

export interface VoteResults {
  yesPercentage: string;
  noPercentage: string;
  abstainPercentage: string;
  passed: boolean;
}

// ============ Dividend Types ============

export interface Dividend {
  id: string;
  business_id: string;
  investor_id: string;
  amount: number;
  transaction_hash: string;
  created_at: string;
  updated_at: string;
}

export interface DividendInput {
  business_id: string;
  investor_id: string;
  amount: number;
  transaction_hash: string;
}

export interface DividendStats {
  totalDividends: number;
  count: number;
  averageDividend: number;
  latestDividend: Dividend | null;
}

// ============ API Response Types ============

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

export interface BatchResponse<T> {
  success: boolean;
  data: T[];
  errors?: Array<{
    investor_id: string;
    error: string;
  }>;
  total_distributed?: number;
  count: number;
}

// ============ Form Types ============

export interface BusinessRegistrationForm {
  name: string;
  businessEmail: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  gstNumber: string;
  sector: string;
  city: string;
  foundingYear: string;
  fundingTarget: string;
  equityOffered: string;
}

export interface InvestorRegistrationForm {
  name: string;
  investorEmail: string;
  password: string;
  confirmPassword: string;
  walletAddress?: string;
}

// ============ Sector Types ============

export const SECTORS = [
  "SaaS",
  "E-Commerce",
  "Services",
  "Manufacturing",
  "Healthcare",
  "EdTech",
  "FinTech",
  "Other",
] as const;

export type Sector = typeof SECTORS[number];

// ============ Utility Types ============

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface FilterParams {
  status?: InvestmentStatus;
  sector?: Sector;
  riskLabel?: RiskLabel;
  dateRange?: DateRange;
}

// ============ Error Types ============

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export class SupabaseError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "SupabaseError";
  }
}
