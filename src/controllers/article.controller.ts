import { Response } from "express";
import { prisma } from "../config/prisma";
import { successResponse, errorResponse } from "../utils/response";
import { createArticleSchema } from "../validators/article.validator";
import { AuthRequest } from "../middleware/auth.middleware";

export const createArticle = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = createArticleSchema.parse(req.body);

    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status ?? "Draft",
        authorId: req.user!.id
      }
    });

    return res.json(successResponse("Article created", article));

  } catch (err: any) {
    return res.status(400).json(
      errorResponse("Validation Error", [err.message])
    );
  }
};