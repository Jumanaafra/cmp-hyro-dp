"""
HyroVision RAG — Retrieval Tests
Tests relevance scoring and chunk retrieval against domain queries.
"""

from pathlib import Path
import pytest
from langchain_core.documents import Document

from app.rag.prompts import build_prompt, format_context, format_history


def test_format_context():
    """Verify context formatting includes source labels and section names."""
    docs = [
        Document(
            page_content="Full-Stack Web Application Development description",
            metadata={"title": "HyroVision Services", "section": "Services"},
        ),
        Document(
            page_content="BSmartGlass / AuraVision 2.0 description",
            metadata={"title": "HyroVision Project Portfolio", "section": "Projects"},
        ),
    ]

    formatted = format_context(docs)
    assert "[Source 1: HyroVision Services — Services]" in formatted
    assert "[Source 2: HyroVision Project Portfolio — Projects]" in formatted
    assert "Full-Stack Web Application Development" in formatted


def test_format_history():
    """Verify conversation history formatting adheres to max limit."""
    history = [
        {"role": "user", "content": "What services do you offer?"},
        {"role": "bot", "content": "We offer 5 core services..."},
        {"role": "user", "content": "Which one uses AI?"},
    ]

    formatted = format_history(history, max_messages=2)
    assert "What services do you offer?" not in formatted  # truncated by max_messages=2
    assert "Bot: We offer 5 core services..." in formatted
    assert "User: Which one uses AI?" in formatted


def test_build_prompt_anti_hallucination():
    """Verify prompt embeds anti-hallucination rules."""
    prompt = build_prompt(
        context="Sample context",
        question="What is the company revenue?",
        history="No previous conversation.",
    )

    assert "Never fabricate information" in prompt
    assert "I don't have verified information about that" in prompt
    assert "RETRIEVED CONTEXT:" in prompt
    assert "USER QUESTION:" in prompt
