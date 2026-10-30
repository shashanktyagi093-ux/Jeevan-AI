from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class QlooEntity(BaseModel):
    id: str = Field(..., description="Canonical Qloo URN, e.g. urn:qloo:entity:movie:christopher-nolan")
    name: str
    category: str
    type: Optional[str] = "Entity"
    popularity: Optional[float] = 85.0
    affinity: Optional[float] = 90.0
    description: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = Field(default_factory=list)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class QlooSearchResponse(BaseModel):
    results: List[QlooEntity]
    query: str
    total: int
    source: str = "qloo_live_api"


class QlooExplainability(BaseModel):
    matched_signal_name: str
    shared_aesthetic_tag: str
    cultural_correlation_note: str


class QlooInsightItem(BaseModel):
    entity: QlooEntity
    affinity_score: float
    over_indexing_ratio: float
    qloo_explainability: QlooExplainability


class QlooInsightsResponse(BaseModel):
    results: List[QlooInsightItem]
    signal_entities: List[str]
    target_type: Optional[str] = None
    source: str = "qloo_live_api"


class MaximinIntersection(BaseModel):
    entity: QlooEntity
    score_person_a: float
    score_person_b: float
    maximin_fairness_score: float
    overlap_reason: str


class QlooCompareResponse(BaseModel):
    compatibility_score: float
    shared_aesthetics: List[str]
    unexpected_crossovers: List[str]
    intersections: List[MaximinIntersection]
    source: str = "qloo_live_api"
