import cors from "cors";
import express from "express";
import { createServer } from "http";

import longPolling from "./routes/long-polling";
import shortPolling from "./routes/short-polling";
import sse from "./routes/sse";
import webhook from "./routes/webhook";
import { setupWebSocket } from "./routes/ws";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/short-poll", shortPolling);
app.use("/long-poll", longPolling);
app.use("/sse", sse);
app.use("/webhook", webhook);

app.use((req, res) => {
  res.redirect("/health");
});

const httpServer = createServer(app);

setupWebSocket(httpServer);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Unified server running on PORT: ${PORT}`);
});
