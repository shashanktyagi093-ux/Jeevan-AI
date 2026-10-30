import { NextRequest, NextResponse } from "next/server";
import { MatchAgent } from "@/lib/agents/match-agent";
import { MatchUserInput } from "@/types/agent";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MatchUserInput;
    if (!body || !body.personATastes || !body.personBTastes) {
      return NextResponse.json(
        { error: "Both Person A and Person B tastes are required." },
        { status: 400 }
      );
    }

    const result = await MatchAgent.execute(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Match agent execution error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
