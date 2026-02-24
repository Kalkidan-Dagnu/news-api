import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createArticle } from "../controllers/article.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("author"),
  createArticle
);

export default router;