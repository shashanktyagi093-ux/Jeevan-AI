import os
from pathlib import Path
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env.local or .env
root_dir = Path(__file__).resolve().parent.parent
env_local = root_dir / ".env.local"
env_default = root_dir / ".env"

if env_local.exists():
    load_dotenv(env_local)
elif env_default.exists():
    load_dotenv(env_default)


class Settings(BaseSettings):
    app_name: str = "Jeevan AI - Cultural Intelligence Backend"
    version: str = "1.0.0"
    qloo_api_key: str = os.getenv("QLOO_API_KEY", "")
    qloo_base_url: str = os.getenv("QLOO_BASE_URL", "https://api.qloo.com").rstrip("/")
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    host: str = "127.0.0.1"
    port: int = 8000

    @property
    def is_qloo_live(self) -> bool:
        return bool(
            self.qloo_api_key
            and len(self.qloo_api_key.strip()) > 0
            and "your_qloo" not in self.qloo_api_key
        )


settings = Settings()
