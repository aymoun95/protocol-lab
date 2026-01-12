import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Webhook received:", req.body);
  res.send("OK");
});

export default router;
