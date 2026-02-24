import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema } from "../validators/auth.validator";
import { successResponse, errorResponse } from "../utils/response";

export const signup = async (req: Request, res: Response) => {
  try {
    const data = signupSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existing) {
      return res.status(409).json(
        errorResponse("Conflict", ["Email already exists"])
      );
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: data.role
      }
    });

    return res.json(successResponse("User created", user));

  } catch (err: any) {
    return res.status(400).json(
      errorResponse("Validation Error", [err.message])
    );
  }
};