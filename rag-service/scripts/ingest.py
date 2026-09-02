"""
HyroVision RAG — Knowledge Base Ingestion Script
Loads verified markdown knowledge, splits into chunks with metadata,
embeds with sentence-transformers, and stores in persistent ChromaDB.

Run:
    python scripts/ingest.py
"""

import logging
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.config import get_settings
from app.rag.embeddings import get_embeddings
from app.rag.loader import load_documents
from app.rag.splitter import split_documents
from app.rag.vectorstore import get_vectorstore, upsert_documents

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("hyrovision.ingest")


def run_ingestion() -> dict:
    """Run the complete ingestion pipeline."""
    settings = get_settings()

    print("\n" + "=" * 60)
    print("  HYROVISION RAG - KNOWLEDGE INGESTION PIPELINE")
    print("=" * 60)

    # 1. Load documents
    data_dir = settings.data_directory
    print(f"\n[1/4] Loading verified knowledge from: {data_dir}")
    documents = load_documents(data_dir)
    print(f"      Loaded {len(documents)} source document(s):")
    for doc in documents:
        print(f"      - {doc.metadata.get('filename')} ({doc.metadata.get('title')}) - {len(doc.page_content)} chars")

    # 2. Split documents
    print(f"\n[2/4] Splitting documents (chunk_size={settings.chunk_size}, overlap={settings.chunk_overlap})...")
    chunks = split_documents(
        documents,
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )
    print(f"      Generated {len(chunks)} chunk(s) across all documents.")

    # 3. Initialize Embeddings & Vector Store
    print(f"\n[3/4] Initializing Embedding Model ({settings.embedding_model}) & ChromaDB...")
    embeddings = get_embeddings(model_name=settings.embedding_model)
    vectorstore = get_vectorstore(
        persist_directory=settings.chroma_persist_directory,
        collection_name=settings.chroma_collection_name,
        embeddings=embeddings,
    )

    # 4. Upsert chunks into ChromaDB
    print(f"\n[4/4] Upserting chunks into ChromaDB collection '{settings.chroma_collection_name}'...")
    stats = upsert_documents(vectorstore, chunks)

    print("\n" + "=" * 60)
    print("  INGESTION SUMMARY")
    print("=" * 60)
    print(f"  * Source Documents : {len(documents)}")
    print(f"  * Total Chunks     : {stats['total']}")
    print(f"  * Chunks Upserted  : {stats['upserted']}")
    print(f"  * Collection Count : {stats['collection_count']}")
    print(f"  * Storage Path     : {settings.chroma_persist_directory}")
    print("=" * 60)
    print("  [SUCCESS] Ingestion complete!\n")

    return stats


if __name__ == "__main__":
    run_ingestion()
