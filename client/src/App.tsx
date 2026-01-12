import { Github, Layers } from "lucide-react";
import { LongPolling } from "./components/long-polling";
import { ShortPolling } from "./components/short-polling";
import { SSE } from "./components/sse";
import { ChatSocketIO } from "./components/ws";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex justify-between items-center p-6 md:px-12 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Layers className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Protocol Lab
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Real-time Communication Sandbox
            </p>
          </div>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <Github size={24} className="text-slate-400" />
        </a>
      </header>

      <main className="flex-1 w-full flex flex-row gap-0 overflow-x-auto px-4 md:px-12 pb-6 custom-scrollbar">
        <div className="protocol-lane">
          <ShortPolling />
        </div>
        <div className="protocol-lane pl-4">
          <LongPolling />
        </div>
        <div className="protocol-lane pl-4">
          <SSE />
        </div>
        <div className="protocol-lane pl-4">
          <ChatSocketIO />
        </div>
      </main>

      <footer className="shrink-0 p-6 md:px-12 text-slate-500 text-xs border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Protocol Lab. Real-time Communication Sandbox.</p>
        <div className="flex gap-6">
          <span className="flex items-center gap-2 italic">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Server: Connected
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
