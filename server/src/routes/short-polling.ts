import { Router } from "express";

const router = Router();
let attempts = 0;

router.get("/", (req, res) => {
  attempts++;

  if (attempts <= 3) {
    return res.status(202).json({
      status: "processing",
      attempt: attempts,
    });
  }
  attempts = 0;
  res.json({
    status: "done",
    result: "Job finished 🎉",
  });
});

export default router;
