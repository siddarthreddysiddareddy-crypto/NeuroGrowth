# NeuroGrowth - Quick Reference

Quick reference guide for developers working with NeuroGrowth Supabase integration.

## 🚀 Quick Start Commands

```bash
# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development
npm run dev

# Build for production
npm run build
npm start
```

## 🔑 Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional
SUPABASE_SERVICE_ROLE_KEY=service_role_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🎣 Hooks Quick Reference

### useInvestments
```typescript
const { 
  investments,           // Array of investments
  loading,              // Loading state
  error,                // Error message
  fetchInvestments,     // Manually fetch
  createInvestment,     // Create new investment
  updateInvestmentStatus // Update status
} = useInvestments();
```

### useGovernance
```typescript
const {
  votes,               // User's votes
  proposals,           // Business proposals
  loading,
  error,
  fetchVotes,          // Fetch votes
  fetchProposals,      // Fetch proposals
  submitVote,          // Submit new vote
  calculateVoteResults // Get vote stats
} = useGovernance();
```

### useDividends
```typescript
const {
  dividends,           // User's dividends
  totalDividends,      // Sum of all dividends
  loading,
  error,
  fetchDividends,      // Fetch dividends
  distributeDividend,  // Distribute single
  batchDistributeDividends, // Batch distribute
  getDividendStats     // Get statistics
} = useDividends();
```

### useRiskScoring
```typescript
const {
  riskScore,           // Current risk score
  calculatedScores,    // Score breakdown
  loading,
  error,
  calculateRiskScore,  // Calculate new score
  fetchRiskScore,      // Fetch existing
  getRiskColor,        // Get color class
  getRiskBgColor       // Get bg color class
} = useRiskScoring();
```

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/risk-score` | Calculate risk score |
| GET | `/api/risk-score?business_id=uuid` | Get risk score |
| POST | `/api/investments` | Create investment |
| GET | `/api/investments?investor_id=uuid` | Get investments |
| PATCH | `/api/investments/:id` | Update investment |
| POST | `/api/governance/votes` | Submit vote |
| GET | `/api/governance/votes?investor_id=uuid` | Get votes |
| POST | `/api/dividends` | Distribute dividend |
| GET | `/api/dividends?investor_id=uuid` | Get dividends |
| POST | `/api/dividends/batch` | Batch distribute |

## 🗄️ Database Functions

```typescript
import {
  registerBusiness,
  registerInvestor,
  createRiskScore,
  createInvestment,
  updateInvestmentStatus,
  submitGovernanceVote,
  distributeDividend,
  getUserProfile,
  getBusinessProfile,
  getInvestorProfile,
  getInvestorInvestments,
  getBusinessRiskScore
} from "@/lib/db";
```

## 🔐 Authentication

```typescript
import { useAuth } from "@/contexts/AuthContext";

const { 
  user,           // Current user
  isLoading,
  isAuthenticated,
  login,          // Login
  register,       // Register
  logout,         // Logout
  setShowToast,
  toast
} = useAuth();

// Register business
await register(
  name, email, password, "business",
  { business_name, gst_number, sector, city, founding_year, funding_target, equity_offered }
);

// Register investor
await register(
  name, email, password, "investor",
  { wallet_address }
);

// Login
await login(email, password, role);

// Logout
await logout();
```

## 📦 Types

```typescript
import type {
  AuthUser,
  BusinessProfile,
  InvestorProfile,
  Investment,
  InvestmentStatus,
  RiskScore,
  RiskLabel,
  GovernanceVote,
  VoteOption,
  Dividend,
  ApiResponse
} from "@/types";
```

## 🔍 Common Patterns

### Create Investment
```typescript
import { useInvestments } from "@/hooks/useInvestments";

export function InvestButton({ businessId }) {
  const { createInvestment } = useInvestments();
  
  const handleInvest = async () => {
    const result = await createInvestment(businessId, 10000, 100);
    if (result) {
      console.log("Investment created:", result);
    }
  };
  
  return <button onClick={handleInvest}>Invest</button>;
}
```

### Vote on Proposal
```typescript
import { useGovernance } from "@/hooks/useGovernance";

export function VoteButton({ businessId, proposal }) {
  const { submitVote } = useGovernance();
  
  const handleVote = async (voteOption: "yes" | "no" | "abstain") => {
    await submitVote(businessId, proposal, voteOption, 100);
  };
  
  return (
    <div>
      <button onClick={() => handleVote("yes")}>Yes</button>
      <button onClick={() => handleVote("no")}>No</button>
      <button onClick={() => handleVote("abstain")}>Abstain</button>
    </div>
  );
}
```

### Fetch Risk Score
```typescript
import { useRiskScoring } from "@/hooks/useRiskScoring";

export function RiskBadge({ businessId }) {
  const { riskScore, fetchRiskScore, getRiskColor } = useRiskScoring();
  
  useEffect(() => {
    fetchRiskScore(businessId);
  }, [businessId]);
  
  return (
    <span className={getRiskColor(riskScore?.final_label)}>
      {riskScore?.final_label}
    </span>
  );
}
```

## 🧪 Testing Locally

### Register Test Users
1. Business: `business@test.com` / Password
2. Investor: `investor@test.com` / Password

### Create Test Data
```bash
# Create investment manually via API
curl -X POST http://localhost:3000/api/investments \
  -H "Content-Type: application/json" \
  -d '{"investor_id":"uuid","business_id":"uuid",...}'
```

## 📊 Database Queries

### Get User Investments
```sql
SELECT * FROM investments WHERE investor_id = 'user-id';
```

### Get Business Info
```sql
SELECT p.*, m.* FROM profiles p
JOIN msme_profiles m ON p.id = m.user_id
WHERE p.id = 'user-id';
```

### Get Vote Results
```sql
SELECT 
  proposal,
  COUNT(CASE WHEN vote = 'yes' THEN 1 END) as yes_votes,
  COUNT(CASE WHEN vote = 'no' THEN 1 END) as no_votes
FROM governance_votes
WHERE business_id = 'business-id'
GROUP BY proposal;
```

## 🐛 Debug Mode

Enable detailed logging:
```typescript
// In lib/supabaseClient.ts, add:
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event, "Session:", session);
});
```

## ⚡ Performance Tips

1. Use custom hooks instead of direct API calls
2. Cache investor data with useMemo
3. Debounce search inputs
4. Use pagination for large lists
5. Enable Supabase query optimization

## 🚨 Error Handling

```typescript
try {
  const result = await createInvestment(businessId, amount, tokens);
  if (result) {
    showSuccessToast("Investment created");
  }
} catch (error) {
  showErrorToast(error.message);
}
```

## 📚 Learn More

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React Hooks](https://react.dev/reference/react/hooks)

## ✅ Checklist

- [ ] `.env.local` configured
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] Authentication tested
- [ ] API routes working
- [ ] Hooks integrated
- [ ] Components updated
- [ ] Error handling added

## 🔗 Useful Links

- Project Dashboard: https://app.supabase.com
- Local Dev: http://localhost:3000
- API Docs: http://localhost:3000/api/[endpoint]
