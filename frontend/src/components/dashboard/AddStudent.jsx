import { useState } from "react";

export default function AddStudent({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    age: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.class) {
      alert("Name and class are required");
      return;
    }

    setLoading(true);
    try {
      await onAdd(formData);
      setFormData({ name: "", class: "", age: "", email: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
        />
      </div>

      <div className="form-group">
        <label>Class *</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Enter class (e.g., 10-A)"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}
