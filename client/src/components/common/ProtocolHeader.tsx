import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ProtocolHeaderProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  statusBadge: ReactNode;
}

export function ProtocolHeader({
  icon: Icon,
  iconColor,
  title,
  description,
  statusBadge,
}: ProtocolHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${iconColor} rounded-lg`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      {statusBadge}
    </div>
  );
}
