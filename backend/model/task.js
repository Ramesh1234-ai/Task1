import mongoose from "mongoose";
// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);
export const Task =mongoose.model("Task",taskSchema)