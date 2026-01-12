import type { ReactNode, RefObject } from "react";
import { useEffect } from "react";

interface LogContainerProps {
  logs: any[];
  scrollRef: RefObject<HTMLDivElement | null>;
  emptyMessage?: string;
  renderLog: (log: any) => ReactNode;
}

export function LogContainer({
  logs,
  scrollRef,
  emptyMessage = "Waiting for data...",
  renderLog,
}: LogContainerProps) {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, scrollRef]);

  return (
    <div ref={scrollRef} className="log-container flex-1 min-h-[200px]">
      {logs.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">
          {emptyMessage}
        </div>
      ) : (
        logs.map(renderLog)
      )}
    </div>
  );
}
