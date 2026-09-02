"""
HyroVision RAG — Structured Logging Setup
Configures log formatters and sanitizes any sensitive credentials.
"""

import logging
import re
import sys


class SecretSanitizingFormatter(logging.Formatter):
    """Filters out potential API keys, tokens, and authorization strings from log streams."""

    SECRET_PATTERNS = [
        re.compile(r"(AIza[0-9A-Za-z-_]{35})"),
        re.compile(r"(gsk_[0-9A-Za-z]{40,})"),
        re.compile(r"(lsv2_pt_[0-9A-Za-z]{30,})"),
        re.compile(r"(AQ\.[0-9A-Za-z-_]{30,})"),
    ]

    def format(self, record: logging.LogRecord) -> str:
        msg = super().format(record)
        for pattern in self.SECRET_PATTERNS:
            msg = pattern.sub("[REDACTED_SECRET]", msg)
        return msg


def setup_logging(log_level: str = "INFO") -> None:
    """Initialize structured application logging."""
    level = getattr(logging, log_level.upper(), logging.INFO)

    root_logger = logging.getLogger()
    root_logger.setLevel(level)

    # Avoid duplicate handlers
    if not root_logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        formatter = SecretSanitizingFormatter(
            fmt="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)
        root_logger.addHandler(handler)
