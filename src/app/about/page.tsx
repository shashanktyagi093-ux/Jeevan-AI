import Link from "next/link";
import {
  Sparkles,
  Shield,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  GitBranch,
  Terminal,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>QLOO AGENTIC HACKATHON 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Cultural Intelligence Architecture
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
            How Jeevan AI leverages Qloo's Taste Graph to solve cross-category affinity, enforce algorithmic fairness, and ground autonomous AI agents in real human culture.
          </p>
        </div>

        {/* Section 1: Traditional Recs vs Qloo Cultural Intelligence */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>1. The Fundamental Shift: Beyond Category Silos</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Traditional recommendation engines operate in vertical silos: Spotify knows your music, Netflix knows your movies, Yelp knows your restaurants. When AI tries to bridge them, it either defaults to naive popularity or hallucinates superficial associations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Conventional AI Recommenders
              </span>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Category-siloed collaborative filtering ("people who watched X also watched Y").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Popularity bias leading to generic tourist hubs and over-hyped venues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>LLM hallucinations fabricating affinity scores and cultural connections.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#0d101b] to-violet-950/20 border border-indigo-500/30 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Jeevan AI + Qloo Taste Graph
              </span>
              <ul className="space-y-2 text-xs text-zinc-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5.5M+ cross-domain entities connected by verified mathematical affinity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero popularity bias: discovers hidden gems based on taste over-indexing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict architectural grounding: Qloo computes affinities, LLM articulates context.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Agent Orchestration Pipeline */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <GitBranch className="w-5 h-5 text-violet-400" />
            <span>2. The Multi-Step Agentic Pipeline</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Rather than a static prompt, each Jeevan agent executes an autonomous deterministic-to-probabilistic workflow:
          </p>

          <div className="p-6 rounded-2xl bg-[#0d101b] border border-white/[0.08] space-y-4 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>Pipeline Execution Lifecycle</span>
            </div>
            <div className="space-y-2 pl-2 border-l border-white/[0.1]">
              <p><span className="text-zinc-500">1. INPUT:</span> User provides multi-vertical preference seeds (e.g. Nolan + Radiohead + Ando).</p>
              <p><span className="text-zinc-500">2. RESOLUTION:</span> EntityResolver queries Qloo /search to disambiguate and map to canonical URNs.</p>
              <p><span className="text-zinc-500">3. INFERENCE:</span> InsightsService queries Qloo /v2/insights with seed URN signals and target filters.</p>
              <p><span className="text-zinc-500">4. FAIRNESS:</span> (For Match) Maximin optimization guarantees no party is alienated by compromise.</p>
              <p><span className="text-zinc-500">5. SYNTHESIS:</span> LLM creates contextual narratives strictly bounded by Qloo&apos;s data.</p>
              <p><span className="text-zinc-500">6. CONTRACT:</span> Validated, type-safe JSON returned to responsive client layer.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Privacy & Statelessness */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#0d101b] to-indigo-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Stateless & Privacy-First by Design
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Jeevan AI strictly adheres to Qloo&apos;s privacy-first principles. We do not store, profile, or sell user identity data. Taste signals are processed ephemerally in-memory during inference and discarded immediately after response synthesis.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Experience Cultural Intelligence</h3>
            <p className="text-xs text-zinc-400">Launch any of the three specialized agents.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/travel"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Jeevan Travel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/match"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Jeevan Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
