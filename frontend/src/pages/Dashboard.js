import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  // 🔒 Protect route
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const updateCourse = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/update-course",
        { course },
        { headers: { Authorization: token } }
      );
      alert("Course updated");
    } catch {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/update-password",
        passwords,
        { headers: { Authorization: token } }
      );
      alert("Password updated");
    } catch {
      alert("Error updating password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card">
        <h3>Update Course</h3>
        <input
          placeholder="New Course"
          onChange={(e) => setCourse(e.target.value)}
        />
        <button onClick={updateCourse}>Update</button>
      </div>

      <div className="card">
        <h3>Change Password</h3>
        <input
          placeholder="Old Password"
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
        <input
          placeholder="New Password"
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
        <button onClick={updatePassword}>Change</button>
      </div>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;