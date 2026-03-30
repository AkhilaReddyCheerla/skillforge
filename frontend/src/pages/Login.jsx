import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { setAuthData, decodeJwt } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.token) {
        setAuthData(res.data.token);
        const payload = decodeJwt(res.data.token);
        const userRole = payload.role;

        if (userRole === "STUDENT") navigate("/student-dashboard");
        else if (userRole === "INSTRUCTOR") navigate("/instructor-dashboard");
        else navigate("/admin-dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Login failed. Check server.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
