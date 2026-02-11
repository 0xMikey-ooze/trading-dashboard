import { z } from "zod";
import type { TamboTool } from "@tambo-ai/react";

const toolDef = (name: string, description: string, endpoint: string): TamboTool => ({
  name,
  description,
  tool: async () => {
    const res = await fetch(endpoint);
    return res.json();
  },
  inputSchema: z.object({}),
  outputSchema: z.any(),
});

export const tamboTools: TamboTool[] = [
  toolDef("fetchSniperSummary", "Fetch current summary from Sniper V2 bot including balance, positions, PnL, live games, and status", "/api/sniper?endpoint=summary"),
  toolDef("fetchSniperTrades", "Fetch recent trades from Sniper V2 bot", "/api/sniper?endpoint=trades"),
  toolDef("fetchKalshiBalance", "Fetch Kalshi bot account balance", "/api/kalshi?endpoint=balance"),
  toolDef("fetchKalshiStatus", "Fetch Kalshi bot scanner status", "/api/kalshi?endpoint=status"),
  toolDef("fetchKalshiTrades", "Fetch recent trades from Kalshi bot", "/api/kalshi?endpoint=trades"),
  toolDef("fetchKalshiOpportunities", "Fetch current opportunities from Kalshi bot scanner", "/api/kalshi?endpoint=opportunities"),
];
