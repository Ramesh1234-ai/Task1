import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { studentAPI, taskAPI } from "../../services/api.js";
import StudentList from "./StudentList.jsx";
import TaskList from "./TaskList.jsx";
import AddStudent from "./AddStudent.jsx";
import AddTask from "./AddTask.jsx";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsRes, tasksRes] = await Promise.all([
        studentAPI.getAll(),
        taskAPI.getAll()
      ]);
      setStudents(studentsRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      showMessage("Error loading data");
    }
    setLoading(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddStudent = async (studentData) => {
    try {
      await studentAPI.add(studentData);
      loadData();
      setShowAddStudent(false);
      showMessage("Student added successfully");
    } catch (err) {
      showMessage(err.response?.data?.message || "Error adding student");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await studentAPI.delete(id);
      loadData();
      showMessage("Student deleted successfully");
    } catch (err) {
      showMessage("Error deleting student");
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await taskAPI.add(taskData);
      loadData();
      setShowAddTask(false);
      showMessage("Task added successfully");
    } catch (err) {
      showMessage(err.response?.data?.message || "Error adding task");
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      await taskAPI.update(id, { completed });
      loadData();
      showMessage("Task updated successfully");
    } catch (err) {
      showMessage("Error updating task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await taskAPI.delete(id);
      loadData();
      showMessage("Task deleted successfully");
    } catch (err) {
      showMessage("Error deleting task");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>School Management System</h1>
          <p>Admin Dashboard</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {message && <div className="message">{message}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Students</h2>
              <button
                className="btn-primary"
                onClick={() => setShowAddStudent(!showAddStudent)}
              >
                {showAddStudent ? "Cancel" : "+ Add Student"}
              </button>
            </div>

            {showAddStudent && (
              <AddStudent onAdd={handleAddStudent} />
            )}

            <StudentList
              students={students}
              onDelete={handleDeleteStudent}
            />
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Assignments / Tasks</h2>
              <button
                className="btn-primary"
                onClick={() => setShowAddTask(!showAddTask)}
              >
                {showAddTask ? "Cancel" : "+ Add Task"}
              </button>
            </div>

            {showAddTask && (
              <AddTask students={students} onAdd={handleAddTask} />
            )}

            <TaskList
              tasks={tasks}
              students={students}
              onToggle={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}
