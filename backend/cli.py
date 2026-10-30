"""
Interactive Python CLI for Jeevan AI
Taste AI & Cultural Intelligence Platform
"""

import sys
import asyncio
from pathlib import Path

# Add project root to path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

from backend.qloo.client import qloo_client
from backend.agents.travel_agent import PythonTravelAgent
from backend.agents.match_agent import PythonMatchAgent
from backend.agents.studio_agent import PythonStudioAgent
from backend.models.agent import TravelUserInput, MatchUserInput, StudioUserInput


async def run_diagnostics():
    print("\n--- [1] Qloo API & System Diagnostics ---")
    health = await qloo_client.check_health()
    print(f"Status:   {health.get('message')}")
    print(f"Mode:     {health.get('mode')}")
    lat = health.get('latency_ms')
    print(f"Latency:  {lat}ms" if lat else "Latency:  N/A")


async def run_travel():
    print("\n--- [2] Agent 1: Jeevan Travel Concierge ---")
    seeds_input = input("Enter 3-5 taste anchors (comma-separated, default: Nolan, Radiohead, Ando): ").strip()
    seeds = [s.strip() for s in seeds_input.split(",") if s.strip()] if seeds_input else ["Christopher Nolan", "Radiohead", "Tadao Ando"]
    city = input("Destination City (default: Tokyo): ").strip() or "Tokyo"

    print(f"\n[+] Resolving {len(seeds)} taste seeds via Qloo Taste AI...")
    result = await PythonTravelAgent.execute(TravelUserInput(tasteSeeds=seeds, destinationCity=city))

    print(f"\n[Result] Destination: {result.destination}")
    print(f"[Result] Trip Summary: {result.tripSummary}")
    print(f"[Result] Profile Analysis: {result.culturalProfileAnalysis}")
    print("\nCurated Daily Itinerary:")
    for v in result.venues:
        print(f"  • [{v.timeSlot.upper()}] {v.name} ({v.qlooAffinityScore}% Affinity)")
        print(f"    Rationale: {v.culturalRationale}")


async def run_match():
    print("\n--- [3] Agent 2: Jeevan Match (Maximin Fairness) ---")
    name_a = input("Person 1 Name (default: Elena): ").strip() or "Elena"
    tastes_a_input = input(f"{name_a}'s tastes (comma-separated): ").strip()
    tastes_a = [s.strip() for s in tastes_a_input.split(",")] if tastes_a_input else ["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"]

    name_b = input("Person 2 Name (default: Julian): ").strip() or "Julian"
    tastes_b_input = input(f"{name_b}'s tastes (comma-separated): ").strip()
    tastes_b = [s.strip() for s in tastes_b_input.split(",")] if tastes_b_input else ["Wes Anderson", "Daft Punk", "Scandinavian Design"]

    city = input("Target City (default: Tokyo): ").strip() or "Tokyo"

    print("\n[+] Computing Maximin Fairness overlap...")
    result = await PythonMatchAgent.execute(
        MatchUserInput(
            personAName=name_a,
            personATastes=tastes_a,
            personBName=name_b,
            personBTastes=tastes_b,
            targetCity=city,
        )
    )

    print(f"\n[Result] Compatibility Score: {result.compatibilityScore}% (Maximin Taste Fairness)")
    print(f"[Result] Shared Aesthetics: {' • '.join(result.sharedCulturalAnchors)}")
    print(f"[Result] Dynamic: {result.tasteDynamicNarrative}")
    print(f"[Result] Safeguard: {result.compromiseSafeguardNote}")
    print("\n3-Act Date Plan:")
    for act in result.dateItinerary:
        print(f"  • {act.title}: {act.venueName}")
        print(f"    Why both love it: {act.whyBothWillLoveIt}")


async def run_studio():
    print("\n--- [4] Agent 3: Jeevan Studio (Creative Director) ---")
    name = input("Project / Brand Name (default: AURA Nocturne): ").strip() or "AURA Nocturne"
    brief = input("Creative Brief: ").strip() or "An avant-garde nocturnal menswear collection combining brutalist architecture with modular electronics."
    inspo_input = input("Seed Inspirations (comma-separated): ").strip()
    inspo = [s.strip() for s in inspo_input.split(",")] if inspo_input else ["Maison Margiela", "Aphex Twin", "Cyberpunk 2077"]

    print("\n[+] Synthesizing agency-grade Creative Direction Dossier...")
    result = await PythonStudioAgent.execute(
        StudioUserInput(
            brandOrProjectName=name,
            projectType="fashion_collection",
            briefDescription=brief,
            seedInspirations=inspo,
        )
    )

    print(f"\n[Result] Project: {result.projectName}")
    print(f"[Result] Archetype: {result.brandArchetype}")
    print(f"[Result] Thesis: {result.creativeThesis}")
    print(f"[Result] Palette: {result.visualMoodboardDirection.get('colorPalette')}")
    print(f"[Result] Soundtrack: {result.sonicIdentity.get('soundtrackVibe')}")
    print(f"[Result] Wardrobe: {result.wardrobeAndStyling.get('silhouetteStyle')}")


async def run_all_tests():
    print("=================================================")
    print("   JEEVAN AI -- PYTHON AGENTIC VERIFICATION SUITE")
    print("=================================================\n")
    await run_diagnostics()

    print("\n[Testing Travel Agent...]")
    t_res = await PythonTravelAgent.execute(TravelUserInput(tasteSeeds=["Christopher Nolan", "Radiohead"], destinationCity="Tokyo"))
    print(f"  [OK] Venues Curated: {len(t_res.venues)} in {t_res.destination}")

    print("\n[Testing Match Agent...]")
    m_res = await PythonMatchAgent.execute(MatchUserInput(personAName="Elena", personBName="Julian"))
    print(f"  [OK] Maximin Compatibility: {m_res.compatibilityScore}%")

    print("\n[Testing Studio Agent...]")
    s_res = await PythonStudioAgent.execute(StudioUserInput(brandOrProjectName="AURA Nocturne"))
    print(f"  [OK] Dossier Generated for: {s_res.projectName} ({s_res.brandArchetype})")

    print("\n=================================================")
    print("   ALL PYTHON AGENTS EXECUTED SUCCESSFULLY!      ")
    print("=================================================")


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        asyncio.run(run_all_tests())
        return

    print("================================================")
    print("     JEEVAN AI -- CULTURAL INTELLIGENCE (PYTHON) ")
    print("          Taste AI Enterprise Edition           ")
    print("================================================")
    print("1. System & Qloo Health Diagnostics")
    print("2. Run Agent 1: Jeevan Travel Concierge")
    print("3. Run Agent 2: Jeevan Match (Maximin Fairness)")
    print("4. Run Agent 3: Jeevan Studio (Creative Director)")
    print("5. Run Full Automated Verification Suite")
    print("6. Launch FastAPI Server (uvicorn)")
    print("0. Exit")

    choice = input("\nSelect an option (0-6): ").strip()
    if choice == "1":
        asyncio.run(run_diagnostics())
    elif choice == "2":
        asyncio.run(run_travel())
    elif choice == "3":
        asyncio.run(run_match())
    elif choice == "4":
        asyncio.run(run_studio())
    elif choice == "5":
        asyncio.run(run_all_tests())
    elif choice == "6":
        import uvicorn
        uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
    else:
        print("Exiting.")


if __name__ == "__main__":
    main()
