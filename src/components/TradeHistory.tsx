"use client";

interface Trade {
  ticker: string;
  side?: string;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  result: string;
  category?: string;
  timestamp: string;
  amount?: number;
  source: string;
}

interface TradeHistoryProps {
  trades?: Trade[];
  filter?: string;
}

export default function TradeHistory({ trades = [], filter }: TradeHistoryProps) {
  const filtered = filter
    ? trades.filter(
        (t) =>
          t.ticker.toLowerCase().includes(filter.toLowerCase()) ||
          t.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : trades;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
          Trade History
        </h2>
        <span className="text-xs text-terminal-muted">{filtered.length} trades</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-terminal-muted py-6 font-mono text-sm">
          No trades found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="text-terminal-muted border-b border-terminal-border">
                <th className="text-left pb-2 pr-3">Ticker</th>
                <th className="text-left pb-2 pr-3">Source</th>
                <th className="text-right pb-2 pr-3">Entry</th>
                <th className="text-right pb-2 pr-3">Exit</th>
                <th className="text-right pb-2 pr-3">PnL</th>
                <th className="text-center pb-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="border-b border-terminal-border/30 hover:bg-terminal-border/20">
                  <td className="py-2 pr-3 text-terminal-text">{t.ticker}</td>
                  <td className="py-2 pr-3 text-terminal-muted">{t.source}</td>
                  <td className="py-2 pr-3 text-right">{t.entryPrice.toFixed(2)}</td>
                  <td className="py-2 pr-3 text-right">
                    {t.exitPrice !== undefined ? t.exitPrice.toFixed(2) : "—"}
                  </td>
                  <td
                    className={`py-2 pr-3 text-right ${
                      (t.pnl ?? 0) >= 0 ? "text-terminal-green" : "text-terminal-red"
                    }`}
                  >
                    {t.pnl !== undefined ? `${t.pnl >= 0 ? "+" : ""}${t.pnl.toFixed(2)}` : "—"}
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        t.result === "win"
                          ? "bg-terminal-green/10 text-terminal-green"
                          : t.result === "loss"
                          ? "bg-terminal-red/10 text-terminal-red"
                          : "bg-terminal-yellow/10 text-terminal-yellow"
                      }`}
                    >
                      {t.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
