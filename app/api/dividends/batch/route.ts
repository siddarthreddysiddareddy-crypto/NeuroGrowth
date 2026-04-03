import { NextResponse } from "next/server";
import { distributeDividend } from "@/lib/db";

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
export async function POST(req: Request) {
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
