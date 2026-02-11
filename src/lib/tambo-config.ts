import { z } from "zod";
import type { TamboComponent } from "@tambo-ai/react";
import BalanceCard from "@/components/BalanceCard";
import BotStatusPanel from "@/components/BotStatusPanel";
import TradeHistory from "@/components/TradeHistory";
import LiveGamesBoard from "@/components/LiveGamesBoard";
import PositionTable from "@/components/PositionTable";
import PnLChart from "@/components/PnLChart";
import OpportunityScanner from "@/components/OpportunityScanner";
import TradeExecutor from "@/components/TradeExecutor";

export const tamboComponents: TamboComponent[] = [
  {
    name: "BalanceCard",
    description:
      "Shows account balances for both Kalshi and Sniper bots. Use when user asks about balance, funds, or money.",
    component: BalanceCard,
    propsSchema: z.object({
      kalshiBalance: z.number().optional().describe("Kalshi bot available balance in USD"),
      kalshiPortfolio: z.number().optional().describe("Kalshi portfolio value"),
      sniperBalance: z.number().optional().describe("Sniper V2 balance in USDC"),
      sniperOpenValue: z.number().optional().describe("Sniper open trade value"),
      totalBalance: z.number().optional().describe("Combined total balance"),
    }),
  },
  {
    name: "BotStatusPanel",
    description:
      "Shows operational status of both trading bots. Use when user asks how bots are doing, status, or health.",
    component: BotStatusPanel,
    propsSchema: z.object({
      kalshiScanning: z.boolean().optional(),
      kalshiTotalScans: z.number().optional(),
      kalshiMarketsScanned: z.number().optional(),
      sniperRunning: z.boolean().optional(),
      sniperUptime: z.number().optional().describe("Uptime in seconds"),
      sniperDryRun: z.boolean().optional(),
      sniperSportsWs: z.string().optional().describe("Sports WebSocket status"),
      sniperClobWs: z.string().optional().describe("CLOB WebSocket status"),
      sniperLiveGames: z.number().optional(),
      sniperKnownMarkets: z.number().optional(),
      sniperScans: z.number().optional(),
    }),
  },
  {
    name: "TradeHistory",
    description:
      "Shows recent trades with outcomes. Use when user asks about trades, wins, losses, or specific bets.",
    component: TradeHistory,
    propsSchema: z.object({
      trades: z
        .array(
          z.object({
            ticker: z.string(),
            side: z.string().optional(),
            entryPrice: z.number(),
            exitPrice: z.number().optional(),
            pnl: z.number().optional(),
            result: z.string().describe("win, loss, pending, or executed"),
            category: z.string().optional(),
            timestamp: z.string(),
            amount: z.number().optional(),
            source: z.string().describe("kalshi or sniper"),
          })
        )
        .optional(),
      filter: z.string().optional().describe("Filter trades by ticker or category"),
    }),
  },
  {
    name: "LiveGamesBoard",
    description:
      "Shows currently live games with scores. Use when user asks about live games, scores, or current matches.",
    component: LiveGamesBoard,
    propsSchema: z.object({
      games: z
        .array(
          z.object({
            league: z.string(),
            game: z.string(),
            score: z.string(),
            period: z.string(),
          })
        )
        .optional(),
    }),
  },
  {
    name: "PositionTable",
    description:
      "Shows open positions across both bots. Use when user asks about positions or open trades.",
    component: PositionTable,
    propsSchema: z.object({
      positions: z
        .array(
          z.object({
            ticker: z.string(),
            side: z.string(),
            entryPrice: z.number(),
            currentPrice: z.number().optional(),
            amount: z.number(),
            pnl: z.number().optional(),
            source: z.string(),
          })
        )
        .optional(),
    }),
  },
  {
    name: "PnLChart",
    description: "Visual P&L chart over time. Use when user asks about P&L, performance, or charts.",
    component: PnLChart,
    propsSchema: z.object({
      data: z
        .array(
          z.object({
            date: z.string(),
            pnl: z.number(),
            cumulative: z.number(),
          })
        )
        .optional(),
      title: z.string().optional(),
    }),
  },
  {
    name: "OpportunityScanner",
    description:
      "Shows current market opportunities. Use when user asks about opportunities, edges, or what to trade.",
    component: OpportunityScanner,
    propsSchema: z.object({
      opportunities: z
        .array(
          z.object({
            ticker: z.string().optional(),
            title: z.string().optional(),
            category: z.string(),
            confidence: z.number().optional(),
            edge: z.number().optional(),
            direction: z.string().optional(),
            ourProb: z.number().optional(),
            timestamp: z.string(),
          })
        )
        .optional(),
      totalScans: z.number().optional(),
    }),
  },
  {
    name: "TradeExecutor",
    description:
      "Manual trade execution form. Use when user wants to place a trade or execute a bet.",
    component: TradeExecutor,
    propsSchema: z.object({
      market: z.string().optional().describe("Pre-filled market ticker"),
      side: z.string().optional().describe("YES or NO"),
      amount: z.number().optional().describe("Trade amount in USD"),
    }),
  },
];
