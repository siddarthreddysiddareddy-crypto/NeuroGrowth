import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Investment {
  id: string;
  investor_id: string;
  business_id: string;
  amount_invested: number;
  tokens_received: number;
  status: "pending" | "confirmed" | "failed";
  transaction_hash?: string;
  created_at: string;
  updated_at: string;
}

interface InvestmentResponse {
  success: boolean;
  data: Investment | Investment[];
  message?: string;
  error?: string;
}

export function useInvestments() {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch investor's investments
  const fetchInvestments = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/investments?investor_id=${user.id}`
      );
      const data: InvestmentResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch investments");
      }

      setInvestments(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Create new investment
  const createInvestment = useCallback(
    async (businessId: string, amountInvested: number, tokensToMint: number) => {
      if (!user?.id) {
        setError("User not authenticated");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/investments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            investor_id: user.id,
            business_id: businessId,
            amount_invested: amountInvested,
            tokens_to_mint: tokensToMint,
          }),
        });

        const data: InvestmentResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create investment");
        }

        const newInvestment = data.data as Investment;
        setInvestments((prev) => [...prev, newInvestment]);

        return newInvestment;
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

  // Update investment status
  const updateInvestmentStatus = useCallback(
    async (
      investmentId: string,
      status: "confirmed" | "failed",
      transactionHash?: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/investments/${investmentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            transaction_hash: transactionHash,
          }),
        });

        const data: InvestmentResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to update investment");
        }

        const updatedInvestment = data.data as Investment;
        setInvestments((prev) =>
          prev.map((inv) => (inv.id === investmentId ? updatedInvestment : inv))
        );

        return updatedInvestment;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch investments on component mount
  useEffect(() => {
    fetchInvestments();
  }, [fetchInvestments]);

  return {
    investments,
    loading,
    error,
    fetchInvestments,
    createInvestment,
    updateInvestmentStatus,
  };
}
