/**
 * Lightweight In-Memory LRU Cache for high-frequency Qloo queries
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class SimpleMemoryCache {
  private store: Map<string, CacheEntry<unknown>> = new Map();
  private maxItems: number;

  constructor(maxItems = 200) {
    this.maxItems = maxItems;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    // Refresh LRU order
    this.store.delete(key);
    this.store.set(key, entry as CacheEntry<unknown>);
    return entry.value;
  }

  set<T>(key: string, value: T, ttlMs = 1000 * 60 * 15): void {
    if (this.store.size >= this.maxItems) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  clear(): void {
    this.store.clear();
  }
}

export const qlooCache = new SimpleMemoryCache(300);
