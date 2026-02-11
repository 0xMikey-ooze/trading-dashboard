"use client";

interface LiveGame {
  league: string;
  game: string;
  score: string;
  period: string;
}

interface LiveGamesBoardProps {
  games?: LiveGame[];
}

export default function LiveGamesBoard({ games = [] }: LiveGamesBoardProps) {
  const leagues = [...new Set(games.map((g) => g.league))];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-sans text-sm text-terminal-muted uppercase tracking-wider">
          Live Games
        </h2>
        <span className="text-xs font-mono text-terminal-green">{games.length} LIVE</span>
      </div>

      {games.length === 0 ? (
        <div className="text-center text-terminal-muted py-6 font-mono text-sm">
          No live games
        </div>
      ) : (
        <div className="space-y-3">
          {leagues.map((league) => (
            <div key={league}>
              <div className="text-[10px] uppercase text-terminal-blue font-mono font-bold mb-1">
                {league}
              </div>
              <div className="space-y-1">
                {games
                  .filter((g) => g.league === league)
                  .map((g, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-terminal-bg rounded px-3 py-1.5 border border-terminal-border/50 font-mono text-xs"
                    >
                      <span className="text-terminal-text truncate flex-1">{g.game}</span>
                      <span className="text-terminal-green font-bold mx-3">{g.score}</span>
                      <span className="text-terminal-yellow text-[10px] w-8 text-right">
                        {g.period}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
