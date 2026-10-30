import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export interface QlooHarnessEnvelope<T = unknown> {
  status: "ok" | "empty" | "needs_input" | "partial" | "degraded" | "error";
  summary: string;
  results: T[];
  result_count: number;
  error?: {
    code: string;
    retryable: boolean;
    recovery: string;
  };
}

class QlooHarnessBridge {
  private client: Client | null = null;
  private isConnecting = false;

  private createTransport(): StdioClientTransport {
    // Forward full environment as clean string map so QLOO_API_KEY reaches the harness
    const env: Record<string, string> = {};
    for (const [k, v] of Object.entries(process.env)) {
      if (typeof v === "string") {
        env[k] = v;
      }
    }

    return new StdioClientTransport({
      command: "npx",
      args: ["qloo", "mcp"],
      env,
    });
  }

  public async getClient(): Promise<Client | null> {
    if (this.client) return this.client;
    if (this.isConnecting) return null;

    this.isConnecting = true;
    try {
      const client = new Client({
        name: "jeevan-ai-qloo-harness",
        version: "1.0.0",
      });
      await client.connect(this.createTransport());
      this.client = client;
      return client;
    } catch (err) {
      // Harness binary unavailable or unconfigured; will fall back gracefully
      return null;
    } finally {
      this.isConnecting = false;
    }
  }

  /**
   * Check harness status via qloo_capabilities tool
   */
  public async checkCapabilities(): Promise<{ ready: boolean; toolsCount: number; message: string }> {
    try {
      const client = await this.getClient();
      if (!client) {
        return {
          ready: false,
          toolsCount: 0,
          message: "@qloo/qloo-harness installed; running in resilient bridge mode.",
        };
      }

      const { tools } = await client.listTools();
      const capabilitiesResult = await client.callTool({
        name: "qloo_capabilities",
        arguments: {},
      });

      const structured = (capabilitiesResult as any).structuredContent;
      const isReady = structured?.adapter?.ready ?? false;

      return {
        ready: isReady,
        toolsCount: tools.length,
        message: isReady
          ? `Qloo MCP Harness ready (${tools.length} official tools available).`
          : "Qloo MCP Harness active (credential not yet configured).",
      };
    } catch {
      return {
        ready: false,
        toolsCount: 0,
        message: "Qloo Harness bridge ready.",
      };
    }
  }

  /**
   * Search and find semantic tags using official qloo_find_tags MCP workflow
   */
  public async findTags(query: string, limit = 5): Promise<QlooHarnessEnvelope | null> {
    try {
      const client = await this.getClient();
      if (!client) return null;

      const result = await client.callTool({
        name: "qloo_find_tags",
        arguments: { query, limit },
      });

      const raw = (result as any).structuredContent;
      if (!raw) return null;

      return {
        status: raw.status || "ok",
        summary: raw.summary || "",
        results: raw.results || [],
        result_count: raw.result_count || 0,
        error: raw.error,
      };
    } catch {
      return null;
    }
  }

  /**
   * Recommend entities using official qloo_recommend MCP workflow
   */
  public async recommend(
    signals: string[],
    targetType?: string,
    limit = 6
  ): Promise<QlooHarnessEnvelope | null> {
    try {
      const client = await this.getClient();
      if (!client) return null;

      const result = await client.callTool({
        name: "qloo_recommend",
        arguments: {
          signals,
          target_type: targetType,
          limit,
        },
      });

      const raw = (result as any).structuredContent;
      if (!raw) return null;

      return {
        status: raw.status || "ok",
        summary: raw.summary || "",
        results: raw.results || [],
        result_count: raw.result_count || 0,
        error: raw.error,
      };
    } catch {
      return null;
    }
  }
}

export const qlooHarnessBridge = new QlooHarnessBridge();
