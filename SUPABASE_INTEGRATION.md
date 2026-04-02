# NeuroGrowth - Supabase Integration Guide

Complete Supabase integration for NeuroGrowth Next.js App Router project with authentication, database operations, and API routes.

## 🚀 Quick Start

### 1. Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Database Tables

Ensure these tables exist in your Supabase project:

```sql
-- Profiles table (auto-created by Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('business', 'investor')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MSME profiles for businesses
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investor profiles
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  wallet_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Risk scores
CREATE TABLE risk_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  revenue NUMERIC NOT NULL,
  business_age INTEGER NOT NULL,
  sector_score INTEGER,
  location_score INTEGER,
  final_label TEXT CHECK (final_label IN ('LOW', 'MEDIUM', 'HIGH')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Governance votes
CREATE TABLE governance_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  proposal TEXT NOT NULL,
  vote TEXT CHECK (vote IN ('yes', 'no', 'abstain')),
  token_weight NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dividends
CREATE TABLE dividends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES msme_profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  transaction_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📁 Project Structure

```
lib/
  ├── supabaseClient.ts      # Supabase client initialization
  └── db.ts                  # Database service functions

app/api/
  ├── risk-score/
  │   └── route.ts          # Risk scoring API
  ├── investments/
  │   └── route.ts          # Investment management API
  ├── governance/
  │   └── route.ts          # Governance voting API
  └── dividends/
      └── route.ts          # Dividend distribution API

hooks/
  ├── useInvestments.ts      # Investment management hook
  ├── useGovernance.ts       # Governance voting hook
  ├── useDividends.ts        # Dividend distribution hook
  └── useRiskScoring.ts      # Risk scoring hook

contexts/
  └── AuthContext.tsx        # Updated with Supabase Auth
```

## 🔐 Authentication

### Register as Business

```typescript
import { useAuth } from "@/contexts/AuthContext";

export function BusinessRegistration() {
  const { register } = useAuth();

  const handleRegister = async () => {
    await register(
      fullName,
      email,
      password,
      "business",
      {
        business_name: "Company Name",
        gst_number: "27ABCDE1234F1Z5",
        sector: "SaaS",
        city: "Bangalore",
        founding_year: 2020,
        funding_target: 500000,
        equity_offered: 10,
      }
    );
  };
}
```

### Register as Investor

```typescript
const handleRegister = async () => {
  await register(
    fullName,
    email,
    password,
    "investor",
    {
      wallet_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e99",
    }
  );
};
```

## 📊 API Routes

### Risk Scoring API

**POST /api/risk-score**
```bash
curl -X POST http://localhost:3000/api/risk-score \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "uuid",
    "revenue": 1000000,
    "business_age": 3
  }'
```

**GET /api/risk-score?business_id=uuid**
```bash
curl http://localhost:3000/api/risk-score?business_id=uuid
```

### Investment API

**POST /api/investments** - Create investment
```bash
curl -X POST http://localhost:3000/api/investments \
  -H "Content-Type: application/json" \
  -d '{
    "investor_id": "uuid",
    "business_id": "uuid",
    "amount_invested": 10000,
    "tokens_to_mint": 100
  }'
```

**GET /api/investments?investor_id=uuid** - Get investments
```bash
curl http://localhost:3000/api/investments?investor_id=uuid
```

**PATCH /api/investments/:investmentId** - Update status
```bash
curl -X PATCH http://localhost:3000/api/investments/uuid \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "transaction_hash": "0x..."
  }'
```

### Governance API

**POST /api/governance/votes** - Submit vote
```bash
curl -X POST http://localhost:3000/api/governance/votes \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "uuid",
    "investor_id": "uuid",
    "proposal": "Proposal title",
    "vote": "yes",
    "token_weight": 100
  }'
```

**GET /api/governance/votes?investor_id=uuid** - Get votes
```bash
curl http://localhost:3000/api/governance/votes?investor_id=uuid
```

### Dividends API

**POST /api/dividends** - Distribute dividend
```bash
curl -X POST http://localhost:3000/api/dividends \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "uuid",
    "investor_id": "uuid",
    "amount": 5000,
    "transaction_hash": "0x..."
  }'
