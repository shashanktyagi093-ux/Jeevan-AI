"use client";

import { useState } from "react";
import {
  HeartHandshake,
  Sparkles,
  Users,
  ShieldCheck,
  Calendar,
  Compass,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { EntityTagInput } from "@/components/shared/EntityTagInput";
import { AgentReasoningSteps } from "@/components/shared/AgentReasoningSteps";
import { MatchOutput } from "@/types/agent";

export default function MatchPage() {
  const [personAName, setPersonAName] = useState("Elena");
  const [personATastes, setPersonATastes] = useState<string[]>([
    "Quentin Tarantino",
    "Fleetwood Mac",
    "Italian Wine",
  ]);

  const [personBName, setPersonBName] = useState("Julian");
  const [personBTastes, setPersonBTastes] = useState<string[]>([
    "Wes Anderson",
    "Daft Punk",
    "Scandinavian Design",
  ]);

  const [targetCity, setTargetCity] = useState("Tokyo");
  const [vibe, setVibe] = useState<"casual" | "romantic" | "adventurous" | "artistic">("romantic");

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<MatchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (personATastes.length === 0 || personBTastes.length === 0) {
      setError("Please provide taste preferences for both individuals.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      const res = await fetch("/api/agents/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personAName,
          personATastes,
          personBName,
          personBTastes,
          targetCity,
          dateVibe: vibe,
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to analyze compatibility.");
      }

      const data = (await res.json()) as MatchOutput;
      setCurrentStep(4);
      setResult(data);
    } catch (err: unknown) {
      clearInterval(stepInterval);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jeevan-match-${personAName}-and-${personBName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>AGENT 2: JEEVAN MATCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Cultural Compatibility & Date Planner
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Discover meaningful cultural intersections between two different taste profiles. Powered by Qloo Taste AI and <strong className="text-zinc-200">Maximin Fairness</strong>—ensuring neither person gets dragged somewhere they hate.
          </p>
        </div>

        {/* Input Form & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0d101b] border border-white/[0.08] shadow-xl space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-400" />
              <span>Dual Taste Profiles</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Person A */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    Person 1
                  </span>
                  <input
                    type="text"
                    value={personAName}
                    onChange={(e) => setPersonAName(e.target.value)}
                    placeholder="Name"
                    className="w-28 bg-[#131726] px-2 py-0.5 rounded text-xs text-zinc-200 border border-white/[0.1] text-right"
                  />
                </div>
                <EntityTagInput
                  label="Cultural Affinities"
                  tags={personATastes}
                  onChange={setPersonATastes}
                  maxTags={4}
                  helperText="Films, music, authors, or aesthetics."
                />
              </div>

              {/* Person B */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">
                    Person 2
                  </span>
                  <input
                    type="text"
                    value={personBName}
                    onChange={(e) => setPersonBName(e.target.value)}
                    placeholder="Name"
                    className="w-28 bg-[#131726] px-2 py-0.5 rounded text-xs text-zinc-200 border border-white/[0.1] text-right"
                  />
                </div>
                <EntityTagInput
                  label="Cultural Affinities"
                  tags={personBTastes}
                  onChange={setPersonBTastes}
                  maxTags={4}
                  helperText="Films, music, authors, or aesthetics."
                />
              </div>

              {/* Location and Vibe */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    City
                  </label>
                  <select
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    className="w-full bg-[#131726] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="Tokyo">Tokyo</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Date Vibe
                  </label>
                  <select
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value as any)}
                    className="w-full bg-[#131726] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="romantic">Romantic & Intimate</option>
                    <option value="artistic">Artistic & Visual</option>
                    <option value="casual">Casual & Conversational</option>
                    <option value="adventurous">Bold & Experimental</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-600 text-white font-semibold text-xs tracking-wide shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Evaluating Maximin Taste Overlap...</span>
                  </>
                ) : (
                  <>
                    <span>Discover Cultural Compatibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Loading Steps or Results */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading && (
              <AgentReasoningSteps currentStepIndex={currentStep} />
            )}

            {!isLoading && !result && (
              <div className="p-10 rounded-2xl bg-[#0d101b] border border-white/[0.08] text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 mx-auto flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-200">
                    Find Meaningful Intersections
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Enter cultural preferences for two people to uncover shared aesthetic DNA and construct a tailored date experience.
                  </p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Score & Maximin Headline */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/40 via-[#0d101b] to-indigo-950/30 border border-violet-500/30 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">
                        Maximin Taste Fairness
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mt-1">
                        {result.compatibilityScore}% Compatibility
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={handleExport}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] text-[11px] flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                    {result.tasteDynamicNarrative}
                  </p>

                  <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-start gap-2 text-xs text-violet-200">
                    <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>{result.compromiseSafeguardNote}</span>
                  </div>

                  {/* Shared anchors */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                      Shared Aesthetics:
                    </span>
                    {result.sharedCulturalAnchors.map((anchor, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-white/[0.05] text-zinc-300 border border-white/[0.06]"
                      >
                        {anchor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3-Act Date Itinerary */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    <span>The Curated 3-Act Date</span>
                  </h3>

                  <div className="space-y-3">
                    {result.dateItinerary.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0d101b] border border-white/[0.08] hover:border-violet-500/40 transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400">
                              {act.title}
                            </span>
                            <h4 className="text-base font-bold text-white">
                              {act.venueName}
                            </h4>
                          </div>

                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                            Maximin Aligned
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {act.description}
                        </p>

                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300">
                          <span className="text-violet-300 font-semibold">Why it works for both: </span>
                          <span>{act.whyBothWillLoveIt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
