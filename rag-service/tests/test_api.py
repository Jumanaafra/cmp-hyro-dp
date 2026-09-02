"""
HyroVision RAG — API Integration Tests
Tests /api/chat and /api/health endpoints.
"""

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.schemas.chat import ChatRequest


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_health_check_endpoint(client):
    """Verify /api/health returns 200 OK and expected structure."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "hyrovision-rag"
    assert "providers" in data


def test_chat_endpoint_validation(client):
    """Verify empty query returns 400 Bad Request or 422 Unprocessable."""
    response = client.post("/api/chat", json={"message": ""})
    assert response.status_code in [400, 422]
