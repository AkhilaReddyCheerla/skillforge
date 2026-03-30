import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { setAuthData, decodeJwt } from "../utils/auth";

const roles = ["STUDENT", "INSTRUCTOR", "ADMIN"];

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
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
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please check your details or server.");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      setMessage(res.data.message || "Registered successfully");
      setMode("login");
    } catch (err) {
      setError("Registration failed. Maybe email already exists.");
      console.error(err);
    }
  };

  const isLogin = mode === "login";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#020617",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          border: "1px solid #1f2937",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          SkillForge
        </h1>
        <p style={{ marginBottom: "1.5rem", color: "#9ca3af" }}>
          Login or create an account to continue.
        </p>

        <div
          style={{
            display: "flex",
            marginBottom: "1.5rem",
            background: "#020617",
            borderRadius: "999px",
            border: "1px solid #1f2937",
            padding: "0.25rem",
          }}
        >
          <button
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "0.5rem 0",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: isLogin ? "#0ea5e9" : "transparent",
              color: isLogin ? "white" : "#9ca3af",
              fontWeight: 600,
            }}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              padding: "0.5rem 0",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: !isLogin ? "#0ea5e9" : "transparent",
              color: !isLogin ? "white" : "#9ca3af",
              fontWeight: 600,
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              background: "#450a0a",
              color: "#fecaca",
              fontSize: "0.875rem",
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              background: "#052e16",
              color: "#bbf7d0",
              fontSize: "0.875rem",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <>
              <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  marginTop: "0.25rem",
                  marginBottom: "0.75rem",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #1f2937",
                  background: "#020617",
                  color: "white",
                }}
              />

              <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "0.25rem",
                  marginBottom: "0.75rem",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #1f2937",
                  background: "#020617",
                  color: "white",
                  appearance: "none",
                }}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0) + r.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </>
          )}

          <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              marginTop: "0.25rem",
              marginBottom: "0.75rem",
              padding: "0.6rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "white",
            }}
          />

          <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              marginTop: "0.25rem",
              marginBottom: "1rem",
              padding: "0.6rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(to right, #06b6d4, #4f46e5, #a855f7)",
              color: "white",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
