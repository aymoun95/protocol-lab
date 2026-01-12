import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  activeColor: string;
  animate?: boolean;
}

export function StatusBadge({
  icon: Icon,
  label,
  active,
  activeColor,
  animate = false,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "status-badge",
        active ? activeColor : "bg-slate-800 text-slate-500"
      )}
    >
      <Icon size={12} className={animate && active ? "animate-pulse" : ""} />
      {label}
    </div>
  );
}
