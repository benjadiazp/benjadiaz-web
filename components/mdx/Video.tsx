import { cn } from "@/lib/utils";

type AspectRatio = "16:9" | "9:16" | "4:3" | "1:1";

interface VideoProps {
  src: string;
  aspectRatio?: AspectRatio;
  title?: string;
  poster?: string;
}

const aspectClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-[16/9]",
  "9:16": "aspect-[9/16] max-w-sm mx-auto",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? null;
}

export default function Video({
  src,
  aspectRatio = "16:9",
  title,
  poster,
}: VideoProps) {
  const youtubeId = getYouTubeId(src);
  const vimeoId = getVimeoId(src);
  const classes = cn(
    "w-full overflow-hidden rounded-lg",
    aspectClasses[aspectRatio],
  );

  if (youtubeId) {
    return (
      <div className={classes}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title ?? "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className={classes}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={title ?? src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={classes}>
      <video
        src={src}
        title={title}
        aria-label={title ?? "Video player"}
        poster={poster}
        controls
        preload="metadata"
        className="h-full w-full rounded-lg object-contain"
      >
        {/* Add <track kind="captions" src="..." srclang="en" label="English"> when a caption file is available */}
      </video>
    </div>
  );
}
