const KALSHI_URL = process.env.KALSHI_BOT_URL || "https://kalshi-bot-production-ab13.up.railway.app";
const SNIPER_URL = process.env.SNIPER_BOT_URL || "https://sniper-v2-production.up.railway.app";

async function fetchJSON(url: string) {
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

// Sniper V2 API
export async function getSniperSummary() {
  return fetchJSON(`${SNIPER_URL}/summary`);
}

export async function getSniperTrades() {
  return fetchJSON(`${SNIPER_URL}/trades`);
}

// Kalshi Bot API
export async function getKalshiStatus() {
  return fetchJSON(`${KALSHI_URL}/api/status`);
}

export async function getKalshiBalance() {
  return fetchJSON(`${KALSHI_URL}/api/balance`);
}

export async function getKalshiTrades() {
  return fetchJSON(`${KALSHI_URL}/api/trades`);
}

export async function getKalshiOpportunities() {
  return fetchJSON(`${KALSHI_URL}/api/opportunities`);
}

// Combined fetchers
export async function getAllBalances() {
  const [kalshi, sniper] = await Promise.all([
    getKalshiBalance(),
    getSniperSummary(),
  ]);
  return {
    kalshi: {
      balance: kalshi.balance,
      portfolioValue: kalshi.portfolio_value,
      totalDeposited: kalshi.total_deposited,
      demo: kalshi.demo,
    },
    sniper: {
      balance: sniper.balance,
      openTradeValue: sniper.openTradeValue,
      totalAccessible: sniper.totalAccessible,
    },
    combined: {
      totalBalance: kalshi.balance + sniper.balance,
      totalPortfolio: kalshi.portfolio_value + sniper.openTradeValue,
    },
  };
}

export async function getAllBotStatus() {
  const [kalshi, sniper] = await Promise.all([
    getKalshiStatus(),
    getSniperSummary(),
  ]);
  return {
    kalshi: {
      scanning: kalshi.scanning,
      totalScans: kalshi.total_scans,
      totalMarketsScanned: kalshi.total_markets_scanned,
      lastScan: kalshi.last_scan,
    },
    sniper: {
      running: sniper.status.running,
      uptime: sniper.status.uptime,
      dryRun: sniper.status.dryRun,
      sportsWs: sniper.status.sportsWs,
      clobWs: sniper.status.clobWs,
      liveGames: sniper.status.liveGames,
      knownMarkets: sniper.status.knownMarkets,
      scans: sniper.status.scans,
    },
  };
}
