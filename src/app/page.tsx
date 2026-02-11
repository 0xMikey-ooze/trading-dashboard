"use client";

import { TamboProvider } from "@tambo-ai/react";
import { tamboComponents } from "@/lib/tambo-config";
import { tamboTools } from "@/lib/tambo-tools";
import ChatPanel from "@/components/ChatPanel";
import Dashboard from "@/components/Dashboard";

const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY || "";

export default function Home() {
  return (
    <TamboProvider
      components={tamboComponents}
      tools={tamboTools}
      apiKey={apiKey}
    >
      <div className="h-screen flex">
        {/* Dashboard - left side */}
        <div className="flex-1 overflow-y-auto p-4">
          <Dashboard />
        </div>

        {/* Chat - right side */}
        <div className="w-[420px] border-l border-terminal-border flex flex-col bg-terminal-bg">
          <div className="border-b border-terminal-border px-4 py-2">
            <span className="font-mono text-xs text-terminal-green font-bold">
              ⚡ AI TERMINAL
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      </div>
    </TamboProvider>
  );
}
