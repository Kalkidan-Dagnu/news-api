import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const authRoutes = Router();
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass1!
 *               role:
 *                 type: string
 *                 enum: [author, reader]
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email already exists
 */
authRoutes.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass1!
 *     responses:
 *       200:
 *         description: JWT returned
 *       401:
 *         description: Invalid credentials
 */
authRoutes.post("/login", login);

export default authRoutes;


