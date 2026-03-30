import React from "react";

const dummyStats = {
  enrolledCourses: 3,
  nextQuiz: "Data Structures - 10 Mar, 7:00 PM",
  level: "Intermediate",
};

const dummyRecommendations = [
  {
    id: 1,
    title: "Dynamic Programming Basics",
    course: "Algorithms",
    difficulty: "Intermediate",
    progressImpact: "+12% expected score",
  },
  {
    id: 2,
    title: "OOP Concepts in Java",
    course: "Java Foundations",
    difficulty: "Beginner",
    progressImpact: "+8% expected score",
  },
];

const dummyQuizzes = {
  upcoming: [
    { id: 1, title: "Arrays & Strings", course: "DSA", date: "10 Mar", time: "7:00 PM" },
    { id: 2, title: "SQL Joins", course: "DBMS", date: "12 Mar", time: "6:00 PM" },
  ],
  recent: [
    { id: 1, title: "Java Basics", score: "80%", difficulty: "Easy" },
    { id: 2, title: "Recursion", score: "65%", difficulty: "Medium" },
  ],
};

export default function StudentDashboard() {
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
      {/* Top bar */}
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
            Student Dashboard
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            Personalized learning path and adaptive quizzes
          </p>
        </div>
        <div
          style={{
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
            background: "#0f172a",
            border: "1px solid #1f2937",
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          Current level:{" "}
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {dummyStats.level}
          </span>
        </div>
      </header>

      {/* Grid layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr",
          gap: "1.5rem",
        }}
      >
        {/* Left side: stats + recommendations */}
        <div>
          {/* Stats cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                background:
                  "linear-gradient(120deg, #1d4ed8, #22d3ee, #059669)",
              }}
            >
              <p style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                Enrolled courses
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginTop: "0.3rem",
                }}
              >
                {dummyStats.enrolledCourses}
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                background: "#0f172a",
                border: "1px solid #1f2937",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                Next quiz
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.3rem",
                  lineHeight: 1.4,
                }}
              >
                {dummyStats.nextQuiz}
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "0.75rem",
                background: "#0f172a",
                border: "1px solid #1f2937",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                Adaptive score trend
              </p>
              <p
                style={{
                  marginTop: "0.4rem",
                  fontSize: "0.9rem",
                  color: "#22c55e",
                }}
              >
                +15% last 5 quizzes
              </p>
            </div>
          </div>

          {/* Recommended lessons */}
          <div
            style={{
              borderRadius: "0.75rem",
              background: "#020617",
              border: "1px solid #1f2937",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                marginBottom: "0.3rem",
              }}
            >
              Recommended for you
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
                marginBottom: "0.75rem",
              }}
            >
              Based on your recent quiz performance and learning pace.
            </p>

            <div style={{ display: "grid", gap: "0.75rem" }}>
              {dummyRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    background: "#020617",
                    border: "1px solid #1f2937",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600 }}>{rec.title}</p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#9ca3af",
                        marginTop: "0.15rem",
                      }}
                    >
                      {rec.course} • {rec.difficulty}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#22c55e",
                      background: "#052e16",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "999px",
                    }}
                  >
                    {rec.progressImpact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: upcoming + recent quizzes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Upcoming quizzes */}
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
                fontSize: "1.05rem",
                marginBottom: "0.5rem",
              }}
            >
              Upcoming quizzes
            </h2>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {dummyQuizzes.upcoming.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: "0.6rem 0.75rem",
                    borderRadius: "0.6rem",
                    background: "#020617",
                    border: "1px dashed #1f2937",
                  }}
                >
                  <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    {q.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#9ca3af",
                      marginTop: "0.1rem",
                    }}
                  >
                    {q.course} • {q.date} • {q.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent quiz scores */}
          <div
            style={{
              borderRadius: "0.75rem",
              background: "#020617",
              border: "1px solid #1f2937",
              padding: "1rem",
              flex: 1,
            }}
          >
            <h2
              style={{
                fontSize: "1.05rem",
                marginBottom: "0.5rem",
              }}
            >
              Recent quiz scores
            </h2>
            <table
              style={{
                width: "100%",
                fontSize: "0.8rem",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ color: "#9ca3af", textAlign: "left" }}>
                  <th style={{ paddingBottom: "0.4rem" }}>Quiz</th>
                  <th style={{ paddingBottom: "0.4rem" }}>Score</th>
                  <th style={{ paddingBottom: "0.4rem" }}>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {dummyQuizzes.recent.map((q) => (
                  <tr key={q.id}>
                    <td
                      style={{
                        padding: "0.3rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {q.title}
                    </td>
                    <td
                      style={{
                        padding: "0.3rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {q.score}
                    </td>
                    <td
                      style={{
                        padding: "0.3rem 0",
                        borderTop: "1px solid #111827",
                      }}
                    >
                      {q.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
