import { useState, useEffect } from "react";

export default function StudentList({ students, onDelete }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(students);

  useEffect(() => {
    const result = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, students]);

  return (
    <div className="list-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search students by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-message">No students found</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Age</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.age || "-"}</td>
                <td>{student.email || "-"}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(student._id)}
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
