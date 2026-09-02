"""
HyroVision RAG — Ingestion Tests
Tests document loading, splitting, metadata, and deterministic upsert.
"""

from pathlib import Path
import pytest
from langchain_core.documents import Document

from app.rag.loader import load_documents
from app.rag.splitter import split_documents
from app.rag.vectorstore import _generate_doc_id


@pytest.fixture
def data_dir():
    return Path(__file__).parent.parent / "data" / "hyrovision"


def test_document_loader(data_dir):
    """Verify all verified markdown files load with correct metadata."""
    docs = load_documents(data_dir)
    assert len(docs) >= 6, "Should load at least 6 verified markdown files"

    types = {doc.metadata["type"] for doc in docs}
    assert "company" in types
    assert "service" in types
    assert "project" in types
    assert "capability" in types
    assert "process" in types
    assert "technology" in types

    for doc in docs:
        assert doc.metadata["source"] == "hyrovision"
        assert len(doc.page_content) > 50


def test_text_splitter(data_dir):
    """Verify documents are chunked with preserved metadata."""
    docs = load_documents(data_dir)
    chunks = split_documents(docs, chunk_size=500, chunk_overlap=100)

    assert len(chunks) >= len(docs), "Chunk count should be >= document count"

    for chunk in chunks:
        assert "type" in chunk.metadata
        assert "title" in chunk.metadata
        assert "chunk_index" in chunk.metadata
        assert len(chunk.page_content) <= 700  # allowing separator boundary


def test_deterministic_doc_ids():
    """Verify deterministic ID generation prevents duplicate accumulation."""
    doc1 = Document(
        page_content="HyroVision builds intelligent digital products.",
        metadata={"source": "hyrovision", "type": "company", "section": "Core", "chunk_index": 0},
    )
    doc2 = Document(
        page_content="HyroVision builds intelligent digital products.",
        metadata={"source": "hyrovision", "type": "company", "section": "Core", "chunk_index": 0},
    )

    id1 = _generate_doc_id(doc1)
    id2 = _generate_doc_id(doc2)

    assert id1 == id2, "Identical content and metadata must generate identical IDs"
