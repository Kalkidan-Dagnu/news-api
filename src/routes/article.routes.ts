import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authenticateOptional } from "../middleware/optionalAuth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createArticle, deleteArticle, getMyArticles, getPublicArticles, updateArticle } from "../controllers/article.controller";
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

export default articleRouter;