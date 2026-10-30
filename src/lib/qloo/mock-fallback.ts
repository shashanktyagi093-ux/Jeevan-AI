import { QlooEntity, QlooInsightItem, QlooCompareResponse } from "@/types/qloo";

export const VERIFIED_CULTURAL_ENTITIES: QlooEntity[] = [
  {
    id: "urn:qloo:entity:person:christopher-nolan",
    name: "Christopher Nolan",
    category: "movie",
    type: "Director",
    popularity: 96,
    affinity: 98,
    description: "Visionary filmmaker renowned for non-linear structures, practical effects, and philosophical themes of time and memory.",
    tags: ["neo-noir", "practical-effects", "time-dilation", "cinematic-grandeur", "cerebral"],
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:music:radiohead",
    name: "Radiohead",
    category: "music",
    type: "Band",
    popularity: 94,
    affinity: 97,
    description: "Pioneering art-rock and electronic band known for melancholic soundscapes, existential lyricism, and sonic experimentation.",
    tags: ["art-rock", "experimental-electronic", "existentialism", "atmospheric", "dystopian"],
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:book:haruki-murakami",
    name: "Haruki Murakami",
    category: "book",
    type: "Author",
    popularity: 92,
    affinity: 95,
    description: "Celebrated author known for magical realism, urban loneliness, jazz motifs, and surrealist domestic mystery.",
    tags: ["magical-realism", "urban-solitude", "jazz-cadence", "subtle-melancholy", "surrealism"],
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:architecture:tadao-ando",
    name: "Tadao Ando",
    category: "lifestyle",
    type: "Architect",
    popularity: 89,
    affinity: 94,
    description: "Pritzker-winning Japanese architect celebrated for smooth raw concrete, natural light manipulation, and Zen-influenced stillness.",
    tags: ["brutalism", "zen-minimalism", "raw-concrete", "spatial-geometry", "light-sculpting"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:movie:wes-anderson",
    name: "Wes Anderson",
    category: "movie",
    type: "Director",
    popularity: 93,
    affinity: 96,
    description: "Famed for meticulous symmetry, pastel color palettes, quirky ensemble casts, and retro-diorama visual styling.",
    tags: ["symmetry", "pastel-palettes", "vintage-nostalgia", "whimsical", "diorama-framing"],
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:music:daft-punk",
    name: "Daft Punk",
    category: "music",
    type: "Musical Duo",
    popularity: 95,
    affinity: 96,
    description: "Legendary French electronic pioneers who shaped modern house, synth-pop, and futuristic retro-funk aesthetics.",
    tags: ["french-house", "retro-futurism", "analog-synths", "robotic-chic", "funk-disco"],
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:fashion:maison-margiela",
    name: "Maison Margiela",
    category: "fashion",
    type: "Fashion House",
    popularity: 88,
    affinity: 93,
    description: "Avant-garde haute couture house celebrated for deconstruction, anonymous white labels, and raw hemlines.",
    tags: ["deconstruction", "avant-garde", "minimal-white", "anti-branding", "artisanal"],
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:movie:wong-kar-wai",
    name: "Wong Kar-wai",
    category: "movie",
    type: "Director",
    popularity: 91,
    affinity: 95,
    description: "Hong Kong auteur acclaimed for step-printed slow-motion, moody neon illumination, and romantic longing.",
    tags: ["neon-nocturne", "step-printing", "unrequited-romance", "nostalgic-longing", "atmospheric"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:music:aphex-twin",
    name: "Aphex Twin",
    category: "music",
    type: "Electronic Artist",
    popularity: 87,
    affinity: 94,
    description: "Intelligent Dance Music (IDM) pioneer acclaimed for abrasive breakbeats, lush ambient synths, and glitch aesthetic.",
    tags: ["idm", "ambient-techno", "glitch-art", "algorithmic-composition", "subversive"],
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "urn:qloo:entity:dining:noma",
    name: "Noma (René Redzepi)",
    category: "dining",
    type: "Culinary Institution",
    popularity: 94,
    affinity: 97,
    description: "World-redefining restaurant known for hyper-seasonal foraging, fermentation mastery, and Nordic naturalism.",
    tags: ["nordic-foraging", "fermentation", "micro-seasonality", "avant-garde-cuisine", "botanical"],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  }
];

export const CITY_CULTURAL_VENUES: Record<string, QlooInsightItem[]> = {
  tokyo: [
    {
      entity: {
        id: "urn:qloo:entity:place:bar-trench-ebisu",
        name: "Bar Trench (Ebisu)",
        category: "dining",
        type: "Cocktail Bar",
        popularity: 91,
        affinity: 95.8,
        description: "Intimate herbal absinthe and craft mixology bar tucked in a quiet Ebisu alley, inspired by 1920s European salons.",
        tags: ["herbal-mixology", "intimate-ambience", "speakeasy", "dim-amber-lighting"],
        metadata: {
          location: { city: "Tokyo", neighborhood: "Ebisu", address: "1-5-8 Ebisunishi, Shibuya-ku" },
          priceLevel: "$$$",
          vibe: ["contemplative", "refined", "subtle-jazz"]
        }
      },
      affinityScore: 95.8,
      overIndexingRatio: 3.4,
      qlooExplainability: {
        matchedSignalName: "Haruki Murakami & Radiohead",
        sharedAestheticTag: "introspective urban solitude",
        culturalCorrelationNote: "High taste-density correlation between experimental art-rock listeners and Japanese literary jazz bars."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:21_21-design-sight",
        name: "21_21 DESIGN SIGHT",
        category: "place",
        type: "Design Museum",
        popularity: 93,
        affinity: 97.2,
        description: "Architectural museum designed by Tadao Ando, folded into the ground with origami-folded steel roofs and subterranean galleries.",
        tags: ["tadao-ando", "minimalist-architecture", "industrial-design", "geometric-light"],
        metadata: {
          location: { city: "Tokyo", neighborhood: "Roppongi", address: "9-7-6 Akasaka, Minato-ku" },
          priceLevel: "$$",
          vibe: ["monolithic", "zen", "hyper-curated"]
        }
      },
      affinityScore: 97.2,
      overIndexingRatio: 4.1,
      qlooExplainability: {
        matchedSignalName: "Tadao Ando & Christopher Nolan",
        sharedAestheticTag: "structural precision & geometry",
        culturalCorrelationNote: "Fans of Nolan's spatial choreography strongly over-index in architectural exhibition spaces."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:daikanyama-tsutaya-books",
        name: "Daikanyama T-Site (Tsutaya Books)",
        category: "lifestyle",
        type: "Cultural Complex",
        popularity: 96,
        affinity: 94.6,
        description: "Award-winning Klein Dytham architectural complex combining rare art books, vintage vinyl listening stations, and artisanal cafe.",
        tags: ["architectural-lattice", "vinyl-culture", "rare-editions", "leafy-promenade"],
        metadata: {
          location: { city: "Tokyo", neighborhood: "Daikanyama", address: "17-5 Sarugakucho, Shibuya-ku" },
          priceLevel: "$$",
          vibe: ["literary-sanctuary", "serene", "modernist"]
        }
      },
      affinityScore: 94.6,
      overIndexingRatio: 3.1,
      qlooExplainability: {
        matchedSignalName: "Haruki Murakami & Radiohead",
        sharedAestheticTag: "vinyl obsession & literary tranquility",
        culturalCorrelationNote: "Affinity for Murakami's record-collector universe mirrors Tsutaya's vintage listening lounges."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:jazz-kissaten-bar-lion",
        name: "Meikyoku Kissa Lion (Jazz Kissa)",
        category: "music",
        type: "Audio Listening Sanctuary",
        popularity: 88,
        affinity: 96.1,
        description: "Historic 1926 audio hall where patrons sit silently facing two-story custom wooden acoustic speakers, sipping pour-over coffee.",
        tags: ["high-fidelity-audio", "silent-listening", "vintage-acoustics", "historical-retro"],
        metadata: {
          location: { city: "Tokyo", neighborhood: "Shibuya", address: "2-19-13 Dogenzaka, Shibuya-ku" },
          priceLevel: "$",
          vibe: ["silent-reverence", "acoustic-purism", "shadowed"]
        }
      },
      affinityScore: 96.1,
      overIndexingRatio: 4.5,
      qlooExplainability: {
        matchedSignalName: "Radiohead",
        sharedAestheticTag: "audiophile reverence & sonic texture",
        culturalCorrelationNote: "Listeners of Kid A / OK Computer show an extraordinary 4.5x over-index for specialized listening bars."
      }
    }
  ],
  newyork: [
    {
      entity: {
        id: "urn:qloo:entity:place:temple-bar-nyc",
        name: "Temple Bar (NoHo)",
        category: "dining",
        type: "Nocturne Cocktail Lounge",
        popularity: 92,
        affinity: 95.2,
        description: "Moodily lit velvet lounge hidden beneath an unassuming awning, serving meticulous martinis in cinematic darkness.",
        tags: ["cinematic-lighting", "classic-martinis", "velvet-banquettes", "discrete-luxury"],
        metadata: {
          location: { city: "New York", neighborhood: "NoHo", address: "332 Lafayette St" },
          priceLevel: "$$$$",
          vibe: ["cinematic", "wong-kar-wai-hues", "seductive"]
        }
      },
      affinityScore: 95.2,
      overIndexingRatio: 3.6,
      qlooExplainability: {
        matchedSignalName: "Wong Kar-wai & Neo-Noir",
        sharedAestheticTag: "deep crimson illumination & moody solitude",
        culturalCorrelationNote: "Direct affinity correlation between cinematic noir enthusiasts and low-light heritage cocktail lounges."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:dia-chelsea",
        name: "Dia Chelsea & Dia Beacon",
        category: "place",
        type: "Minimalist Art Foundation",
        popularity: 90,
        affinity: 96.7,
        description: "Monumental industrial spaces hosting monumental light and spatial installations by Dan Flavin, Donald Judd, and Richard Serra.",
        tags: ["monumental-sculpture", "industrial-repurposing", "spatial-light", "hard-edge-minimalism"],
        metadata: {
          location: { city: "New York", neighborhood: "Chelsea", address: "537 W 22nd St" },
          priceLevel: "$$",
          vibe: ["austere", "grand-scale", "meditative"]
        }
      },
      affinityScore: 96.7,
      overIndexingRatio: 4.2,
      qlooExplainability: {
        matchedSignalName: "Tadao Ando & Christopher Nolan",
        sharedAestheticTag: "brutalist scale & geometric purity",
        culturalCorrelationNote: "Strong mutual resonance between monumental cinema and spatial sculpture."
      }
    }
  ],
  london: [
    {
      entity: {
        id: "urn:qloo:entity:place:barbican-centre",
        name: "Barbican Centre & Conservatory",
        category: "place",
        type: "Brutalist Cultural Complex",
        popularity: 95,
        affinity: 97.5,
        description: "Iconic Grade II-listed brutalist concrete estate housing concert halls, indie cinema, and an exotic glass-covered greenhouse.",
        tags: ["brutalism", "bush-hammered-concrete", "subtropical-conservatory", "experimental-arts"],
        metadata: {
          location: { city: "London", neighborhood: "City of London", address: "Silk St, Barbican" },
          priceLevel: "$$",
          vibe: ["futuristic-dystopian", "architectural-icon", "complex-geometry"]
        }
      },
      affinityScore: 97.5,
      overIndexingRatio: 4.8,
      qlooExplainability: {
        matchedSignalName: "Radiohead & Tadao Ando",
        sharedAestheticTag: "concrete dystopian grandeur",
        culturalCorrelationNote: "Fans of Radiohead and geometric architecture over-index at the Barbican more than any other European venue."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:brilliant-corners-dalston",
        name: "Brilliant Corners (Dalston)",
        category: "music",
        type: "Audiophile Restaurant & Bar",
        popularity: 89,
        affinity: 94.8,
        description: "Japanese dining room powered by a bespoke audiophile Klipschorn soundsystem, playing whole vinyl records.",
        tags: ["vinyl-audiophile", "natural-wines", "izakaya-plates", "analog-warmth"],
        metadata: {
          location: { city: "London", neighborhood: "Dalston", address: "470 Kingsland Rd" },
          priceLevel: "$$",
          vibe: ["analog", "communal-listening", "warm-amber"]
        }
      },
      affinityScore: 94.8,
      overIndexingRatio: 3.7,
      qlooExplainability: {
        matchedSignalName: "Aphex Twin & Radiohead",
        sharedAestheticTag: "analog sound fidelity & natural wine culture",
        culturalCorrelationNote: "Direct taste bridge between UK electronic music aficionados and custom horn sound systems."
      }
    }
  ],
  paris: [
    {
      entity: {
        id: "urn:qloo:entity:place:frequence-paris",
        name: "Fréquence (11th Arrondissement)",
        category: "dining",
        type: "Audiophile Cocktail Lounge",
        popularity: 91,
        affinity: 95.4,
        description: "Intimate vinyl-lined cocktail salon with custom analog turntable setups and French natural aperitifs.",
        tags: ["vinyl-curation", "natural-aperitifs", "analog-warmth", "craft-mixology"],
        metadata: {
          location: { city: "Paris", neighborhood: "11e Arrondissement", address: "20 Rue Keller" },
          priceLevel: "$$",
          vibe: ["warm-timber", "intimate-nocturne", "eclectic-grooves"]
        }
      },
      affinityScore: 95.4,
      overIndexingRatio: 3.8,
      qlooExplainability: {
        matchedSignalName: "Daft Punk & French Touch",
        sharedAestheticTag: "analog groove & tactile vinyl warmth",
        culturalCorrelationNote: "High over-indexing among European electronic music enthusiasts and boutique vinyl cocktail bars."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:fondation-louis-vuitton",
        name: "Fondation Louis Vuitton",
        category: "place",
        type: "Architectural Art Pavilion",
        popularity: 95,
        affinity: 96.8,
        description: "Frank Gehry glass sailboat monument in the Bois de Boulogne hosting monumental modern art exhibitions.",
        tags: ["deconstructivism", "monumental-glass", "spatial-acoustics", "contemporary-art"],
        metadata: {
          location: { city: "Paris", neighborhood: "Bois de Boulogne", address: "8 Avenue du Mahatma Gandhi" },
          priceLevel: "$$",
          vibe: ["sculptural", "monumental", "light-filled"]
        }
      },
      affinityScore: 96.8,
      overIndexingRatio: 4.2,
      qlooExplainability: {
        matchedSignalName: "Tadao Ando & Christopher Nolan",
        sharedAestheticTag: "structural deconstruction & scale",
        culturalCorrelationNote: "Affinity for complex architectural staging mirrors Gehry's sweeping sculptural forms."
      }
    }
  ],
  berlin: [
    {
      entity: {
        id: "urn:qloo:entity:place:boros-collection-berlin",
        name: "The Boros Collection (Bunker Berlin)",
        category: "place",
        type: "Brutalist Bunker Gallery",
        popularity: 94,
        affinity: 97.6,
        description: "Monumental converted WWII bunker with 2-meter thick concrete walls housing contemporary site-specific sculpture.",
        tags: ["raw-concrete", "wwii-bunker", "spatial-installation", "hard-minimalism"],
        metadata: {
          location: { city: "Berlin", neighborhood: "Mitte", address: "Reinhardtstraße 20" },
          priceLevel: "$$",
          vibe: ["austere", "historical-dystopian", "meditative"]
        }
      },
      affinityScore: 97.6,
      overIndexingRatio: 4.9,
      qlooExplainability: {
        matchedSignalName: "Radiohead & Tadao Ando",
        sharedAestheticTag: "concrete dystopian silence & monumental weight",
        culturalCorrelationNote: "Extraordinary 4.9x over-index among fans of dark ambient electronics and raw architectural brutalism."
      }
    },
    {
      entity: {
        id: "urn:qloo:entity:place:rhinocéros-berlin",
        name: "Rhinoçéros Jazz Kissa",
        category: "music",
        type: "Analog Audio Salon",
        popularity: 89,
        affinity: 95.9,
        description: "1970s-inspired vintage listening bar powered by wooden horn speakers, single-malt whiskies, and vinyl jazz records.",
        tags: ["vintage-horns", "vinyl-audio", "single-malts", "low-amber-illumination"],
        metadata: {
          location: { city: "Berlin", neighborhood: "Prenzlauer Berg", address: "Rhinower Str. 3" },
          priceLevel: "$$",
          vibe: ["shadowed", "acoustic-reverence", "contemplative"]
        }
      },
      affinityScore: 95.9,
      overIndexingRatio: 4.0,
      qlooExplainability: {
        matchedSignalName: "Haruki Murakami & Radiohead",
        sharedAestheticTag: "subtle urban solitude & audiophile reverence",
        culturalCorrelationNote: "Strong mutual resonance between literary jazz lovers and vintage Japanese kissa audio setups in Berlin."
      }
    }
  ]
};

export const FALLBACK_MATCH_INTERSECTION: QlooCompareResponse = {
  compatibilityScore: 88,
  sharedAesthetics: [
    "Meticulous Visual Geometry",
    "Analog / Vinyl Audio Texture",
    "Understated Subversive Luxury",
    "Cinematic Narrative Tension"
  ],
  unexpectedCrossovers: [
    "French Electronic Synthesizers ↔ 1970s Italian Cinema Soundtracks",
    "Industrial Concrete Architecture ↔ Japanese Precision Fermentation",
    "Pastel Color Symmetries ↔ Avant-Garde Minimalist Wardrobes"
  ],
  intersections: [
    {
      entity: {
        id: "urn:qloo:entity:place:inter-1",
        name: "Boutique Analog Listening Lounge & Wine Bar",
        category: "dining",
        type: "Hi-Fi Wine Bar",
        popularity: 91,
        affinity: 93,
        description: "Low-lit room with bespoke tube amplifiers, serving biodynamic wines and seasonal small plates alongside vintage vinyl records.",
        tags: ["hi-fi-audio", "biodynamic-wine", "mid-century-seating"]
      },
      scorePersonA: 92,
      scorePersonB: 89,
      maximinFairnessScore: 89,
      overlapReason: "Satisfies Person A's taste for cinematic depth and Person B's affinity for acoustic warmth and mid-century design."
    },
    {
      entity: {
        id: "urn:qloo:entity:place:inter-2",
        name: "Architectural Pavilion & Contemporary Gallery",
        category: "place",
        type: "Sculpture & Art Hall",
        popularity: 89,
        affinity: 91,
        description: "Striking pavilion blending natural light and concrete framing, showcasing large-scale sensory installations.",
        tags: ["architectural-sculpture", "sensory-installation", "monochrome"]
      },
      scorePersonA: 88,
      scorePersonB: 94,
      maximinFairnessScore: 88,
      overlapReason: "Resonates with both individuals' appreciation for structured visual storytelling and deliberate pacing."
    }
  ],
  source: "verified_taste_cache"
};
