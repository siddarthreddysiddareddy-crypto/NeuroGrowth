import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { createRiskScore } from "@/lib/db";

/**
 * POST /api/risk-score
 * Calculate and store risk score for a business
 *
 * Request body:
 * {
 *   business_id: string;
 *   revenue: number;
 *   business_age: number; // in years
 *   competitors?: number;
 *   market_size?: number;
 * }
 */
export async function POST(req: Request) {
  try {
    const { business_id, revenue, business_age, competitors, market_size } =
      await req.json();

    // Validate required fields
    if (!business_id || revenue === undefined || business_age === undefined) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: business_id, revenue, business_age",
        },
        { status: 400 }
      );
    }

    // Fetch business profile
    const { data: business, error: businessError } = await supabase
      .from("msme_profiles")
      .select("*")
      .eq("id", business_id)
      .single();

    if (businessError || !business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Calculate risk scores based on various factors
    let sector_score = 50; // Default neutral score
    let location_score = 50; // Default neutral score
    let final_score = 50;

    // Sector-based scoring
    const sectorScores: Record<string, number> = {
      "SaaS": 75,
      "EdTech": 70,
      "FinTech": 65,
      "E-Commerce": 55,
      "Healthcare": 60,
      "Services": 50,
      "Manufacturing": 40,
      "Other": 45,
    };

    sector_score = sectorScores[business.sector] || 50;

    // Location-based scoring (simplified example)
    const tier1Cities = ["Bangalore", "Delhi", "Mumbai", "Hyderabad"];
    location_score = tier1Cities.includes(business.city) ? 70 : 50;

    // Revenue stability score
    let revenue_score = 50;
    if (revenue > 1000000) {
      revenue_score = 80;
    } else if (revenue > 500000) {
      revenue_score = 70;
    } else if (revenue > 100000) {
      revenue_score = 60;
    }

    // Business age score
    let age_score = 50;
    if (business_age > 5) {
      age_score = 75;
    } else if (business_age > 3) {
      age_score = 65;
    } else if (business_age > 1) {
      age_score = 55;
    }

    // Calculate final score (weighted average)
    final_score =
      sector_score * 0.25 +
      location_score * 0.2 +
      revenue_score * 0.3 +
      age_score * 0.25;

    // Determine risk label
    let final_label = "MEDIUM";
    if (final_score >= 70) {
      final_label = "LOW";
    } else if (final_score >= 50) {
      final_label = "MEDIUM";
    } else {
      final_label = "HIGH";
    }

    // Store risk score in database
    const riskScore = await createRiskScore({
      business_id,
      revenue,
      business_age,
      sector_score: Math.round(sector_score),
      location_score: Math.round(location_score),
      final_label,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...riskScore,
          calculated_scores: {
            sector_score: Math.round(sector_score),
            location_score: Math.round(location_score),
            revenue_score: Math.round(revenue_score),
            age_score: Math.round(age_score),
            final_score: Math.round(final_score),
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Risk score calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate risk score" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/risk-score?business_id=<business_id>
 * Get latest risk score for a business
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const business_id = searchParams.get("business_id");

    if (!business_id) {
      return NextResponse.json(
        { error: "Missing business_id parameter" },
        { status: 400 }
      );
    }

    const { data: riskScore, error } = await supabase
      .from("risk_scores")
      .select("*")
      .eq("business_id", business_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found
      throw error;
    }

    if (!riskScore) {
      return NextResponse.json(
        { error: "No risk score found for this business" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: riskScore });
  } catch (error) {
    console.error("Fetch risk score error:", error);
    return NextResponse.json(
      { error: "Failed to fetch risk score" },
      { status: 500 }
    );
  }
}
