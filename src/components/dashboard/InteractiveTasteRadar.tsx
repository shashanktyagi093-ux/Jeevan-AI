"use client";

import { useMemo } from "react";
import { Sparkles, Compass, Layers } from "lucide-react";

export interface RadarDimension {
  key: string;
  label: string;
  value: number; // 0 to 100
  color: string;
}

interface InteractiveTasteRadarProps {
  dimensions: RadarDimension[];
  onChange?: (updated: RadarDimension[]) => void;
  size?: number;
  interactive?: boolean;
}

export function InteractiveTasteRadar({
  dimensions,
  onChange,
  size = 320,
  interactive = true,
}: InteractiveTasteRadarProps) {
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = dimensions.length;

  // Calculate polygon points based on dimension values
  const points = useMemo(() => {
    return dimensions.map((dim, i) => {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const r = (dim.value / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, angle, ...dim };
    });
  }, [dimensions, center, radius, totalAxes]);

  const polygonPath = useMemo(() => {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  }, [points]);

  const handleAxisClick = (index: number) => {
    if (!interactive || !onChange) return;
    const updated = [...dimensions];
    // Cycle value: e.g. 50 -> 80 -> 100 -> 35
    const cur = updated[index].value;
    updated[index].value = cur >= 95 ? 40 : cur >= 75 ? 98 : cur + 20;
    onChange(updated);
  };

  return (
    <div className="flex flex-col items-center justify-center relative p-4 rounded-2xl glass-card border border-white/[0.08] select-none">
      <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
        <Sparkles className="w-3 h-3" />
        <span>Multi-Axis Taste Vector Topology</span>
      </div>

      <svg width={size} height={size} className="overflow-visible mt-2">
        {/* Background concentric rings */}
        {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeDasharray={idx === 3 ? "none" : "3,3"}
            strokeWidth={1}
          />
        ))}

        {/* Axis radial lines */}
        {points.map((p, i) => {
          const outerX = center + radius * Math.cos(p.angle);
          const outerY = center + radius * Math.sin(p.angle);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={outerX}
              y2={outerY}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={1}
            />
          );
        })}

        {/* Radar Filled Polygon */}
        <polygon
          points={polygonPath}
          fill="rgba(99, 102, 241, 0.22)"
          stroke="#818cf8"
          strokeWidth={2}
          className="transition-all duration-300 ease-out"
        />

        {/* Polygon Vertex Points with interactive tooltips */}
        {points.map((p, i) => (
          <g
            key={`point-${i}`}
            className="cursor-pointer group"
            onClick={() => handleAxisClick(i)}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill="#6366f1"
              stroke="#ffffff"
              strokeWidth={1.5}
              className="transition-all duration-300 group-hover:scale-125 group-hover:fill-cyan-400"
            />
            {/* Pulsing ring on high affinity axes */}
            {p.value > 85 && (
              <circle
                cx={p.x}
                cy={p.y}
                r={8}
                fill="none"
                stroke="#818cf8"
                strokeWidth={1}
                className="animate-ping opacity-75"
              />
            )}
          </g>
        ))}

        {/* Labels along perimeter */}
        {points.map((p, i) => {
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(p.angle);
          const ly = center + labelDist * Math.sin(p.angle);
          return (
            <g
              key={`label-${i}`}
              className="cursor-pointer"
              onClick={() => handleAxisClick(i)}
            >
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-zinc-300 hover:fill-indigo-300 text-[10px] font-medium transition-colors"
              >
                {p.label}
              </text>
              <text
                x={lx}
                y={ly + 11}
                textAnchor="middle"
                className="fill-indigo-400 text-[9px] font-mono font-semibold"
              >
                {p.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {interactive && (
        <p className="text-[10px] text-zinc-500 mt-2 text-center">
          Click any axis vertex to adjust dimensional weighting
        </p>
      )}
    </div>
  );
}
