export interface User {
  id: string;
  email: string;
  role: 'business' | 'investor';
  createdAt: string;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  websiteUrl?: string;
  targetAudience: string;
  industry: string;
  createdAt: string;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  walletAddress?: string;
  investmentPreferences: string[];
  createdAt: string;
}

export interface Campaign {
  id: string;
  businessId: string;
  name: string;
  status: 'Planning' | 'Active' | 'Completed' | 'Paused';
  progress: number; // 0-100
  roiDisplay?: string; // e.g. "₹15,42,000" or "TBD"
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  stage: string; // e.g. "Series A", "Seed"
  amountRaised: number;
  amountDisplay: string;
  valuation: number;
  valuationDisplay: string;
  matchScore: number; // 0-100 score
  industry?: string;
  createdAt?: string;
}