```

**GET /api/dividends?investor_id=uuid** - Get dividend history
```bash
curl http://localhost:3000/api/dividends?investor_id=uuid
```

**POST /api/dividends/batch** - Batch distribute
```bash
curl -X POST http://localhost:3000/api/dividends/batch \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "uuid",
    "distributions": [
      {
        "investor_id": "uuid1",
        "amount": 5000,
        "transaction_hash": "0x..."
      }
    ]
  }'
```

## 🎣 Custom Hooks

### useInvestments

```typescript
import { useInvestments } from "@/hooks/useInvestments";

export function InvestmentComponent() {
  const { investments, createInvestment, updateInvestmentStatus } = useInvestments();

  const handleInvest = async () => {
    const investment = await createInvestment(businessId, 10000, 100);
    await updateInvestmentStatus(investment.id, "confirmed", "0x...");
  };

  return <div>{investments.length} investments</div>;
}
```

### useGovernance

```typescript
import { useGovernance } from "@/hooks/useGovernance";

export function GovernanceComponent() {
  const { proposals, submitVote, calculateVoteResults } = useGovernance();

  const handleVote = async () => {
    await submitVote(businessId, "Proposal title", "yes", 100);
  };

  return <div>Vote on proposals</div>;
}
```

### useDividends

```typescript
import { useDividends } from "@/hooks/useDividends";

export function DividendComponent() {
  const { totalDividends, getDividendStats, distributeDividend } = useDividends();

  const stats = getDividendStats();
  return <div>Total received: ${totalDividends}</div>;
}
```

### useRiskScoring

```typescript
import { useRiskScoring } from "@/hooks/useRiskScoring";

export function RiskComponent() {
  const { calculateRiskScore, riskScore, getRiskColor } = useRiskScoring();

  return (
    <span className={getRiskColor(riskScore?.final_label)}>
      {riskScore?.final_label}
    </span>
  );
}
```

## 🛡️ Security Considerations

1. **Row Level Security (RLS)**: Enable RLS on all tables
   - Users can only access their own data
   - Admins can manage all records

2. **API Routes**: All routes validate user ownership
   - Check investor ID matches authenticated user
   - Verify business access permissions

3. **Environment Variables**: Never commit `.env.local`
   - Public key is safe to expose
   - Keep service role key private

## 📝 Database Service Functions

All functions are in `lib/db.ts`:

- `registerBusiness()` - Create business profile
- `registerInvestor()` - Create investor profile
- `createRiskScore()` - Store risk assessment
- `createInvestment()` - Record investment
- `updateInvestmentStatus()` - Update investment status
- `submitGovernanceVote()` - Record governance vote
- `distributeDividend()` - Record dividend distribution
- `getUserProfile()` - Fetch user profile
- `getBusinessProfile()` - Fetch business profile
- `getInvestorProfile()` - Fetch investor profile
- `getInvestorInvestments()` - Fetch investor's investments
- `getBusinessRiskScore()` - Fetch risk score

## 🐛 Troubleshooting

### Auth not persisting
- Check Supabase project RLS policies
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check browser localStorage for auth token

### API returning 404
- Verify table names match exactly
- Check RLS policies allow read/write
- Ensure user ID is passed correctly

### Investment creation fails
- Verify investor ID exists in investors table
- Check business_id references msme_profiles
- Confirm tokens_to_mint > 0

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Checklist

- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add Supabase credentials to `.env.local`
- [ ] Create all database tables
- [ ] Enable RLS on all tables
- [ ] Test authentication flows
- [ ] Test API routes with sample data
- [ ] Implement UI components using hooks
- [ ] Set up error handling in UI
- [ ] Deploy to production

## 🎯 Next Steps

1. Update dashboard components to use custom hooks
2. Add blockchain integration for token transfers
3. Implement email notifications for dividends
4. Add admin dashboard for business management
5. Set up automated risk scoring triggers
