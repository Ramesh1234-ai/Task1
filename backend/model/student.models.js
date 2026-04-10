import mongoose from "mongoose";
// User (Admin) Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
// Student Schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    class: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  {
    timestamps: true
  }
);
export const User = mongoose.model("User", userSchema);
export const Student = mongoose.model("Student", studentSchema);

