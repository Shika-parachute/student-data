import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "https://student-data-pec1.onrender.com/api/login", // ✅ UPDATED
          {
            email: data.email,
            password: data.password
          }
        );

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");

      } else {
        await axios.post(
          "https://student-data-pec1.onrender.com/api/register", // ✅ UPDATED
          {
            name: data.name,
            email: data.email,
            password: data.password,
            course: data.course
          }
        );

        alert("Registered! Now login");
        setIsLogin(true);
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="course" placeholder="Course" onChange={handleChange} />
          </>
        )}

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} className="link">
        {isLogin ? "Create account" : "Already have account?"}
      </p>
    </div>
  );
}

export default Auth;