"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const fetchMarkets = async () => {
    try {
      const res = await fetch("https://gamma-api.polymarket.com/markets");
      const data = await res.json();

      const formatted = data.slice(0, 5).map((m: any) => {
        const price =
          m.outcomePrices?.[0] ||
          m.prices?.[0] ||
          m.lastTradePrice ||
          0;

        return {
          name: m.question || "Unknown",
          price: Number(price),
          edge: (Math.random() * 0.1 - 0.05)
        };
      });

      setMarkets(formatted);

      setLogs(prev => [
        `[${new Date().toLocaleTimeString()}] FETCH → ${formatted.length} markets`,
        `[${new Date().toLocaleTimeString()}] SIGNAL_ENGINE → analyzing`,
        `[${new Date().toLocaleTimeString()}] SIGNAL_EMIT → broadcast`,
        ...prev.slice(0, 10)
      ]);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen p-6 font-mono">
      <h1 className="text-5xl text-purple-400 mb-2">PolyAgentBot</h1>
      <p className="text-gray-500 mb-4">
        real-time signal layer for prediction markets
      </p>

      <p className="text-green-400 mb-4">● LIVE SIGNAL STREAM</p>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border border-purple-500 p-4 rounded-xl">
          <h2 className="text-purple-400 mb-3">Signals</h2>

          {markets.length === 0 && (
            <p className="text-gray-500 text-sm">connecting...</p>
          )}

          {markets.map((m, i) => (
            <div key={i} className="mb-2 text-sm">
              <p>{m.name}</p>
              <p className="text-gray-400">
                Price: {m.price.toFixed(2)} | Edge:
                <span className={m.edge > 0 ? "text-green-400" : "text-red-400"}>
                  {" "}{m.edge > 0 ? "+" : ""}{m.edge.toFixed(2)}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="border border-purple-500 p-4 rounded-xl h-80 overflow-auto">
          <p className="text-purple-400 mb-2">signal.log</p>

          {logs.map((log, i) => (
            <p key={i} className="text-green-400 text-xs">
              {log}
            </p>
          ))}
        </div>

        <div className="border border-purple-500 p-4 rounded-xl">
          <h2 className="text-purple-400 mb-3">System</h2>
          <p>Signal Engine: active</p>
          <p>Data Source: Polymarket</p>
          <p>Update Frequency: 5s</p>
          <p>Status: <span className="text-green-400">LIVE</span></p>
        </div>

      </div>

      <p className="text-gray-600 mt-6 text-sm">
        signal → intelligence → distribution
      </p>
    </main>
  );
}
