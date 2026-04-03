"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [pnl, setPnl] = useState(0);

  const markets = [
    { name: "ETH ETF Approval", price: 0.48, edge: +0.06 },
    { name: "BTC 100k 2025", price: 0.71, edge: -0.02 },
    { name: "Biden 2026", price: 0.62, edge: +0.08 },
    { name: "AI Regulation 2026", price: 0.55, edge: +0.04 },
  ];

  const runAgent = () => {
    setRunning(true);
    setLogs([]);

    const sequence = [
      "BOOT → initializing service...",
      "SIGNAL_ENGINE → scanning markets...",
      "CONNECTED → polymarket API",
      "ANALYSIS → calculating fair value...",
      "EDGE_DETECTED → opportunity found",
      "EXECUTOR → placing order...",
      "FILLED → trade executed",
      "PNL_UPDATE → updating capital",
      "LOOP → restarting cycle"
    ];

    sequence.forEach((line, i) => {
      setTimeout(() => {
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ${line}`
        ]);
      }, i * 700);
    });

    let value = 12000;
    const interval = setInterval(() => {
      value += Math.random() * 20;
      setPnl(value);
    }, 800);

    setTimeout(() => clearInterval(interval), 8000);
  };

  return (
    <main className="bg-black text-white min-h-screen p-6 font-mono">

      <h1 className="text-5xl text-purple-400 mb-2 tracking-wide">
        PolyAgentBot
      </h1>
      <p className="text-gray-500 mb-6">
        autonomous prediction market execution engine
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div>Capital: <span className="text-green-400">${pnl.toFixed(2)}</span></div>
        <div>PnL: <span className="text-green-400">+{(pnl - 12000).toFixed(2)}</span></div>
        <div>Latency: 32ms</div>
        <div>Status: <span className="text-green-400">{running ? "LIVE" : "IDLE"}</span></div>
      </div>

      <button
        onClick={runAgent}
        className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-3 rounded-xl mb-6 shadow-lg"
      >
        Launch Service
      </button>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border border-purple-500 p-4 rounded-xl">
          <h2 className="text-purple-400 mb-3">Markets</h2>

          {markets.map((m, i) => (
            <div key={i} className="mb-2 text-sm">
              <p>{m.name}</p>
              <p className="text-gray-400">
                Price: {m.price} | Edge:
                <span className={m.edge > 0 ? "text-green-400" : "text-red-400"}>
                  {" "}{m.edge > 0 ? "+" : ""}{m.edge}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="border border-purple-500 p-4 rounded-xl h-80 overflow-auto">
          <p className="text-purple-400 mb-2">agent.log</p>

          {logs.map((log, i) => (
            <p key={i} className="text-green-400 text-xs">
              {log}
            </p>
          ))}
        </div>

        <div className="border border-purple-500 p-4 rounded-xl">
          <h2 className="text-purple-400 mb-3">System</h2>

          <p>Signal Engine: active</p>
          <p>Execution: enabled</p>
          <p>Strategy: arbitrage</p>
          <p>Markets scanned: 42</p>
          <p>Orders today: 18</p>
        </div>

      </div>

      <p className="text-gray-600 mt-6 text-sm">
        signal → decision → execution → capital
      </p>

    </main>
  );
}
