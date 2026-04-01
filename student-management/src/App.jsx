import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState(""); // ✅ NEW
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/students";

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(API_URL)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  // Add or Update student
  const handleSubmit = (e) => {
    e.preventDefault();

    const student = { name, email, course }; // ✅ UPDATED

    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, student)
        .then(() => {
          fetchStudents();
          resetForm();
        });
    } else {
      axios.post(API_URL, student)
        .then(() => {
          fetchStudents();
          resetForm();
        });
    }
  };

  // Delete student
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchStudents());
  };

  // Edit student
  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course); // ✅ NEW
    setEditingId(student.id);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCourse(""); // ✅ NEW
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* ✅ NEW Course Field */}
        <input
          type="text"
          placeholder="Enter course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Add"} Student
        </button>
      </form>

      <hr />

      {/* Student Table */}
      <h2>Students List</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left"
          }}
        >
          <thead style={{ backgroundColor: "#353fcb", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    style={{ marginLeft: "10px" }}
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

export default App;