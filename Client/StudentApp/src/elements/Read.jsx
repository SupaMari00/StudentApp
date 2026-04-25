import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/get_student/${id}`)
      .then((res) => {
        const result = res.data;
        const loadedStudent = Array.isArray(result) ? result[0] || null : result;
        setStudent(loadedStudent);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="app-shell">
      <div className="page-header mb-4">
        <div>
          <h1>Student Details</h1>
          <p className="page-subtitle">View student profile.</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary">
          Home
        </Link>
      </div>

      <div className="card card-surface form-card p-4">
        {!student ? (
          <div className="text-muted">Loading student...</div>
        ) : (
          <div className="row g-3">
            <div className="col-12">
              <div className="detail-card p-3">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <div className="h5 mb-1">{student.name}</div>
                    <div className="text-muted">{student.email}</div>
                  </div>
                  <span className={`gender-badge ${student.gender.toLowerCase() === "male" ? "gender-male" : "gender-female"}`}>
                    {student.gender}
                  </span>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="detail-label">Student ID</div>
                    <div className="detail-value">{student.id}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="detail-label">Age</div>
                    <div className="detail-value">{student.age}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Read;