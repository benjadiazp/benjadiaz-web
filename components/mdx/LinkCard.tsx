import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardBase, cardHover } from "@/lib/styles";

interface LinkCardProps {
  href: string;
  title: string;
  description?: string;
}

const isSafeUrl = (url: string) =>
  /^https?:\/\//.test(url) || /^mailto:/.test(url);

export default function LinkCard({ href, title, description }: LinkCardProps) {
  if (!isSafeUrl(href)) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (opens in new tab)`}
      className={cn(cardBase, cardHover, "my-4 block p-4 no-underline")}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-orange-600 dark:text-orange-400">
        {title}
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      </span>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </a>
  );
}
