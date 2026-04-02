import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { distributeDividend } from "@/lib/db";

/**
 * POST /api/dividends
 * Distribute dividends to investors
 *
 * Request body:
 * {
 *   business_id: string;
 *   investor_id: string;
 *   amount: number;
 *   transaction_hash: string;
 * }
 */
export async function POST(req: Request) {
  try {
    const { business_id, investor_id, amount, transaction_hash } =
      await req.json();

    // Validate required fields
    if (!business_id || !investor_id || amount === undefined || !transaction_hash) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: business_id, investor_id, amount, transaction_hash",
        },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    // Verify investor has investments in this business
    const { data: investments, error: investmentError } = await supabase
      .from("investments")
      .select("*")
      .eq("investor_id", investor_id)
      .eq("business_id", business_id)
      .eq("status", "confirmed");

    if (investmentError || !investments || investments.length === 0) {
      return NextResponse.json(
        {
          error: "Investor has no confirmed investments in this business",
        },
        { status: 403 }
      );
    }

    // Calculate investor's share
    const totalTokens = investments.reduce((sum, inv) => sum + inv.tokens_received, 0);

    // Create dividend record
    const dividend = await distributeDividend({
      business_id,
      investor_id,
      amount,
      transaction_hash,
    });

    return NextResponse.json(
      {
        success: true,
        data: dividend,
        message: `Dividend of ${amount} distributed to investor with ${totalTokens} tokens`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Dividend distribution error:", error);
    return NextResponse.json(
      { error: "Failed to distribute dividend" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/dividends?investor_id=<investor_id>&business_id=<business_id>
 * Get dividend history
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const investor_id = searchParams.get("investor_id");
    const business_id = searchParams.get("business_id");

    let query = supabase.from("dividends").select("*");

    if (investor_id) {
      query = query.eq("investor_id", investor_id);
    }

    if (business_id) {
      query = query.eq("business_id", business_id);
    }

    const { data: dividends, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    // Calculate total dividends
    const total = dividends?.reduce((sum, div) => sum + div.amount, 0) || 0;

    return NextResponse.json({
      success: true,
      data: dividends,
      total_dividends: total,
      count: dividends?.length || 0,
    });
  } catch (error) {
    console.error("Fetch dividends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dividends" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/dividends/batch
 * Distribute dividends to multiple investors
 *
 * Request body:
 * {
 *   business_id: string;
 *   distributions: [
 *     {
 *       investor_id: string;
 *       amount: number;
 *       transaction_hash: string;
 *     }
 *   ]
 * }
 */
export async function POSTBATCH(req: Request) {
  try {
    const { business_id, distributions } = await req.json();

    if (!business_id || !distributions || !Array.isArray(distributions)) {
      return NextResponse.json(
        {
          error: "Missing required fields: business_id, distributions (array)",
        },
        { status: 400 }
      );
    }

    const results: any[] = [];
    const errors: Array<{ investor_id: string; error: string }> = [];

    for (const dist of distributions) {
      try {
        const dividend = await distributeDividend({
          business_id,
          investor_id: dist.investor_id,
          amount: dist.amount,
          transaction_hash: dist.transaction_hash,
        });

        results.push(dividend);
      } catch (error) {
        errors.push({
          investor_id: dist.investor_id,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json(
      {
        success: errors.length === 0,
        data: results,
        errors: errors.length > 0 ? errors : undefined,
        total_distributed: results.reduce((sum, div: any) => sum + div.amount, 0),
        count: results.length,
      },
      { status: errors.length === 0 ? 201 : 207 }
    );
  } catch (error) {
    console.error("Batch dividend distribution error:", error);
    return NextResponse.json(
      { error: "Failed to distribute dividends in batch" },
      { status: 500 }
    );
  }
}
