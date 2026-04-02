import { supabase, Database } from "./supabaseClient";

/**
 * Business Registration Service
 */
export async function registerBusiness(
  userId: string,
  profileData: {
    email: string;
    full_name: string;
  },
  businessData: {
    business_name: string;
    gst_number: string;
    sector: string;
    city: string;
    founding_year: number;
    funding_target: number;
    equity_offered: number;
  }
) {
  try {
    // Insert into profiles table
    const { data: profileRes, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email: profileData.email,
        full_name: profileData.full_name,
        role: "business",
      })
      .select()
      .single();

    if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`);

    // Insert into msme_profiles table
    const { data: msmeRes, error: msmeError } = await supabase
      .from("msme_profiles")
      .insert({
        user_id: userId,
        business_name: businessData.business_name,
        gst_number: businessData.gst_number,
        sector: businessData.sector,
        city: businessData.city,
        founding_year: businessData.founding_year,
        funding_target: businessData.funding_target,
        equity_offered: businessData.equity_offered,
      })
      .select()
      .single();

    if (msmeError) throw new Error(`MSME profile creation failed: ${msmeError.message}`);

    return { profile: profileRes, msmeProfile: msmeRes };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register business";
    throw new Error(message);
  }
}

/**
 * Investor Registration Service
 */
export async function registerInvestor(
  userId: string,
  profileData: {
    email: string;
    full_name: string;
  },
  investorData: {
    wallet_address?: string;
  }
) {
  try {
    // Insert into profiles table
    const { data: profileRes, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email: profileData.email,
        full_name: profileData.full_name,
        role: "investor",
      })
      .select()
      .single();

    if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`);

    // Insert into investors table
    const { data: investorRes, error: investorError } = await supabase
      .from("investors")
      .insert({
        user_id: userId,
        wallet_address: investorData.wallet_address || null,
      })
      .select()
      .single();

    if (investorError) throw new Error(`Investor profile creation failed: ${investorError.message}`);

    return { profile: profileRes, investor: investorRes };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register investor";
    throw new Error(message);
  }
}

/**
 * Risk Score Service
 */
export async function createRiskScore(data: {
  business_id: string;
  revenue: number;
  business_age: number;
  sector_score?: number;
  location_score?: number;
  final_label: string;
}) {
  try {
    const { data: riskScore, error } = await supabase
      .from("risk_scores")
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(`Risk score creation failed: ${error.message}`);

    return riskScore;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create risk score";
    throw new Error(message);
  }
}

/**
 * Investment Service
 */
export async function createInvestment(data: {
  investor_id: string;
  business_id: string;
  amount_invested: number;
  tokens_received: number;
  status?: "pending" | "confirmed" | "failed";
  transaction_hash?: string;
}) {
  try {
    const { data: investment, error } = await supabase
      .from("investments")
      .insert({
        ...data,
        status: data.status || "pending",
      })
      .select()
      .single();

    if (error) throw new Error(`Investment creation failed: ${error.message}`);

    return investment;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create investment";
    throw new Error(message);
  }
}

/**
 * Update Investment Status
 */
export async function updateInvestmentStatus(
  investmentId: string,
  status: "pending" | "confirmed" | "failed",
  transactionHash?: string
) {
  try {
    const { data: investment, error } = await supabase
      .from("investments")
      .update({
        status,
        transaction_hash: transactionHash,
      })
      .eq("id", investmentId)
      .select()
      .single();

    if (error) throw new Error(`Investment update failed: ${error.message}`);

    return investment;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update investment";
    throw new Error(message);
  }
}

/**
 * Governance Voting Service
 */
export async function submitGovernanceVote(data: {
  business_id: string;
  investor_id: string;
  proposal: string;
  vote: "yes" | "no" | "abstain";
  token_weight: number;
}) {
  try {
    const { data: vote, error } = await supabase
      .from("governance_votes")
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(`Governance vote creation failed: ${error.message}`);

    return vote;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit governance vote";
    throw new Error(message);
  }
}

/**
 * Get Investor Governance Votes
 */
export async function getInvestorVotes(investorId: string) {
  try {
    const { data: votes, error } = await supabase
      .from("governance_votes")
      .select("*")
      .eq("investor_id", investorId);

    if (error) throw new Error(`Failed to fetch votes: ${error.message}`);

    return votes;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch votes";
    throw new Error(message);
  }
}

/**
 * Dividend Distribution Service
 */
export async function distributeDividend(data: {
  business_id: string;
  investor_id: string;
  amount: number;
  transaction_hash: string;
}) {
  try {
    const { data: dividend, error } = await supabase
      .from("dividends")
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(`Dividend distribution failed: ${error.message}`);

    return dividend;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to distribute dividend";
    throw new Error(message);
  }
}

/**
 * Get User Profile
 */
export async function getUserProfile(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw new Error(`Failed to fetch profile: ${error.message}`);

    return profile;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch profile";
    throw new Error(message);
  }
}

/**
 * Get Business Profile
 */
export async function getBusinessProfile(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from("msme_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(`Failed to fetch business profile: ${error.message}`);

    return profile;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch business profile";
    throw new Error(message);
  }
}

/**
 * Get Investor Profile
 */
export async function getInvestorProfile(userId: string) {
  try {
    const { data: profile, error } = await supabase
      .from("investors")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw new Error(`Failed to fetch investor profile: ${error.message}`);

    return profile;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch investor profile";
    throw new Error(message);
  }
}

/**
 * Get Business by ID
 */
export async function getBusinessById(businessId: string) {
  try {
    const { data: profile, error } = await supabase
      .from("msme_profiles")
      .select("*, profiles(*)") 
      .eq("id", businessId)
      .single();

    if (error) throw new Error(`Failed to fetch business: ${error.message}`);

    return profile;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch business";
    throw new Error(message);
  }
}

/**
 * Get Investor Investments
 */
export async function getInvestorInvestments(investorId: string) {
  try {
    const { data: investments, error } = await supabase
      .from("investments")
      .select("*")
      .eq("investor_id", investorId);

    if (error) throw new Error(`Failed to fetch investments: ${error.message}`);

    return investments;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch investments";
    throw new Error(message);
  }
}

/**
 * Get Business Risk Score
 */
export async function getBusinessRiskScore(businessId: string) {
  try {
    const { data: riskScore, error } = await supabase
      .from("risk_scores")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows found"
      throw new Error(`Failed to fetch risk score: ${error.message}`);
    }

    return riskScore || null;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch risk score";
    throw new Error(message);
  }
}
