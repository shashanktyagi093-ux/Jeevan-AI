# JEEVAN AI — Cultural Intelligence Platform
**Qloo Agentic Hackathon 2026**

> **Tagline:** *Understand Taste. Discover Connections. Experience Life.*

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![Qloo Taste AI](https://img.shields.io/badge/Qloo%20API-v2%20Insights-indigo)](https://qloo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 1. Executive Summary & Vision

Traditional recommendation systems operate in isolated vertical silos: Spotify knows what songs you stream, Netflix knows what movies you watch, and Yelp knows what restaurants you visit. When conventional AI tries to bridge them, it defaults to generic popularity or hallucinates superficial associations.

**Jeevan AI** introduces a unified cultural intelligence paradigm. Powered by **Qloo's Taste AI™ Graph** (spanning 5.5M+ cultural entities across music, cinema, literature, fashion, architecture, and dining), Jeevan AI discovers the invisible multidimensional threads that bind human preferences together.

A person whose taste anchors are **Christopher Nolan**, **Radiohead**, and **Tadao Ando** is not three disconnected data points—they embody a distinct cultural identity defined by structural complexity, melancholic introspection, and brutalist minimalism. Jeevan AI translates this signature into real-world action across three specialized, autonomous agents.

---

## 2. The Three Autonomous Agents

```
                        ┌────────────────────────────────┐
                        │      USER CULTURAL INPUTS      │
                        │    (Cinema, Music, Design)     │
                        └───────────────┬────────────────┘
                                        │
                        ┌───────────────▼────────────────┐
                        │     QLOO ENTITY RESOLUTION     │
                        │       /search → Canonical URNs │
                        └───────────────┬────────────────┘
                                        │
                        ┌───────────────▼────────────────┐
                        │     QLOO TASTE AI GRAPH        │
                        │    /v2/insights Affinities     │
                        └───────────────┬────────────────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         │                              │                              │
┌────────▼─────────────┐   ┌────────────▼─────────────┐   ┌────────────▼─────────────┐
│  AGENT 1: TRAVEL     │   │  AGENT 2: MATCH          │   │  AGENT 3: STUDIO         │
│  Cultural Concierge  │   │  Maximin Fairness Planner│   │  AI Creative Director    │
├──────────────────────┤   ├──────────────────────────┤   ├──────────────────────────┤
│ • Localized Itinerary│   │ • Dual Profile Overlap   │   │ • Multi-domain Dossier   │
│ • Morning-to-Night   │   │ • Anti-Alienation Guarn. │   │ • Visual Moodboard & Hex │
│ • Cultural Justif.   │   │ • 3-Act Shared Date Plan │   │ • Sonic & Cinema Refs    │
└──────────────────────┘   └──────────────────────────┘   └──────────────────────────┘
```

### Agent 1: Jeevan Travel (Cultural Travel Concierge)
- **Objective:** Convert cultural preferences into localized, high-affinity travel itineraries.
- **Workflow:** Resolves 3–5 cultural anchors, queries Qloo `/v2/insights` with `filter.type=urn:entity:place` within destination city bounds (e.g. Tokyo, New York, London, Paris, Berlin), and sequences a chronological daily itinerary (morning, afternoon, evening, late-night).
- **Explainability:** Transparently documents the statistical over-indexing connection (e.g., why Radiohead listeners over-index 4.5x in analog listening kissatens).

### Agent 2: Jeevan Match (Cultural Compatibility & Date Planner)
- **Objective:** Discover non-obvious taste intersections between two people without naive averaging.
- **Maximin Taste Fairness:** Instead of averaging interests (which often forces one person into an experience they dislike), Jeevan Match evaluates candidate experiences across both profiles and ranks them by:
  $$\text{FairnessScore} = \min(\text{Affinity}_A, \text{Affinity}_B)$$
  This guarantees the highest possible mutual satisfaction floor.
- **Date Architecture:** Structures a seamless 3-Act date experience (Act I: Low-Pressure Discovery, Act II: The Shared Culinary Table, Act III: Low-Light Vinyl Nightcap).

### Agent 3: Jeevan Studio (AI Creative Director & Brand Intelligence)
- **Objective:** Help filmmakers, fashion designers, and brand strategists synthesize culturally coherent creative directions.
- **Workflow:** Ingests project briefs and seed inspirations, resolves cross-domain associations, and outputs an agency-grade Creative Direction Dossier including:
  - Curated 5-tone color palette with instant hex-code copying
  - Tactile material and architectural cues
  - Sonic identity with curated artist affinities
  - Wardrobe silhouettes and auteur cinematographic benchmarks
  - Target audience psychographic archetypes

---

## 3. Qloo API Integration Architecture

The integration layer is strictly server-side, resilient, and verifiable:

- **Centralized Client (`src/lib/qloo/client.ts`):** Handles header-based authentication via `X-Api-Key` and configurable base URL (`QLOO_BASE_URL`).
- **Entity Resolution (`src/lib/qloo/entity-resolver.ts`):** Disambiguates user-entered text into verified Qloo entity identifiers and extracts aesthetic domain tags.
- **Cross-Domain Insights (`src/lib/qloo/insights-service.ts`):** Queries `/v2/insights` with `signal.interests.entities`, target category scoping, and geo-location filters.
- **In-Memory LRU Cache (`src/lib/utils/cache.ts`):** Caches high-frequency entity queries to reduce API latency and safeguard rate limits.
- **Diagnostics Endpoint (`/api/qloo/health`):** Provides live health verification and latency reporting.
- **Zero Hallucination Boundary:** Qloo calculates all taste affinities, lifts, and entity mappings; LLM providers are strictly restricted to narrative synthesis and formatting.

---

## 4. Technology Stack & Multi-Language Architecture

Jeevan AI is built on a **high-performance dual-engine architecture**:

- **AI Backend & Core Orchestration:** **Python 3.14 / FastAPI / Pydantic 2 / HTTPX**
  - All 3 autonomous agents implemented in pure Python (`backend/agents/`)
  - Qloo Taste AI API Client in Python (`backend/qloo/client.py`)
  - Maximin Taste Fairness algorithm in Python (`backend/qloo/insights_service.py`)
  - Interactive Python CLI for terminal testing (`backend/cli.py`)
- **Web Application & UI Layer:** **Next.js 16.4 / React 19 / TypeScript / Tailwind CSS v4**
  - Real-time cultural graph visualizers, itinerary builders, and creative direction dossiers
  - Server-side route handlers seamlessly communicating with the Python FastAPI backend
- **Cultural Intelligence:** Qloo Taste AI™ Graph (`/v2/search`, `/v2/insights`)

---

## 5. Getting Started

### Prerequisites
- Node.js 20+ (tested on Node.js v26.12.1)
- Python 3.10+ (tested on Python 3.14.4)

### 1. Python Environment Setup
```bash
# Initialize virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.\.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install Python backend dependencies
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

---

## 6. Running Jeevan AI

### Option A: Interactive Python CLI (Terminal Mode)
Judges and developers can interact with all three agents directly in Python:
```bash
# Run automated Python verification suite
python backend/cli.py test

# Launch interactive Python CLI menu
python backend/cli.py
```

### Option B: Python FastAPI Backend Server
Launch the Python backend with automatic Swagger documentation at `http://127.0.0.1:8000/docs`:
```bash
uvicorn backend.main:app --reload --port 8000
```

### Option C: Web Experience (Next.js + Python Backend)
```bash
# Terminal 1: Run Python AI Agent Server
uvicorn backend.main:app --reload --port 8000

# Terminal 2: Run Next.js Web Application
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
```bash
npx tsx scripts/test-agents.ts
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 6. Demonstration Scenarios for Judges

| Agent | Input Scenario | Expected Cultural Discovery |
| :--- | :--- | :--- |
| **Jeevan Travel** | `["Christopher Nolan", "Radiohead", "Tadao Ando"]` in **Tokyo** | Discovers *Meikyoku Kissa Lion* (historic analog listening bar) and *21_21 DESIGN SIGHT* (Tadao Ando museum), explaining how Nolan's architectural cinema connects with Tokyo's minimalist audio culture. |
| **Jeevan Match** | **Elena** (`Tarantino, Fleetwood Mac, Italian Wine`) + **Julian** (`Wes Anderson, Daft Punk, Scandinavian Design`) in **Tokyo** | Calculates a 94% Maximin compatibility score. Connects Tarantino's retro soundtracks with Daft Punk's analog synths at *Bar Trench* and *Daikanyama T-Site*. |
| **Jeevan Studio** | Brief: *"Avant-garde nocturnal menswear"* with inspirations `["Maison Margiela", "Aphex Twin", "Cyberpunk 2077"]` | Produces an executive dossier featuring deconstructed tailoring, modular synthesis audio direction, a 5-hex color palette, and Denis Villeneuve-inspired cinematic framing. |

---

## 7. Privacy & Security Commitment

- **Stateless Inference:** In accordance with Qloo's privacy principles, Jeevan AI does not store, profile, or sell user identity data.
- **Zero Client Key Exposure:** All Qloo and LLM credentials are strictly confined to server-side Next.js route handlers.
- **No PII Collection:** Queries are processed in ephemeral memory and discarded upon completion.

---

## 8. License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.
