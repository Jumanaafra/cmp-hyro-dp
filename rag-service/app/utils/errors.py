"""
HyroVision RAG — Custom Errors & Safe Exception Handlers
Provides clear error classifications while shielding internal details from public callers.
"""

from fastapi import HTTPException, status


class RAGError(Exception):
    """Base exception for RAG pipeline errors."""
    pass


class RetrievalError(RAGError):
    """Raised when vector retrieval fails."""
    pass


class ProviderError(RAGError):
    """Raised when all LLM providers fail."""
    pass


class ConfigurationError(RAGError):
    """Raised when required settings or credentials are invalid."""
    pass


def create_safe_error_response(status_code: int, user_message: str) -> HTTPException:
    """Create a sanitized HTTPException that does not expose internal stack traces."""
    return HTTPException(
        status_code=status_code,
        detail={
            "error": user_message,
            "status": "error",
        },
    )
