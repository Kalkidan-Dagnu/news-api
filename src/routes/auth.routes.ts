import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signup);

export default authRoutes;

authRoutes.post("/login", login);