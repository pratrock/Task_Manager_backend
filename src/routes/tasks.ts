import { Router } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import Task from "../models/Task";
import { Response } from "express";

const router = Router();

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId },
      order: [["dueDate", "ASC"]],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      userId: req.userId,
      status: "pending",
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      res.sendStatus(404);
      return;
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      res.sendStatus(404);
      return;
    }

    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
