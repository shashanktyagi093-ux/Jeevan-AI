"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  Check,
  Disc3,
  ExternalLink,
  Sparkles,
  Info,
} from "lucide-react";
import { TravelVenueItem } from "@/types/agent";

interface VenueGlassCardProps {
  venue: TravelVenueItem;
  isPinned?: boolean;
  onTogglePin?: (venue: TravelVenueItem) => void;
  onInspect?: (venue: TravelVenueItem) => void;
  onAuditionSoundscape?: (title: string, neighborhood: string) => void;
}

export function VenueGlassCard({
  venue,
  isPinned = false,
  onTogglePin,
  onInspect,
  onAuditionSoundscape,
}: VenueGlassCardProps) {
  const [copied, setCopied] = useState(false);

  const affinity = venue.qlooAffinityScore ?? (venue as any).affinityScore ?? 92;
  const justification = venue.culturalRationale ?? (venue as any).culturalJustification ?? "";

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${venue.name}, ${venue.neighborhood}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSlotColor = (slot: string) => {
    switch (slot) {
      case "morning":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "afternoon":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "evening":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      case "late_night":
      case "late-night":
        return "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30";
      default:
        return "bg-zinc-500/15 text-zinc-300 border-zinc-500/30";
    }
  };

  return (
    <div className="group relative rounded-2xl glass-card-interactive p-5 flex flex-col justify-between space-y-4">
      {/* Top Header: Category & Pin button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider border ${getSlotColor(
                venue.timeSlot
              )}`}
            >
              {venue.timeSlot.replace("_", " ")}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
              {venue.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Copy GPS / Address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {onTogglePin && (
              <button
                type="button"
                onClick={() => onTogglePin(venue)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isPinned
                    ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
                    : "bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                }`}
                title={isPinned ? "Remove from Pinned Trip" : "Pin to Trip Matrix"}
              >
                <Bookmark className="w-3.5 h-3.5" fill={isPinned ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        </div>

        {/* Venue Title & Neighborhood */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
          <span>{venue.name}</span>
        </h3>

        <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" />
            <span>{venue.neighborhood}</span>
          </span>
          {venue.priceLevel && (
            <>
              <span>•</span>
              <span className="font-mono text-zinc-300">{venue.priceLevel}</span>
            </>
          )}
        </div>
      </div>

      {/* Cultural Justification */}
      <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
        {justification}
      </p>

      {/* Affinity Score Dial & Interactive Footer */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-[11px] text-indigo-300">
            {affinity}%
          </div>
          <div className="text-[10px]">
            <span className="text-zinc-400 block">Qloo Affinity</span>
            <span className="text-emerald-400 font-mono font-medium">+4.5x Lift</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onAuditionSoundscape && (
            <button
              type="button"
              onClick={() => onAuditionSoundscape(venue.name, venue.neighborhood)}
              className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-[10px] flex items-center gap-1 transition-colors"
              title="Audition Ambience"
            >
              <Disc3 className="w-3 h-3 animate-spin" style={{ animationDuration: "5s" }} />
              <span className="hidden sm:inline">Audition</span>
            </button>
          )}

          {onInspect && (
            <button
              type="button"
              onClick={() => onInspect(venue)}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 border border-white/[0.07] text-[10px] flex items-center gap-1 transition-colors"
            >
              <Info className="w-3 h-3" />
              <span>Inspect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
