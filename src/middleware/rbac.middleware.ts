import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { errorResponse } from "../utils/response";

export const authorize = (role: "author" | "reader") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json(
        errorResponse("Forbidden", ["Access denied"])
      );
    }

    next();
  };
};