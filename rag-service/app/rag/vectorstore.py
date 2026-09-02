"""
HyroVision RAG — ChromaDB Vector Store
Persistent vector store with deterministic document IDs and upsert strategy.
"""

import hashlib
import logging
from pathlib import Path
from typing import List, Optional

from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings

logger = logging.getLogger(__name__)

_vectorstore_instance: Optional[Chroma] = None


def _generate_doc_id(doc: Document) -> str:
    """Generate a deterministic ID from document content and metadata."""
    content_hash = hashlib.sha256(
        (doc.page_content + str(doc.metadata.get("source", ""))
         + str(doc.metadata.get("type", ""))
         + str(doc.metadata.get("section", ""))
         + str(doc.metadata.get("chunk_index", ""))
         ).encode("utf-8")
    ).hexdigest()[:16]
    return f"hv-{doc.metadata.get('type', 'doc')}-{content_hash}"


def get_vectorstore(
    persist_directory: str,
    collection_name: str,
    embeddings: Embeddings,
) -> Chroma:
    """
    Get or create the ChromaDB vector store singleton.

    Args:
        persist_directory: Path for persistent ChromaDB storage
        collection_name: ChromaDB collection name
        embeddings: Embedding model instance

    Returns:
        Chroma vector store instance
    """
    global _vectorstore_instance

    if _vectorstore_instance is None:
        persist_path = Path(persist_directory)
        persist_path.mkdir(parents=True, exist_ok=True)

        logger.info(f"Initializing ChromaDB at: {persist_path} (collection: {collection_name})")

        _vectorstore_instance = Chroma(
            collection_name=collection_name,
            embedding_function=embeddings,
            persist_directory=str(persist_path),
        )
        logger.info("ChromaDB initialized successfully")

    return _vectorstore_instance


def upsert_documents(
    vectorstore: Chroma,
    documents: List[Document],
) -> dict:
    """
    Upsert documents into ChromaDB with deterministic IDs and precomputed embeddings.
    Prevents duplicate chunks on re-ingestion and avoids S3 ONNX downloads.

    Args:
        vectorstore: Chroma vector store instance
        documents: List of Document chunks to upsert

    Returns:
        dict with ingestion statistics
    """
    if not documents:
        return {"total": 0, "upserted": 0}

    ids = [_generate_doc_id(doc) for doc in documents]
    texts = [doc.page_content for doc in documents]
    metadatas = [doc.metadata for doc in documents]

    # Pre-embed using the configured embedding model (HuggingFace sentence-transformers)
    logger.info(f"Generating embeddings for {len(texts)} chunks...")
    embeddings_vectors = vectorstore.embeddings.embed_documents(texts)
    logger.info("Embeddings generated successfully")

    # Upsert directly with embeddings into Chroma collection
    collection = vectorstore._collection
    collection.upsert(
        ids=ids,
        embeddings=embeddings_vectors,
        documents=texts,
        metadatas=metadatas,
    )

    stats = {
        "total": len(documents),
        "upserted": len(ids),
        "collection_count": collection.count(),
    }

    logger.info(f"Upserted {stats['upserted']} chunks. Total in collection: {stats['collection_count']}")
    return stats


def reset_vectorstore() -> None:
    """Reset the singleton (useful for testing)."""
    global _vectorstore_instance
    _vectorstore_instance = None
