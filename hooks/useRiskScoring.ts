import { useCallback, useState } from "react";

interface RiskScore {
  id: string;
  business_id: string;
  revenue: number;
  business_age: number;
  sector_score?: number;
  location_score?: number;
  final_label: string;
  created_at: string;
  updated_at: string;
}

interface CalculatedScores {
  sector_score: number;
  location_score: number;
  revenue_score: number;
  age_score: number;
  final_score: number;
}

interface RiskScoreResponse {
  success: boolean;
  data: RiskScore & { calculated_scores?: CalculatedScores };
  message?: string;
  error?: string;
}

export function useRiskScoring() {
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [calculatedScores, setCalculatedScores] = useState<CalculatedScores | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate risk score for a business
  const calculateRiskScore = useCallback(
    async (
      businessId: string,
      revenue: number,
      businessAge: number,
      competitors?: number,
      marketSize?: number
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/risk-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            business_id: businessId,
            revenue,
            business_age: businessAge,
            competitors,
            market_size: marketSize,
          }),
        });

        const data: RiskScoreResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to calculate risk score");
        }

        setRiskScore(data.data);
        if (data.data.calculated_scores) {
          setCalculatedScores(data.data.calculated_scores);
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
    []
  );

  // Fetch existing risk score
  const fetchRiskScore = useCallback(async (businessId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/risk-score?business_id=${businessId}`
      );
      const data: RiskScoreResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch risk score");
      }

      setRiskScore(data.data);
      if (data.data.calculated_scores) {
        setCalculatedScores(data.data.calculated_scores);
      }

      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get risk color based on label
  const getRiskColor = useCallback((label: string) => {
    switch (label) {
      case "LOW":
        return "text-green-600";
      case "MEDIUM":
        return "text-yellow-600";
      case "HIGH":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  }, []);

  // Get risk background color
  const getRiskBgColor = useCallback((label: string) => {
    switch (label) {
      case "LOW":
        return "bg-green-100";
      case "MEDIUM":
        return "bg-yellow-100";
      case "HIGH":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  }, []);

  return {
    riskScore,
    calculatedScores,
    loading,
    error,
    calculateRiskScore,
    fetchRiskScore,
    getRiskColor,
    getRiskBgColor,
  };
}
