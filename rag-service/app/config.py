"""
HyroVision RAG Service — Configuration
Pydantic Settings with environment variable loading and validation.
"""

from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralized configuration for the RAG service."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── LLM Providers ──
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.6-flash"

    groq_api_key: str = ""
    groq_model: str = "openai/gpt-oss-120b"

    # ── LangSmith Observability ──
    langsmith_api_key: str = ""
    langsmith_project: str = "hyrovision-rag"
    langsmith_tracing: bool = False
    langsmith_endpoint: str = "https://api.smith.langchain.com"

    # ── ChromaDB ──
    chroma_persist_directory: str = "./chroma_db"
    chroma_collection_name: str = "hyrovision_knowledge"

    # ── RAG ──
    top_k: int = 5
    chunk_size: int = 800
    chunk_overlap: int = 150
    max_history_messages: int = 10

    # ── Embeddings ──
    embedding_model: str = "all-MiniLM-L6-v2"

    # ── Server ──
    rag_service_port: int = 8000
    frontend_origin: str = "http://localhost:5173"
    log_level: str = "INFO"

    @property
    def chroma_path(self) -> Path:
        return Path(self.chroma_persist_directory)

    @property
    def has_gemini(self) -> bool:
        return bool(self.gemini_api_key.strip())

    @property
    def has_groq(self) -> bool:
        return bool(self.groq_api_key.strip())

    @property
    def has_langsmith(self) -> bool:
        return bool(self.langsmith_api_key.strip()) and self.langsmith_tracing

    @property
    def data_directory(self) -> Path:
        return Path(__file__).parent.parent / "data" / "hyrovision"


def get_settings() -> Settings:
    """Factory function returning validated settings."""
    return Settings()
