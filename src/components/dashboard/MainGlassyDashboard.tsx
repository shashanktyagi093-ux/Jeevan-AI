"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  HeartHandshake,
  Wand2,
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Activity,
  CheckCircle,
  Copy,
  ExternalLink,
  Music,
  ArrowRight,
  Filter,
  Eye,
  Bookmark,
} from "lucide-react";
import { GlassyTelemetryBar } from "./GlassyTelemetryBar";
import { InteractiveTasteRadar, RadarDimension } from "./InteractiveTasteRadar";
import { InteractiveEqualizer, EqualizerWeights } from "./InteractiveEqualizer";
import { InteractiveAudioSimulator } from "./InteractiveAudioSimulator";
import { PinnedTripDrawer } from "./PinnedTripDrawer";
import { VenueGlassCard } from "./VenueGlassCard";
import { CulturalNodeModal } from "@/components/shared/CulturalNodeModal";
import { TravelVenueItem, TravelItineraryOutput } from "@/types/agent";

// Initial verified mock data for instant interaction
const CITIES = [
  { id: "Tokyo", name: "Tokyo", country: "Japan", highlight: "Ebisu, Roppongi, Daikanyama" },
  { id: "London", name: "London", country: "United Kingdom", highlight: "Barbican, Dalston, Shoreditch" },
  { id: "New York", name: "New York", country: "United States", highlight: "NoHo, Chelsea, SoHo" },
  { id: "Paris", name: "Paris", country: "France", highlight: "Le Marais, Belleville, Canal Saint-Martin" },
  { id: "Berlin", name: "Berlin", country: "Germany", highlight: "Mitte, Kreuzberg, Neukölln" },
];

const PRESETS = [
  {
    id: "architectural",
    name: "Architectural Introspection",
    seeds: ["Christopher Nolan", "Radiohead", "Tadao Ando"],
    city: "Tokyo",
    dimensions: [
      { key: "cinema", label: "Cinema / Narrative", value: 95, color: "#6366f1" },
      { key: "sonic", label: "Sonic / Hi-Fi", value: 92, color: "#818cf8" },
      { key: "spatial", label: "Brutalist Spatial", value: 90, color: "#a855f7" },
      { key: "culinary", label: "Gastronomy", value: 70, color: "#ec4899" },
      { key: "fashion", label: "Minimalist Design", value: 85, color: "#06b6d4" },
      { key: "philosophy", label: "Introspection", value: 88, color: "#10b981" },
    ],
  },
  {
    id: "melancholy",
    name: "Nocturne & Haute Couture",
    seeds: ["Wong Kar-wai", "Haruki Murakami", "Maison Margiela"],
    city: "New York",
    dimensions: [
      { key: "cinema", label: "Cinema / Narrative", value: 94, color: "#6366f1" },
      { key: "sonic", label: "Sonic / Hi-Fi", value: 75, color: "#818cf8" },
      { key: "spatial", label: "Brutalist Spatial", value: 65, color: "#a855f7" },
      { key: "culinary", label: "Gastronomy", value: 88, color: "#ec4899" },
      { key: "fashion", label: "Minimalist Design", value: 96, color: "#06b6d4" },
      { key: "philosophy", label: "Introspection", value: 92, color: "#10b981" },
    ],
  },
  {
    id: "electronic",
    name: "Modular Synthesism",
    seeds: ["Aphex Twin", "Kraftwerk", "Zaha Hadid"],
    city: "Berlin",
    dimensions: [
      { key: "cinema", label: "Cinema / Narrative", value: 60, color: "#6366f1" },
      { key: "sonic", label: "Sonic / Hi-Fi", value: 98, color: "#818cf8" },
      { key: "spatial", label: "Brutalist Spatial", value: 85, color: "#a855f7" },
      { key: "culinary", label: "Gastronomy", value: 55, color: "#ec4899" },
      { key: "fashion", label: "Minimalist Design", value: 80, color: "#06b6d4" },
      { key: "philosophy", label: "Introspection", value: 82, color: "#10b981" },
    ],
  },
];

