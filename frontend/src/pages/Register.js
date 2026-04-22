import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "", email: "", password: "", course: ""
  });

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/register", data);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" onChange={handleChange} />
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <input name="course" onChange={handleChange} />
      <button>Register</button>
    </form>
  );
}

export default Register;