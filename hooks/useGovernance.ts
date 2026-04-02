import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface GovernanceVote {
  id: string;
  business_id: string;
  investor_id: string;
  proposal: string;
  vote: "yes" | "no" | "abstain";
  token_weight: number;
  created_at: string;
  updated_at: string;
}

interface Proposal {
  proposal: string;
  yes_votes: number;
  no_votes: number;
  abstain_votes: number;
  total_weight: number;
  votes: GovernanceVote[];
}

interface GovernanceResponse {
  success: boolean;
  data: GovernanceVote[] | GovernanceVote | Proposal[];
  message?: string;
  error?: string;
  total?: number;
}

export function useGovernance() {
  const { user } = useAuth();
  const [votes, setVotes] = useState<GovernanceVote[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch investor's votes
  const fetchVotes = useCallback(
    async (businessId?: string) => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        let url = `/api/governance/votes?investor_id=${user.id}`;
        if (businessId) {
          url += `&business_id=${businessId}`;
        }

        const response = await fetch(url);
        const data: GovernanceResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch votes");
        }

        const votesData = Array.isArray(data.data) ? (data.data as GovernanceVote[]) : [data.data as GovernanceVote];
        setVotes(votesData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  // Fetch proposals for a business
  const fetchProposals = useCallback(async (businessId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/governance/votes?business_id=${businessId}`
      );
      const data: GovernanceResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch proposals");
      }

      const proposalsData = Array.isArray(data.data) ? (data.data as Proposal[]) : [];
      setProposals(proposalsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit a vote
  const submitVote = useCallback(
    async (
      businessId: string,
      proposal: string,
      vote: "yes" | "no" | "abstain",
      tokenWeight: number
    ) => {
      if (!user?.id) {
        setError("User not authenticated");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/governance/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_id: businessId,
            investor_id: user.id,
            proposal,
            vote,
            token_weight: tokenWeight,
          }),
        });

        const data: GovernanceResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit vote");
        }

        const newVote = data.data as GovernanceVote;
        setVotes((prev) => [...prev, newVote]);

        return newVote;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  // Calculate vote results
  const calculateVoteResults = useCallback((proposal: Proposal) => {
    const total = proposal.total_weight || 1;
    return {
      yesPercentage: ((proposal.yes_votes / total) * 100).toFixed(2),
      noPercentage: ((proposal.no_votes / total) * 100).toFixed(2),
      abstainPercentage: ((proposal.abstain_votes / total) * 100).toFixed(2),
      passed: proposal.yes_votes > proposal.no_votes,
    };
  }, []);

  return {
    votes,
    proposals,
    loading,
    error,
    fetchVotes,
    fetchProposals,
    submitVote,
    calculateVoteResults,
  };
}
