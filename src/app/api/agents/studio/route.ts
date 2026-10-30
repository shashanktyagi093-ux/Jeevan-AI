import { NextRequest, NextResponse } from "next/server";
import { StudioAgent } from "@/lib/agents/studio-agent";
import { StudioUserInput } from "@/types/agent";

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as StudioUserInput;
    if (!body || !body.brandOrProjectName) {
      return NextResponse.json(
        { error: "Project or brand name is required." },
        { status: 400 }
      );
    }

    // Attempt routing to Python FastAPI Agent backend first
    try {
      const pyRes = await fetch(`${PYTHON_BACKEND_URL}/api/agents/studio`, {
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
      // Fall through to built-in agent
    }

    const result = await StudioAgent.execute(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Studio agent execution error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
