import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Enhanced error checking with helpful messages
if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to your .env.local file. " +
    "Get it from: https://app.supabase.com > Your Project > Settings > API > Project URL"
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to your .env.local file. " +
    "Get it from: https://app.supabase.com > Your Project > Settings > API > Anon (public) key"
  );
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log successful initialization (only in development)
if (process.env.NODE_ENV === "development") {
  console.log("✅ Supabase client initialized successfully");
  console.log(`📍 Supabase URL: ${supabaseUrl.split("/")[2]}`); // Just show domain for privacy
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "business" | "investor";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          role: "business" | "investor";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "business" | "investor";
          created_at?: string;
          updated_at?: string;
        };
      };
      msme_profiles: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name: string;
          gst_number: string;
          sector: string;
          city: string;
          founding_year: number;
          funding_target: number;
          equity_offered: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          gst_number?: string;
          sector?: string;
          city?: string;
          founding_year?: number;
          funding_target?: number;
          equity_offered?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      investors: {
        Row: {
          id: string;
          user_id: string;
          wallet_address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          wallet_address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      risk_scores: {
        Row: {
          id: string;
          business_id: string;
          revenue: number;
          business_age: number;
          sector_score: number | null;
          location_score: number | null;
          final_label: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          revenue: number;
          business_age: number;
          sector_score?: number | null;
          location_score?: number | null;
          final_label: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          revenue?: number;
          business_age?: number;
          sector_score?: number | null;
          location_score?: number | null;
          final_label?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      investments: {
        Row: {
          id: string;
          investor_id: string;
          business_id: string;
          amount_invested: number;
          tokens_received: number;
          status: "pending" | "confirmed" | "failed";
          transaction_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          investor_id: string;
          business_id: string;
          amount_invested: number;
          tokens_received: number;
          status?: "pending" | "confirmed" | "failed";
          transaction_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          investor_id?: string;
          business_id?: string;
          amount_invested?: number;
          tokens_received?: number;
          status?: "pending" | "confirmed" | "failed";
          transaction_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      governance_votes: {
        Row: {
          id: string;
          business_id: string;
          investor_id: string;
          proposal: string;
          vote: "yes" | "no" | "abstain";
          token_weight: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          investor_id: string;
          proposal: string;
          vote: "yes" | "no" | "abstain";
          token_weight: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          investor_id?: string;
          proposal?: string;
          vote?: "yes" | "no" | "abstain";
          token_weight?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      dividends: {
        Row: {
          id: string;
          business_id: string;
          investor_id: string;
          amount: number;
          transaction_hash: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          investor_id: string;
          amount: number;
          transaction_hash: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          investor_id?: string;
          amount?: number;
          transaction_hash?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
