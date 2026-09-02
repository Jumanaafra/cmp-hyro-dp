# HyroVision RAG Service

Production-ready grounded RAG backend service for the HyroVision website.

## Architecture

- **Framework**: Python FastAPI (3.11+)
- **RAG Orchestrator**: LangChain
- **Vector Database**: ChromaDB (persistent local storage at `./chroma_db`)
- **Embeddings**: sentence-transformers (`all-MiniLM-L6-v2`)
- **Primary LLM**: Google Gemini (`gemini-1.5-flash`)
- **Fallback LLM**: Groq (`llama-3.1-8b-instant`)
- **Observability**: LangSmith (`hyrovision-rag`)
- **Validation**: Pydantic v2

## Setup & Running

### 1. Install Dependencies
```bash
cd rag-service
pip install -r requirements.txt
```

### 2. Ingest Verified Knowledge Base
```bash
python scripts/ingest.py
```

### 3. Run FastAPI Service
```bash
uvicorn app.main:app --port 8000 --reload
```

### 4. Run Tests
```bash
python -m pytest tests/ -v
```

## API Endpoints

- `POST /api/chat` — Accepts `{ "message": "...", "history": [...], "conversation_id": "..." }` and returns grounded RAG response with source citations and suggestions.
- `GET /api/health` — Returns service health and provider readiness status.
