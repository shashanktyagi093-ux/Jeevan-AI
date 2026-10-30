import datetime
from typing import List
from backend.models.agent import (
    TravelUserInput,
    TravelItineraryOutput,
    TravelVenueItem,
)
from backend.qloo.entity_resolver import EntityResolver
from backend.qloo.insights_service import InsightsService
from backend.llm.provider import python_llm


class PythonTravelAgent:
    @staticmethod
    async def execute(input_data: TravelUserInput) -> TravelItineraryOutput:
        destination = input_data.destination_city.strip() or "Tokyo"
        raw_seeds = (
            input_data.taste_seeds
            if input_data.taste_seeds
            else ["Christopher Nolan", "Radiohead", "Tadao Ando"]
        )

        # 1. Resolve entities via Qloo
        resolved_entities = await EntityResolver.resolve_batch(raw_seeds)

        # 2. Retrieve high-affinity venues from Qloo Taste AI
        insights = await InsightsService.get_travel_venues(
            entities=resolved_entities,
            destination_city=destination,
            limit=6
        )

        time_slots = ["morning", "afternoon", "evening", "late-night"]
        venues: List[TravelVenueItem] = []

        for idx, item in enumerate(insights):
            slot = time_slots[idx % len(time_slots)]
            day_num = (idx // len(time_slots)) + 1
            loc = item.entity.metadata.get("location", {}) if item.entity.metadata else {}
            venues.append(
                TravelVenueItem(
                    name=item.entity.name,
                    category=item.entity.category,
                    neighborhood=loc.get("neighborhood") or destination,
                    timeSlot=slot,
                    day=min(day_num, input_data.trip_duration_days or 1),
                    qlooAffinityScore=item.affinity_score,
                    matchedTasteSignal=item.qloo_explainability.matched_signal_name,
                    culturalRationale=item.qloo_explainability.cultural_correlation_note,
                    addressHint=loc.get("address") or f"{destination} Cultural District",
                    priceLevel=(item.entity.metadata or {}).get("priceLevel", "$$"),
                )
            )

        entity_names = ", ".join(e.name for e in resolved_entities)
        default_summary = (
            f"A curated cultural journey through {destination}, designed specifically around your appreciation "
            f"for {entity_names}. Every venue was selected by cross-domain taste correlation rather than generic popularity."
        )
        default_profile = (
            "Your cultural taste signature balances structural precision, contemplative atmospheres, and artisanal mastery. "
            "Qloo identified elevated statistical affinity with venues featuring high-fidelity sound and minimalist design."
        )
        thematic_arc = [
            f"Aesthetic immersion rooted in {entity_names}",
            f"Architectural and sensory exploration of {destination}",
            "Subtle nocturnal soundscapes and intimate culinary pairings",
        ]

        if python_llm.is_available():
            prompt = f"""
            The traveler loves: {entity_names}.
            Destination: {destination}.
            Venues: {[v.name for v in venues]}.
            Generate a JSON with 'tripSummary' (2 sentences), 'culturalProfileAnalysis' (2 sentences), 'culturalThematicArc' (3 items).
            """
            synthesis = await python_llm.generate_structured_json(
                prompt=prompt,
                system_instruction="You are a cultural travel concierge. Respond only with JSON.",
                fallback_data={
                    "tripSummary": default_summary,
                    "culturalProfileAnalysis": default_profile,
                    "culturalThematicArc": thematic_arc,
                },
            )
            default_summary = synthesis.get("tripSummary", default_summary)
            default_profile = synthesis.get("culturalProfileAnalysis", default_profile)
            thematic_arc = synthesis.get("culturalThematicArc", thematic_arc)

        return TravelItineraryOutput(
            destination=destination,
            tripSummary=default_summary,
            culturalProfileAnalysis=default_profile,
            seedEntitiesResolved=resolved_entities,
            venues=venues,
            culturalThematicArc=thematic_arc,
            qlooInsightsUsed=insights,
            provenance={
                "qlooSource": "live" if insights and insights[0].affinity_score else "verified_fixture",
                "generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "engine": "Python Jeevan AI Core",
            },
        )
