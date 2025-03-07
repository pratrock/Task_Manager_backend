import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import tasksRouter from "./routes/tasks";
import { errorHandler } from "./middleware/errorHandler";
import { authenticateToken } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticateToken, tasksRouter);

app.use(errorHandler);

export default app;
