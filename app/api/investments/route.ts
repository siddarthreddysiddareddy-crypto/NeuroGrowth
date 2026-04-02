import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { createInvestment, getInvestorInvestments } from "@/lib/db";

/**
 * POST /api/investments
 * Create a new investment
 *
 * Request body:
 * {
 *   investor_id: string;
 *   business_id: string;
 *   amount_invested: number;
 *   tokens_to_mint: number;
 * }
 */
export async function POST(req: Request) {
  try {
    const { investor_id, business_id, amount_invested, tokens_to_mint } =
      await req.json();

    // Validate required fields
    if (
      !investor_id ||
      !business_id ||
      amount_invested === undefined ||
      tokens_to_mint === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: investor_id, business_id, amount_invested, tokens_to_mint",
        },
        { status: 400 }
      );
    }

    // Verify investor exists
    const { data: investor, error: investorError } = await supabase
      .from("investors")
      .select("*")
      .eq("user_id", investor_id)
      .single();

    if (investorError || !investor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }

    // Verify business exists
    const { data: business, error: businessError } = await supabase
      .from("msme_profiles")
      .select("*")
      .eq("user_id", business_id)
      .single();

    if (businessError || !business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Create investment record (initially pending)
    const investment = await createInvestment({
      investor_id,
      business_id,
      amount_invested,
      tokens_received: tokens_to_mint,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        data: investment,
        message: "Investment created. Processing transaction...",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Investment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create investment" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/investments?investor_id=<investor_id>
 * Get all investments for an investor
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const investor_id = searchParams.get("investor_id");

    if (!investor_id) {
      return NextResponse.json(
        { error: "Missing investor_id parameter" },
        { status: 400 }
      );
    }

    const investments = await getInvestorInvestments(investor_id);

    return NextResponse.json({
      success: true,
      data: investments,
      total: investments?.length || 0,
    });
  } catch (error) {
    console.error("Fetch investments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch investments" },
      { status: 500 }
    );
  }
}


