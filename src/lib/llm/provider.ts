import { GoogleGenAI } from "@google/genai";

export class LLMProvider {
  private static instance: LLMProvider;
  private client: GoogleGenAI | null = null;
  private apiKey: string;

  private constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    if (this.apiKey && this.apiKey.trim().length > 0 && !this.apiKey.includes("your_gemini")) {
      try {
        this.client = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (err) {
        console.warn("[LLMProvider] Failed to initialize GoogleGenAI client:", err);
      }
    }
  }

  public static getInstance(): LLMProvider {
    if (!LLMProvider.instance) {
      LLMProvider.instance = new LLMProvider();
    }
    return LLMProvider.instance;
  }

  public isAvailable(): boolean {
    return Boolean(this.client);
  }

  /**
   * Generates structured JSON grounded in provided Qloo data.
   * If LLM is unavailable or fails, returns fallbackData safely.
   */
  public async generateStructuredJson<T>(
    prompt: string,
    systemInstruction: string,
    fallbackData: T
  ): Promise<T> {
    if (!this.client) {
      return fallbackData;
    }

    try {
      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.3, // Lower temperature to prevent hallucination
        },
      });

      const text = typeof response.text === "string" ? response.text : String(response.text || "");
      if (!text) return fallbackData;

      const parsed = JSON.parse(text) as T;
      return parsed;
    } catch (err) {
      console.warn("[LLMProvider] LLM call failed or returned unparseable JSON, using grounded fallback:", err);
      return fallbackData;
    }
  }
}

export const llmProvider = LLMProvider.getInstance();
