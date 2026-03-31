"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SpoilerProps {
  children: React.ReactNode;
}

export default function Spoiler({ children }: SpoilerProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Spoiler
        </span>
        <button
          onClick={() => setRevealed((v) => !v)}
          aria-pressed={revealed}
          aria-label={revealed ? "Hide spoiler content" : "Reveal spoiler content"}
          className="font-mono text-xs text-orange-600 underline underline-offset-2 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
        >
          {revealed ? "hide" : "reveal"}
        </button>
      </div>
      <div
        className={cn(
          "rounded-lg border border-border p-4 text-sm transition-all duration-200",
          revealed ? "opacity-100 blur-none" : "select-none opacity-40 blur-sm",
        )}
        aria-hidden={!revealed}
      >
        {children}
      </div>
    </div>
  );
}
