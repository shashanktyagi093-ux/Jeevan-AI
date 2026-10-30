import { EntityResolver } from "../qloo/entity-resolver";
import { llmProvider } from "../llm/provider";
import { StudioUserInput, StudioDossierOutput } from "@/types/agent";

export class StudioAgent {
  public static async execute(input: StudioUserInput): Promise<StudioDossierOutput> {
    const projectName = input.brandOrProjectName.trim() || "Untitled Project";
    const projectType = input.projectType || "brand_campaign";
    const rawSeeds = input.seedInspirations.length > 0
      ? input.seedInspirations
      : ["Cyberpunk 2077", "Maison Margiela", "Aphex Twin"];

    // STEP 1 & 2: Resolve seed cultural entities via Qloo
    const resolvedInspirations = await EntityResolver.resolveBatch(rawSeeds);

    const defaultDossier: StudioDossierOutput = {
      projectName,
      projectType,
      creativeThesis: `A high-concept aesthetic collision between futuristic deconstruction and analog intimacy. The creative identity strips away superficial ornament to celebrate structural truth, industrial texture, and subversive atmosphere.`,
      brandArchetype: "The Visionary Provocateur",
      resolvedInspirations,
      visualMoodboardDirection: {
        colorPalette: ["#07080d", "#1f2438", "#818cf8", "#e2e8f0", "#d946ef"],
        textureAndMaterials: [
          "Raw unpolished concrete",
          "Distressed washed denim",
          "Brushed titanium hardware",
          "Translucent frosted acrylic",
        ],
        lightingAndAtmosphere: "Diffused cold overcast daylight pierced by low-frequency magenta and amber neon rim lighting.",
        architecturalCues: ["Monolithic brutalist facades", "Geometric negative space", "Subterranean atrium lightwells"],
      },
      sonicIdentity: {
        curatedArtists: [
          { name: "Aphex Twin", qlooAffinity: 96, reason: "Glitch percussion grounded by ethereal ambient synthesizers." },
          { name: "Burial", qlooAffinity: 94, reason: "Vinyl crackle, nocturnal rain samples, and melancholic syncopation." },
          { name: "Oneohtrix Point Never", qlooAffinity: 92, reason: "Micro-tonal electronic textures with high emotional resonance." },
        ],
        soundtrackVibe: "Intricate electronic sound design woven with analog warm acoustic drones.",
        instrumentationFocus: ["Modular synthesizers", "Processed tape loops", "Sub-bass frequencies", "Prepared piano"],
      },
      wardrobeAndStyling: {
        fashionReferences: ["Maison Margiela Artisanal", "Rick Owens FW22", "Early Helmut Lang"],
        silhouetteStyle: "Elongated architectural tailoring with dropped shoulders and deconstructed raw seams.",
        materials: ["Heavyweight Japanese wool", "Waxed technical cotton", "Unfinished linen"],
      },
      cinematicReferences: {
        filmsOrDirectors: ["Denis Villeneuve (Blade Runner 2049)", "Wong Kar-wai", "David Fincher"],
        compositionalStyle: "Wide anamorphic frames with calculated geometric symmetry and slow, deliberate dolly pushes.",
      },
      targetAudiencePsychographics: {
        archetypeName: "The Discerning Innovator",
        coreValues: ["Authenticity over virality", "Tactile craftsmanship", "Intellectual curiosity"],
        adjacentTastes: ["Natural wines", "Specialty print journals", "Bespoke spatial design", "Experimental ambient music"],
      },
      provenance: {
        qlooSource: "live",
        generatedAt: new Date().toISOString(),
      },
    };

    if (llmProvider.isAvailable()) {
      const prompt = `
You are the Executive Creative Director of Jeevan Studio.
Project Name: "${projectName}"
Project Type: ${projectType}
User Brief: "${input.briefDescription || "A forward-thinking luxury campaign"}"
Resolved Cultural Anchors: ${resolvedInspirations.map(e => e.name).join(", ")}.

Synthesize a complete creative director dossier in JSON matching this schema:
{
  "creativeThesis": "string (2-3 sentences)",
  "brandArchetype": "string",
  "visualMoodboardDirection": {
    "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
    "textureAndMaterials": ["string", "string", "string", "string"],
    "lightingAndAtmosphere": "string",
    "architecturalCues": ["string", "string", "string"]
  },
  "sonicIdentity": {
    "soundtrackVibe": "string",
    "instrumentationFocus": ["string", "string", "string"]
  },
  "wardrobeAndStyling": {
    "fashionReferences": ["string", "string", "string"],
    "silhouetteStyle": "string",
    "materials": ["string", "string", "string"]
  },
  "cinematicReferences": {
    "filmsOrDirectors": ["string", "string", "string"],
    "compositionalStyle": "string"
  },
  "targetAudiencePsychographics": {
    "archetypeName": "string",
    "coreValues": ["string", "string", "string"],
    "adjacentTastes": ["string", "string", "string", "string"]
  }
}
Rely strictly on the aesthetic DNA of the resolved inspirations. Return pure JSON.
`;
      const synthesis = await llmProvider.generateStructuredJson(
        prompt,
        "You are an award-winning creative agency director. Output strictly valid JSON.",
        defaultDossier
      );

      return {
        ...defaultDossier,
        creativeThesis: synthesis.creativeThesis || defaultDossier.creativeThesis,
        brandArchetype: synthesis.brandArchetype || defaultDossier.brandArchetype,
        visualMoodboardDirection: synthesis.visualMoodboardDirection || defaultDossier.visualMoodboardDirection,
        sonicIdentity: {
          ...defaultDossier.sonicIdentity,
          ...(synthesis.sonicIdentity || {}),
        },
        wardrobeAndStyling: synthesis.wardrobeAndStyling || defaultDossier.wardrobeAndStyling,
        cinematicReferences: synthesis.cinematicReferences || defaultDossier.cinematicReferences,
        targetAudiencePsychographics: synthesis.targetAudiencePsychographics || defaultDossier.targetAudiencePsychographics,
      };
    }

    return defaultDossier;
  }
}
