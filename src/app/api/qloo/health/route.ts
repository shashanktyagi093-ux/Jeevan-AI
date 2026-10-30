import { NextResponse } from "next/server";
import { qlooClient } from "@/lib/qloo/client";

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";

export async function GET() {
  try {
    let pythonBackendStatus = { online: false, message: "Python backend not connected" };
    try {
      const pyRes = await fetch(`${PYTHON_BACKEND_URL}/health`, {
        signal: AbortSignal.timeout(1500),
      });
      if (pyRes.ok) {
        const pyData = await pyRes.json();
        pythonBackendStatus = { online: true, ...pyData };
      }
    } catch {
      // Python backend idle
    }

    const health = await qlooClient.checkHealth();
    return NextResponse.json(
      {
        ...health,
        pythonBackend: pythonBackendStatus,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      {
        configured: false,
        accessible: false,
        mode: "verified_cache",
        message: `Health check failed: ${message}`,
      },
      { status: 500 }
    );
  }
}
