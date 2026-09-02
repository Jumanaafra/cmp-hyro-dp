"""
HyroVision RAG — LLM Router
Manages provider priority (Gemini primary -> Groq fallback).
CRITICAL: Guarantees the same retrieved RAG context is supplied to both providers.
"""

import logging
from typing import Optional, Tuple

from app.llm.base import AIProvider
from app.llm.gemini import GeminiProvider
from app.llm.groq import GroqProvider

logger = logging.getLogger(__name__)


class LLMRouter:
    """Routes generation requests to primary (Gemini) with automatic fallback (Groq)."""

    def __init__(
        self,
        gemini_provider: Optional[GeminiProvider] = None,
        groq_provider: Optional[GroqProvider] = None,
    ):
        self.gemini = gemini_provider
        self.groq = groq_provider

    async def generate_with_fallback(self, prompt: str) -> Tuple[str, str]:
        """
        Execute generation with primary -> fallback sequence.

        Args:
            prompt: Complete grounded prompt with context & history

        Returns:
            Tuple[response_text, provider_name]

        Raises:
            RuntimeError if all providers fail
        """
        errors = []

        # 1. Attempt Primary: Gemini
        if self.gemini and self.gemini.is_available():
            try:
                logger.info("Attempting primary LLM provider: Gemini")
                answer = await self.gemini.generate_response(prompt)
                if answer and answer.strip():
                    return answer.strip(), "gemini"
            except Exception as e:
                err_msg = f"Gemini provider failed: {type(e).__name__}: {e}"
                logger.warning(err_msg)
                errors.append(err_msg)
        else:
            logger.info("Gemini provider is not configured or unavailable.")

        # 2. Attempt Fallback: Groq (with exact same prompt/context)
        if self.groq and self.groq.is_available():
            try:
                logger.info("Falling back to secondary LLM provider: Groq")
                answer = await self.groq.generate_response(prompt)
                if answer and answer.strip():
                    return answer.strip(), "groq"
            except Exception as e:
                err_msg = f"Groq fallback provider failed: {type(e).__name__}: {e}"
                logger.warning(err_msg)
                errors.append(err_msg)
        else:
            logger.info("Groq fallback provider is not configured or unavailable.")

        # 3. All configured providers failed
        logger.error(f"All LLM providers failed. Errors: {errors}")
        raise RuntimeError("All LLM providers are currently unavailable.")
