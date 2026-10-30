"use client";

import Link from "next/link";
import {
  Compass,
  HeartHandshake,
  Wand2,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Cpu,
  BarChart3,
  Calendar,
  Clock,
  Shirt,
  Music,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const AGENTS = [
  {
    id: "travel",
    title: "Jeevan Travel",
    badge: "Agent 01",
    subtitle: "Cultural Travel Concierge",
    description:
      "Translates multi-dimensional cultural preferences into high-affinity localized travel itineraries with chronological daily schedules and data-grounded explanations.",
    icon: Compass,
    accentColor: "indigo",
    route: "/travel",
    features: [
      "Cross-category place discovery (Tokyo, London, NYC, Paris, Berlin)",
      "Chronological Morning-to-Night timeline with price and neighborhood tags",
      "Qloo Affinity Score (%) and statistical over-indexing explanations",
      "One-click JSON Itinerary export",
    ],
    sampleSeed: "Christopher Nolan + Radiohead + Tadao Ando",
  },
  {
    id: "match",
    title: "Jeevan Match",
    badge: "Agent 02",
    subtitle: "Cultural Compatibility & Date Planner",
    description:
      "Discovers non-obvious taste intersections between two people. Uses Maximin Fairness optimization so neither person is compromised into an experience they dislike.",
    icon: HeartHandshake,
    accentColor: "violet",
    route: "/match",
    features: [
      "Maximin Taste Fairness algorithm (guarantees highest mutual satisfaction floor)",
      "Shared cultural anchors and unexpected crossover identification",
      "Interactive Maximin Balance visualizer comparing both partners",
      "Curated 3-Act Date Plan (Discovery, Culinary Table, Vinyl Nightcap)",
    ],
    sampleSeed: "Elena (Tarantino, Italian Wine) & Julian (Wes Anderson, Daft Punk)",
  },
  {
    id: "studio",
    title: "Jeevan Studio",
    badge: "Agent 03",
    subtitle: "AI Creative Director & Brand Intelligence",
    description:
      "Translates abstract creative briefs into agency-grade creative direction dossiers spanning visual moodboards, sonic identity, cinematic framing, and audience psychographics.",
    icon: Wand2,
    accentColor: "fuchsia",
    route: "/studio",
    features: [
      "5-swatch curated color palette with one-click hex copying",
      "Sonic scoring with curated artist affinities and instrumentation",
      "Wardrobe tailoring silhouettes and textile references",
      "Export dossier in formatted Markdown (.md) or JSON for Notion/Linear",
    ],
    sampleSeed: "AURA Nocturne (Margiela + Aphex Twin + Cyberpunk 2077)",
  },
];

export default function AgentsDashboard() {
  return (
    <div className="min-h-screen bg-[#07080d] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>AGENT ORCHESTRATION HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Select an Autonomous Agent
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Choose from three specialized cultural intelligence agents designed for travel planning, interpersonal compatibility, and creative direction.
          </p>
        </div>

        {/* Global System Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Cultural Knowledge Graph
            </span>
            <div className="text-2xl font-black text-indigo-400 font-mono">5.5M+</div>
            <span className="text-[10px] text-zinc-400">Entities Across Categories</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Affinity Precision
            </span>
            <div className="text-2xl font-black text-emerald-400 font-mono">94.6%</div>
            <span className="text-[10px] text-zinc-400">Average Over-Indexing Match</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Algorithmic Fairness
            </span>
            <div className="text-2xl font-black text-violet-400 font-mono">Maximin</div>
            <span className="text-[10px] text-zinc-400">Zero-Alienation Guarantee</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Dual Engine Core
            </span>
            <div className="text-2xl font-black text-fuchsia-400 font-mono">Py + Next</div>
            <span className="text-[10px] text-zinc-400">FastAPI & Turbopack 16</span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="space-y-6">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="p-8 rounded-3xl bg-[#0d101b] border border-white/[0.08] hover:border-indigo-500/40 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
              >
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                        {agent.badge}
                      </span>
                      <h2 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {agent.title}
                      </h2>
                      <p className="text-xs font-medium text-zinc-400">{agent.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {agent.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                      Sample Cultural Benchmark:
                    </span>
                    <p className="text-xs text-zinc-200 font-mono italic">
                      &quot;{agent.sampleSeed}&quot;
                    </p>
                  </div>

                  <Link
                    href={agent.route}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch {agent.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
