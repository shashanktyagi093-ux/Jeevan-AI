import asyncio
from typing import List, Set
from backend.models.qloo import QlooEntity
from backend.qloo.client import qloo_client


class EntityResolver:
    @staticmethod
    async def resolve_batch(raw_queries: List[str]) -> List[QlooEntity]:
        clean = [q.strip() for q in raw_queries if q and q.strip()][:8]
        if not clean:
            return []

        tasks = [qloo_client.search_entities(q, limit=1) for q in clean]
        responses = await asyncio.gather(*tasks, return_exceptions=True)

        resolved: List[QlooEntity] = []
        for i, res in enumerate(responses):
            if isinstance(res, Exception) or not res.results:
                # Fallback synthetic entity
                q = clean[i]
                resolved.append(
                    QlooEntity(
                        id=f"urn:qloo:entity:{q.lower().replace(' ', '-')}",
                        name=q.title(),
                        category="culture",
                        type="Taste Anchor",
                        popularity=85.0,
                        affinity=90.0,
                        tags=[q.lower(), "cultural-preference"],
                    )
                )
            else:
                resolved.append(res.results[0])

        return resolved

    @staticmethod
    def extract_aesthetic_tags(entities: List[QlooEntity]) -> List[str]:
        tags: Set[str] = set()
        for e in entities:
            for t in (e.tags or []):
                tags.add(t)
        return list(tags)[:10]
