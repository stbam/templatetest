import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (res.data === "exist") {
        history("/home", { state: { id: email } });
      } else if (res.data === "notexist") {
        toast.error("User has not signed up");
      }
    } catch (error) {
      toast.error("Wrong details");
      console.error(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <div className="buttons">
          <input type="submit" onClick={submit} id="submit" />
          <Link to="/signup">Signup Page</Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
