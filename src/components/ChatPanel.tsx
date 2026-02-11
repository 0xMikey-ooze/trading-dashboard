"use client";

import { useTambo, useTamboThreadInput } from "@tambo-ai/react";
import { useRef, useEffect } from "react";

export default function ChatPanel() {
  const { messages } = useTambo();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const suggestions = [
    "What's my balance?",
    "Show live games",
    "Any trades today?",
    "How are the bots doing?",
    "Show my P&L",
    "What opportunities are there?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.length === 0 && (
          <div className="space-y-4 pt-8">
            <div className="text-center">
              <div className="text-terminal-green font-mono text-lg font-bold glow-green mb-1">
                ⚡ TRADING TERMINAL
              </div>
              <div className="text-terminal-muted text-xs">
                Ask me about your trades, balances, or bot status
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setValue(s);
                    setTimeout(() => submit(), 50);
                  }}
                  className="text-xs px-3 py-1.5 rounded-full border border-terminal-border text-terminal-muted hover:text-terminal-green hover:border-terminal-green/50 transition-colors font-mono"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.role === "user" ? "ml-8" : "mr-8"
            }`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-terminal-blue/10 border border-terminal-blue/30 text-terminal-text ml-auto"
                  : "bg-terminal-card border border-terminal-border text-terminal-text"
              }`}
            >
              {Array.isArray(msg.content)
                ? msg.content.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <p key={i} className="font-mono text-xs leading-relaxed">
                          {part.text}
                        </p>
                      );
                    }
                    if ("renderedComponent" in part && (part as any).renderedComponent) {
                      return <div key={i} className="mt-2">{(part as any).renderedComponent}</div>;
                    }
                    return null;
                  })
                : msg.content && (
                    <p className="font-mono text-xs leading-relaxed">{String(msg.content)}</p>
                  )}
            </div>
          </div>
        ))}

        {isPending && (
          <div className="flex items-center gap-2 text-terminal-muted text-xs font-mono">
            <span className="animate-pulse">●</span> Processing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-terminal-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about trades, balances, live games..."
            className="flex-1 bg-terminal-bg border border-terminal-border rounded-lg px-3 py-2 font-mono text-sm text-terminal-text placeholder:text-terminal-muted/50 focus:border-terminal-green/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPending || !value.trim()}
            className="px-4 py-2 rounded-lg bg-terminal-green/10 border border-terminal-green/30 text-terminal-green font-mono text-sm font-bold hover:bg-terminal-green/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ↵
          </button>
        </form>
      </div>
    </div>
  );
}
