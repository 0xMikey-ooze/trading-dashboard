# ⚡ Trading Terminal

AI-powered trading dashboard built with Next.js + Tambo AI SDK. Connects to Kalshi Bot and Sniper V2 trading bots with a conversational UI.

## Features

- **Real-time Dashboard** — Balance, positions, P&L, live games, bot status
- **AI Chat Interface** — Ask questions in natural language, get rendered components
- **Dual Bot Support** — Kalshi (prediction markets) + Sniper V2 (Polymarket sports)
- **Bloomberg Aesthetic** — Dark terminal theme with JetBrains Mono

## Setup

```bash
npm install
cp .env.local.example .env.local  # Edit with your keys
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_TAMBO_API_KEY` | Tambo AI API key (get from tambo.co) |
| `KALSHI_BOT_URL` | Kalshi bot URL (default: production Railway) |
| `SNIPER_BOT_URL` | Sniper V2 URL (default: production Railway) |

## Chat Commands

- "What's my balance?" → BalanceCard
- "Show live games" → LiveGamesBoard
- "Any trades today?" → TradeHistory
- "How are the bots doing?" → BotStatusPanel
- "Show my P&L" → PnLChart
- "What opportunities are there?" → OpportunityScanner

## Deploy to Railway

```bash
railway login
railway init
railway up
```

Set env vars in Railway dashboard.

## Tech Stack

- Next.js 15 + React 19
- Tambo AI SDK (`@tambo-ai/react`)
- Recharts for data visualization
- Tailwind CSS with Bloomberg-style theme
- TypeScript + Zod schemas
