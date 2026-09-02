"""
HyroVision RAG — Chain Orchestrator
Coordinates retrieval from ChromaDB, context assembly, and LLM generation via LLMRouter.
"""

import logging
from typing import Any, Dict, List, Optional

from langchain_chroma import Chroma
from langchain_core.documents import Document

from app.llm.router import LLMRouter
from app.rag.prompts import build_prompt, format_context, format_history
from app.rag.retriever import retrieve_documents

logger = logging.getLogger(__name__)

DEFAULT_SUGGESTIONS = [
    "What services does HyroVision provide?",
    "Show me your AI and SaaS projects",
    "What technologies do you use?",
    "How can I start a project?",
]


class RAGPipeline:
    """Production RAG execution pipeline."""

    def __init__(
        self,
        vectorstore: Chroma,
        llm_router: LLMRouter,
        top_k: int = 5,
        max_history: int = 10,
    ):
        self.vectorstore = vectorstore
        self.llm_router = llm_router
        self.top_k = top_k
        self.max_history = max_history

    async def aquery(
        self,
        question: str,
        history: Optional[List[Dict[str, str]]] = None,
        conversation_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Process a user question through the complete RAG pipeline.

        Args:
            question: Cleaned user message
            history: Optional list of previous messages [{'role': 'user', 'content': '...'}]
            conversation_id: Optional session identifier

        Returns:
            Dict containing answer, provider, sources, suggestions, conversation_id
        """
        history = history or []

        # 1. Retrieve top-K relevant documents from ChromaDB
        docs: List[Document] = retrieve_documents(
            self.vectorstore,
            query=question,
            top_k=self.top_k,
        )

        # 2. Format context & conversation history
        formatted_context = format_context(docs)
        formatted_history = format_history(history, max_messages=self.max_history)

        # 3. Build grounded prompt
        prompt = build_prompt(
            context=formatted_context,
            question=question,
            history=formatted_history,
        )

        # 4. Generate answer via LLM Router (Gemini -> Groq fallback)
        answer, provider_used = await self.llm_router.generate_with_fallback(prompt)

        # 5. Extract unique sources for citations
        sources = []
        seen = set()
        for doc in docs:
            title = doc.metadata.get("title", "HyroVision Knowledge")
            section = doc.metadata.get("section", "General")
            key = f"{title}:{section}"
            if key not in seen:
                seen.add(key)
                sources.append({"title": title, "section": section})

        return {
            "answer": answer,
            "provider": provider_used,
            "sources": sources,
            "conversation_id": conversation_id or "",
            "suggestions": DEFAULT_SUGGESTIONS,
        }
