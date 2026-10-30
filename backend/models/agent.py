from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field
from backend.models.qloo import QlooEntity, QlooInsightItem, MaximinIntersection


# AGENT 1: JEEVAN TRAVEL
class TravelUserInput(BaseModel):
    taste_seeds: List[str] = Field(
        default=["Christopher Nolan", "Radiohead", "Tadao Ando"],
        alias="tasteSeeds"
    )
    destination_city: str = Field(default="Tokyo", alias="destinationCity")
    trip_duration_days: Optional[int] = Field(default=1, alias="tripDurationDays")
    budget_level: Optional[str] = Field(default="premium", alias="budgetLevel")
    interests: Optional[List[str]] = Field(default_factory=list)

    class Config:
        populate_by_name = True


class TravelVenueItem(BaseModel):
    name: str
    category: str
    neighborhood: str
    timeSlot: str
    day: int
    qlooAffinityScore: float
    matchedTasteSignal: str
    culturalRationale: str
    addressHint: Optional[str] = None
    priceLevel: Optional[str] = None


class TravelItineraryOutput(BaseModel):
    destination: str
    tripSummary: str
    culturalProfileAnalysis: str
    seedEntitiesResolved: List[QlooEntity]
    venues: List[TravelVenueItem]
    culturalThematicArc: List[str]
    qlooInsightsUsed: List[QlooInsightItem]
    provenance: Dict[str, Any]


# AGENT 2: JEEVAN MATCH
class MatchUserInput(BaseModel):
    person_a_name: str = Field(default="Elena", alias="personAName")
    person_a_tastes: List[str] = Field(
        default=["Quentin Tarantino", "Fleetwood Mac", "Italian Wine"],
        alias="personATastes"
    )
    person_b_name: str = Field(default="Julian", alias="personBName")
    person_b_tastes: List[str] = Field(
        default=["Wes Anderson", "Daft Punk", "Scandinavian Design"],
        alias="personBTastes"
    )
    target_city: Optional[str] = Field(default="Tokyo", alias="targetCity")
    date_vibe: Optional[str] = Field(default="romantic", alias="dateVibe")

    class Config:
        populate_by_name = True


class DateItineraryAct(BaseModel):
    phase: str
    title: str
    description: str
    venueName: str
    whyBothWillLoveIt: str


class MatchIntersectionItem(BaseModel):
    venueOrActivity: str
    category: str
    personAAffinity: float
    personBAffinity: float
    maximinFairnessScore: float
    sharedAestheticGround: str
    whyItWorksForBoth: str


class MatchOutput(BaseModel):
    compatibilityScore: float
    tasteDynamicNarrative: str
    sharedCulturalAnchors: List[str]
    unexpectedCrossovers: List[str]
    resolvedPersonA: List[QlooEntity]
    resolvedPersonB: List[QlooEntity]
    rankedIntersections: List[MatchIntersectionItem]
    dateItinerary: List[DateItineraryAct]
    compromiseSafeguardNote: str
    provenance: Dict[str, Any]


# AGENT 3: JEEVAN STUDIO
class StudioUserInput(BaseModel):
    brand_or_project_name: str = Field(default="AURA Nocturne", alias="brandOrProjectName")
    project_type: str = Field(default="fashion_collection", alias="projectType")
    brief_description: str = Field(default="", alias="briefDescription")
    seed_inspirations: List[str] = Field(
        default=["Maison Margiela", "Aphex Twin", "Cyberpunk 2077"],
        alias="seedInspirations"
    )
    target_demographic: Optional[str] = Field(default=None, alias="targetDemographic")

    class Config:
        populate_by_name = True


class StudioDossierOutput(BaseModel):
    projectName: str
    projectType: str
    creativeThesis: str
    brandArchetype: str
    resolvedInspirations: List[QlooEntity]
    visualMoodboardDirection: Dict[str, Any]
    sonicIdentity: Dict[str, Any]
    wardrobeAndStyling: Dict[str, Any]
    cinematicReferences: Dict[str, Any]
    targetAudiencePsychographics: Dict[str, Any]
    provenance: Dict[str, Any]
