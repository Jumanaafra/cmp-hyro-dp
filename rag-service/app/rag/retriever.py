"""
HyroVision RAG — Retriever
LangChain retriever wrapping ChromaDB similarity search.
"""

import logging
from typing import List

from langchain_chroma import Chroma
from langchain_core.documents import Document

logger = logging.getLogger(__name__)


def retrieve_documents(
    vectorstore: Chroma,
    query: str,
    top_k: int = 5,
) -> List[Document]:
    """
    Retrieve the top-K most relevant documents for a query.

    Args:
        vectorstore: Chroma vector store instance
        query: User question
        top_k: Number of documents to retrieve

    Returns:
        List of relevant Documents with metadata
    """
    try:
        results = vectorstore.similarity_search(
            query=query,
            k=top_k,
        )
        logger.info(f"Retrieved {len(results)} documents for query: '{query[:60]}...'")
        return results
    except Exception as e:
        logger.error(f"Retrieval failed: {e}")
        return []


def retrieve_with_scores(
    vectorstore: Chroma,
    query: str,
    top_k: int = 5,
) -> List[tuple]:
    """
    Retrieve documents with relevance scores.

    Args:
        vectorstore: Chroma vector store instance
        query: User question
        top_k: Number of documents to retrieve

    Returns:
        List of (Document, score) tuples
    """
    try:
        results = vectorstore.similarity_search_with_relevance_scores(
            query=query,
            k=top_k,
        )
        logger.info(
            f"Retrieved {len(results)} documents with scores for query: '{query[:60]}...'"
        )
        return results
    except Exception as e:
        logger.error(f"Scored retrieval failed: {e}")
        return []
