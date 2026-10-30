import { NextResponse } from "next/server";
import { qlooClient } from "@/lib/qloo/client";

export async function GET() {
  try {
    const health = await qlooClient.checkHealth();
    return NextResponse.json(health, { status: 200 });
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
