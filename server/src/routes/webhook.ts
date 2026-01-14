import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.send("Webhook received successfully! 🚀");
});

export default router;
