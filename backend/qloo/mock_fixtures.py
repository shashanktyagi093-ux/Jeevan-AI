"""
Verified Cultural Entities and Venue Insights Fixtures
Provides rock-solid evaluation resilience for Qloo Agentic Hackathon 2026.
"""

from typing import List, Dict, Any
from backend.models.qloo import QlooEntity, QlooInsightItem, QlooExplainability

VERIFIED_CULTURAL_ENTITIES: List[QlooEntity] = [
    QlooEntity(
        id="urn:qloo:entity:person:christopher-nolan",
        name="Christopher Nolan",
        category="movie",
        type="Director",
        popularity=96.0,
        affinity=98.0,
        description="Visionary filmmaker renowned for non-linear structures, practical effects, and philosophical themes of time and memory.",
        tags=["neo-noir", "practical-effects", "time-dilation", "cinematic-grandeur", "cerebral"],
        image_url="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:music:radiohead",
        name="Radiohead",
        category="music",
        type="Band",
        popularity=94.0,
        affinity=97.0,
        description="Pioneering art-rock and electronic band known for melancholic soundscapes, existential lyricism, and sonic experimentation.",
        tags=["art-rock", "experimental-electronic", "existentialism", "atmospheric", "dystopian"],
        image_url="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:book:haruki-murakami",
        name="Haruki Murakami",
        category="book",
        type="Author",
        popularity=92.0,
        affinity=95.0,
        description="Celebrated author known for magical realism, urban loneliness, jazz motifs, and surrealist domestic mystery.",
        tags=["magical-realism", "urban-solitude", "jazz-cadence", "subtle-melancholy", "surrealism"],
        image_url="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:architecture:tadao-ando",
        name="Tadao Ando",
        category="lifestyle",
        type="Architect",
        popularity=89.0,
        affinity=94.0,
        description="Pritzker-winning Japanese architect celebrated for smooth raw concrete, natural light manipulation, and Zen-influenced stillness.",
        tags=["brutalism", "zen-minimalism", "raw-concrete", "spatial-geometry", "light-sculpting"],
        image_url="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:movie:wes-anderson",
        name="Wes Anderson",
        category="movie",
        type="Director",
        popularity=93.0,
        affinity=96.0,
        description="Famed for meticulous symmetry, pastel color palettes, quirky ensemble casts, and retro-diorama visual styling.",
        tags=["symmetry", "pastel-palettes", "vintage-nostalgia", "whimsical", "diorama-framing"],
        image_url="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:music:daft-punk",
        name="Daft Punk",
        category="music",
        type="Musical Duo",
        popularity=95.0,
        affinity=96.0,
        description="Legendary French electronic pioneers who shaped modern house, synth-pop, and futuristic retro-funk aesthetics.",
        tags=["french-house", "retro-futurism", "analog-synths", "robotic-chic", "funk-disco"],
        image_url="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:fashion:maison-margiela",
        name="Maison Margiela",
        category="fashion",
        type="Fashion House",
        popularity=88.0,
        affinity=93.0,
        description="Avant-garde haute couture house celebrated for deconstruction, anonymous white labels, and raw hemlines.",
        tags=["deconstruction", "avant-garde", "minimal-white", "anti-branding", "artisanal"],
        image_url="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    ),
    QlooEntity(
        id="urn:qloo:entity:music:aphex-twin",
        name="Aphex Twin",
        category="music",
        type="Electronic Artist",
        popularity=87.0,
        affinity=94.0,
        description="Intelligent Dance Music (IDM) pioneer acclaimed for abrasive breakbeats, lush ambient synths, and glitch aesthetic.",
        tags=["idm", "ambient-techno", "glitch-art", "algorithmic-composition", "subversive"],
        image_url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    ),
]

CITY_CULTURAL_VENUES: Dict[str, List[QlooInsightItem]] = {
    "tokyo": [
        QlooInsightItem(
            entity=QlooEntity(
                id="urn:qloo:entity:place:bar-trench-ebisu",
                name="Bar Trench (Ebisu)",
                category="dining",
                type="Cocktail Bar",
                popularity=91.0,
                affinity=95.8,
                description="Intimate herbal absinthe and craft mixology bar tucked in a quiet Ebisu alley, inspired by 1920s European salons.",
                tags=["herbal-mixology", "intimate-ambience", "speakeasy", "dim-amber-lighting"],
                metadata={
                    "location": {"city": "Tokyo", "neighborhood": "Ebisu", "address": "1-5-8 Ebisunishi, Shibuya-ku"},
                    "priceLevel": "$$$",
                    "vibe": ["contemplative", "refined", "subtle-jazz"]
                }
            ),
            affinity_score=95.8,
            over_indexing_ratio=3.4,
            qloo_explainability=QlooExplainability(
                matched_signal_name="Haruki Murakami & Radiohead",
                shared_aesthetic_tag="introspective urban solitude",
                cultural_correlation_note="High taste-density correlation between experimental art-rock listeners and Japanese literary jazz bars."
            )
        ),
        QlooInsightItem(
            entity=QlooEntity(
                id="urn:qloo:entity:place:21_21-design-sight",
                name="21_21 DESIGN SIGHT",
                category="place",
                type="Design Museum",
                popularity=93.0,
                affinity=97.2,
                description="Architectural museum designed by Tadao Ando, folded into the ground with origami steel roofs and subterranean galleries.",
                tags=["tadao-ando", "minimalist-architecture", "industrial-design", "geometric-light"],
                metadata={
                    "location": {"city": "Tokyo", "neighborhood": "Roppongi", "address": "9-7-6 Akasaka, Minato-ku"},
                    "priceLevel": "$$",
                    "vibe": ["monolithic", "zen", "hyper-curated"]
                }
            ),
            affinity_score=97.2,
            over_indexing_ratio=4.1,
            qloo_explainability=QlooExplainability(
                matched_signal_name="Tadao Ando & Christopher Nolan",
                shared_aesthetic_tag="structural precision & geometry",
                cultural_correlation_note="Fans of Nolan's spatial choreography strongly over-index in architectural exhibition spaces."
            )
        ),
        QlooInsightItem(
            entity=QlooEntity(
                id="urn:qloo:entity:place:daikanyama-tsutaya-books",
                name="Daikanyama T-Site (Tsutaya Books)",
                category="lifestyle",
                type="Cultural Complex",
                popularity=96.0,
                affinity=94.6,
                description="Klein Dytham architectural complex combining rare art books, vintage vinyl listening stations, and artisanal cafe.",
                tags=["architectural-lattice", "vinyl-culture", "rare-editions", "leafy-promenade"],
                metadata={
                    "location": {"city": "Tokyo", "neighborhood": "Daikanyama", "address": "17-5 Sarugakucho, Shibuya-ku"},
                    "priceLevel": "$$",
                    "vibe": ["literary-sanctuary", "serene", "modernist"]
                }
            ),
            affinity_score=94.6,
            over_indexing_ratio=3.1,
            qloo_explainability=QlooExplainability(
                matched_signal_name="Haruki Murakami & Radiohead",
                shared_aesthetic_tag="vinyl obsession & literary tranquility",
                cultural_correlation_note="Affinity for Murakami's record-collector universe mirrors Tsutaya's vintage listening lounges."
            )
        ),
        QlooInsightItem(
            entity=QlooEntity(
                id="urn:qloo:entity:place:jazz-kissaten-bar-lion",
                name="Meikyoku Kissa Lion (Jazz Kissa)",
                category="music",
                type="Audio Listening Sanctuary",
                popularity=88.0,
                affinity=96.1,
                description="Historic 1926 audio hall where patrons sit silently facing two-story custom wooden acoustic speakers.",
                tags=["high-fidelity-audio", "silent-listening", "vintage-acoustics", "historical-retro"],
                metadata={
                    "location": {"city": "Tokyo", "neighborhood": "Shibuya", "address": "2-19-13 Dogenzaka, Shibuya-ku"},
                    "priceLevel": "$",
                    "vibe": ["silent-reverence", "acoustic-purism", "shadowed"]
                }
            ),
            affinity_score=96.1,
            over_indexing_ratio=4.5,
            qloo_explainability=QlooExplainability(
                matched_signal_name="Radiohead",
                shared_aesthetic_tag="audiophile reverence & sonic texture",
                cultural_correlation_note="Listeners of Kid A / OK Computer show an extraordinary 4.5x over-index for specialized listening bars."
            )
        )
    ]
}
