import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/chatbot.css";

/* ── Branded HyroVision Logo Mark ── */
const HvLogoMark = ({ size = 32 }) => (
  <div
    className="hv-logo-mark"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${Math.round(size * 0.42)}px`,
      borderRadius: `${Math.round(size * 0.28)}px`,
      pointerEvents: "none",
      boxShadow: "none",
    }}
  >
    H
  </div>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/* ── Quick Actions ── */
const quickActions = [
  "What services does HyroVision provide?",
  "Show me your AI and SaaS projects",
  "What technologies do you use?",
  "Tell me about AuraVision 2.0",
  "How can I start a project?",
];

/* ── Simple markdown-like formatting ── */
function formatMessage(text) {
  if (!text) return "";
  return text
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic: _text_
    .replace(/(?<!\w)_(.*?)_(?!\w)/g, "<em>$1</em>")
    // Links: [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Bullet points
    .replace(/^\s*[-*]\s+(.*)$/gm, "• $1")
    // Newlines
    .replace(/\n/g, "<br />");
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showDot, setShowDot] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  /* ── Scroll to bottom on new message ── */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  /* ── Focus input when panel opens ── */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* ── Send message ── */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed) return;

      if (!hasInteracted) {
        setHasInteracted(true);
        setShowDot(false);
      }

      setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        });

        if (!res.ok) {
          throw new Error("Service Unavailable");
        }

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.text,
            suggestions: data.suggestions || [],
          },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text:
              "AI assistant is temporarily unavailable. Please try again or reach out directly at hyrovision@gmail.com.",
            suggestions: [
              "What services does HyroVision provide?",
              "Show me your projects",
              "How can I start a project?",
            ],
            isError: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [input, hasInteracted]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const handleQuickAction = (text) => {
    setHasInteracted(true);
    setShowDot(false);
    sendMessage(text);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setShowDot(false);
  };

  return (
    <div className="hv-chat">
      {/* ── Floating Toggle Button with HyroVision Brand Logo ── */}
      <button
        className={`hv-chat-toggle ${isOpen ? "hv-chat-toggle--open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close HyroVision AI Assistant" : "Open HyroVision AI Assistant"}
        aria-expanded={isOpen}
        id="hv-chat-toggle"
      >
        {isOpen ? <CloseIcon /> : <HvLogoMark size={32} />}
        {showDot && !isOpen && <span className="hv-chat-toggle-dot" />}
      </button>

      {/* ── Chat Panel ── */}
      <div
        ref={panelRef}
        className={`hv-chat-panel ${isOpen ? "hv-chat-panel--open" : ""}`}
        role="dialog"
        aria-label="HyroVision AI Assistant"
        aria-hidden={!isOpen}
      >
        {/* ── Header ── */}
        <div className="hv-chat-header">
          <div className="hv-chat-header-icon">
            <HvLogoMark size={28} />
          </div>
          <div className="hv-chat-header-info">
            <div className="hv-chat-header-title">HyroVision AI</div>
            <div className="hv-chat-header-status">Online — Grounded Intelligence</div>
          </div>
          {messages.length > 0 && (
            <button
              className="hv-chat-close"
              onClick={clearChat}
              title="Clear Conversation"
              aria-label="Clear Conversation"
              style={{ marginRight: "4px" }}
            >
              <ClearIcon />
            </button>
          )}
          <button
            className="hv-chat-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Messages / Quick Actions ── */}
        {messages.length === 0 && !isTyping ? (
          <div className="hv-chat-quick-actions">
            <div className="hv-chat-quick-icon">
              <HvLogoMark size={48} />
            </div>
            <div className="hv-chat-quick-title">HyroVision AI Assistant</div>
            <div className="hv-chat-quick-subtitle">
              Ask about our engineering services, verified projects, tech stack capabilities, or starting a new project:
            </div>
            <div className="hv-chat-quick-grid">
              {quickActions.map((q) => (
                <button
                  key={q}
                  className="hv-chat-quick-btn"
                  onClick={() => handleQuickAction(q)}
                >
                  {q}
                  <span className="hv-chat-quick-btn-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="hv-chat-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`hv-chat-msg hv-chat-msg--${msg.role}`}>
                  <div className="hv-chat-msg-avatar">
                    {msg.role === "bot" ? <HvLogoMark size={24} /> : "You"}
                  </div>
                  <div
                    className="hv-chat-msg-bubble"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.text),
                    }}
                  />
                </div>

                {/* Suggestions after bot message */}
                {msg.role === "bot" &&
                  msg.suggestions &&
                  msg.suggestions.length > 0 &&
                  i === messages.length - 1 && (
                    <div className="hv-chat-suggestions">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          className="hv-chat-suggestion-btn"
                          onClick={() => handleSuggestion(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="hv-chat-typing" aria-label="HyroVision AI is thinking">
                <span className="hv-chat-typing-dot" />
                <span className="hv-chat-typing-dot" />
                <span className="hv-chat-typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* ── Footer / Grounding Info ── */}
        <div className="hv-chat-footer">HyroVision AI · Verified Knowledge Base</div>

        {/* ── Input Area ── */}
        <form className="hv-chat-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="hv-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our engineering, projects, tech..."
            disabled={isTyping}
            aria-label="Type your message"
            id="hv-chat-input"
          />
          <button
            type="submit"
            className="hv-chat-send"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
