# NeuroGrowth Supabase Integration - Setup Guide

Complete step-by-step guide to integrate Supabase with your NeuroGrowth Next.js application.

## Prerequisites

- Node.js 18+ installed
- Next.js 14 App Router project (already set up)
- Supabase account (free tier available)
- `@supabase/supabase-js` package (already installed)

## Setup Steps

### Step 1: Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Choose your region (closer to your users)
5. Set a secure database password
6. Wait for project to initialize

### Step 2: Get Your API Keys

1. Go to Project Settings → API
2. Copy your **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
3. Copy the **anon public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. (Optional) Copy the **service_role key** for backend operations

### Step 3: Configure Environment Variables

Create `.env.local` in your project root:

```bash
# Copy from your Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key (server-only operations)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and run this SQL script:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('business', 'investor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MSME Profiles for businesses
CREATE TABLE msme_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  gst_number TEXT NOT NULL UNIQUE,
  sector TEXT NOT NULL,
  city TEXT NOT NULL,
  founding_year INTEGER NOT NULL,
  funding_target NUMERIC NOT NULL,
  equity_offered NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Investor profiles
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  wallet_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Risk scores
CREATE TABLE risk_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  revenue NUMERIC NOT NULL,
  business_age INTEGER NOT NULL,
  sector_score INTEGER,
  location_score INTEGER,
  final_label TEXT NOT NULL CHECK (final_label IN ('LOW', 'MEDIUM', 'HIGH')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Investments
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  amount_invested NUMERIC NOT NULL,
  tokens_received NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  transaction_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Governance votes
CREATE TABLE governance_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  proposal TEXT NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('yes', 'no', 'abstain')),
  token_weight NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dividends
CREATE TABLE dividends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_msme_profiles_user_id ON msme_profiles(user_id);
CREATE INDEX idx_investors_user_id ON investors(user_id);
CREATE INDEX idx_risk_scores_business_id ON risk_scores(business_id);
CREATE INDEX idx_investments_investor_id ON investments(investor_id);
CREATE INDEX idx_investments_business_id ON investments(business_id);
CREATE INDEX idx_governance_votes_business_id ON governance_votes(business_id);
CREATE INDEX idx_governance_votes_investor_id ON governance_votes(investor_id);
CREATE INDEX idx_dividends_investor_id ON dividends(investor_id);
CREATE INDEX idx_dividends_business_id ON dividends(business_id);
```

### Step 5: Enable Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. For each table, enable RLS:

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE msme_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE governance_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dividends ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Profiles: Users can update own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- MSME Profiles: Users can read own business
CREATE POLICY "Users can view own business"
ON msme_profiles FOR SELECT
USING (auth.uid() = user_id);

-- MSME Profiles: Users can update own business
CREATE POLICY "Users can update own business"
ON msme_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Investors: Users can read own investor profile
CREATE POLICY "Users can view own investor profile"
ON investors FOR SELECT
USING (auth.uid() = user_id);

-- Investors: Users can update own investor profile
CREATE POLICY "Users can update own investor profile"
ON investors FOR UPDATE
USING (auth.uid() = user_id);

-- Investments: Users can read own investments
CREATE POLICY "Users can view own investments"
ON investments FOR SELECT
USING (auth.uid() = investor_id);

-- Risk Scores: Public read (for display)
CREATE POLICY "Anyone can view risk scores"
ON risk_scores FOR SELECT
USING (true);

-- Governance Votes: Users can read votes for their businesses
CREATE POLICY "Users can view governance votes"
ON governance_votes FOR SELECT
USING (true);

-- Dividends: Users can read own dividends
CREATE POLICY "Users can view own dividends"
ON dividends FOR SELECT
USING (auth.uid() = investor_id);
```

### Step 6: Verify Integration

1. Start your development server:
```bash
npm run dev
```

2. Test the business registration page:
   - Navigate to `/auth/business/register`
   - Fill out the form
   - Check Supabase dashboard for new user and profile records

3. Test the investor registration page:
   - Navigate to `/auth/investor/register`
   - Fill out the form
   - Verify records in Supabase

### Step 7: Using the Integration

#### In React Components

```typescript
// Use AuthContext for authentication
import { useAuth } from "@/contexts/AuthContext";

export function LoginComponent() {
  const { user, login, isLoading } = useAuth();
  
  return <div>{user?.email}</div>;
}
```

#### Using Hooks

```typescript
// Use custom hooks for data operations
import { useInvestments } from "@/hooks/useInvestments";

export function DashboardComponent() {
  const { investments, createInvestment } = useInvestments();
  
  return <div>{investments.length} investments</div>;
}
```

#### Direct API Calls

```typescript
// Use API routes directly
const response = await fetch("/api/investments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    investor_id: userId,
    business_id: businessId,
    amount_invested: 10000,
    tokens_to_mint: 100,
  }),
});
```

## File Structure

```
lib/
  ├── supabaseClient.ts          # Supabase initialization
  └── db.ts                      # Database operations

app/api/
  ├── risk-score/route.ts        # Risk scoring
  ├── investments/route.ts       # Investment management
  ├── governance/route.ts        # Governance voting
  └── dividends/route.ts         # Dividend distribution

hooks/
  ├── useInvestments.ts          # Investment hook
  ├── useGovernance.ts           # Governance hook
  ├── useDividends.ts            # Dividend hook
  └── useRiskScoring.ts          # Risk scoring hook

types/
  └── index.ts                   # TypeScript types

contexts/
  └── AuthContext.tsx            # Authentication context

app/auth/
  ├── business/register/page.tsx # Business registration
  └── investor/register/page.tsx # Investor registration
```

## Common Tasks

### Get Current User
```typescript
import { supabase } from "@/lib/supabaseClient";

const { data: { session } } = await supabase.auth.getSession();
const userId = session?.user.id;
```

### Fetch User Data
```typescript
import { getUserProfile } from "@/lib/db";

const profile = await getUserProfile(userId);
```

### Create Investment
```typescript
import { useInvestments } from "@/hooks/useInvestments";

const { createInvestment } = useInvestments();
const investment = await createInvestment(businessId, 10000, 100);
```

### Submit Governance Vote
```typescript
import { useGovernance } from "@/hooks/useGovernance";

const { submitVote } = useGovernance();
await submitVote(businessId, "Proposal title", "yes", 100);
```

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists
- Verify variable names match exactly
- Restart dev server after changing env vars

### "Failed to sign up"
- Check Supabase Auth settings
- Verify email domain is not restricted
- Check User Management in Supabase dashboard

### "Investor has no confirmed investments"
- Ensure investment status is "confirmed"
- Check investment references correct IDs
- Verify data exists in investments table

### "Permission denied" errors
- Check RLS policies are correctly set
- Verify user IDs match in policies
- Enable policy debugging in Supabase

## Next Steps

1. **Connect Dashboard Pages**
   - Update `/app/dashboard/business/page.tsx`
   - Update `/app/dashboard/investor/page.tsx`
   - Use custom hooks for data loading

2. **Add Blockchain Integration**
   - Connect token minting to Web3
   - Handle payment processing
   - Add transaction confirmation

3. **Implement Email Notifications**
   - Send welcome emails on registration
   - Notify on investment confirmation
   - Alert on dividend distribution

4. **Add Admin Dashboard**
   - Manage businesses and investors
   - Monitor risk scores
   - View all transactions

5. **Performance Optimization**
   - Add caching with React Query
   - Implement pagination
   - Optimize database queries

## Support

For help:
- Check [Supabase Documentation](https://supabase.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Check error messages in browser console and server logs
