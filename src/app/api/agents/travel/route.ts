import { NextRequest, NextResponse } from "next/server";
import { TravelAgent } from "@/lib/agents/travel-agent";
import { TravelUserInput } from "@/types/agent";

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TravelUserInput;
    if (!body || !body.destinationCity) {
      return NextResponse.json(
        { error: "Destination city is required." },
        { status: 400 }
      );
    }

    // Attempt routing to Python FastAPI Agent backend first
    try {
      const pyRes = await fetch(`${PYTHON_BACKEND_URL}/api/agents/travel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(3000),
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        return NextResponse.json(pyData);
      }
    } catch {
      // Python backend not running or timed out; fall back to built-in agent
    }

    const result = await TravelAgent.execute(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Travel agent execution error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
