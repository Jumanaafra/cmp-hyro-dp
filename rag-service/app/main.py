"""
HyroVision RAG — FastAPI Application
Production application factory with lifespan resource management and CORS.
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.config import get_settings
from app.llm.gemini import GeminiProvider
from app.llm.groq import GroqProvider
from app.llm.router import LLMRouter
from app.rag.chain import RAGPipeline
from app.rag.embeddings import get_embeddings
from app.rag.vectorstore import get_vectorstore
from app.utils.logging import setup_logging

settings = get_settings()
setup_logging(settings.log_level)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager:
    Initializes vectorstore, embeddings, providers, and pipeline once on startup.
    """
    # Configure LangSmith if enabled
    if settings.has_langsmith:
        os.environ["LANGCHAIN_TRACING_V2"] = "true"
        os.environ["LANGCHAIN_API_KEY"] = settings.langsmith_api_key
        os.environ["LANGCHAIN_PROJECT"] = settings.langsmith_project
        if settings.langsmith_endpoint:
            os.environ["LANGCHAIN_ENDPOINT"] = settings.langsmith_endpoint

    # Initialize Embeddings & ChromaDB singleton
    embeddings = get_embeddings(model_name=settings.embedding_model)
    vectorstore = get_vectorstore(
        persist_directory=settings.chroma_persist_directory,
        collection_name=settings.chroma_collection_name,
        embeddings=embeddings,
    )

    # Initialize LLM Providers
    gemini_provider = (
        GeminiProvider(api_key=settings.gemini_api_key, model_name=settings.gemini_model)
        if settings.has_gemini
        else None
    )

    groq_provider = (
        GroqProvider(api_key=settings.groq_api_key, model_name=settings.groq_model)
        if settings.has_groq
        else None
    )

    # Initialize LLM Router
    llm_router = LLMRouter(
        gemini_provider=gemini_provider,
        groq_provider=groq_provider,
    )

    # Initialize RAG Pipeline
    pipeline = RAGPipeline(
        vectorstore=vectorstore,
        llm_router=llm_router,
        top_k=settings.top_k,
        max_history=settings.max_history_messages,
    )

    # Attach to application state for injection
    app.state.settings = settings
    app.state.vectorstore = vectorstore
    app.state.rag_pipeline = pipeline

    yield

    # Clean shutdown (if needed)


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="HyroVision RAG Service",
        description="Production Grounded RAG API for the HyroVision Digital Products Website",
        version="1.0.0",
        lifespan=lifespan,
    )

    # CORS configuration
    origins = [
        settings.frontend_origin,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://hyrovision.vercel.app",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount routes
    app.include_router(chat_router, prefix="/api", tags=["Chat & RAG"])

    return app


app = create_app()
