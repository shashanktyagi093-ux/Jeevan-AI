import { qlooClient } from "./client";
import { QlooEntity } from "@/types/qloo";

export class EntityResolver {
  /**
   * Resolves an array of user-input strings into canonical Qloo entities
   */
  public static async resolveBatch(inputs: string[]): Promise<QlooEntity[]> {
    const cleanInputs = inputs
      .map((i) => i.trim())
      .filter((i) => i.length > 0)
      .slice(0, 8);

    if (cleanInputs.length === 0) return [];

    const resolved: QlooEntity[] = [];

    // Parallel resolution with Promise.allSettled
    const results = await Promise.allSettled(
      cleanInputs.map(async (rawQuery) => {
        const searchRes = await qlooClient.searchEntities(rawQuery, undefined, 1);
        if (searchRes.results.length > 0) {
          return searchRes.results[0];
        }
        // Fallback synthetic entity if zero results
        return {
          id: `urn:qloo:entity:${rawQuery.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name: rawQuery,
          category: "culture",
          type: "Taste Anchor",
          popularity: 85,
          affinity: 90,
          tags: [rawQuery.toLowerCase(), "cultural-preference"],
        };
      })
    );

    for (const res of results) {
      if (res.status === "fulfilled" && res.value) {
        resolved.push(res.value);
      }
    }

    return resolved;
  }

  /**
   * Extracts unified cultural aesthetic keywords from a set of resolved entities
   */
  public static extractAestheticTags(entities: QlooEntity[]): string[] {
    const tags = new Set<string>();
    for (const ent of entities) {
      if (ent.tags) {
        for (const t of ent.tags) {
          tags.add(t);
        }
      }
    }
    return Array.from(tags).slice(0, 10);
  }
}
