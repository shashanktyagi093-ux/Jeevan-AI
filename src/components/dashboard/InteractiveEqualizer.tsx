"use client";

import { Sliders, RotateCcw, Flame, Sparkles } from "lucide-react";

export interface EqualizerWeights {
  cinema: number;
  audio: number;
  spatial: number;
  culinary: number;
  fashion: number;
  exploration: number; // 0 to 100
}

interface InteractiveEqualizerProps {
  weights: EqualizerWeights;
  onChange: (updated: EqualizerWeights) => void;
}

export function InteractiveEqualizer({ weights, onChange }: InteractiveEqualizerProps) {
  const handleChange = (key: keyof EqualizerWeights, val: number) => {
    onChange({
      ...weights,
      [key]: val,
    });
  };

  const handleReset = () => {
    onChange({
      cinema: 85,
      audio: 90,
      spatial: 80,
      culinary: 75,
      fashion: 70,
      exploration: 45,
    });
  };

  return (
    <div className="p-5 rounded-2xl glass-cockpit space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Taste Equalizer & Vector Modulation
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cinema */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300 font-medium">Cinema & Narrative</span>
              <span className="font-mono text-indigo-400 font-semibold">{weights.cinema}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={weights.cinema}
              onChange={(e) => handleChange("cinema", Number(e.target.value))}
              className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Audio */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300 font-medium">Sonic & Hi-Fi</span>
              <span className="font-mono text-indigo-400 font-semibold">{weights.audio}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={weights.audio}
              onChange={(e) => handleChange("audio", Number(e.target.value))}
              className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Spatial */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300 font-medium">Spatial Architecture</span>
              <span className="font-mono text-indigo-400 font-semibold">{weights.spatial}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={weights.spatial}
              onChange={(e) => handleChange("spatial", Number(e.target.value))}
              className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Culinary */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300 font-medium">Gastronomy & Enology</span>
              <span className="font-mono text-indigo-400 font-semibold">{weights.culinary}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={weights.culinary}
              onChange={(e) => handleChange("culinary", Number(e.target.value))}
              className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Frontier / Novelty dial */}
        <div className="pt-3 border-t border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Cultural Frontier / Novelty Dial</span>
            </span>
            <span className="font-mono text-amber-400 font-semibold">
              {weights.exploration}% ({weights.exploration > 65 ? "Avant-Garde" : weights.exploration > 35 ? "Harmonic" : "Canonical"})
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weights.exploration}
            onChange={(e) => handleChange("exploration", Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
            <span>0% Safe Canonical</span>
            <span>50% Balanced</span>
            <span>100% Frontier / Esoteric</span>
          </div>
        </div>
      </div>
    </div>
  );
}
