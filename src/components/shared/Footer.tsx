import Link from "next/link";
import Image from "next/image";
import { Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080d] text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/jeevan-logo.png"
                alt="Jeevan AI Logo"
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-zinc-300">
                Enterprise Edition
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              A unified cultural intelligence platform powered by <strong className="text-zinc-200">Qloo Taste AI</strong>. Understanding relationships between seemingly unrelated cultural affinities to transform taste into real-world experiences.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-zinc-500 pt-2">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Stateless & Privacy-First
              </span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Qloo Taste AI™ Graph v2
              </span>
            </div>
          </div>

          {/* Agent Modules */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
              Autonomous Agents
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/travel" className="hover:text-indigo-400 transition-colors">
                  Jeevan Travel (Concierge)
                </Link>
              </li>
              <li>
                <Link href="/match" className="hover:text-indigo-400 transition-colors">
                  Jeevan Match (Maximin Fairness)
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-indigo-400 transition-colors">
                  Jeevan Studio (Creative Director)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  Architecture & Taste Graph
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence Resources */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
              Official Intelligence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://qloo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
                >
                  <span>Qloo Cultural AI Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-zinc-500">API: /v2/search & /v2/insights</span>
              </li>
              <li>
                <span className="text-zinc-500">License: MIT Open Source</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Jeevan AI. Cultural Intelligence & Taste Graph Architecture.</p>
          <div className="flex items-center gap-4">
            <span>Understand Taste.</span>
            <span>•</span>
            <span>Discover Connections.</span>
            <span>•</span>
            <span>Experience Life.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
