"use client";

import { useState } from "react";
import { Play, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardBase, cardHover } from "@/lib/styles";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

interface VideoPreviewProps {
  src: string;
  title?: string;
  label?: string;
}

export default function VideoPreview({
  src,
  title = "Watch the video",
  label = "YouTube Short",
}: VideoPreviewProps) {
  const [open, setOpen] = useState(false);
  const youtubeId = getYouTubeId(src);

  return (
    <div className="my-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          cardBase,
          cardHover,
          "flex w-full items-center gap-4 px-4 py-3 text-left transition-all",
          open && "rounded-b-none border-b-0",
        )}
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} video: ${title}`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/15 dark:text-red-400">
          <Play aria-hidden="true" className="h-4 w-4 fill-current" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </span>
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </span>
        <span className="ml-auto shrink-0 text-gray-400 dark:text-gray-500">
          {open ? (
            <ChevronUp aria-hidden="true" className="h-4 w-4" />
          ) : (
            <ChevronDown aria-hidden="true" className="h-4 w-4" />
          )}
        </span>
      </button>

      {open && youtubeId && (
        <div
          className={cn(
            cardBase,
            "rounded-t-none border-t-0 p-4",
          )}
        >
          <div className="aspect-[9/16] w-full max-w-[260px] mx-auto overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
