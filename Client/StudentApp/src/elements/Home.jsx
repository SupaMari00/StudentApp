import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = () => {
    axios
      .get("/api/students")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchStudents();
      })
      .catch((err) => console.log(err));
  }

  const filteredData = data.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      String(student.age).includes(query) ||
      student.gender.toLowerCase().includes(query)
    );
  });

  const initials = (name) =>
    name
      .split(" ")
      .map((part) => part[0] || "")
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="app-shell">
      <div className="page-header mb-4">
        <div>
          <h1>Students</h1>
          <p className="page-subtitle">Manage and view student information.</p>
        </div>
        <Link className="btn btn-primary btn-create" to="/create">
          + Create Student
        </Link>
      </div>

      <div className="row align-items-center mb-4 gy-3">
        <div className="col-md-6">
          <div className="search-box">
            <input
              type="search"
              className="form-control"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card card-surface table-card">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredData.map((student) => (
                  <tr key={student.id} className="student-row">
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-badge">{initials(student.name)}</div>
                        <div>
                          <div className="fw-bold">{student.name}</div>
                          <div className="text-muted small">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <span
                        className={`gender-badge ${
                          student.gender.toLowerCase() === "male"
                            ? "gender-male"
                            : "gender-female"
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/read/${student.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Read
                      </Link>
                      <Link
                        to={`/edit/${student.id}`}
                        className="btn btn-sm btn-outline-secondary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;