"use client";

interface BotStatusPanelProps {
  kalshiScanning?: boolean;
  kalshiTotalScans?: number;
  kalshiMarketsScanned?: number;
  sniperRunning?: boolean;
  sniperUptime?: number;
  sniperDryRun?: boolean;
  sniperSportsWs?: string;
  sniperClobWs?: string;
  sniperLiveGames?: number;
  sniperKnownMarkets?: number;
  sniperScans?: number;
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        active ? "bg-terminal-green animate-pulse" : "bg-terminal-red"
      }`}
    />
  );
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function BotStatusPanel({
  kalshiScanning = false,
  kalshiTotalScans = 0,
  kalshiMarketsScanned = 0,
  sniperRunning = false,
  sniperUptime = 0,
  sniperDryRun = false,
  sniperSportsWs = "disconnected",
  sniperClobWs = "disconnected",
  sniperLiveGames = 0,
  sniperKnownMarkets = 0,
  sniperScans = 0,
}: BotStatusPanelProps) {
  return (
    <div className="card space-y-4">
      <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
        Bot Status
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Kalshi */}
        <div className="bg-terminal-bg rounded-md p-3 border border-terminal-border space-y-2">
          <div className="flex items-center gap-2">
            <StatusDot active={kalshiScanning} />
            <span className="font-mono text-sm font-semibold">KALSHI BOT</span>
          </div>
          <div className="text-xs text-terminal-muted space-y-1">
            <div>Scans: {kalshiTotalScans.toLocaleString()}</div>
            <div>Markets: {kalshiMarketsScanned.toLocaleString()}</div>
            <div>Status: {kalshiScanning ? "SCANNING" : "IDLE"}</div>
          </div>
        </div>

        {/* Sniper */}
        <div className="bg-terminal-bg rounded-md p-3 border border-terminal-border space-y-2">
          <div className="flex items-center gap-2">
            <StatusDot active={sniperRunning} />
            <span className="font-mono text-sm font-semibold">SNIPER V2</span>
          </div>
          <div className="text-xs text-terminal-muted space-y-1">
            <div>Uptime: {formatUptime(sniperUptime)}</div>
            <div>
              WS: Sports {sniperSportsWs === "connected" ? "✓" : "✗"} | CLOB{" "}
              {sniperClobWs === "connected" ? "✓" : "✗"}
            </div>
            <div>Live Games: {sniperLiveGames} | Markets: {sniperKnownMarkets}</div>
            <div>Scans: {sniperScans.toLocaleString()}</div>
            {sniperDryRun && <div className="text-terminal-yellow">DRY RUN</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
