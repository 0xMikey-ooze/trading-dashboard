"use client";

import { useEffect, useState } from "react";
import BalanceCard from "./BalanceCard";
import BotStatusPanel from "./BotStatusPanel";
import TradeHistory from "./TradeHistory";
import LiveGamesBoard from "./LiveGamesBoard";
import PositionTable from "./PositionTable";
import PnLChart from "./PnLChart";
import OpportunityScanner from "./OpportunityScanner";

interface DashboardData {
  sniperSummary: any;
  sniperTrades: any;
  kalshiBalance: any;
  kalshiStatus: any;
  kalshiTrades: any;
  kalshiOpportunities: any;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchAll = async () => {
    try {
      const [ss, st, kb, ks, kt, ko] = await Promise.all([
        fetch("/api/sniper?endpoint=summary").then((r) => r.json()),
        fetch("/api/sniper?endpoint=trades").then((r) => r.json()),
        fetch("/api/kalshi?endpoint=balance").then((r) => r.json()),
        fetch("/api/kalshi?endpoint=status").then((r) => r.json()),
        fetch("/api/kalshi?endpoint=trades").then((r) => r.json()),
        fetch("/api/kalshi?endpoint=opportunities").then((r) => r.json()),
      ]);
      setData({
        sniperSummary: ss,
        sniperTrades: st,
        kalshiBalance: kb,
        kalshiStatus: ks,
        kalshiTrades: kt,
        kalshiOpportunities: ko,
      });
      setLastUpdate(new Date());
    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-terminal-green font-mono animate-pulse">Loading terminal...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-terminal-red font-mono">Failed to connect to bots</div>
      </div>
    );
  }

  const { sniperSummary: ss, sniperTrades: st, kalshiBalance: kb, kalshiStatus: ks, kalshiTrades: kt, kalshiOpportunities: ko } = data;

  // Merge trades from both bots
  const allTrades = [
    ...(kt.trades || []).map((t: any) => ({
      ticker: t.ticker,
      entryPrice: t.entry_price,
      exitPrice: t.exit_price,
      pnl: t.pnl,
      result: t.result,
      category: t.category,
      timestamp: t.timestamp,
      source: "kalshi",
    })),
    ...(st.recent || []).map((t: any) => ({
      ticker: t.slug || t.dedupKey,
      side: t.side,
      entryPrice: t.price || t.fillPrice,
      exitPrice: undefined,
      pnl: undefined,
      result: t.result,
      category: "sports",
      timestamp: t.timestamp,
      amount: t.amount,
      source: "sniper",
    })),
  ];

  // Build PnL data from kalshi trades
  let cumPnl = 0;
  const pnlData = (kt.trades || [])
    .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map((t: any) => {
      cumPnl += t.pnl || 0;
      return {
        date: new Date(t.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        pnl: t.pnl || 0,
        cumulative: Number(cumPnl.toFixed(2)),
      };
    });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-terminal-green glow-green">
            ⚡ TRADING TERMINAL
          </h1>
          <p className="text-xs text-terminal-muted font-mono">
            Kalshi + Sniper V2 Dashboard
          </p>
        </div>
        <div className="text-right">
          {lastUpdate && (
            <div className="text-[10px] text-terminal-muted font-mono">
              Updated {lastUpdate.toLocaleTimeString()}
            </div>
          )}
          <button
            onClick={fetchAll}
            className="text-xs text-terminal-blue hover:text-terminal-green font-mono transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Row 1: Balances + Status */}
      <div className="grid grid-cols-2 gap-4">
        <BalanceCard
          kalshiBalance={kb.balance}
          kalshiPortfolio={kb.portfolio_value}
          sniperBalance={ss.balance}
          sniperOpenValue={ss.openTradeValue}
        />
        <BotStatusPanel
          kalshiScanning={ks.scanning}
          kalshiTotalScans={ks.total_scans}
          kalshiMarketsScanned={ks.total_markets_scanned}
          sniperRunning={ss.status.running}
          sniperUptime={ss.status.uptime}
          sniperDryRun={ss.status.dryRun}
          sniperSportsWs={ss.status.sportsWs}
          sniperClobWs={ss.status.clobWs}
          sniperLiveGames={ss.status.liveGames}
          sniperKnownMarkets={ss.status.knownMarkets}
          sniperScans={ss.status.scans}
        />
      </div>

      {/* Row 2: PnL + Positions */}
      <div className="grid grid-cols-2 gap-4">
        <PnLChart data={pnlData} />
        <PositionTable />
      </div>

      {/* Row 3: Trades + Live Games */}
      <div className="grid grid-cols-2 gap-4">
        <TradeHistory trades={allTrades} />
        <LiveGamesBoard games={ss.liveGames} />
      </div>

      {/* Row 4: Opportunities */}
      <OpportunityScanner
        totalScans={(ks.total_scans || 0) + (ss.status.scans || 0)}
      />
    </div>
  );
}
