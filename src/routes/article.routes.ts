import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createArticle, deleteArticle, getMyArticles, updateArticle } from "../controllers/article.controller";

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

export default articleRouter;