import { Task } from "../model/task.js";
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("student", "name email class");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addTask = async (req, res) => {
  try {
    const { title, description, student, dueDate } = req.body;

    if (!title || !student) {
      return res.status(400).json({ message: "Title and student are required" });
    }
    const task = await Task.create({
      title,
      description,
      student,
      dueDate,
      completed: false
    });
    const populated = await task.populate("student", "name email class");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, dueDate },
      { new: true }
    ).populate("student", "name email class");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
