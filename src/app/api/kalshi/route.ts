import { NextRequest, NextResponse } from "next/server";

const KALSHI_URL = process.env.KALSHI_BOT_URL || "https://kalshi-bot-production-ab13.up.railway.app";

export async function GET(req: NextRequest) {
  const endpoint = req.nextUrl.searchParams.get("endpoint") || "status";
  try {
    const res = await fetch(`${KALSHI_URL}/api/${endpoint}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
