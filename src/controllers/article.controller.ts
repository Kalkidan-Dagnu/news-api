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

export const getMyArticles = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;

  const articles = await prisma.article.findMany({
    where: { authorId: req.user!.id },
    skip: (page - 1) * size,
    take: size,
    orderBy: { createdAt: "desc" }
  });

  const total = await prisma.article.count({
    where: { authorId: req.user!.id }
  });

  return res.json({
    Success: true,
    Message: "My Articles",
    Object: articles,
    PageNumber: page,
    PageSize: size,
    TotalSize: total,
    Errors: null
  });
};