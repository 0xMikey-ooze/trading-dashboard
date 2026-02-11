"use client";

import { useState } from "react";

interface TradeExecutorProps {
  market?: string;
  side?: string;
  amount?: number;
  onExecute?: (trade: { market: string; side: string; amount: number }) => void;
}

export default function TradeExecutor({
  market: initialMarket = "",
  side: initialSide = "YES",
  amount: initialAmount = 10,
}: TradeExecutorProps) {
  const [market, setMarket] = useState(initialMarket);
  const [side, setSide] = useState(initialSide);
  const [amount, setAmount] = useState(initialAmount);
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setStatus("Trade submitted (manual execution not yet wired)");
    setConfirming(false);
  };

  return (
    <div className="card">
      <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider mb-3">
        Trade Executor
      </h2>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-terminal-muted block mb-1">Market / Ticker</label>
          <input
            type="text"
            value={market}
            onChange={(e) => { setMarket(e.target.value); setConfirming(false); }}
            className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 font-mono text-sm text-terminal-text focus:border-terminal-blue focus:outline-none"
            placeholder="e.g. KXNBAGAME-26FEB11-BOS"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-terminal-muted block mb-1">Side</label>
            <div className="flex gap-2">
              {["YES", "NO"].map((s) => (
                <button
                  key={s}
                  onClick={() => { setSide(s); setConfirming(false); }}
                  className={`flex-1 py-2 rounded font-mono text-sm font-bold border ${
                    side === s
                      ? s === "YES"
                        ? "bg-terminal-green/10 border-terminal-green text-terminal-green"
                        : "bg-terminal-red/10 border-terminal-red text-terminal-red"
                      : "border-terminal-border text-terminal-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-terminal-muted block mb-1">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(Number(e.target.value)); setConfirming(false); }}
              className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 font-mono text-sm text-terminal-text focus:border-terminal-blue focus:outline-none"
              min={1}
              max={100}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!market}
          className={`w-full py-2 rounded font-mono text-sm font-bold transition-all ${
            confirming
              ? "bg-terminal-yellow/20 border border-terminal-yellow text-terminal-yellow animate-pulse"
              : "bg-terminal-green/10 border border-terminal-green text-terminal-green hover:bg-terminal-green/20"
          } disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          {confirming ? "⚠ CONFIRM TRADE" : "EXECUTE TRADE"}
        </button>

        {status && (
          <div className="text-xs text-terminal-yellow font-mono text-center">{status}</div>
        )}
      </div>
    </div>
  );
}