const INITIAL_VENUES: TravelVenueItem[] = [
  {
    name: "Meikyoku Kissa Lion",
    category: "music",
    neighborhood: "Dogenzaka, Shibuya",
    timeSlot: "morning",
    day: 1,
    priceLevel: "$$",
    qlooAffinityScore: 94,
    matchedTasteSignal: "Radiohead Acoustic Introspection",
    culturalRationale:
      "Historic analog audio sanctuary established in 1926. Zero-conversation policy and massive custom horn-loaded speakers mirror Radiohead's acoustic introspection and Nolan's meticulous sound design.",
  },
  {
    name: "21_21 DESIGN SIGHT",
    category: "architecture",
    neighborhood: "Roppongi, Minato",
    timeSlot: "afternoon",
    day: 1,
    priceLevel: "$$",
    qlooAffinityScore: 91,
    matchedTasteSignal: "Tadao Ando Brutalist Geometry",
    culturalRationale:
      "Tadao Ando masterwork featuring signature board-formed poured concrete and folded steel roofs. Reflects the structural purity and spatial tension of modern cinema.",
  },
  {
    name: "Yakumo Saryo",
    category: "dining",
    neighborhood: "Meguro",
    timeSlot: "evening",
    day: 1,
    priceLevel: "$$$$",
    qlooAffinityScore: 89,
    matchedTasteSignal: "Minimalist Literary Sensibility",
    culturalRationale:
      "Subtle minimalist culinary theater designed by Shinichiro Ogata. Strips dining down to fundamental textures, mirroring minimalist literary sensibilities.",
  },
  {
    name: "Bar Trench",
    category: "dining",
    neighborhood: "Ebisu",
    timeSlot: "late-night",
    day: 1,
    priceLevel: "$$$",
    qlooAffinityScore: 93,
    matchedTasteSignal: "Noir Atmospheric Tension",
    culturalRationale:
      "Intimate dark-wood sanctuary specializing in rare absinthes and vintage bitters. Matches the moody atmospheric tension of neo-noir aesthetics.",
  },
];

