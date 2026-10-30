import json
import httpx
from typing import Dict, Any, Optional
from backend.config import settings


class PythonLLMProvider:
    def __init__(self):
        self.api_key = settings.gemini_api_key

    def is_available(self) -> bool:
        return bool(self.api_key and len(self.api_key.strip()) > 0 and "your_gemini" not in self.api_key)

    async def generate_structured_json(
        self, prompt: str, system_instruction: str, fallback_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        if not self.is_available():
            return fallback_data

        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={self.api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "systemInstruction": {"parts": [{"text": system_instruction}]},
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "temperature": 0.2,
                },
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
            if res.is_success:
                data = res.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(text)
        except Exception:
            pass

        return fallback_data


python_llm = PythonLLMProvider()
