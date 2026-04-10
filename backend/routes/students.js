import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudents
} from "../controller/Student.controller.js";
const router = express.Router();
router.get("/", auth, getStudents);
router.get("/search", auth, searchStudents);
router.post("/", auth, addStudent);
router.put("/:id", auth, updateStudent);
router.delete("/:id", auth, deleteStudent);
export default router;
