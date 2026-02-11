"use client";

interface BalanceCardProps {
  kalshiBalance?: number;
  kalshiPortfolio?: number;
  sniperBalance?: number;
  sniperOpenValue?: number;
  totalBalance?: number;
}

export default function BalanceCard({
  kalshiBalance = 0,
  kalshiPortfolio = 0,
  sniperBalance = 0,
  sniperOpenValue = 0,
  totalBalance,
}: BalanceCardProps) {
  const total = totalBalance ?? kalshiBalance + sniperBalance;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
          Account Balances
        </h2>
        <span className="text-terminal-green font-mono text-2xl font-bold glow-green">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-terminal-bg rounded-md p-3 border border-terminal-border">
          <div className="text-xs text-terminal-muted mb-1">Kalshi Bot</div>
          <div className="font-mono text-terminal-blue text-lg">${kalshiBalance.toFixed(2)}</div>
          <div className="text-xs text-terminal-muted">Portfolio: ${kalshiPortfolio.toFixed(2)}</div>
        </div>
        <div className="bg-terminal-bg rounded-md p-3 border border-terminal-border">
          <div className="text-xs text-terminal-muted mb-1">Sniper V2</div>
          <div className="font-mono text-terminal-blue text-lg">${sniperBalance.toFixed(2)}</div>
          <div className="text-xs text-terminal-muted">Open: ${sniperOpenValue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
