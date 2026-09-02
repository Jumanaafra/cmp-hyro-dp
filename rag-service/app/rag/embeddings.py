"""
HyroVision RAG — Embedding Model
Singleton wrapper for sentence-transformers embedding model.
"""

import logging
from typing import Optional

from langchain_community.embeddings import HuggingFaceEmbeddings

logger = logging.getLogger(__name__)

_embeddings_instance: Optional[HuggingFaceEmbeddings] = None


def get_embeddings(model_name: str = "all-MiniLM-L6-v2") -> HuggingFaceEmbeddings:
    """
    Get or create the embedding model singleton.
    Uses sentence-transformers (local, no API key needed).

    Args:
        model_name: HuggingFace model name for embeddings

    Returns:
        HuggingFaceEmbeddings instance
    """
    global _embeddings_instance

    if _embeddings_instance is None:
        logger.info(f"Initializing embedding model: {model_name}")
        _embeddings_instance = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
        logger.info("Embedding model initialized successfully")

    return _embeddings_instance


def reset_embeddings() -> None:
    """Reset the singleton (useful for testing)."""
    global _embeddings_instance
    _embeddings_instance = None
