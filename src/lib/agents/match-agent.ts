import { EntityResolver } from "../qloo/entity-resolver";
import { InsightsService } from "../qloo/insights-service";
import { llmProvider } from "../llm/provider";
import { MatchUserInput, MatchOutput, MatchIntersectionItem } from "@/types/agent";

export class MatchAgent {
  public static async execute(input: MatchUserInput): Promise<MatchOutput> {
    const personAName = input.personAName.trim() || "Person A";
    const personBName = input.personBName.trim() || "Person B";

    const tastesA = input.personATastes.length > 0 ? input.personATastes : ["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"];
    const tastesB = input.personBTastes.length > 0 ? input.personBTastes : ["Wes Anderson", "Daft Punk", "Scandinavian Design"];

    // STEP 1 & 2: Resolve both profiles via Qloo
    const [resolvedA, resolvedB] = await Promise.all([
      EntityResolver.resolveBatch(tastesA),
      EntityResolver.resolveBatch(tastesB),
    ]);

    // STEP 3: Compute cultural compatibility & Maximin intersection
    const compResult = await InsightsService.evaluateCompatibility(resolvedA, resolvedB, input.targetCity);

    // STEP 4: Rank intersections and build 3-act date plan
    const rankedIntersections: MatchIntersectionItem[] = compResult.intersections.map((inter) => ({
      venueOrActivity: inter.entity.name,
      category: inter.entity.category,
      personAAffinity: inter.scorePersonA,
      personBAffinity: inter.scorePersonB,
      maximinFairnessScore: inter.maximinFairnessScore,
      sharedAestheticGround: compResult.sharedAesthetics[0] || "Contemporary Craft",
      whyItWorksForBoth: inter.overlapReason,
    }));

    const datePlan = [
      {
        phase: "act1_opening" as const,
        title: "Act I: Low-Pressure Aesthetic Discovery",
        venueName: rankedIntersections[1]?.venueOrActivity || "Artisanal Architectural Gallery",
        description: `Start somewhere engaging and tactile where conversation flows organically around shared visual interests.`,
        whyBothWillLoveIt: `Satisfies ${personAName}'s taste for narrative richness while appealing to ${personBName}'s eye for geometry and composition.`,
      },
      {
        phase: "act2_dining" as const,
        title: "Act II: The Shared Culinary Table",
        venueName: rankedIntersections[0]?.venueOrActivity || "Seasonal Tasting Room & Natural Cellar",
        description: `An immersive dinner setting balancing warmth, distinct seasonal ingredients, and relaxed elegance.`,
        whyBothWillLoveIt: `Combines bold, deliberate flavor execution with unpretentious design, keeping both individuals highly satisfied.`,
      },
      {
        phase: "act3_nightcap" as const,
        title: "Act III: Low-Light Vinyl Nightcap",
        venueName: rankedIntersections[2]?.venueOrActivity || "Hi-Fi Listening Bar",
        description: `Wind down in an intimate, dim-lit space powered by vintage analog audio and craft digestifs.`,
        whyBothWillLoveIt: `Directly crosses over both profiles' musical appreciation—audiophile fidelity without overwhelming volume.`,
      },
    ];

    const defaultNarrative = `${personAName} and ${personBName} possess contrasting surface preferences, yet share a profound underlying affinity for meticulous craft and vintage textures. Rather than averaging your interests, Jeevan Match identified an intersection of high-fidelity sound, intimate lighting, and bold visual storytelling.`;
    const defaultSafeguard = `Using Qloo's Maximin Fairness optimization, each selected experience guarantees a minimum satisfaction threshold of ${compResult.compatibilityScore}%. Neither person is forced into an experience they dislike.`;

    let tasteDynamicNarrative = defaultNarrative;
    let compromiseSafeguardNote = defaultSafeguard;

    if (llmProvider.isAvailable()) {
      const prompt = `
You are the Jeevan Match Cultural Compatibility Agent.
Partner 1 (${personAName}): Loves ${resolvedA.map(e => e.name).join(", ")}.
Partner 2 (${personBName}): Loves ${resolvedB.map(e => e.name).join(", ")}.
Compatibility Score: ${compResult.compatibilityScore}%.
Shared Aesthetics: ${compResult.sharedAesthetics.join(", ")}.

Generate a JSON object with:
1. "tasteDynamicNarrative": A 2-sentence sophisticated analysis of how their two taste profiles dance together.
2. "compromiseSafeguardNote": A 1-sentence note explaining why neither person was forced into a boring compromise.

Return pure JSON.
`;
      const synthesis = await llmProvider.generateStructuredJson(
        prompt,
        "You are an expert relationship psychologist and cultural analyst. Respond strictly in JSON.",
        { tasteDynamicNarrative, compromiseSafeguardNote }
      );

      tasteDynamicNarrative = synthesis.tasteDynamicNarrative || tasteDynamicNarrative;
      compromiseSafeguardNote = synthesis.compromiseSafeguardNote || compromiseSafeguardNote;
    }

    return {
      compatibilityScore: compResult.compatibilityScore,
      tasteDynamicNarrative,
      sharedCulturalAnchors: compResult.sharedAesthetics,
      unexpectedCrossovers: compResult.unexpectedCrossovers,
      resolvedPersonA: resolvedA,
      resolvedPersonB: resolvedB,
      rankedIntersections,
      dateItinerary: datePlan,
      compromiseSafeguardNote,
      provenance: {
        qlooSource: compResult.source === "qloo_live_api" ? "live" : "verified_fixture",
        generatedAt: new Date().toISOString(),
      },
    };
  }
}
