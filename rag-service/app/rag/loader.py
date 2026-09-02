"""
HyroVision RAG — Document Loader
Loads verified HyroVision knowledge base markdown files into LangChain Documents.
"""

from pathlib import Path
from typing import List

from langchain_core.documents import Document


# Metadata mapping: filename → document type and title
FILE_METADATA = {
    "company.md": {"type": "company", "title": "HyroVision Company Information", "section": "Company"},
    "services.md": {"type": "service", "title": "HyroVision Services", "section": "Services"},
    "projects.md": {"type": "project", "title": "HyroVision Project Portfolio", "section": "Projects"},
    "capabilities.md": {"type": "capability", "title": "HyroVision Core Capabilities", "section": "Capabilities"},
    "process.md": {"type": "process", "title": "HyroVision Engineering Process", "section": "Process"},
    "technologies.md": {"type": "technology", "title": "HyroVision Technology Stack", "section": "Technologies"},
}


def load_documents(data_dir: Path) -> List[Document]:
    """
    Load all markdown files from the HyroVision knowledge base directory.

    Args:
        data_dir: Path to data/hyrovision/ directory

    Returns:
        List of LangChain Document objects with metadata
    """
    documents: List[Document] = []

    if not data_dir.exists():
        raise FileNotFoundError(f"Knowledge base directory not found: {data_dir}")

    md_files = sorted(data_dir.glob("*.md"))
    if not md_files:
        raise FileNotFoundError(f"No markdown files found in: {data_dir}")

    for md_file in md_files:
        content = md_file.read_text(encoding="utf-8").strip()
        if not content:
            continue

        # Get metadata for this file
        meta = FILE_METADATA.get(md_file.name, {
            "type": "general",
            "title": md_file.stem.replace("_", " ").title(),
            "section": md_file.stem.replace("_", " ").title(),
        })

        doc = Document(
            page_content=content,
            metadata={
                "source": "hyrovision",
                "type": meta["type"],
                "title": meta["title"],
                "section": meta["section"],
                "filename": md_file.name,
                "version": "1.0",
            },
        )
        documents.append(doc)

    return documents


def clean_content(text: str) -> str:
    """Clean and normalize document text."""
    # Normalize whitespace
    lines = text.split("\n")
    cleaned = []
    for line in lines:
        stripped = line.rstrip()
        cleaned.append(stripped)

    result = "\n".join(cleaned)
    # Collapse triple+ newlines into double
    while "\n\n\n" in result:
        result = result.replace("\n\n\n", "\n\n")

    return result.strip()
