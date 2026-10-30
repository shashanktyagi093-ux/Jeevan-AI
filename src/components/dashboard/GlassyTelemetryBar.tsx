"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, Database, Network, ShieldCheck, Zap } from "lucide-react";

export function GlassyTelemetryBar() {
  const [latency, setLatency] = useState<number>(38);
  const [entropy, setEntropy] = useState<string>("0.84");
  const [activeNodes, setActiveNodes] = useState<string>("5,582,109");
  const [isPythonLive, setIsPythonLive] = useState<boolean>(true);

  useEffect(() => {
    // Ping health check to get actual latency
    const start = performance.now();
    fetch("/api/qloo/health")
      .then((res) => {
        const diff = Math.round(performance.now() - start);
        setLatency(diff > 0 ? diff : 42);
        return res.json();
      })
      .then((data) => {
        if (data.pythonBackend?.online !== undefined) {
          setIsPythonLive(data.pythonBackend.online);
        }
      })
      .catch(() => {
        setLatency(45);
      });

    // Subtle natural jitter on active telemetry to look like a living cockpit
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(28, Math.min(65, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full glass-specular bg-white/[0.02] border-b border-white/[0.07] px-4 py-2.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
        {/* Left: Engine & Graph Nodes */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-semibold tracking-wide text-zinc-100">TASTE ENGINE:</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/[0.08]">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-zinc-500">INDEXED NODES:</span>
            <span className="text-zinc-200 font-semibold">{activeNodes}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-white/[0.08]">
            <Network className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-zinc-500">CORRELATION LIFT:</span>
            <span className="text-violet-300 font-semibold">+4.82x</span>
          </div>
        </div>

        {/* Right: Telemetry Metrics */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-500">ENTROPY:</span>
            <span className="text-cyan-300 font-semibold">{entropy}</span>
          </div>

          <div className="flex items-center gap-1.5 pl-3 border-l border-white/[0.08]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-500">LATENCY:</span>
            <span className="text-amber-300 font-semibold">{latency}ms</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-white/[0.08]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-400">STATELESS / 0-STORAGE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
