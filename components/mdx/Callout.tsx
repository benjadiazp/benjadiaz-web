import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const styles: Record<string, string> = {
  info: "border-blue-300 bg-blue-50/80 dark:border-blue-500/30 dark:bg-blue-500/10",
  warning:
    "border-amber-300 bg-amber-50/80 dark:border-amber-500/30 dark:bg-amber-500/10",
  tip: "border-green-300 bg-green-50/80 dark:border-green-500/30 dark:bg-green-500/10",
};

const typeConfig: Record<
  NonNullable<CalloutProps["type"]>,
  { Icon: typeof Info; label: string; iconColor: string }
> = {
  info: { Icon: Info, label: "Info", iconColor: "text-blue-600 dark:text-blue-400" },
  warning: { Icon: AlertTriangle, label: "Warning", iconColor: "text-amber-600 dark:text-amber-400" },
  tip: { Icon: Lightbulb, label: "Tip", iconColor: "text-green-600 dark:text-green-400" },
};

export default function Callout({ type = "info", children }: CalloutProps) {
  const { Icon, label, iconColor } = typeConfig[type];
  return (
    <aside
      className={cn(
        "my-6 rounded-lg border-l-4 p-4 text-sm",
        styles[type],
      )}
      role="note"
      aria-label={`${label} callout`}
    >
      <div className={cn("mb-2 flex items-center gap-1.5 font-semibold", iconColor)}>
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span>{label}</span>
      </div>
      {children}
    </aside>
  );
}
