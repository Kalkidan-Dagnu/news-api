import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json(
      errorResponse("Unauthorized", ["Missing or invalid token"])
    );
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    req.user = {
      id: decoded.sub,
      role: decoded.role
    };

    next();

  } catch {
    return res.status(401).json(
      errorResponse("Unauthorized", ["Invalid or expired token"])
    );
  }
};