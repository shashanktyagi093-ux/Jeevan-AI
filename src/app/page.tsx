"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  HeartHandshake,
  Wand2,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { MainGlassyDashboard } from "@/components/dashboard/MainGlassyDashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 border-b border-white/[0.06]">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-aura pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Platform Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs text-zinc-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-semibold text-white">Taste AI Enterprise</span>
            <span className="text-zinc-500">|</span>
            <span className="text-indigo-400 font-medium">Cultural Intelligence Platform</span>
          </div>

          {/* Official Engine Brand Logo */}
          <div className="flex justify-center pt-2">
            <div className="p-2 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-2xl backdrop-blur-md hover:border-indigo-500/30 transition-all">
              <Image
                src="/brand/jeevan-logo.png"
                alt="Jeevan AI Logo"
                width={280}
                height={73}
                priority
                className="h-11 sm:h-14 w-auto object-contain"
              />
            </div>
          </div>

          {/* Master Tagline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Understand Taste. <br />
              <span className="gradient-text-qloo">Discover Connections.</span> <br />
              Experience Life.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Traditional AI recommends things in isolated silos. <strong className="text-zinc-200">Jeevan AI</strong> decodes the invisible cultural threads connecting your favorite cinema, music, design, and literature into authentic real-world experiences.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/travel"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-semibold text-xs tracking-wide shadow-xl shadow-indigo-600/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Jeevan Travel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/match"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#131726] hover:bg-[#191f33] border border-white/[0.1] text-zinc-200 font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-violet-400" />
              <span>Test Match Compatibility</span>
            </Link>

            <Link
              href="/studio"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#131726] hover:bg-[#191f33] border border-white/[0.1] text-zinc-200 font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-fuchsia-400" />
              <span>Launch Studio Agent</span>
            </Link>
          </div>

          {/* Feature Highlights Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Qloo Taste AI™ v2 Graph</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Zero-Storage Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Maximin Fairness Algorithm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Glassy Dashboard Core */}
      <section className="py-12 w-full">
        <MainGlassyDashboard />
      </section>

      {/* The 3 Autonomous Agents Showcase */}
      <section className="py-20 border-t border-white/[0.06] bg-[#090b12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Autonomous Systems
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Three Specialized Cultural AI Agents
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Engineered with dedicated objectives, transparent data provenance, and strict architectural grounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AGENT 1 */}
            <div className="p-7 rounded-3xl bg-[#0d101b] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                    AGENT 1
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                    Jeevan Travel
                  </h3>
                  <p className="text-xs font-medium text-zinc-400">
                    Cultural Travel Concierge
                  </p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Converts cultural preferences in cinema, literature, and architecture into chronological morning-to-night travel itineraries with data-grounded explanations.
                </p>
              </div>

              <Link
                href="/travel"
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-indigo-600 text-zinc-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/[0.06] hover:border-indigo-500"
              >
                <span>Launch Travel Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* AGENT 2 */}
            <div className="p-7 rounded-3xl bg-[#0d101b] border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400">
                    AGENT 2
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors">
                    Jeevan Match
                  </h3>
                  <p className="text-xs font-medium text-zinc-400">
                    Maximin Cultural Compatibility
                  </p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Discovers meaningful shared intersections between two people. Uses Maximin Fairness optimization so neither person is compromised into an experience they despise.
                </p>
              </div>

              <Link
                href="/match"
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-violet-600 text-zinc-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/[0.06] hover:border-violet-500"
              >
                <span>Launch Date Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* AGENT 3 */}
            <div className="p-7 rounded-3xl bg-[#0d101b] border border-white/[0.08] hover:border-fuchsia-500/40 transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center">
                  <Wand2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-fuchsia-400">
                    AGENT 3
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-200 transition-colors">
                    Jeevan Studio
                  </h3>
                  <p className="text-xs font-medium text-zinc-400">
                    Creative Director & Brand Intelligence
                  </p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Synthesizes creative direction briefs into structured dossiers: color palettes, textures, sonic scoring, wardrobe styling, and audience psychographics.
                </p>
              </div>

              <Link
                href="/studio"
                className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-fuchsia-600 text-zinc-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/[0.06] hover:border-fuchsia-500"
              >
                <span>Launch Creative Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
