import { Activity, Hourglass, Play } from "lucide-react";
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

export function LongPolling() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function start() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/long-poll`);
      const data = await res.json();
      const timestamp = new Date().toLocaleTimeString();
      setMessages((m) => [...m, { ...data, timestamp, id: Math.random() }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          status: "error",
          message: "Timeout or Error",
          timestamp: new Date().toLocaleTimeString(),
          id: Math.random(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtocolCard borderColor="border-emerald-500/20">
      <ProtocolHeader
        icon={Hourglass}
        iconColor="bg-emerald-500/20 text-emerald-500"
        title="Long Polling"
        description="Keep-alive requests"
        statusBadge={
          <StatusBadge
            icon={Activity}
            label={loading ? "Waiting" : "Ready"}
            active={loading}
            activeColor="bg-emerald-500/10 text-emerald-500"
            animate={true}
          />
        }
      />

      <ActionButton
        icon={Play}
        label={loading ? "Awaiting Data..." : "Fetch Next Message"}
        onClick={start}
        disabled={loading}
        className="mb-4 bg-emerald-600 hover:bg-emerald-500"
        fillIcon={true}
      />

      <LogContainer
        logs={messages}
        scrollRef={scrollRef}
        emptyMessage="No messages yet"
        renderLog={(m) => (
          <LogEntry
            key={m.id}
            timestamp={m.timestamp}
            message={JSON.stringify(m.status || m.message)}
            timestampColor="text-emerald-500/70"
            messageClassName={cn(
              m.status === "error" ? "text-red-400" : "text-slate-300"
            )}
            borderColor="border-emerald-500/10"
          />
        )}
      />
    </ProtocolCard>
  );
}
