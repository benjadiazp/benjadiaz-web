import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Globe,
  Github,
  Package,
  Play,
  FileText,
  Rocket,
  Gamepad2,
  Youtube,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import type { ExternalLink, LinkType } from "@/lib/content-types";

const iconByType: Record<LinkType, React.ComponentType<{ className?: string }>> =
  {
    website: Globe,
    github: Github,
    npm: Package,
    video: Play,
    article: FileText,
    demo: Rocket,
    itchio: Gamepad2,
    youtube: Youtube,
    tiktok: ExternalLinkIcon,
    instagram: ExternalLinkIcon,
  };

const isSafeUrl = (url: string) => /^https?:\/\//.test(url);

export default function ProjectLink({ link }: { link: ExternalLink }) {
  if (!isSafeUrl(link.url)) return null;
  const Icon = iconByType[link.type];

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} (opens in new tab)`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-200/80 bg-orange-50/80 px-3 py-1.5 font-mono text-sm font-semibold text-orange-600 transition-all hover:bg-orange-100 hover:shadow-sm dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20">
        {link.icon ? (
          <Image
            src={link.icon}
            alt=""
            width={14}
            height={14}
            className="inline h-3.5 w-3.5"
          />
        ) : (
          <Icon aria-hidden="true" className="inline h-3.5 w-3.5" />
        )}
        {link.label}
        <ArrowUpRight aria-hidden="true" className="inline h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
