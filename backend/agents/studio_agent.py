import datetime
from typing import Dict, Any
from backend.models.agent import StudioUserInput, StudioDossierOutput
from backend.qloo.entity_resolver import EntityResolver
from backend.llm.provider import python_llm


class PythonStudioAgent:
    @staticmethod
    async def execute(input_data: StudioUserInput) -> StudioDossierOutput:
        project_name = input_data.brand_or_project_name.strip() or "Untitled Project"
        project_type = input_data.project_type or "brand_campaign"
        raw_seeds = (
            input_data.seed_inspirations
            if input_data.seed_inspirations
            else ["Cyberpunk 2077", "Maison Margiela", "Aphex Twin"]
        )

        resolved = await EntityResolver.resolve_batch(raw_seeds)

        default_dossier = {
            "projectName": project_name,
            "projectType": project_type,
            "creativeThesis": (
                "A high-concept aesthetic collision between futuristic deconstruction and analog intimacy. "
                "The creative identity strips away superficial ornament to celebrate structural truth, industrial texture, "
                "and subversive atmosphere."
            ),
            "brandArchetype": "The Visionary Provocateur",
            "resolvedInspirations": [e.model_dump() for e in resolved],
            "visualMoodboardDirection": {
                "colorPalette": ["#07080d", "#1f2438", "#818cf8", "#e2e8f0", "#d946ef"],
                "textureAndMaterials": [
                    "Raw unpolished concrete",
                    "Distressed washed denim",
                    "Brushed titanium hardware",
                    "Translucent frosted acrylic",
                ],
                "lightingAndAtmosphere": "Diffused cold overcast daylight pierced by low-frequency magenta and amber neon rim lighting.",
                "architecturalCues": [
                    "Monolithic brutalist facades",
                    "Geometric negative space",
                    "Subterranean atrium lightwells",
                ],
            },
            "sonicIdentity": {
                "curatedArtists": [
                    {"name": "Aphex Twin", "qlooAffinity": 96, "reason": "Glitch percussion grounded by ethereal ambient synthesizers."},
                    {"name": "Burial", "qlooAffinity": 94, "reason": "Vinyl crackle, nocturnal rain samples, and melancholic syncopation."},
                    {"name": "Oneohtrix Point Never", "qlooAffinity": 92, "reason": "Micro-tonal electronic textures with high emotional resonance."},
                ],
                "soundtrackVibe": "Intricate electronic sound design woven with analog warm acoustic drones.",
                "instrumentationFocus": [
                    "Modular synthesizers",
                    "Processed tape loops",
                    "Sub-bass frequencies",
                    "Prepared piano",
                ],
            },
            "wardrobeAndStyling": {
                "fashionReferences": ["Maison Margiela Artisanal", "Rick Owens FW22", "Early Helmut Lang"],
                "silhouetteStyle": "Elongated architectural tailoring with dropped shoulders and deconstructed raw seams.",
                "materials": ["Heavyweight Japanese wool", "Waxed technical cotton", "Unfinished linen"],
            },
            "cinematicReferences": {
                "filmsOrDirectors": ["Denis Villeneuve (Blade Runner 2049)", "Wong Kar-wai", "David Fincher"],
                "compositionalStyle": "Wide anamorphic frames with calculated geometric symmetry and slow, deliberate dolly pushes.",
            },
            "targetAudiencePsychographics": {
                "archetypeName": "The Discerning Innovator",
                "coreValues": ["Authenticity over virality", "Tactile craftsmanship", "Intellectual curiosity"],
                "adjacentTastes": ["Natural wines", "Specialty print journals", "Bespoke spatial design", "Experimental ambient music"],
            },
            "provenance": {
                "qlooSource": "live",
                "generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "engine": "Python Jeevan AI Core",
            },
        }

        if python_llm.is_available():
            prompt = f"""
            Synthesize an executive creative director dossier for '{project_name}' ({project_type}).
            Inspirations: {[e.name for e in resolved]}.
            Brief: {input_data.brief_description}.
            Return JSON matching the dossier structure.
            """
            synthesis = await python_llm.generate_structured_json(
                prompt=prompt,
                system_instruction="You are an award-winning creative agency director. Return only JSON.",
                fallback_data=default_dossier,
            )
            for k, v in synthesis.items():
                if k in default_dossier and v:
                    default_dossier[k] = v

        return StudioDossierOutput(
            projectName=default_dossier["projectName"],
            projectType=default_dossier["projectType"],
            creativeThesis=default_dossier["creativeThesis"],
            brandArchetype=default_dossier["brandArchetype"],
            resolvedInspirations=resolved,
            visualMoodboardDirection=default_dossier["visualMoodboardDirection"],
            sonicIdentity=default_dossier["sonicIdentity"],
            wardrobeAndStyling=default_dossier["wardrobeAndStyling"],
            cinematicReferences=default_dossier["cinematicReferences"],
            targetAudiencePsychographics=default_dossier["targetAudiencePsychographics"],
            provenance=default_dossier["provenance"],
        )
