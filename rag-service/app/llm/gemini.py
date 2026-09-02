"""
HyroVision RAG — Google Gemini Provider (Primary LLM)
Uses langchain-google-genai to invoke Gemini models with low temperature.
"""

import logging
from typing import Optional

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from app.llm.base import AIProvider

logger = logging.getLogger(__name__)


class GeminiProvider(AIProvider):
    """Google Gemini primary LLM provider."""

    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        self._api_key = api_key.strip() if api_key else ""
        self._model_name = model_name
        self._client: Optional[ChatGoogleGenerativeAI] = None

    @property
    def name(self) -> str:
        return "gemini"

    @property
    def model_name(self) -> str:
        return self._model_name

    def is_available(self) -> bool:
        return bool(self._api_key)

    def _get_client(self) -> ChatGoogleGenerativeAI:
        if self._client is None:
            if not self.is_available():
                raise ValueError("Gemini API key is not configured.")
            self._client = ChatGoogleGenerativeAI(
                model=self._model_name,
                google_api_key=self._api_key,
                temperature=0.1,
                max_output_tokens=800,
                timeout=30.0,
            )
        return self._client

    async def generate_response(self, prompt: str) -> str:
        """Generate response using Gemini."""
        client = self._get_client()
        logger.info(f"Invoking Gemini ({self._model_name})...")
        response = await client.ainvoke([HumanMessage(content=prompt)])
        content = response.content if hasattr(response, "content") else response
        if isinstance(content, list):
            parts = [p.get("text", str(p)) if isinstance(p, dict) else str(p) for p in content]
            return "".join(parts)
        return str(content)
