"""
HyroVision RAG — Groq Provider (Fallback LLM)
Uses langchain-groq to invoke fast open-source models (e.g. Llama 3.1) as fallback.
"""

import logging
from typing import Optional

from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq

from app.llm.base import AIProvider

logger = logging.getLogger(__name__)


class GroqProvider(AIProvider):
    """Groq secondary fallback LLM provider."""

    def __init__(self, api_key: str, model_name: str = "llama-3.1-8b-instant"):
        self._api_key = api_key.strip() if api_key else ""
        self._model_name = model_name
        self._client: Optional[ChatGroq] = None

    @property
    def name(self) -> str:
        return "groq"

    @property
    def model_name(self) -> str:
        return self._model_name

    def is_available(self) -> bool:
        return bool(self._api_key)

    def _get_client(self) -> ChatGroq:
        if self._client is None:
            if not self.is_available():
                raise ValueError("Groq API key is not configured.")
            self._client = ChatGroq(
                model_name=self._model_name,
                groq_api_key=self._api_key,
                temperature=0.1,
                max_tokens=800,
                timeout=30.0,
            )
        return self._client

    async def generate_response(self, prompt: str) -> str:
        """Generate response using Groq."""
        client = self._get_client()
        logger.info(f"Invoking Groq fallback ({self._model_name})...")
        response = await client.ainvoke([HumanMessage(content=prompt)])
        return response.content if hasattr(response, "content") else str(response)
