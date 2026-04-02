import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { submitGovernanceVote, getInvestorVotes } from "@/lib/db";

/**
 * POST /api/governance/votes
 * Submit a governance vote
 *
 * Request body:
 * {
 *   business_id: string;
 *   investor_id: string;
 *   proposal: string;
 *   vote: "yes" | "no" | "abstain";
 *   token_weight: number;
 * }
 */
export async function POST(req: Request) {
  try {
    const { business_id, investor_id, proposal, vote, token_weight } =
      await req.json();

    // Validate required fields
    if (
      !business_id ||
      !investor_id ||
      !proposal ||
      !vote ||
      token_weight === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: business_id, investor_id, proposal, vote, token_weight",
        },
        { status: 400 }
      );
    }

    // Validate vote value
    if (!["yes", "no", "abstain"].includes(vote)) {
      return NextResponse.json(
        { error: "Invalid vote. Must be 'yes', 'no', or 'abstain'" },
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
          error:
            "Investor has no confirmed investments in this business",
        },
        { status: 403 }
      );
    }

    // Calculate token weight from confirmed investments
    const totalTokens = investments.reduce((sum, inv) => sum + inv.tokens_received, 0);

    const governanceVote = await submitGovernanceVote({
      business_id,
      investor_id,
      proposal,
      vote,
      token_weight: totalTokens,
    });

    return NextResponse.json(
      {
        success: true,
        data: governanceVote,
        message: `Vote counted with ${totalTokens} token weight`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Governance vote error:", error);
    return NextResponse.json(
      { error: "Failed to submit governance vote" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/governance/votes?investor_id=<investor_id> or /api/governance/votes?business_id=<business_id>
 * Get votes for investor, or get proposals and voting status for a business
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const investor_id = searchParams.get("investor_id");
    const business_id = searchParams.get("business_id");

    // Case 1: Get proposals for a business (no investor_id)
    if (business_id && !investor_id) {
      // Get all votes for this business grouped by proposal
      const { data: votes, error } = await supabase
        .from("governance_votes")
        .select("*")
        .eq("business_id", business_id);

      if (error) throw error;

      // Group votes by proposal
      const proposals = votes?.reduce(
        (acc, vote) => {
          if (!acc[vote.proposal]) {
            acc[vote.proposal] = {
              proposal: vote.proposal,
              yes_votes: 0,
              no_votes: 0,
              abstain_votes: 0,
              total_weight: 0,
              votes: [],
            };
          }

          acc[vote.proposal].votes.push(vote);
          acc[vote.proposal].total_weight += vote.token_weight;

          if (vote.vote === "yes") {
            acc[vote.proposal].yes_votes += vote.token_weight;
          } else if (vote.vote === "no") {
            acc[vote.proposal].no_votes += vote.token_weight;
          } else {
            acc[vote.proposal].abstain_votes += vote.token_weight;
          }

          return acc;
        },
        {} as Record<
          string,
          {
            proposal: string;
            yes_votes: number;
            no_votes: number;
            abstain_votes: number;
            total_weight: number;
            votes: any[];
          }
        >
      );

      return NextResponse.json({
        success: true,
        data: Object.values(proposals || {}),
      });
    }

    // Case 2: Get votes for investor and specific business
    if (investor_id && business_id) {
      const { data: votes, error } = await supabase
        .from("governance_votes")
        .select("*")
        .eq("investor_id", investor_id)
        .eq("business_id", business_id);

      if (error) throw error;

      return NextResponse.json({
        success: true,
        data: votes,
        total: votes?.length || 0,
      });
    }

    // Case 3: Get all votes for investor
    if (investor_id) {
      const votes = await getInvestorVotes(investor_id);

      return NextResponse.json({
        success: true,
        data: votes,
        total: votes?.length || 0,
      });
    }

    // If no parameters provided
    return NextResponse.json(
      { error: "Missing investor_id or business_id parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Fetch governance votes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch governance votes" },
      { status: 500 }
    );
  }
}
