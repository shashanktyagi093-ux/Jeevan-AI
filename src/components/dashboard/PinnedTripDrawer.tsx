"use client";

import { useState } from "react";
import { Bookmark, ChevronUp, ChevronDown, Download, Trash2, MapPin, Clock, ExternalLink } from "lucide-react";
import { TravelVenueItem } from "@/types/agent";

interface PinnedTripDrawerProps {
  pinnedVenues: TravelVenueItem[];
  onRemovePin: (venueId: string) => void;
  onClearPins: () => void;
}

export function PinnedTripDrawer({
  pinnedVenues,
  onRemovePin,
  onClearPins,
}: PinnedTripDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (pinnedVenues.length === 0) return null;

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(pinnedVenues, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jeevan-curated-trip-dossier-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full">
      <div className="glass-dock rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30 transition-all duration-300">
        {/* Header Bar */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 flex items-center justify-between cursor-pointer bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-white tracking-wide">
                  Pinned Trip Matrix
                </h4>
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold">
                  {pinnedVenues.length}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Click to {isOpen ? "collapse" : "view curated spots"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleExport();
              }}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-xs flex items-center gap-1 transition-colors"
              title="Export Curated Trip"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <div className="text-zinc-400">
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto border-t border-white/[0.06]">
            {pinnedVenues.map((v, idx) => {
              const affinity = v.qlooAffinityScore ?? (v as any).affinityScore ?? 90;
              const id = (v as any).id ?? v.name;
              return (
                <div
                  key={id || idx}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs hover:border-white/[0.12] transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-100 truncate">{v.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-300 font-mono">
                        {v.timeSlot}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        {v.neighborhood}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400">{affinity}% lift</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemovePin(id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Remove from matrix"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            <div className="pt-2 flex items-center justify-between text-[11px] border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onClearPins}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
