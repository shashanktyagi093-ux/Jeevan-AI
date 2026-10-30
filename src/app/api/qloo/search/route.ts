import { NextRequest, NextResponse } from "next/server";
import { qlooClient } from "@/lib/qloo/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || searchParams.get("query") || "";
    const vertical = searchParams.get("vertical") || searchParams.get("type") || undefined;
    const limit = Math.min(15, Math.max(1, parseInt(searchParams.get("limit") || "8", 10)));

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [], query: "", total: 0 });
    }

    const response = await qlooClient.searchEntities(query, vertical, limit);
    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Search failure";
    return NextResponse.json({ error: message, results: [] }, { status: 500 });
  }
}
