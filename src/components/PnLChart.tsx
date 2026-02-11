"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface PnLDataPoint {
  date: string;
  pnl: number;
  cumulative: number;
}

interface PnLChartProps {
  data?: PnLDataPoint[];
  title?: string;
}

export default function PnLChart({ data = [], title = "P&L Over Time" }: PnLChartProps) {
  return (
    <div className="card">
      <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider mb-3">
        {title}
      </h2>

      {data.length === 0 ? (
        <div className="text-center text-terminal-muted py-10 font-mono text-sm">
          No P&L data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#666", fontSize: 10, fontFamily: "JetBrains Mono" }}
              stroke="#1a1a1a"
            />
            <YAxis
              tick={{ fill: "#666", fontSize: 10, fontFamily: "JetBrains Mono" }}
              stroke="#1a1a1a"
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 11,
              }}
              labelStyle={{ color: "#666" }}
            />
            <ReferenceLine y={0} stroke="#333" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="cumulative"
              stroke="#00ff88"
              strokeWidth={2}
              dot={false}
              name="Cumulative P&L"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
