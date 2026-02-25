import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authenticateOptional } from "../middleware/optionalAuth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createArticle, deleteArticle, getMyArticles, getPublicArticles, updateArticle, getDashboard} from "../controllers/article.controller";
import { getArticleById } from "../controllers/auth.controller";

const articleRouter = Router();

articleRouter.post(
    "/",
    authenticate,
    authorize("author"),
    createArticle
);

articleRouter.get(
    "/me", 
    authenticate, 
    authorize("author"), 
    getMyArticles
);

articleRouter.put(
    "/:id", 
    authenticate, 
    authorize("author"), 
    updateArticle
);

articleRouter.delete(
    "/:id", authenticate, 
    authorize("author"), 
    deleteArticle
);

// Public access
articleRouter.get(
    "/", 
    getPublicArticles
);

articleRouter.get(
    "/:id", 
    authenticateOptional, 
    getArticleById
);

articleRouter.get(
  "/dashboard",
  authenticate,
  authorize("author"),
  getDashboard
);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get public published articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Partial author name match
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search in title
 *     responses:
 *       200:
 *         description: List of articles
 */

export default articleRouter;