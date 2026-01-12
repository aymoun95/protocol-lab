import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  fillIcon?: boolean;
}

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  fillIcon = false,
}: ActionButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      <Icon size={18} fill={fillIcon ? "currentColor" : "none"} />
      {label}
    </button>
  );
}
