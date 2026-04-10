import { useState } from "react";

export default function AddTask({ students, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    student: "",
    dueDate: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.student) {
      alert("Title and student are required");
      return;
    }

    setLoading(true);
    try {
      await onAdd(formData);
      setFormData({ title: "", description: "", student: "", dueDate: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Task Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Assign to Student *</label>
          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.class})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
