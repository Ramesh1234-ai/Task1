import { useState } from "react";

export default function TaskList({ tasks, students, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const getStudentName = (studentId) => {
    const student = students.find(s => s._id === studentId);
    return student?.name || "Unknown";
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="list-container">
      <div className="filter-box">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-message">No tasks found</p>
      ) : (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Student</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className={task.completed ? "completed-row" : ""}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task._id, !task.completed)}
                    className="task-checkbox"
                  />
                </td>
                <td>
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                </td>
                <td>{getStudentName(task.student)}</td>
                <td>{formatDate(task.dueDate)}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
