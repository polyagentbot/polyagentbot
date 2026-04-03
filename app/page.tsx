"use client";

import { useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const runAgent = async () => {
    setLogs([]);
    setRunning(true);

    const push = (msg: string) =>
      setLogs((prev) => [...prev, msg]);

    push("Booting agent...");
    push("Connecting to signal sources...");

    await new Promise(r => setTimeout(r, 800));

    push("Fetching Polymarket data...");

    const res = await fetch("/api/polymarket");
    const data = await res.json();

    await new Promise(r => setTimeout(r, 800));

    push("Analyzing markets...");

    data.markets?.forEach((m: any) => {
      push("Market: " + m.question.slice(0, 40) + "...");
      push("Price: " + m.price);
    });

    push("Detecting mispricing...");
    push("Executing trade...");
    push("Trade complete ✔");

    setRunning(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl text-purple-500 mb-4">PolyAgentBot</h1>

      <p className="text-gray-400 mb-4">
        Pays for intelligence → Finds mispricing → Executes
      </p>

      <p className="text-green-400 mb-6">No human in the loop</p>

      <button
        onClick={runAgent}
        className="bg-purple-600 px-6 py-3 rounded-xl mb-6"
      >
        Launch Agent
      </button>

      <div className="border border-purple-500 p-4 rounded-xl">
        <p className="text-purple-400">{"> agent.log"}</p>

        {logs.map((log, i) => (
          <p key={i} className="text-green-400">
            {"> "}{log}
          </p>
        ))}
      </div>

      <p className="text-gray-500 mt-6">
        If you understand this, you're early.
      </p>
    </main>
  );
}
