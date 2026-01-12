import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  await new Promise((r) => setTimeout(r, 5000));

  res.json({
    status: "done",
    at: Date.now(),
  });
});

export default router;
