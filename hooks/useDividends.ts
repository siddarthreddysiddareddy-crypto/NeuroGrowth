import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Dividend {
  id: string;
  business_id: string;
  investor_id: string;
  amount: number;
  transaction_hash: string;
  created_at: string;
  updated_at: string;
}

interface DividendResponse {
  success: boolean;
  data: Dividend[];
  message?: string;
  error?: string;
  total_dividends?: number;
  count?: number;
}

export function useDividends() {
  const { user } = useAuth();
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [totalDividends, setTotalDividends] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch investor's dividends
  const fetchDividends = useCallback(
    async (businessId?: string) => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        let url = `/api/dividends?investor_id=${user.id}`;
        if (businessId) {
          url += `&business_id=${businessId}`;
        }

        const response = await fetch(url);
        const data: DividendResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch dividends");
        }

        setDividends(data.data);
        setTotalDividends(data.total_dividends || 0);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  // Distribute dividend
  const distributeDividend = useCallback(
    async (
      businessId: string,
      investorId: string,
      amount: number,
      transactionHash: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/dividends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_id: businessId,
            investor_id: investorId,
            amount,
            transaction_hash: transactionHash,
          }),
        });

        const data: DividendResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to distribute dividend");
        }

        if (investorId === user?.id) {
          setDividends((prev) => [...prev, ...(data.data || [])]);
          setTotalDividends(
            (prev) => prev + (data.data?.[0]?.amount || 0)
          );
        }

        return data.data;
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

  // Batch distribute dividends
  const batchDistributeDividends = useCallback(
    async (
      businessId: string,
      distributions: Array<{
        investor_id: string;
        amount: number;
        transaction_hash: string;
      }>
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/dividends/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_id: businessId,
            distributions,
          }),
        });

        const data: DividendResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to distribute dividends");
        }

        return data;
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

  // Calculate dividend statistics
  const getDividendStats = useCallback(() => {
    const stats = {
      totalDividends,
      count: dividends.length,
      averageDividend:
        dividends.length > 0 ? totalDividends / dividends.length : 0,
      latestDividend: dividends[0] || null,
    };

    return stats;
  }, [dividends, totalDividends]);

  // Fetch dividends on component mount
  useEffect(() => {
    fetchDividends();
  }, [fetchDividends]);

  return {
    dividends,
    totalDividends,
    loading,
    error,
    fetchDividends,
    distributeDividend,
    batchDistributeDividends,
    getDividendStats,
  };
}
