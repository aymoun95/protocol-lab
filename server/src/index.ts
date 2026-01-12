import cors from "cors";
import express from "express";
import { createServer } from "http";
import { setupWebSocket } from "./ws";

import longPolling from "./routes/long-polling";
import shortPolling from "./routes/short-polling";
import sse from "./routes/sse";
import webhook from "./routes/webhook";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/short-poll", shortPolling);
app.use("/long-poll", longPolling);
app.use("/sse", sse);
app.use("/webhook", webhook);

const httpServer = createServer(app);

// Unify HTTP and WebSocket on the same server/port
setupWebSocket(httpServer);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Unified server running on http://localhost:${PORT}`);
});
