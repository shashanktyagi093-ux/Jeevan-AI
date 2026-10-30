import { QlooEntity, QlooInsightItem } from "./qloo";

export type AgentType = "travel" | "match" | "studio";

export interface AgentStepProgress {
  step: number;
  totalSteps: number;
  label: string;
  status: "idle" | "running" | "completed" | "error";
  detail?: string;
}

// -------------------------------------------------------------
// AGENT 1: JEEVAN TRAVEL
// -------------------------------------------------------------
export interface TravelUserInput {
  tasteSeeds: string[];         // e.g. ["Christopher Nolan", "Radiohead", "Japanese Architecture"]
  destinationCity: string;      // e.g. "Tokyo", "London", "Paris", "New York", "Berlin"
  tripDurationDays?: number;    // e.g. 1 to 3 days
  budgetLevel?: "accessible" | "moderate" | "premium" | "luxury";
  interests?: string[];         // e.g. ["dining", "music venues", "museums", "neighborhoods"]
}

export interface TravelVenueItem {
  name: string;
  category: "dining" | "culture" | "music" | "architecture" | "lifestyle";
  neighborhood: string;
  timeSlot: "morning" | "afternoon" | "evening" | "late-night";
  day: number;
  qlooAffinityScore: number;
  matchedTasteSignal: string;
  culturalRationale: string;
  addressHint?: string;
  priceLevel?: string;
}

export interface TravelItineraryOutput {
  destination: string;
  tripSummary: string;
  culturalProfileAnalysis: string;
  seedEntitiesResolved: QlooEntity[];
  venues: TravelVenueItem[];
  culturalThematicArc: string[];
  qlooInsightsUsed: QlooInsightItem[];
  provenance: {
    qlooSource: "live" | "verified_fixture";
    generatedAt: string;
  };
}

// -------------------------------------------------------------
// AGENT 2: JEEVAN MATCH
// -------------------------------------------------------------
export interface MatchUserInput {
  personAName: string;
  personATastes: string[];      // e.g. ["Tarantino", "Fleetwood Mac", "Italian Wine"]
  personBName: string;
  personBTastes: string[];      // e.g. ["Wes Anderson", "Daft Punk", "Scandinavian Design"]
  targetCity?: string;          // e.g. "New York", "London", "Tokyo"
  dateVibe?: "casual" | "romantic" | "adventurous" | "artistic";
}

export interface MatchIntersectionItem {
  venueOrActivity: string;
  category: string;
  personAAffinity: number;
  personBAffinity: number;
  maximinFairnessScore: number;
  sharedAestheticGround: string;
  whyItWorksForBoth: string;
}

export interface MatchOutput {
  compatibilityScore: number; // 0 - 100
  tasteDynamicNarrative: string;
  sharedCulturalAnchors: string[];
  unexpectedCrossovers: string[];
  resolvedPersonA: QlooEntity[];
  resolvedPersonB: QlooEntity[];
  rankedIntersections: MatchIntersectionItem[];
  dateItinerary: {
    phase: "act1_opening" | "act2_dining" | "act3_nightcap";
    title: string;
    description: string;
    venueName: string;
    whyBothWillLoveIt: string;
  }[];
  compromiseSafeguardNote: string;
  provenance: {
    qlooSource: "live" | "verified_fixture";
    generatedAt: string;
  };
}

// -------------------------------------------------------------
// AGENT 3: JEEVAN STUDIO
// -------------------------------------------------------------
export interface StudioUserInput {
  brandOrProjectName: string;
  projectType: "fashion_collection" | "film_production" | "brand_campaign" | "product_launch" | "hospitality";
  briefDescription: string;
  seedInspirations: string[];   // e.g. ["Cyberpunk 2077", "Maison Margiela", "Aphex Twin"]
  targetDemographic?: string;
}

export interface StudioDossierOutput {
  projectName: string;
  projectType: string;
  creativeThesis: string;
  brandArchetype: string;
  resolvedInspirations: QlooEntity[];
  visualMoodboardDirection: {
    colorPalette: string[];
    textureAndMaterials: string[];
    lightingAndAtmosphere: string;
    architecturalCues: string[];
  };
  sonicIdentity: {
    curatedArtists: { name: string; qlooAffinity: number; reason: string }[];
    soundtrackVibe: string;
    instrumentationFocus: string[];
  };
  wardrobeAndStyling: {
    fashionReferences: string[];
    silhouetteStyle: string;
    materials: string[];
  };
  cinematicReferences: {
    filmsOrDirectors: string[];
    compositionalStyle: string;
  };
  targetAudiencePsychographics: {
    archetypeName: string;
    coreValues: string[];
    adjacentTastes: string[];
  };
  provenance: {
    qlooSource: "live" | "verified_fixture";
    generatedAt: string;
  };
}
