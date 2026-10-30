import { qlooClient } from "../src/lib/qloo/client";
import { TravelAgent } from "../src/lib/agents/travel-agent";
import { MatchAgent } from "../src/lib/agents/match-agent";
import { StudioAgent } from "../src/lib/agents/studio-agent";

async function runTests() {
  console.log("=================================================");
  console.log("   JEEVAN AI — AGENTIC VERIFICATION SUITE       ");
  console.log("=================================================\n");

  // TEST 1: Health & Connectivity Check
  console.log("[1/4] Checking Qloo Taste AI API status...");
  const health = await qlooClient.checkHealth();
  console.log("  Status:", health.message);
  console.log("  Mode:", health.mode);
  console.log("  Latency:", health.latencyMs ? `${health.latencyMs}ms` : "N/A");

  // TEST 2: Travel Agent Execution
  console.log("\n[2/4] Executing Agent 1: Jeevan Travel...");
  const travelResult = await TravelAgent.execute({
    tasteSeeds: ["Christopher Nolan", "Radiohead", "Tadao Ando"],
    destinationCity: "Tokyo",
    tripDurationDays: 1,
  });
  console.log("  Destination:", travelResult.destination);
  console.log("  Resolved Entities:", travelResult.seedEntitiesResolved.map((e) => e.name).join(", "));
  console.log("  Curated Venues:", travelResult.venues.length);
  travelResult.venues.forEach((v, i) => {
    console.log(`    ${i + 1}. [${v.timeSlot.toUpperCase()}] ${v.name} (Qloo Affinity: ${v.qlooAffinityScore}%)`);
    console.log(`       -> ${v.culturalRationale}`);
  });

  // TEST 3: Match Agent Execution
  console.log("\n[3/4] Executing Agent 2: Jeevan Match...");
  const matchResult = await MatchAgent.execute({
    personAName: "Elena",
    personATastes: ["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"],
    personBName: "Julian",
    personBTastes: ["Wes Anderson", "Daft Punk", "Scandinavian Design"],
    targetCity: "Tokyo",
  });
  console.log("  Compatibility Score:", `${matchResult.compatibilityScore}% (Maximin Taste Fairness)`);
  console.log("  Shared Aesthetics:", matchResult.sharedCulturalAnchors.join(" • "));
  console.log("  Date Itinerary Acts:", matchResult.dateItinerary.length);
  matchResult.dateItinerary.forEach((act) => {
    console.log(`    - ${act.title}: ${act.venueName}`);
  });

  // TEST 4: Studio Agent Execution
  console.log("\n[4/4] Executing Agent 3: Jeevan Studio...");
  const studioResult = await StudioAgent.execute({
    brandOrProjectName: "AURA Nocturne",
    projectType: "fashion_collection",
    briefDescription: "An avant-garde nocturnal menswear collection combining brutalist architecture with modular electronics.",
    seedInspirations: ["Maison Margiela", "Aphex Twin", "Cyberpunk 2077"],
  });
  console.log("  Project:", studioResult.projectName);
  console.log("  Brand Archetype:", studioResult.brandArchetype);
  console.log("  Palette:", studioResult.visualMoodboardDirection.colorPalette.join(", "));
  console.log("  Wardrobe Silhouettes:", studioResult.wardrobeAndStyling.silhouetteStyle);
  console.log("  Soundtrack Vibe:", studioResult.sonicIdentity.soundtrackVibe);

  console.log("\n=================================================");
  console.log("   ALL 3 AGENTS EXECUTED SUCCESSFULLY!          ");
  console.log("=================================================");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
