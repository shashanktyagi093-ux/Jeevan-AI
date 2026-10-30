import { EntityResolver } from "../qloo/entity-resolver";
import { InsightsService } from "../qloo/insights-service";
import { llmProvider } from "../llm/provider";
import {
  TravelUserInput,
  TravelItineraryOutput,
  TravelVenueItem,
} from "@/types/agent";

export class TravelAgent {
  public static async execute(input: TravelUserInput): Promise<TravelItineraryOutput> {
    const destination = input.destinationCity.trim() || "Tokyo";
    const rawSeeds = input.tasteSeeds && input.tasteSeeds.length > 0
      ? input.tasteSeeds
      : ["Christopher Nolan", "Radiohead", "Tadao Ando"];

    // STEP 1 & 2: Entity Resolution via Qloo
    const resolvedEntities = await EntityResolver.resolveBatch(rawSeeds);

    // STEP 3: Retrieve high-affinity cultural venues from Qloo Taste AI
    const qlooInsights = await InsightsService.getTravelVenues(resolvedEntities, destination, 6);

    // STEP 4: Build structured itinerary schedule
    const days = input.tripDurationDays || 1;
    const timeSlots: ("morning" | "afternoon" | "evening" | "late-night")[] = [
      "morning",
      "afternoon",
      "evening",
      "late-night",
    ];

    const venues: TravelVenueItem[] = qlooInsights.map((item, idx) => {
      const slot = timeSlots[idx % timeSlots.length];
      const dayNum = Math.floor(idx / timeSlots.length) + 1;

      return {
        name: item.entity.name,
        category: (item.entity.category as TravelVenueItem["category"]) || "culture",
        neighborhood: item.entity.metadata?.location?.neighborhood || destination,
        timeSlot: slot,
        day: Math.min(dayNum, days),
        qlooAffinityScore: item.affinityScore,
        matchedTasteSignal: item.qlooExplainability.matchedSignalName,
        culturalRationale: item.qlooExplainability.culturalCorrelationNote ||
          `Reflects your affinity for ${item.qlooExplainability.matchedSignalName} through ${item.qlooExplainability.sharedAestheticTag}.`,
        addressHint: item.entity.metadata?.location?.address || `${destination} Central District`,
        priceLevel: item.entity.metadata?.priceLevel || "$$",
      };
    });

    // Baseline grounded narrative
    const entityNames = resolvedEntities.map((e) => e.name).join(", ");
    const defaultThematicArc = [
      `Aesthetic immersion rooted in ${entityNames}`,
      `Architectural and sensory exploration of ${destination}`,
      `Subtle nocturnal soundscapes and intimate culinary pairings`,
    ];

    const defaultSummary = `A curated cultural journey through ${destination}, curated specifically around your appreciation for ${entityNames}. Every venue was selected by cross-domain taste correlation rather than generic tourist volume.`;
    const defaultProfileAnalysis = `Your cultural taste signature balances structural precision, contemplative atmospheres, and artisanal mastery. Qloo identified elevated statistical affinity with venues featuring high-fidelity sound, minimalist spatial design, and deliberate culinary craft.`;

    // Grounded LLM refinement if available
    let tripSummary = defaultSummary;
    let culturalProfileAnalysis = defaultProfileAnalysis;
    let culturalThematicArc = defaultThematicArc;

    if (llmProvider.isAvailable()) {
      const prompt = `
You are the Jeevan Travel Cultural Concierge.
The traveler loves: ${entityNames}.
Destination: ${destination}.
Selected venues: ${JSON.stringify(venues.map(v => ({ name: v.name, slot: v.timeSlot, signal: v.matchedTasteSignal })))}.

Generate a JSON object with:
1. "tripSummary": A compelling 2-sentence summary of the journey's cultural identity.
2. "culturalProfileAnalysis": A deep 2-sentence breakdown of what their taste profile signifies.
3. "culturalThematicArc": Array of 3 string milestones for their itinerary.

Do not invent venues. Rely strictly on the cultural links provided. Return pure JSON.
`;
      const synthesis = await llmProvider.generateStructuredJson(
        prompt,
        "You are an expert cultural strategist and travel concierge. Respond only with valid JSON.",
        { tripSummary, culturalProfileAnalysis, culturalThematicArc }
      );

      tripSummary = synthesis.tripSummary || tripSummary;
      culturalProfileAnalysis = synthesis.culturalProfileAnalysis || culturalProfileAnalysis;
      culturalThematicArc = synthesis.culturalThematicArc || culturalThematicArc;
    }

    return {
      destination,
      tripSummary,
      culturalProfileAnalysis,
      seedEntitiesResolved: resolvedEntities,
      venues,
      culturalThematicArc,
      qlooInsightsUsed: qlooInsights,
      provenance: {
        qlooSource: qlooInsights.length > 0 && qlooInsights[0].affinityScore ? "live" : "verified_fixture",
        generatedAt: new Date().toISOString(),
      },
    };
  }
}
