import React from "react";

const stats = {
  totalStudents: 120,
  totalInstructors: 8,
  totalCourses: 24,
  totalQuizzes: 56,
};

const studentQuizTable = [
  { id: 1, name: "sita", course: "DSA", quiz: "Arrays & Strings", score: "78%" },
  { id: 2, name: "Ram", course: "Java", quiz: "OOP Basics", score: "85%" },
  { id: 3, name: "Sneha", course: "DBMS", quiz: "SQL Joins", score: "72%" },
];

export default function AdminDashboard() {
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
      {/* Header */}
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
            Admin Dashboard
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            Overview of users, courses, and quiz performance.
          </p>
        </div>
      </header>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <StatCard label="Students" value={stats.totalStudents} color="#22c55e" />
        <StatCard label="Instructors" value={stats.totalInstructors} color="#0ea5e9" />
        <StatCard label="Courses" value={stats.totalCourses} color="#a855f7" />
        <StatCard label="Quizzes" value={stats.totalQuizzes} color="#f97316" />
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1.3fr",
          gap: "1.5rem",
        }}
      >
        {/* Left: Student vs quiz table */}
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
            Student vs Quiz scores
          </h2>

          <table
            style={{
              width: "100%",
              fontSize: "0.85rem",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ color: "#9ca3af", textAlign: "left" }}>
                <th style={{ paddingBottom: "0.4rem" }}>Student</th>
                <th style={{ paddingBottom: "0.4rem" }}>Course</th>
                <th style={{ paddingBottom: "0.4rem" }}>Quiz</th>
                <th style={{ paddingBottom: "0.4rem" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {studentQuizTable.map((row) => (
                <tr key={row.id}>
                  <td
                    style={{
                      padding: "0.5rem 0",
                      borderTop: "1px solid #111827",
                    }}
                  >
                    {row.name}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 0",
                      borderTop: "1px solid #111827",
                    }}
                  >
                    {row.course}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 0",
                      borderTop: "1px solid #111827",
                    }}
                  >
                    {row.quiz}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 0",
                      borderTop: "1px solid #111827",
                    }}
                  >
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: simple “charts” placeholder */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              flex: 1,
              borderRadius: "0.75rem",
              background: "#020617",
              border: "1px solid #1f2937",
              padding: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.05rem",
                marginBottom: "0.5rem",
              }}
            >
              Topic-wise performance (mock)
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
              Later we’ll replace this with real charts.
            </p>
            <ul style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
              <li>DSA – 72%</li>
              <li>Java – 81%</li>
              <li>DBMS – 68%</li>
            </ul>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: "0.75rem",
              background: "#020617",
              border: "1px solid #1f2937",
              padding: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.05rem",
                marginBottom: "0.5rem",
              }}
            >
              Adaptive level trend (mock)
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
              Beginner → Intermediate → Advanced progression will be shown here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "0.75rem",
        background: "#0f172a",
        border: "1px solid #1f2937",
      }}
    >
      <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{label}</p>
      <p
        style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          marginTop: "0.3rem",
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}
