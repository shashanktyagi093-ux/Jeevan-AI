import { NextRequest, NextResponse } from "next/server";
import { TravelAgent } from "@/lib/agents/travel-agent";
import { TravelUserInput } from "@/types/agent";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TravelUserInput;
    if (!body || !body.destinationCity) {
      return NextResponse.json(
        { error: "Destination city is required." },
        { status: 400 }
      );
    }

    const result = await TravelAgent.execute(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Travel agent execution error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
