import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import articleRoutes from "./routes/article.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/articles", articleRoutes);
export default app;