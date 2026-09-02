"""
HyroVision RAG — LLM Provider Interface
Abstract base class defining the contract for all LLM providers.
"""

from abc import ABC, abstractmethod
from typing import Optional


class AIProvider(ABC):
    """Abstract interface for LLM providers (Gemini, Groq, etc.)."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Provider identifier name."""
        pass

    @property
    @abstractmethod
    def model_name(self) -> str:
        """Model identifier."""
        pass

    @abstractmethod
    def is_available(self) -> bool:
        """Check if provider is configured and available."""
        pass

    @abstractmethod
    async def generate_response(self, prompt: str) -> str:
        """
        Generate text response from the LLM.

        Args:
            prompt: Grounded prompt string

        Returns:
            Generated answer text

        Raises:
            ProviderError on failure
        """
        pass
