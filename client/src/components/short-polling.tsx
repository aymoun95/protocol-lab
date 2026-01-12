import { Activity, Play, Square, Timer } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "../lib/utils";
import {
  ActionButton,
  LogContainer,
  LogEntry,
  ProtocolCard,
  ProtocolHeader,
  StatusBadge,
} from "./common";

import { API_BASE_URL } from "../config";

export function ShortPolling() {
  const [logs, setLogs] = useState<any[]>([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }

  function start() {
    if (running) return;
    setRunning(true);
    setLogs([]);

    intervalRef.current = setInterval(async () => {
      try {
        const timestamp = new Date().toLocaleTimeString();
        const res = await fetch(`${API_BASE_URL}/short-poll`);
        const data = await res.json();

        setLogs((l) => [...l, { ...data, timestamp, id: Math.random() }]);

        if (data.status === "done") {
          stop();
        }
      } catch (err) {
        setLogs((l) => [
          ...l,
          {
            status: "error",
            message: "Failed to poll",
            timestamp: new Date().toLocaleTimeString(),
            id: Math.random(),
          },
        ]);
        stop();
      }
    }, 2000);
  }

  const getStatusMessage = (log: any) => {
    if (log.status === "error") return "❌ Error";
    if (log.status === "done") return "✅ Done";
    return "⏳ Processing";
  };

  return (
    <ProtocolCard>
      <ProtocolHeader
        icon={Timer}
        iconColor="bg-amber-500/20 text-amber-500"
        title="Short Polling"
        description="Regular intervals (2s)"
        statusBadge={
          <StatusBadge
            icon={Activity}
            label={running ? "Polling" : "Idle"}
            active={running}
            activeColor="bg-amber-500/10 text-amber-500"
            animate={true}
          />
        }
      />

      <div className="flex gap-2 mb-4">
        {!running ? (
          <ActionButton
            icon={Play}
            label="Start"
            onClick={start}
            className="flex-1 bg-amber-600 hover:bg-amber-500"
            fillIcon={true}
          />
        ) : (
          <ActionButton
            icon={Square}
            label="Stop"
            onClick={stop}
            variant="secondary"
            className="flex-1 border border-amber-500/30 text-amber-500"
            fillIcon={true}
          />
        )}
      </div>

      <LogContainer
        logs={logs}
        scrollRef={scrollRef}
        emptyMessage="Waiting for data..."
        renderLog={(log) => (
          <LogEntry
            key={log.id}
            timestamp={log.timestamp}
            message={getStatusMessage(log)}
            timestampColor="text-amber-500/70"
            messageClassName={cn(
              log.status === "error" ? "text-red-400" : "text-slate-300"
            )}
          />
        )}
      />
    </ProtocolCard>
  );
}
