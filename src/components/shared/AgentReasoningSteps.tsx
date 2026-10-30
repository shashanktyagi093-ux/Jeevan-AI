"use client";

import { CheckCircle2, Loader2, Sparkles, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    id: "intent",
    label: "1. Intent Understanding",
    description: "Parsing multi-dimensional taste profile and geographical parameters.",
  },
  {
    id: "resolution",
    label: "2. Qloo Entity Resolution",
    description: "Resolving cultural seeds into canonical URNs and vertical taxonomies.",
  },
  {
    id: "graph",
    label: "3. Qloo Taste Graph Traversal",
    description: "Querying /v2/insights for cross-domain affinities and statistical over-indexing.",
  },
  {
    id: "reasoning",
    label: "4. Agentic Reasoning & Optimization",
    description: "Evaluating spatial cohesion, thematic rhythm, and provenance validation.",
  },
  {
    id: "synthesis",
    label: "5. Structured Cultural Output",
    description: "Compiling verified recommendations with data-driven justifications.",
  },
];

interface AgentReasoningStepsProps {
  currentStepIndex: number;
  steps?: Step[];
}

export function AgentReasoningSteps({
  currentStepIndex,
  steps = DEFAULT_STEPS,
}: AgentReasoningStepsProps) {
  return (
    <div className="w-full p-6 rounded-2xl bg-[#0f121d]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Cpu className="w-4 h-4 animate-spin text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider">
              Agent Orchestration Pipeline
            </h4>
            <p className="text-[11px] text-zinc-400">
              Live multi-step cultural graph inference in progress
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
          Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={s.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl transition-all duration-300",
                isCurrent
                  ? "bg-indigo-500/10 border border-indigo-500/30"
                  : isDone
                  ? "bg-white/[0.02] border border-white/[0.04]"
                  : "opacity-40"
              )}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-zinc-600 flex items-center justify-center text-[9px] text-zinc-400">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "text-xs font-medium",
                      isCurrent
                        ? "text-indigo-200 font-semibold"
                        : isDone
                        ? "text-zinc-200"
                        : "text-zinc-400"
                    )}
                  >
                    {s.label}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] text-indigo-400 uppercase tracking-wider animate-pulse">
                      Processing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
