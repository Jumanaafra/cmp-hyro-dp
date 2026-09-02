"""
HyroVision RAG — LLM Fallback Tests
Tests primary -> secondary fallback behavior and context preservation.
"""

import pytest
from app.llm.base import AIProvider
from app.llm.router import LLMRouter


class MockFailingProvider(AIProvider):
    """Mock provider simulating an API failure."""

    @property
    def name(self) -> str:
        return "gemini"

    @property
    def model_name(self) -> str:
        return "gemini-1.5-flash"

    def is_available(self) -> bool:
        return True

    async def generate_response(self, prompt: str) -> str:
        raise ConnectionError("Simulated Gemini connection failure")


class MockSuccessProvider(AIProvider):
    """Mock provider simulating successful fallback execution."""

    def __init__(self, name: str = "groq"):
        self._name = name
        self.last_prompt = None

    @property
    def name(self) -> str:
        return self._name

    @property
    def model_name(self) -> str:
        return "mock-model"

    def is_available(self) -> bool:
        return True

    async def generate_response(self, prompt: str) -> str:
        self.last_prompt = prompt
        return f"Response generated via {self._name}"


@pytest.mark.asyncio
async def test_fallback_triggers_when_primary_fails():
    """Verify router automatically executes fallback provider when primary throws."""
    failing_primary = MockFailingProvider()
    fallback_secondary = MockSuccessProvider("groq")

    router = LLMRouter(
        gemini_provider=failing_primary,
        groq_provider=fallback_secondary,
    )

    test_prompt = "Grounded context with instructions"
    answer, provider_used = await router.generate_with_fallback(test_prompt)

    assert provider_used == "groq"
    assert "Response generated via groq" in answer
    # CRITICAL: Verify exact same prompt/context was passed to fallback
    assert fallback_secondary.last_prompt == test_prompt


@pytest.mark.asyncio
async def test_all_providers_fail_raises_runtime_error():
    """Verify clear error is raised when both primary and secondary fail."""
    failing1 = MockFailingProvider()
    failing2 = MockFailingProvider()

    router = LLMRouter(
        gemini_provider=failing1,
        groq_provider=failing2,
    )

    with pytest.raises(RuntimeError) as exc_info:
        await router.generate_with_fallback("Some prompt")

    assert "All LLM providers are currently unavailable" in str(exc_info.value)
