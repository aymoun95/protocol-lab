import type { ReactNode } from "react";

interface ProtocolCardProps {
  children: ReactNode;
  borderColor?: string;
}

export function ProtocolCard({ children, borderColor }: ProtocolCardProps) {
  return (
    <div className={`glass-card p-6 h-full flex flex-col ${borderColor || ""}`}>
      {children}
    </div>
  );
}
