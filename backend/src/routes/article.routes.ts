import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authenticateOptional } from "../middleware/optionalAuth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createArticle, deleteArticle, getMyArticles, getPublicArticles, updateArticle, getDashboard} from "../controllers/article.controller";
import { getArticleById } from "../controllers/auth.controller";

const articleRouter = Router();
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create new article (Author only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Breaking News
 *               content:
 *                 type: string
 *                 example: This is a detailed article content...
 *               category:
 *                 type: string
 *                 example: Tech
 *               status:
 *                 type: string
 *                 enum: [Draft, Published]
 *     responses:
 *       201:
 *         description: Article created
 *       403:
 *         description: Forbidden
 */
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

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Update article (Author only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article updated
 *       403:
 *         description: Forbidden
 */
articleRouter.put(
    "/:id", 
    authenticate, 
    authorize("author"), 
    updateArticle
);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Soft delete article (Author only)
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article soft deleted
 *       403:
 *         description: Forbidden
 */
articleRouter.delete(
    "/:id", authenticate, 
    authorize("author"), 
    deleteArticle
);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get published articles (public)
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
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of articles
 */  articleRouter.get(
    "/", 
    getPublicArticles
);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get single article by ID (tracks read)
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article returned
 *       404:
 *         description: Article not found or deleted
 */
articleRouter.get(
    "/:id", 
    authenticateOptional, 
    getArticleById
);

/**
 * @swagger
 * /author/dashboard:
 *   get:
 *     summary: Get author performance dashboard
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Author analytics returned
 */
articleRouter.get(
  "/dashboard",
  authenticate,
  authorize("author"),
  getDashboard
);



export default articleRouter;