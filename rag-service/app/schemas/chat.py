"""
HyroVision RAG — Pydantic Schemas
Validation for incoming API requests and outgoing responses.
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class HistoryMessage(BaseModel):
    """A single message in the conversation history."""
    role: str = Field(..., description="Role: 'user' or 'bot'")
    content: str = Field(..., description="Message text content")


class SourceCitation(BaseModel):
    """Citation metadata for a retrieved source."""
    title: str = Field(..., description="Document title")
    section: str = Field(..., description="Document section")


class ChatRequest(BaseModel):
    """Incoming chat request payload."""
    message: str = Field(..., min_length=1, max_length=2000, description="User's query")
    conversation_id: Optional[str] = Field(default=None, description="Optional session/conversation ID")
    history: Optional[List[HistoryMessage]] = Field(default_factory=list, description="Recent conversation turns")


class ChatResponse(BaseModel):
    """Outgoing chat response payload."""
    answer: str = Field(..., description="Grounded AI response text")
    provider: str = Field(default="gemini", description="LLM provider used (gemini or groq)")
    sources: List[SourceCitation] = Field(default_factory=list, description="Retrieved source citations")
    conversation_id: str = Field(default="", description="Session/conversation ID")
    suggestions: List[str] = Field(default_factory=list, description="Follow-up question suggestions")


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "ok"
    version: str = "1.0.0"
    service: str = "hyrovision-rag"
    vector_store: str = "ready"
    providers: Dict[str, bool] = Field(default_factory=dict)
