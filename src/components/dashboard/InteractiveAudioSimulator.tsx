"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Disc3, Radio } from "lucide-react";

interface AudioTrack {
  id: string;
  title: string;
  sub: string;
  baseFreq: number;
}

const PRESET_SOUNDSCAPES: AudioTrack[] = [
  { id: "kissaten", title: "Shibuya Analog Hi-Fi", sub: "Meikyoku Kissa Lion - 33 RPM Tube Amp", baseFreq: 216 },
  { id: "brutalist", title: "Barbican Concrete Reverb", sub: "Tadao Ando Spatial Resonance - 432Hz", baseFreq: 144 },
  { id: "modular", title: "Nocturne Modular Synth", sub: "Aphex Twin Microtonal Synthesis", baseFreq: 288 },
];

export function InteractiveAudioSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(PRESET_SOUNDSCAPES[0]);
  const [volume, setVolume] = useState<number>(0.35);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Oscillator 1: Warm Root Sine
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(currentTrack.baseFreq, ctx.currentTime);

      // Oscillator 2: Fifth harmonic (warmth)
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(currentTrack.baseFreq * 1.5, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.5, ctx.currentTime);

      osc1.connect(masterGain);
      osc2.connect(oscGain);
      oscGain.connect(masterGain);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      setIsPlaying(true);
    } catch {
      // Audio fallback without error
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
    } catch {
      // Ignore cleanup error
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const switchTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    if (isPlaying) {
      stopAudio();
      setTimeout(() => startAudio(), 100);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.15,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="p-4 rounded-2xl glass-dock flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Track info & Disc Animation */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-lg ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "6s" }}
          >
            <Disc3 className="w-5 h-5" />
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
            <h4 className="text-xs font-bold text-white tracking-wide">{currentTrack.title}</h4>
          </div>
          <p className="text-[10px] text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
            {currentTrack.sub}
          </p>
        </div>
      </div>

      {/* Spectrum EQ visualizer bars */}
      <div className="flex items-end gap-1 h-6 px-3 py-1 rounded-lg bg-black/30 border border-white/[0.06]">
        <div className={`w-1 bg-indigo-400 rounded-full ${isPlaying ? "animate-eq-1" : "h-1"}`} />
        <div className={`w-1 bg-violet-400 rounded-full ${isPlaying ? "animate-eq-2" : "h-2"}`} />
        <div className={`w-1 bg-cyan-400 rounded-full ${isPlaying ? "animate-eq-3" : "h-1.5"}`} />
        <div className={`w-1 bg-emerald-400 rounded-full ${isPlaying ? "animate-eq-4" : "h-2.5"}`} />
        <div className={`w-1 bg-indigo-400 rounded-full ${isPlaying ? "animate-eq-2" : "h-1"}`} />
        <div className={`w-1 bg-violet-400 rounded-full ${isPlaying ? "animate-eq-3" : "h-2"}`} />
      </div>

      {/* Controls & Track Switcher */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Track dropdown / switcher pills */}
        <div className="hidden md:flex items-center gap-1">
          {PRESET_SOUNDSCAPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => switchTrack(t)}
              className={`px-2 py-1 rounded-md text-[9px] font-mono transition-all ${
                currentTrack.id === t.id
                  ? "bg-indigo-600/30 text-indigo-200 border border-indigo-400/30"
                  : "bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              {t.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-600/30 hover:scale-105 transition-transform"
          title={isPlaying ? "Pause Soundscape" : "Audition Ambient Soundscape"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Volume & Mute */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="text-zinc-400 hover:text-zinc-200"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
