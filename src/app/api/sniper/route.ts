import { NextRequest, NextResponse } from "next/server";

const SNIPER_URL = process.env.SNIPER_BOT_URL || "https://sniper-v2-production.up.railway.app";

export async function GET(req: NextRequest) {
  const endpoint = req.nextUrl.searchParams.get("endpoint") || "summary";
  try {
    const res = await fetch(`${SNIPER_URL}/${endpoint}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
