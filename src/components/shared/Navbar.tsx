"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, HeartHandshake, Wand2, Info, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/travel", label: "Jeevan Travel", icon: Compass, badge: "Concierge" },
  { href: "/match", label: "Jeevan Match", icon: HeartHandshake, badge: "Maximin" },
  { href: "/studio", label: "Jeevan Studio", icon: Wand2, badge: "Creative Dir" },
  { href: "/about", label: "Architecture", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07080d]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                JEEVAN <span className="text-indigo-400 font-bold">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-md">
                Qloo 2026
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 tracking-wide hidden sm:block">
              Cultural Intelligence Platform
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-indigo-400" : "text-zinc-400")} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-white/[0.08] text-zinc-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Live Qloo Status & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Qloo Taste Graph Active</span>
          </div>

          <Link
            href="/travel"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-600/25 hover:opacity-95 transition-all"
          >
            <span>Launch Agent</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
