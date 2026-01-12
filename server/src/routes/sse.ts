import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let count = 0;

  const id = setInterval(() => {
    res.write(`data: ${JSON.stringify({ count })}\n\n`);
    count++;
  }, 1000);

  req.on("close", () => {
    clearInterval(id);
    res.end();
  });
});

export default router;
