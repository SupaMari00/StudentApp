import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/api/adduser", values)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="app-shell">
      <div className="page-header mb-4">
        <div>
          <h1>Add Student</h1>
          <p className="page-subtitle">Create a new student profile quickly.</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary">
          Back to list
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
              value={values.name}
              onChange={handleChange}
              placeholder="Enter full name"
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
              value={values.email}
              onChange={handleChange}
              placeholder="Enter email address"
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
                value={values.age}
                onChange={handleChange}
                placeholder="Enter age"
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
                value={values.gender}
                onChange={handleChange}
                placeholder="Enter gender"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-create">
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;