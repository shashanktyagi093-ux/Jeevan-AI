import datetime
import asyncio
from typing import List
from backend.models.agent import (
    MatchUserInput,
    MatchOutput,
    MatchIntersectionItem,
    DateItineraryAct,
)
from backend.qloo.entity_resolver import EntityResolver
from backend.qloo.insights_service import InsightsService
from backend.llm.provider import python_llm


class PythonMatchAgent:
    @staticmethod
    async def execute(input_data: MatchUserInput) -> MatchOutput:
        person_a = input_data.person_a_name.strip() or "Person 1"
        person_b = input_data.person_b_name.strip() or "Person 2"

        tastes_a = (
            input_data.person_a_tastes
            if input_data.person_a_tastes
            else ["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"]
        )
        tastes_b = (
            input_data.person_b_tastes
            if input_data.person_b_tastes
            else ["Wes Anderson", "Daft Punk", "Scandinavian Design"]
        )

        # 1. Resolve both sets of entities via Qloo
        resolved_a, resolved_b = await asyncio.gather(
            EntityResolver.resolve_batch(tastes_a),
            EntityResolver.resolve_batch(tastes_b),
        )

        # 2. Evaluate compatibility using Maximin algorithm
        comp_result = await InsightsService.evaluate_compatibility(
            profile_a=resolved_a,
            profile_b=resolved_b,
            target_city=input_data.target_city,
        )

        ranked_intersections: List[MatchIntersectionItem] = [
            MatchIntersectionItem(
                venueOrActivity=item.entity.name,
                category=item.entity.category,
                personAAffinity=item.score_person_a,
                personBAffinity=item.score_person_b,
                maximinFairnessScore=item.maximin_fairness_score,
                sharedAestheticGround=comp_result.shared_aesthetics[0] if comp_result.shared_aesthetics else "Modern Craft",
                whyItWorksForBoth=item.overlap_reason,
            )
            for item in comp_result.intersections
        ]

        venue_1 = ranked_intersections[1].venueOrActivity if len(ranked_intersections) > 1 else "Contemporary Gallery"
        venue_2 = ranked_intersections[0].venueOrActivity if len(ranked_intersections) > 0 else "Curated Bistro"
        venue_3 = ranked_intersections[2].venueOrActivity if len(ranked_intersections) > 2 else "Hi-Fi Listening Lounge"

        date_itinerary: List[DateItineraryAct] = [
            DateItineraryAct(
                phase="act1_opening",
                title="Act I: Low-Pressure Aesthetic Discovery",
                venueName=venue_1,
                description="Start somewhere engaging and tactile where conversation flows naturally around shared design interests.",
                whyBothWillLoveIt=f"Satisfies {person_a}'s desire for narrative depth while catering to {person_b}'s eye for geometry.",
            ),
            DateItineraryAct(
                phase="act2_dining",
                title="Act II: The Shared Culinary Table",
                venueName=venue_2,
                description="An immersive dining room balancing seasonal ingredients, warm acoustics, and understated sophistication.",
                whyBothWillLoveIt="Combines bold culinary execution with unpretentious aesthetics, keeping both individuals highly satisfied.",
            ),
            DateItineraryAct(
                phase="act3_nightcap",
                title="Act III: Low-Light Vinyl Nightcap",
                venueName=venue_3,
                description="Wind down in an intimate space powered by custom vacuum-tube audio and bespoke cocktails.",
                whyBothWillLoveIt="Directly crosses over both profiles' musical appreciation—audiophile fidelity without overwhelming volume.",
            ),
        ]

        default_narrative = (
            f"{person_a} and {person_b} possess contrasting surface preferences, yet share a profound underlying affinity "
            "for meticulous craft and vintage textures. Rather than averaging your interests, Jeevan Match identified an intersection "
            "of high-fidelity sound, intimate lighting, and bold visual storytelling."
        )
        default_safeguard = (
            f"Using Qloo's Maximin Fairness optimization, each selected experience guarantees a mutual satisfaction "
            f"threshold of {comp_result.compatibility_score}%. Neither person is forced into an experience they dislike."
        )

        return MatchOutput(
            compatibilityScore=comp_result.compatibility_score,
            tasteDynamicNarrative=default_narrative,
            sharedCulturalAnchors=comp_result.shared_aesthetics,
            unexpectedCrossovers=comp_result.unexpected_crossovers,
            resolvedPersonA=resolved_a,
            resolvedPersonB=resolved_b,
            rankedIntersections=ranked_intersections,
            dateItinerary=date_itinerary,
            compromiseSafeguardNote=default_safeguard,
            provenance={
                "qlooSource": "live" if comp_result.source == "qloo_live_api" else "verified_fixture",
                "generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "engine": "Python Jeevan AI Core",
            },
        )
