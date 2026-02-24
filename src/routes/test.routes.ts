import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.get(
  "/author-only",
  authenticate,
  authorize("author"),
  (req, res) => {
    res.json({ message: "You are an author" });
  }
);

router.get(
  "/reader-only",
  authenticate,
  authorize("reader"),
  (req, res) => {
    res.json({ message: "You are a reader" });
  }
);

export default router;