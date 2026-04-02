import { NextResponse } from "next/server";
import { updateInvestmentStatus } from "@/lib/db";

/**
 * PATCH /api/investments/:investmentId
 * Update investment status (e.g., after blockchain confirmation)
 *
 * Request body:
 * {
 *   status: "confirmed" | "failed";
 *   transaction_hash?: string;
 * }
 */
export async function PATCH(
  req: Request,
  { params }: { params: { investmentId: string } }
) {
  try {
    const investmentId = params.investmentId;
    const { status, transaction_hash } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Missing status field" },
        { status: 400 }
      );
    }

    if (!["confirmed", "failed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'confirmed' or 'failed'" },
        { status: 400 }
      );
    }

    const investment = await updateInvestmentStatus(
      investmentId,
      status as "confirmed" | "failed",
      transaction_hash
    );

    return NextResponse.json({
      success: true,
      data: investment,
      message: `Investment marked as ${status}`,
    });
  } catch (error) {
    console.error("Investment update error:", error);
    return NextResponse.json(
      { error: "Failed to update investment" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/investments/:investmentId
 * Get a specific investment
 */
export async function GET(
  req: Request,
  { params }: { params: { investmentId: string } }
) {
  try {
    const investmentId = params.investmentId;

    if (!investmentId) {
      return NextResponse.json(
        { error: "Investment ID is required" },
        { status: 400 }
      );
    }

    // Placeholder for fetching a specific investment
    // You may want to add this function to lib/db.ts
    return NextResponse.json(
      { error: "Feature not yet implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Fetch investment error:", error);
    return NextResponse.json(
      { error: "Failed to fetch investment" },
      { status: 500 }
    );
  }
}
