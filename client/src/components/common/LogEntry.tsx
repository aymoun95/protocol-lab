import { cn } from "../../lib/utils";

interface LogEntryProps {
  timestamp: string;
  message: string;
  timestampColor: string;
  messageClassName?: string;
  borderColor?: string;
}

export function LogEntry({
  timestamp,
  message,
  timestampColor,
  messageClassName = "text-slate-300",
  borderColor,
}: LogEntryProps) {
  return (
    <div className={cn("log-entry", borderColor)}>
      <span className={`${timestampColor} mr-2`}>[{timestamp}]</span>
      <span className={messageClassName}>{message}</span>
    </div>
  );
}
