import { Activity, Play, Radio, Square, Wifi } from "lucide-react";
import { useRef, useState } from "react";
import {
  ActionButton,
  LogContainer,
  LogEntry,
  ProtocolCard,
  ProtocolHeader,
  StatusBadge,
} from "./common";

import { API_BASE_URL } from "../config";

export function SSE() {
  const [events, setEvents] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const esRef = useRef<EventSource | null>(null);

  function disconnect() {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setConnected(false);
  }

  function connect() {
    if (connected) return;
    const es = new EventSource(`${API_BASE_URL}/sse`);
    esRef.current = es;
    setConnected(true);

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const timestamp = new Date().toLocaleTimeString();
      setEvents((ev) => [...ev, { ...data, timestamp, id: Math.random() }]);
    };

    es.onerror = () => {
      disconnect();
    };
  }

  return (
    <ProtocolCard borderColor="border-blue-500/20">
      <ProtocolHeader
        icon={Radio}
        iconColor="bg-blue-500/20 text-blue-500"
        title="SSE"
        description="Uni-directional"
        statusBadge={
          <StatusBadge
            icon={connected ? Wifi : Activity}
            label={connected ? "Connected" : "Disconnected"}
            active={connected}
            activeColor="bg-blue-500/10 text-blue-500"
          />
        }
      />

      <div className="flex gap-2 mb-4">
        {!connected ? (
          <ActionButton
            icon={Play}
            label="Connect"
            onClick={connect}
            className="flex-1 bg-blue-600 hover:bg-blue-500"
            fillIcon={true}
          />
        ) : (
          <ActionButton
            icon={Square}
            label="Disconnect"
            onClick={disconnect}
            variant="secondary"
            className="flex-1 border border-blue-500/30 text-blue-500"
            fillIcon={true}
          />
        )}
      </div>

      <LogContainer
        logs={events}
        scrollRef={scrollRef}
        emptyMessage="Waiting for events..."
        renderLog={(ev) => (
          <LogEntry
            key={ev.id}
            timestamp={ev.timestamp}
            message={`message: ${ev.count}`}
            timestampColor="text-blue-400/70"
            messageClassName="text-slate-300"
            borderColor="border-blue-500/10"
          />
        )}
      />
    </ProtocolCard>
  );
}
