import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from "../controller/Task.controller.js";

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, addTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
