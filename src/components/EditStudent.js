import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    rollno: "",
    branch: "",
  });

  const inputsHandler = (e) => {
    setUserForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/students/get-student/${id}`
      );
      const { name, email, rollno, branch } = response.data.data;
      setUserForm({ name, email, rollno, branch });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/students/update-student/${id}`,
        userForm
      );
      console.log({ status: response.status });
      navigate("/student-list");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={userForm.email}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Roll no.</label>
            <input
              type="text"
              className="form-control"
              name="rollno"
              value={userForm.rollno}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Branch</label>
            <input
              type="text"
              className="form-control"
              name="branch"
              value={userForm.branch}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
