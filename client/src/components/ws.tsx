import { Send, Wifi, WifiOff, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../config";
import {
  ActionButton,
  LogContainer,
  LogEntry,
  ProtocolCard,
  ProtocolHeader,
  StatusBadge,
} from "./common";

export function ChatSocketIO() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<
    { msg: string; timestamp: string; id: number }[]
  >([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function connect() {
    if (connected) return;
    socketRef.current = io(API_BASE_URL);

    socketRef.current.on("connect", () => setConnected(true));
    socketRef.current.on("disconnect", () => setConnected(false));

    socketRef.current.on("chat message", (msg: string) => {
      setMessages((m) => [
        ...m,
        { msg, timestamp: new Date().toLocaleTimeString(), id: Math.random() },
      ]);
    });
  }

  function disconnect() {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setConnected(false);
  }

  function send() {
    if (!socketRef.current || !input.trim()) return;
    socketRef.current.emit("chat message", input);
    setInput("");
  }

  return (
    <ProtocolCard borderColor="border-purple-500/20">
      <ProtocolHeader
        icon={Zap}
        iconColor="bg-purple-500/20 text-purple-500"
        title="WebSockets"
        description="Bi-directional, Real-time"
        statusBadge={
          <StatusBadge
            icon={connected ? Wifi : WifiOff}
            label={connected ? "Live" : "Offline"}
            active={connected}
            activeColor="bg-purple-500/10 text-purple-500"
          />
        }
      />

      {!connected ? (
        <ActionButton
          icon={Zap}
          label="Initialize Connection"
          onClick={connect}
          className="w-full bg-purple-600 hover:bg-purple-500 mb-4"
          fillIcon={true}
        />
      ) : (
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
          <LogContainer
            logs={messages}
            scrollRef={scrollRef}
            emptyMessage="Connected! Send a message to start."
            renderLog={(m) => (
              <LogEntry
                key={m.id}
                timestamp={m.timestamp}
                message={m.msg}
                timestampColor="text-purple-400/70 text-[10px]"
                messageClassName="text-slate-200"
                borderColor="border-purple-500/10"
              />
            )}
          />

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type message..."
              className="flex-1 bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>

          <button
            onClick={disconnect}
            className="text-[10px] text-slate-500 hover:text-red-400 text-center uppercase tracking-wider"
          >
            Close Connection
          </button>
        </div>
      )}
    </ProtocolCard>
  );
}
