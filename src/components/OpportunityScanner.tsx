"use client";

interface Opportunity {
  ticker?: string;
  title?: string;
  category: string;
  confidence?: number;
  edge?: number;
  direction?: string;
  ourProb?: number;
  timestamp: string;
}

interface OpportunityScannerProps {
  opportunities?: Opportunity[];
  totalScans?: number;
}

export default function OpportunityScanner({
  opportunities = [],
  totalScans = 0,
}: OpportunityScannerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const highConf = opportunities.filter((o) => (o.confidence ?? 0) > 0.7);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
          Opportunity Scanner
        </h2>
        <span className="text-xs font-mono text-terminal-muted">
          {totalScans.toLocaleString()} scans
        </span>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-6 space-y-2">
          <div className="text-terminal-muted font-mono text-sm">No opportunities detected</div>
          <div className="text-terminal-muted text-xs">Scanner is active and monitoring markets</div>
        </div>
      ) : (
        <div className="space-y-2">
          {opportunities.map((o, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-terminal-bg rounded px-3 py-2 border border-terminal-border/50 font-mono text-xs"
            >
              <div className="flex-1">
                <div className="text-terminal-text">{o.title || o.ticker || o.category}</div>
                <div className="text-terminal-muted text-[10px]">{o.category}</div>
              </div>
              {o.edge !== undefined && (
                <span className="text-terminal-green mx-2">+{(o.edge * 100).toFixed(1)}%</span>
              )}
              {o.confidence !== undefined && (
                <div
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    o.confidence > 0.7
                      ? "bg-terminal-green/10 text-terminal-green"
                      : "bg-terminal-yellow/10 text-terminal-yellow"
                  }`}
                >
                  {(o.confidence * 100).toFixed(0)}%
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
