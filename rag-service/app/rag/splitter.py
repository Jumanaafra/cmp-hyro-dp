"""
HyroVision RAG — Text Splitter
Recursive character text splitter with metadata preservation.
"""

from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_splitter(chunk_size: int = 800, chunk_overlap: int = 150) -> RecursiveCharacterTextSplitter:
    """Create a configured text splitter."""
    return RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=[
            "\n---\n",    # Markdown horizontal rules (section boundaries)
            "\n## ",      # H2 headers
            "\n### ",     # H3 headers
            "\n\n",       # Paragraphs
            "\n",         # Lines
            ". ",         # Sentences
            " ",          # Words
        ],
        is_separator_regex=False,
    )


def split_documents(
    documents: List[Document],
    chunk_size: int = 800,
    chunk_overlap: int = 150,
) -> List[Document]:
    """
    Split documents into chunks while preserving metadata.

    Args:
        documents: List of LangChain Documents
        chunk_size: Maximum chunk size in characters
        chunk_overlap: Overlap between chunks

    Returns:
        List of chunked Documents with preserved metadata
    """
    splitter = create_splitter(chunk_size, chunk_overlap)
    chunks = splitter.split_documents(documents)

    # Enrich each chunk with a chunk index
    for i, chunk in enumerate(chunks):
        chunk.metadata["chunk_index"] = i

    return chunks
