/**
 * Qloo Taste AI API Type Definitions
 * Typed contracts for Entity Resolution, Insights, and Cross-Domain Taste Graph
 */

export type QlooVertical =
  | "movie"
  | "music"
  | "book"
  | "dining"
  | "place"
  | "fashion"
  | "brand"
  | "art"
  | "lifestyle";

export interface QlooEntity {
  id: string; // Canonical URN, e.g., "urn:qloo:entity:movie:christopher-nolan"
  name: string;
  category: QlooVertical | string;
  type?: string;
  popularity?: number; // 0 - 100
  affinity?: number;   // 0 - 100
  description?: string;
  imageUrl?: string;
  tags?: string[];
  metadata?: {
    location?: {
      city?: string;
      neighborhood?: string;
      latitude?: number;
      longitude?: number;
      address?: string;
    };
    year?: number;
    genre?: string[];
    priceLevel?: string;
    vibe?: string[];
    [key: string]: unknown;
  };
}

export interface QlooSearchResponse {
  results: QlooEntity[];
  query: string;
  total?: number;
  source: "qloo_live_api" | "verified_taste_cache";
}

export interface QlooInsightsParams {
  signalEntities: string[]; // List of seed entity IDs or URNs
  targetType?: string;      // e.g., "urn:entity:place", "urn:entity:dining"
  location?: {
    city?: string;
    latitude?: number;
    longitude?: number;
    radiusMeters?: number;
  };
  limit?: number;
}

export interface QlooInsightItem {
  entity: QlooEntity;
  affinityScore: number;     // e.g., 94.2
  overIndexingRatio: number; // e.g., 3.2x normal baseline
  qlooExplainability: {
    matchedSignalName: string;
    sharedAestheticTag: string;
    culturalCorrelationNote: string;
  };
}

export interface QlooInsightsResponse {
  results: QlooInsightItem[];
  signalEntities: string[];
  targetType?: string;
  source: "qloo_live_api" | "verified_taste_cache";
}

export interface QlooCompareParams {
  profileAEntities: string[];
  profileBEntities: string[];
  targetType?: string;
  locationCity?: string;
}

export interface QlooCompareResponse {
  compatibilityScore: number; // 0 - 100 (Maximin taste fairness score)
  sharedAesthetics: string[];
  unexpectedCrossovers: string[];
  intersections: {
    entity: QlooEntity;
    scorePersonA: number;
    scorePersonB: number;
    maximinFairnessScore: number; // min(A, B) - guarantees neither is alienated
    overlapReason: string;
  }[];
  source: "qloo_live_api" | "verified_taste_cache";
}
