"use client";

interface Position {
  ticker: string;
  side: string;
  entryPrice: number;
  currentPrice?: number;
  amount: number;
  pnl?: number;
  source: string;
}

interface PositionTableProps {
  positions?: Position[];
}

export default function PositionTable({ positions = [] }: PositionTableProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
          Open Positions
        </h2>
        <span className="text-xs text-terminal-muted">{positions.length} open</span>
      </div>

      {positions.length === 0 ? (
        <div className="text-center text-terminal-muted py-6 font-mono text-sm">
          No open positions
        </div>
      ) : (
        <table className="w-full font-mono text-xs">
          <thead>
            <tr className="text-terminal-muted border-b border-terminal-border">
              <th className="text-left pb-2">Ticker</th>
              <th className="text-center pb-2">Side</th>
              <th className="text-right pb-2">Entry</th>
              <th className="text-right pb-2">Current</th>
              <th className="text-right pb-2">Size</th>
              <th className="text-right pb-2">PnL</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="border-b border-terminal-border/30">
                <td className="py-2 text-terminal-text">{p.ticker}</td>
                <td className={`py-2 text-center ${p.side === "YES" ? "text-terminal-green" : "text-terminal-red"}`}>
                  {p.side}
                </td>
                <td className="py-2 text-right">{p.entryPrice.toFixed(3)}</td>
                <td className="py-2 text-right">{p.currentPrice?.toFixed(3) ?? "—"}</td>
                <td className="py-2 text-right">${p.amount.toFixed(2)}</td>
                <td className={`py-2 text-right ${(p.pnl ?? 0) >= 0 ? "text-terminal-green" : "text-terminal-red"}`}>
                  {p.pnl !== undefined ? `${p.pnl >= 0 ? "+" : ""}$${p.pnl.toFixed(2)}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
