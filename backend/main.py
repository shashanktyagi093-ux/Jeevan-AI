from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from backend.config import settings
from backend.qloo.client import qloo_client
from backend.agents.travel_agent import PythonTravelAgent
from backend.agents.match_agent import PythonMatchAgent
from backend.agents.studio_agent import PythonStudioAgent
from backend.models.agent import (
    TravelUserInput,
    TravelItineraryOutput,
    MatchUserInput,
    MatchOutput,
    StudioUserInput,
    StudioDossierOutput,
)
from backend.models.qloo import QlooSearchResponse

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="Python-powered Cultural Intelligence & Agentic AI Backend for Qloo Agentic Hackathon 2026",
)

# Enable CORS for Next.js and local clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Diagnostics"])
async def health_check():
    """Verify Qloo connectivity and backend health."""
    health = await qloo_client.check_health()
    return {
        "status": "healthy",
        "backend": "Python FastAPI",
        "version": settings.version,
        "qloo": health,
    }


@app.get("/api/qloo/search", response_model=QlooSearchResponse, tags=["Qloo Intelligence"])
async def search_entities(
    q: str = Query(..., description="Query term (film, artist, architect, author, etc.)"),
    vertical: Optional[str] = Query(None, description="Optional vertical filter"),
    limit: int = Query(8, ge=1, le=15),
):
    """Search and resolve cultural entities through Qloo."""
    return await qloo_client.search_entities(query=q, vertical=vertical, limit=limit)


@app.post("/api/agents/travel", response_model=TravelItineraryOutput, tags=["Agents"])
async def travel_agent_endpoint(payload: TravelUserInput):
    """Execute Agent 1: Jeevan Travel Concierge."""
    try:
        return await PythonTravelAgent.execute(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/agents/match", response_model=MatchOutput, tags=["Agents"])
async def match_agent_endpoint(payload: MatchUserInput):
    """Execute Agent 2: Jeevan Match (Maximin Taste Fairness)."""
    try:
        return await PythonMatchAgent.execute(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/agents/studio", response_model=StudioDossierOutput, tags=["Agents"])
async def studio_agent_endpoint(payload: StudioUserInput):
    """Execute Agent 3: Jeevan Studio (Creative Director Dossier)."""
    try:
        return await PythonStudioAgent.execute(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.host, port=settings.port, reload=True)
