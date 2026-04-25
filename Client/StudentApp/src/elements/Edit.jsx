import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/get_student/${id}`)
      .then((res) => {
        const result = res.data;
        const loadedStudent = Array.isArray(result) ? result[0] || {} : result;
        setStudent(loadedStudent);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/api/edit_user/${id}`, student)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  return (
    <div className="app-shell">
      <div className="page-header mb-4">
        <div>
          <h1>Edit Student</h1>
          <p className="page-subtitle">Update student profile information.</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary">
          Home
        </Link>
      </div>

      <div className="card card-surface form-card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={student.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={student.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={student.age || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="form-control"
                value={student.gender || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-create">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;