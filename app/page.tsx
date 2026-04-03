"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  const messages = [
    "Connecting to signal sources...",
    "Scanning Polymarket...",
    "Detecting mispricing...",
    "Validating edge...",
    "Executing trade...",
    "Updating capital...",
    "Looping..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-6), messages[i % messages.length]]);
      i++;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        background: "#050505",
        color: "#e5e5e5",
        minHeight: "100vh",
        fontFamily: "monospace",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          color: "#a855f7",
          textShadow: "0 0 20px #a855f7",
        }}
      >
        PolyAgentBot
      </h1>

      <p style={{ opacity: 0.7 }}>
        Pays for intelligence → Finds mispricing → Executes
      </p>

      <p style={{ marginTop: "10px", color: "#22c55e" }}>
        No human in the loop
      </p>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            background: "#a855f7",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 20px #a855f7",
          }}
          onClick={() => alert("Agent execution coming soon")}
        >
          Launch Agent
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#0a0a0a",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #222",
          boxShadow: "0 0 20px rgba(168,85,247,0.2)",
        }}
      >
        <p style={{ color: "#a855f7", marginBottom: "10px" }}>
          {">"} agent.log
        </p>

        {logs.map((log, index) => (
          <p key={index} style={{ fontSize: "14px", opacity: 0.8 }}>
            {"> " + log}
          </p>
        ))}
      </div>

      <p
        style={{
          marginTop: "40px",
          fontSize: "12px",
          opacity: 0.5,
        }}
      >
        If you understand this, you're early.
      </p>
    </main>
  );
}
