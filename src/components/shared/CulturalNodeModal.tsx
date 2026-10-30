"use client";

import { X, Sparkles, Cpu, Layers, ShieldCheck, ExternalLink } from "lucide-react";
import { QlooEntity } from "@/types/qloo";

interface CulturalNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  category: string;
  affinityScore: number;
  overIndexingRatio?: number;
  matchedTasteSignal?: string;
  culturalRationale?: string;
  urn?: string;
}

export function CulturalNodeModal({
  isOpen,
  onClose,
  entityName,
  category,
  affinityScore,
  overIndexingRatio = 3.2,
  matchedTasteSignal = "Cultural Anchor",
  culturalRationale = "High multidimensional affinity identified in Qloo Taste AI Graph.",
  urn = "urn:qloo:entity:place:tokyo",
}: CulturalNodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#0f121d] border border-white/[0.12] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                Qloo Graph Inspector
              </span>
              <span className="text-xs text-zinc-400 capitalize">{category}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{entityName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Statistical Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Qloo Affinity Score
            </span>
            <div className="text-2xl font-black text-indigo-400 font-mono">
              {affinityScore}%
            </div>
            <span className="text-[10px] text-zinc-400">Target Audience Match</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Over-Indexing Lift
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {overIndexingRatio}x
            </div>
            <span className="text-[10px] text-zinc-400">vs General Baseline</span>
          </div>
        </div>

        {/* Mathematical Connection Signal */}
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Taste Correlation Signal</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {culturalRationale}
          </p>
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
            <span>Primary Anchor:</span>
            <span className="font-semibold text-zinc-200">{matchedTasteSignal}</span>
          </div>
        </div>

        {/* Provenance Metadata */}
        <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs font-mono text-zinc-400">
          <div className="flex items-center justify-between">
            <span>Canonical URN:</span>
            <span className="text-zinc-300 text-[11px] truncate max-w-[240px]">{urn}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Provenance:</span>
            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Taste AI Graph
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-semibold text-xs transition-colors"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
}
