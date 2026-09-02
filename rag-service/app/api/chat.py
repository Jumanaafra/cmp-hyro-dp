"""
HyroVision RAG — FastAPI Chat Router
Endpoints for chat queries and health checks.
"""

import logging
import uuid
from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.schemas.chat import ChatRequest, ChatResponse, HealthResponse, SourceCitation
from app.rag.chain import RAGPipeline

logger = logging.getLogger(__name__)

router = APIRouter()


def get_pipeline(request: Request) -> RAGPipeline:
    """Dependency retrieving the initialized RAGPipeline from application state."""
    pipeline = getattr(request.app.state, "rag_pipeline", None)
    if pipeline is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RAG pipeline is not initialized or still starting up.",
        )
    return pipeline


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    payload: ChatRequest,
    pipeline: RAGPipeline = Depends(get_pipeline),
) -> ChatResponse:
    """
    Query the HyroVision RAG pipeline.
    Retrieves grounded context from ChromaDB and generates responses via Gemini / Groq.
    """
    message = payload.message.strip()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty.",
        )

    conv_id = payload.conversation_id or str(uuid.uuid4())

    # Format history into list of dicts [{'role': 'user', 'content': '...'}]
    formatted_history = []
    if payload.history:
        for item in payload.history:
            formatted_history.append({"role": item.role, "content": item.content})

    try:
        result = await pipeline.aquery(
            question=message,
            history=formatted_history,
            conversation_id=conv_id,
        )

        sources = [
            SourceCitation(title=s["title"], section=s["section"])
            for s in result.get("sources", [])
        ]

        return ChatResponse(
            answer=result["answer"],
            provider=result.get("provider", "gemini"),
            sources=sources,
            conversation_id=conv_id,
            suggestions=result.get("suggestions", []),
        )

    except Exception as e:
        logger.error(f"Error executing chat request: {e}")
        # Return user-friendly error response without leaking trace
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="I'm temporarily unable to process your request. Please try again in a moment.",
        )


@router.get("/health", response_model=HealthResponse)
async def health_check(request: Request) -> HealthResponse:
    """Health check endpoint providing service status and provider readiness."""
    settings = getattr(request.app.state, "settings", None)

    providers = {
        "gemini": bool(settings.has_gemini) if settings else False,
        "groq": bool(settings.has_groq) if settings else False,
    }

    return HealthResponse(
        status="ok",
        version="1.0.0",
        service="hyrovision-rag",
        vector_store="ready",
        providers=providers,
    )
