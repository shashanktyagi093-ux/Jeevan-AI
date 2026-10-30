"use client";

import { useState } from "react";
import {
  Compass,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  ArrowRight,
  RotateCcw,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { EntityTagInput } from "@/components/shared/EntityTagInput";
import { AgentReasoningSteps } from "@/components/shared/AgentReasoningSteps";
import { TravelItineraryOutput } from "@/types/agent";

const CITIES = [
  { id: "Tokyo", name: "Tokyo", country: "Japan", highlight: "Ebisu, Roppongi, Daikanyama" },
  { id: "New York", name: "New York", country: "United States", highlight: "NoHo, Chelsea, SoHo" },
  { id: "London", name: "London", country: "United Kingdom", highlight: "Barbican, Dalston, Shoreditch" },
  { id: "Paris", name: "Paris", country: "France", highlight: "Le Marais, Belleville, Canal Saint-Martin" },
  { id: "Berlin", name: "Berlin", country: "Germany", highlight: "Mitte, Kreuzberg, Neukölln" },
];

export default function TravelPage() {
  const [tasteSeeds, setTasteSeeds] = useState<string[]>([
    "Christopher Nolan",
    "Radiohead",
    "Tadao Ando",
  ]);
  const [destination, setDestination] = useState<string>("Tokyo");
  const [duration, setDuration] = useState<number>(1);
  const [budget, setBudget] = useState<"accessible" | "moderate" | "premium" | "luxury">("premium");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [result, setResult] = useState<TravelItineraryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tasteSeeds.length === 0) {
      setError("Please add at least 1 cultural preference seed.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentStep(0);

    // Step simulation for transparency
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      const res = await fetch("/api/agents/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasteSeeds,
          destinationCity: destination,
          tripDurationDays: duration,
          budgetLevel: budget,
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to generate itinerary.");
      }

      const data = (await res.json()) as TravelItineraryOutput;
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
    a.download = `jeevan-travel-${destination.toLowerCase()}-itinerary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <Compass className="w-3.5 h-3.5" />
            <span>AGENT 1: JEEVAN TRAVEL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Cultural Travel Concierge
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Transform your distinct aesthetic tastes in cinema, literature, design, and music into a personalized real-world travel itinerary powered by Qloo Taste AI.
          </p>
        </div>

        {/* Input Form & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0d101b] border border-white/[0.08] shadow-xl space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Configure Journey</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Taste Seed Input */}
              <EntityTagInput
                label="Your Cultural Preferences"
                tags={tasteSeeds}
                onChange={setTasteSeeds}
                maxTags={5}
                helperText="Enter 3-5 creators, films, musicians, or design movements you love."
              />

              {/* Destination selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Destination City</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setDestination(c.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        destination === c.id
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                          : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                      }`}
                    >
                      <p className="text-xs font-semibold">{c.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{c.country}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration and Budget */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Duration</span>
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#131726] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value={1}>1 Day (Express)</option>
                    <option value={2}>2 Days (Weekend)</option>
                    <option value={3}>3 Days (Deep Dive)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Tier</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value as any)}
                    className="w-full bg-[#131726] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="accessible">Accessible</option>
                    <option value="moderate">Moderate</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Orchestrating Cultural Itinerary...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Cultural Itinerary</span>
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
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-200">
                    Your Cultural Itinerary Awaits
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Select your taste anchors and destination to see Qloo resolve cross-category correlations into an authentic itinerary.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Ready for Qloo v2/insights inference</span>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Result Summary Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#0d101b] to-violet-950/30 border border-indigo-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {result.destination} Itinerary
                      </span>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Qloo Verified Provenance
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExport}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] text-[11px] flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                    {result.tripSummary}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {result.culturalProfileAnalysis}
                  </p>

                  {/* Resolved Entities */}
                  <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                      Anchors:
                    </span>
                    {result.seedEntitiesResolved.map((e) => (
                      <span
                        key={e.id}
                        className="px-2 py-0.5 rounded text-[11px] bg-white/[0.05] text-zinc-300 border border-white/[0.06]"
                      >
                        {e.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Itinerary Venues */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Curated Cultural Venues</span>
                  </h3>

                  <div className="space-y-3">
                    {result.venues.map((venue, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0d101b] border border-white/[0.08] hover:border-indigo-500/40 transition-all space-y-3 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-white/[0.06] text-zinc-300">
                                {venue.timeSlot}
                              </span>
                              <span className="text-xs text-zinc-500">•</span>
                              <span className="text-xs text-zinc-400">{venue.neighborhood}</span>
                              {venue.priceLevel && (
                                <span className="text-xs text-zinc-500 font-mono">
                                  {venue.priceLevel}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                              {venue.name}
                            </h4>
                          </div>

                          {/* Qloo Affinity Badge */}
                          <div className="text-right shrink-0">
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono">
                              <Sparkles className="w-3 h-3 text-indigo-400" />
                              <span>{venue.qlooAffinityScore}% Affinity</span>
                            </div>
                          </div>
                        </div>

                        {/* Explainability Section */}
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Why Qloo Matched This:</span>
                            <span className="text-zinc-200 normal-case font-normal">
                              {venue.matchedTasteSignal}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {venue.culturalRationale}
                          </p>
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
