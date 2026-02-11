import { z } from "zod";
import type { TamboTool } from "@tambo-ai/react";

export const tamboTools: TamboTool[] = [
  {
    name: "fetchSniperSummary",
    description: "Fetch current summary from Sniper V2 bot including balance, positions, PnL, live games, and status",
    tool: async () => {
      const res = await fetch("/api/sniper?endpoint=summary");
      return res.json();
    },
    inputSchema: z.object({}),
  },
  {
    name: "fetchSniperTrades",
    description: "Fetch recent trades from Sniper V2 bot",
    tool: async () => {
      const res = await fetch("/api/sniper?endpoint=trades");
      return res.json();
    },
    inputSchema: z.object({}),
  },
  {
    name: "fetchKalshiBalance",
    description: "Fetch Kalshi bot account balance",
    tool: async () => {
      const res = await fetch("/api/kalshi?endpoint=balance");
      return res.json();
    },
    inputSchema: z.object({}),
  },
  {
    name: "fetchKalshiStatus",
    description: "Fetch Kalshi bot scanner status",
    tool: async () => {
      const res = await fetch("/api/kalshi?endpoint=status");
      return res.json();
    },
    inputSchema: z.object({}),
  },
  {
    name: "fetchKalshiTrades",
    description: "Fetch recent trades from Kalshi bot",
    tool: async () => {
      const res = await fetch("/api/kalshi?endpoint=trades");
      return res.json();
    },
    inputSchema: z.object({}),
  },
  {
    name: "fetchKalshiOpportunities",
    description: "Fetch current opportunities from Kalshi bot scanner",
    tool: async () => {
      const res = await fetch("/api/kalshi?endpoint=opportunities");
      return res.json();
    },
    inputSchema: z.object({}),
  },
];
