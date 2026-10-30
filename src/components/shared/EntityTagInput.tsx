"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X, Search, Sparkles, Film, Music, BookOpen, Compass, Palette, Tag } from "lucide-react";
import { QlooEntity } from "@/types/qloo";
import { cn } from "@/lib/utils";

interface EntityTagInputProps {
  label: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  suggestions?: string[];
  helperText?: string;
}

const DEFAULT_SUGGESTIONS = [
  "Christopher Nolan",
  "Radiohead",
  "Tadao Ando",
  "Haruki Murakami",
  "Wes Anderson",
  "Daft Punk",
  "Maison Margiela",
  "Wong Kar-wai",
  "Aphex Twin",
  "Noma",
];

export function EntityTagInput({
  label,
  placeholder = "Search movies, musicians, authors, architects, or aesthetics...",
  tags,
  onChange,
  maxTags = 5,
  suggestions = DEFAULT_SUGGESTIONS,
  helperText = "Add 3 to 5 cultural preferences to seed Qloo's taste graph.",
}: EntityTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<QlooEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced autocomplete query
  useEffect(() => {
    if (!inputValue.trim() || inputValue.trim().length < 2) {
      setAutocompleteResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/qloo/search?q=${encodeURIComponent(inputValue.trim())}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setAutocompleteResults(data.results || []);
          setIsOpen(true);
        }
      } catch {
        setAutocompleteResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addTag = (tagName: string) => {
    const clean = tagName.trim();
    if (!clean) return;
    if (tags.includes(clean)) return;
    if (tags.length >= maxTags) return;

    onChange([...tags, clean]);
    setInputValue("");
    setIsOpen(false);
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("movie") || cat.includes("film")) return Film;
    if (cat.includes("music")) return Music;
    if (cat.includes("book")) return BookOpen;
    if (cat.includes("fashion") || cat.includes("art")) return Palette;
    if (cat.includes("place")) return Compass;
    return Tag;
  };

  return (
    <div className="space-y-3" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {label}
        </label>
        <span className="text-[11px] text-zinc-400">
          {tags.length} / {maxTags} entities
        </span>
      </div>

      {/* Selected Tag Pills */}
      <div className="flex flex-wrap gap-2 min-h-[38px] p-2 rounded-xl bg-[#0d101b] border border-white/[0.08] focus-within:border-indigo-500/50 transition-all">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500/15 to-violet-500/15 text-indigo-200 border border-indigo-500/30 shadow-sm animate-in fade-in"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-indigo-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}

        {/* Input box */}
        {tags.length < maxTags && (
          <div className="relative flex-1 min-w-[180px]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue.trim().length >= 2 && setIsOpen(true)}
              placeholder={tags.length === 0 ? placeholder : "Add another..."}
              className="w-full bg-transparent px-2 py-1 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && autocompleteResults.length > 0 && (
        <div className="relative z-50">
          <div className="absolute top-1 left-0 right-0 rounded-xl bg-[#131726] border border-white/[0.12] shadow-2xl overflow-hidden py-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-zinc-400 border-b border-white/[0.06] flex items-center gap-1.5">
              <Search className="w-3 h-3 text-indigo-400" />
              <span>Qloo Verified Cultural Entities</span>
            </div>
            {autocompleteResults.map((ent) => {
              const Icon = getCategoryIcon(ent.category);
              return (
                <button
                  key={ent.id}
                  type="button"
                  onClick={() => addTag(ent.name)}
                  className="w-full px-3 py-2 text-left hover:bg-white/[0.06] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-white/[0.05] flex items-center justify-center text-zinc-400 group-hover:text-indigo-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-200 group-hover:text-white">
                        {ent.name}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {ent.type || ent.category}
                      </p>
                    </div>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-400" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick-Pick Cultural Suggestions */}
      {tags.length < maxTags && suggestions.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Curated taste anchors:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions
              .filter((s) => !tags.includes(s))
              .slice(0, 6)
              .map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addTag(s)}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.06] transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-zinc-400" />
                  <span>{s}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-zinc-400">{helperText}</p>
      )}
    </div>
  );
}