export function MainGlassyDashboard() {
  const [activeTab, setActiveTab] = useState<"travel" | "match" | "studio" | "topology">("travel");
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [inspectVenue, setInspectVenue] = useState<TravelVenueItem | null>(null);

  // Equalizer & Radar state
  const [dimensions, setDimensions] = useState<RadarDimension[]>(PRESETS[0].dimensions);
  const [weights, setWeights] = useState<EqualizerWeights>({
    cinema: 95,
    audio: 92,
    spatial: 90,
    culinary: 70,
    fashion: 85,
    exploration: 45,
  });

  // Pinned trip items
  const [pinnedVenues, setPinnedVenues] = useState<TravelVenueItem[]>([INITIAL_VENUES[0]]);

  // Studio swatch copy state
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleTogglePin = (venue: TravelVenueItem) => {
    setPinnedVenues((prev) =>
      prev.some((v) => v.name === venue.name)
        ? prev.filter((v) => v.name !== venue.name)
        : [...prev, venue]
    );
  };

  const handleSelectPreset = (p: (typeof PRESETS)[0]) => {
    setSelectedPreset(p);
    setSelectedCity(p.city);
    setDimensions(p.dimensions);
  };

  const filteredVenues = useMemo(() => {
    return INITIAL_VENUES.filter((v) => {
      if (timeFilter === "all") return true;
      return v.timeSlot.replace("_", "-") === timeFilter.replace("_", "-");
    });
  }, [timeFilter]);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* 1. Live Telemetry HUD Bar */}
      <GlassyTelemetryBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        {/* 2. Cockpit Master Ribbon: Mode Switcher & Presets */}
        <div className="p-4 sm:p-5 rounded-2xl glass-cockpit flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/[0.08] overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("travel")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "travel"
                  ? "bg-indigo-600/30 text-white border border-indigo-500/50 shadow-md shadow-indigo-600/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Spatial Travel Concierge</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("match")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "match"
                  ? "bg-violet-600/30 text-white border border-violet-500/50 shadow-md shadow-violet-600/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-violet-400" />
              <span>Maximin Match Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("studio")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "studio"
                  ? "bg-fuchsia-600/30 text-white border border-fuchsia-500/50 shadow-md shadow-fuchsia-600/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Brand Direction Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("topology")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "topology"
                  ? "bg-cyan-600/30 text-white border border-cyan-500/50 shadow-md shadow-cyan-600/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Taste Topology & Equalizer</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono shrink-0">
              VECTOR PRESET:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedPreset.id === p.id
                    ? "bg-white/[0.1] text-white border-white/[0.2] shadow-inner"
                    : "bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dynamic Module Contents */}
        {activeTab === "travel" && (
          <div className="space-y-8">
            {/* Control Ribbon: City & Category Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* City selector pills */}
              <div className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 ml-2 shrink-0" />
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCity(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                      selectedCity === c.id
                        ? "bg-indigo-600/30 text-white border border-indigo-500/40"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Time slot filter */}
              <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-zinc-400 ml-2 shrink-0" />
                {["all", "morning", "afternoon", "evening", "late_night"].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeFilter(slot)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all uppercase whitespace-nowrap ${
                      timeFilter === slot
                        ? "bg-white/[0.1] text-white border border-white/[0.15]"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {slot.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Cultural Seed Anchor Badges */}
            <div className="p-4 rounded-xl glass-card flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">
                  ACTIVE TASTE ANCHORS:
                </span>
                {selectedPreset.seeds.map((seed, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 font-medium"
                  >
                    {seed}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Qloo /v2/insights Filter Verified
                </span>
                <Link
                  href="/travel"
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                >
                  <span>Open Dedicated Workspace</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Venue Glass Cards Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVenues.map((v) => (
                <VenueGlassCard
                  key={v.name}
                  venue={v}
                  isPinned={pinnedVenues.some((pv) => pv.name === v.name)}
                  onTogglePin={handleTogglePin}
                  onInspect={setInspectVenue}
                />
              ))}
            </div>

            {/* Ambient Hi-Fi Soundscape Deck */}
            <InteractiveAudioSimulator />
          </div>
        )}

        {/* 4. Module 2: Maximin Match Matrix */}
        {activeTab === "match" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass-cockpit grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Dual Persona Taste Columns */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">
                      ALGORITHMIC TASTE FAIRNESS
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Maximin Cultural Intersection: Elena & Julian
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-extrabold text-violet-300">
                      93.4%
                    </span>
                    <span className="block text-[10px] text-zinc-400">Mutual Satisfaction Floor</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Elena</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Taste Vector A</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"].map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Julian</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Taste Vector B</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Wes Anderson", "Daft Punk", "Scandinavian Design"].map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-violet-500/15 text-violet-300 border border-violet-500/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3-Act Date Progression Scrubber */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Curated 3-Act Shared Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                        ACT I • DISCOVERY
                      </span>
                      <h4 className="text-xs font-bold text-white">Daikanyama T-Site</h4>
                      <p className="text-[11px] text-zinc-400">
                        Andersonian architectural symmetry meets Tarantino-era retro design books.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider">
                        ACT II • CULINARY
                      </span>
                      <h4 className="text-xs font-bold text-white">Bar Trench Herbalism</h4>
                      <p className="text-[11px] text-zinc-400">
                        Italian natural wine philosophy combined with French analog synth ambience.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <span className="text-[9px] font-mono text-fuchsia-400 uppercase tracking-wider">
                        ACT III • NIGHTCAP
                      </span>
                      <h4 className="text-xs font-bold text-white">Vinyl Kissaten Lion</h4>
                      <p className="text-[11px] text-zinc-400">
                        Shared devotion to high-fidelity audio without awkward compromise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Interactive Maximin Gauge */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/40 mx-auto flex items-center justify-center text-violet-300 font-mono font-extrabold text-xl shadow-lg shadow-violet-600/20">
                  93%
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Anti-Alienation Guarantee</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    By evaluating min(Affinity_A, Affinity_B), neither person is forced into an experience they dislike.
                  </p>
                </div>
                <Link
                  href="/match"
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Launch Deep Match Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 5. Module 3: Brand Direction Studio */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass-cockpit space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-wider">
                    EXECUTIVE BRAND INTELLIGENCE
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    AURA Nocturne — Creative Direction Dossier
                  </h2>
                </div>
                <Link
                  href="/studio"
                  className="px-3.5 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                >
                  <span>Open Full Creative Director Suite</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Interactive Color Palette Swatches */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Curated 5-Tone Color Direction
                  </h3>
                  {copiedHex && (
                    <span className="text-xs text-emerald-400 font-mono animate-in fade-in">
                      Copied {copiedHex} to clipboard!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { hex: "#0A0C10", name: "Abyssal Obsidian", role: "Base Canvas" },
                    { hex: "#1C2333", name: "Nocturne Slate", role: "Shadow Tension" },
                    { hex: "#4B5563", name: "Brutalist Concrete", role: "Structural Neutral" },
                    { hex: "#6366F1", name: "Electric Indigo", role: "Sonic Accent" },
                    { hex: "#D946EF", name: "Ultraviolet Aura", role: "Hero Luminescence" },
                  ].map((swatch, i) => (
                    <div
                      key={i}
                      onClick={() => copyHex(swatch.hex)}
                      className="group cursor-pointer rounded-xl p-3 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-all space-y-3"
                    >
                      <div
                        className="h-14 w-full rounded-lg shadow-inner border border-white/[0.1] group-hover:scale-102 transition-transform"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-zinc-200">{swatch.hex}</span>
                          <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                        </div>
                        <p className="text-[10px] text-zinc-400 truncate">{swatch.name}</p>
                        <p className="text-[9px] text-indigo-400 font-mono">{swatch.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creative Attributes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase">
                    SONIC IDENTITY
                  </span>
                  <h4 className="text-sm font-bold text-white">Modular Ambient Reverb</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Analog tape hiss, microtonal synth arpeggios, and sub-bass resonance inspired by Brian Eno and Aphex Twin.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-violet-400 uppercase">
                    WARDROBE & SILHOUETTE
                  </span>
                  <h4 className="text-sm font-bold text-white">Deconstructed Architectural</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Heavy matte gabardine, exposed raw selvage, oversized drape, and minimalist titanium hardware.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    CINEMATOGRAPHY
                  </span>
                  <h4 className="text-sm font-bold text-white">Low-Key Anamorphic 35mm</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Deep directional shadows, geometric vanishing points, and cool tungsten contrast inspired by Denis Villeneuve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Module 4: Live Taste Topology & Equalizer */}
        {activeTab === "topology" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive SVG Radar */}
            <div className="lg:col-span-6 space-y-4">
              <InteractiveTasteRadar
                dimensions={dimensions}
                onChange={setDimensions}
                size={340}
                interactive={true}
              />
            </div>

            {/* Right: Interactive Equalizer */}
            <div className="lg:col-span-6 space-y-4">
              <InteractiveEqualizer weights={weights} onChange={setWeights} />
            </div>
          </div>
        )}
      </div>

      {/* Floating Pinned Trip Matrix Drawer */}
      <PinnedTripDrawer
        pinnedVenues={pinnedVenues}
        onRemovePin={(name) => setPinnedVenues((prev) => prev.filter((p) => p.name !== name))}
        onClearPins={() => setPinnedVenues([])}
      />

      {/* Venue Detail Modal */}
      {inspectVenue && (
        <CulturalNodeModal
          isOpen={!!inspectVenue}
          onClose={() => setInspectVenue(null)}
          entityName={inspectVenue.name}
          category={inspectVenue.category}
          affinityScore={inspectVenue.qlooAffinityScore}
          overIndexingRatio={4.5}
          matchedTasteSignal={inspectVenue.matchedTasteSignal}
          culturalRationale={inspectVenue.culturalRationale}
          urn={`urn:qloo:entity:place:${inspectVenue.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
        />
      )}
    </div>
  );
}
