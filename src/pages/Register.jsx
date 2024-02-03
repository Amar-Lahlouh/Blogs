import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword(password)) {
      try {
        const res = await axios.post(
          "http://localhost:8800/api/auth/register",
          {
            username: username,
            email: email,
            password: password,
          }
        );
        navigate("/login");
        console.log(res);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const checkPassword = (data) => {
    if (data.length < 8) {
      setError("Password should be at least 8 characters.");
      return false;
    }
    return true;
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form action="">
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {err && <p>{err}</p>}
        <button onClick={handleSubmit}>Register</button>

        <span>
          Already Registered? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
