import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "/api";


export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("BEGINNER");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/courses/my");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
      setMessage("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !subject) {
      setMessage("Please fill all fields.");
      return;
    }
    try {
      setMessage("");
      const payload = {
        title,
        subject,
        difficultyLevel: level,
      };
      const res = await axiosInstance.post("/courses", payload);
      setCourses((prev) => [res.data, ...prev]);
      setTitle("");
      setSubject("");
      setLevel("BEGINNER");
      setMessage("Course created successfully.");
    } catch (err) {
      console.error("Failed to create course", err);
      setMessage("Failed to create course. Please try again.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course", err);
      setMessage("Failed to delete course. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "1.5rem",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>
            Instructor Dashboard
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            Manage courses, upload learning materials, generate quizzes.
          </p>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 2fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            borderRadius: "0.75rem",
            background: "#020617",
            border: "1px solid #1f2937",
            padding: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
            }}
          >
            Create a new course
          </h2>

          {message && (
            <div
              style={{
                marginBottom: "0.75rem",
                padding: "0.6rem 0.8rem",
                borderRadius: "0.5rem",
                background: "#052e16",
                color: "#bbf7d0",
                fontSize: "0.85rem",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleCreateCourse}>
            <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
              Course title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced Java Interview Prep"
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
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. DSA, Java, DBMS"
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
              Difficulty level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
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
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>

            <p
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
                marginTop: "0.5rem",
                marginBottom: "0.3rem",
              }}
            >
              Upload materials
            </p>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px dashed #1f2937",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Upload video
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px dashed #1f2937",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Upload PDF
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px dashed #1f2937",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Add link
              </button>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(to right, #22c55e, #22d3ee, #6366f1)",
                color: "white",
                fontWeight: 600,
              }}
            >
              Create course
            </button>
          </form>
        </div>

        <div
          style={{
            borderRadius: "0.75rem",
            background: "#020617",
            border: "1px solid #1f2937",
            padding: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
            }}
          >
            Your courses
          </h2>

          {loading ? (
            <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
              Loading courses...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                fontSize: "0.85rem",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ color: "#9ca3af", textAlign: "left" }}>
                  <th style={{ paddingBottom: "0.4rem" }}>Title</th>
                  <th style={{ paddingBottom: "0.4rem" }}>Subject</th>
                  <th style={{ paddingBottom: "0.4rem" }}>Level</th>
                  <th style={{ paddingBottom: "0.4rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td
                      style={{
                        padding: "0.5rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {course.title}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {course.subject}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {course.difficultyLevel}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          marginRight: "0.3rem",
                          fontSize: "0.75rem",
                          background: "#0f172a",
                          color: "#e5e7eb",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(course.id)}
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          fontSize: "0.75rem",
                          background: "#450a0a",
                          color: "#fecaca",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && courses.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        paddingTop: "1rem",
                        color: "#6b7280",
                        textAlign: "center",
                      }}
                    >
                      No courses yet. Use the form to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
