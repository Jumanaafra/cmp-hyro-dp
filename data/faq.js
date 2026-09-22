/**
 * HYROVISION — Centralized FAQ Repository
 * Structured data source for the /faq page, chatbot grounding, and Schema.org FAQPage generation.
 */

export const faqCategories = [
  "All",
  "General",
  "Services",
  "Development",
  "AI & Automation",
  "Projects",
  "Pricing & Engagement",
  "Support",
];

export const faqs = [
  // ── General ──
  {
    id: "gen-1",
    category: "General",
    question: "What is HyroVision?",
    answer:
      "HyroVision is a modern technology and IT services engineering company focused on building intelligent digital products, AI-powered systems, workflow automation solutions, SaaS architectures, enterprise platforms, and connected IoT experiences.",
  },
  {
    id: "gen-2",
    category: "General",
    question: "Where is HyroVision located?",
    answer:
      "HyroVision operates as a remote-first engineering studio with distributed clients and partners worldwide. We manage communication through structured async updates, email, WhatsApp, and scheduled video conferences.",
  },
  {
    id: "gen-3",
    category: "General",
    question: "How do I initiate a new project with HyroVision?",
    answer:
      "You can begin by submitting an inquiry through our Contact page or emailing us directly at info@hyrovision.com. We schedule an initial technical discovery session to evaluate project scope, timelines, and architectural requirements.",
  },

  // ── Services ──
  {
    id: "srv-1",
    category: "Services",
    question: "What core services does HyroVision offer?",
    answer:
      "We provide end-to-end Full-Stack Web Application Development, Custom SaaS & Enterprise Platforms, AI Integration & Autonomous Agent Workflows, Backend Architecture & Database Design, and Cloud Deployment & Technical SEO.",
  },
  {
    id: "srv-2",
    category: "Services",
    question: "Do you build custom software or customize off-the-shelf templates?",
    answer:
      "We build custom, production-grade software engineered specifically to your business workflows. We do not use bloated pre-built themes; every solution is tailored for performance, security, and scalability.",
  },
  {
    id: "srv-3",
    category: "Services",
    question: "Can HyroVision audit and upgrade an existing application?",
    answer:
      "Yes. We frequently conduct legacy codebase modernization, security audits, database query optimization, and UI/UX engineering for established platforms looking to scale.",
  },

  // ── Development ──
  {
    id: "dev-1",
    category: "Development",
    question: "What tech stack do you recommend for high-performance web apps?",
    answer:
      "We specialize in React.js and Next.js for high-speed frontends, coupled with Node.js, Express, or Python on the backend. For data persistence, we utilize PostgreSQL, MongoDB, Supabase, and Redis for caching.",
  },
  {
    id: "dev-2",
    category: "Development",
    question: "How do you ensure code quality and maintainability?",
    answer:
      "We follow strict clean architecture principles, modular component structures, automated linting, test-driven validation, and git-based code review workflows before deploying to production.",
  },
  {
    id: "dev-3",
    category: "Development",
    question: "Who owns the intellectual property and code produced during the project?",
    answer:
      "Upon full milestone settlement, all custom source code, documentation, and assets belong 100% to the client. We deliver complete repository access and deployment documentation.",
  },

  // ── AI & Automation ──
  {
    id: "ai-1",
    category: "AI & Automation",
    question: "How does HyroVision build grounded AI systems without hallucinations?",
    answer:
      "We engineer Retrieval-Augmented Generation (RAG) pipelines backed by vector databases (such as ChromaDB or pgvector). The AI answers queries strictly based on your organization's verified documentation, complete with source citations.",
  },
  {
    id: "ai-2",
    category: "AI & Automation",
    question: "What is your multi-provider LLM fallback architecture?",
    answer:
      "To prevent downtime from API outages or rate limits, we implement intelligent LLM routers. Primary requests are handled by fast models (like Google Gemini 1.5 Flash), and if an error occurs, requests seamlessly fall back to secondary providers (like Groq open-source Llama models) with zero context loss.",
  },
  {
    id: "ai-3",
    category: "AI & Automation",
    question: "Can you automate internal business workflows using n8n or LangGraph?",
    answer:
      "Yes. We design autonomous agentic workflows that connect external APIs, CRM systems, webhooks, and communication channels (Slack, WhatsApp, Email) to execute routine business operations autonomously.",
  },

  // ── Projects ──
  {
    id: "prj-1",
    category: "Projects",
    question: "What real-world projects has HyroVision engineered?",
    answer:
      "Our portfolio includes Happy Star Satellite Vision (commercial platform with Razorpay payments), Pakka Tourism (curated booking experience), Advanced CRM/HRMS (enterprise workforce platform), and BSmartGlass / AuraVision 2.0 (AI + IoT wearable system).",
  },
  {
    id: "prj-2",
    category: "Projects",
    question: "How long does an average custom project take from start to launch?",
    answer:
      "Timelines depend on complexity: MVP web applications typically take 3 to 6 weeks, while comprehensive enterprise SaaS or multi-agent AI ecosystems span 8 to 14 weeks across structured milestones.",
  },

  // ── Pricing & Engagement ──
  {
    id: "prc-1",
    category: "Pricing & Engagement",
    question: "What engagement models does HyroVision offer?",
    answer:
      "We offer milestone-based fixed-scope projects for clearly defined deliverables, and dedicated engineering retainers for ongoing development, architecture, and feature scaling.",
  },
  {
    id: "prc-2",
    category: "Pricing & Engagement",
    question: "How are project payments structured?",
    answer:
      "Milestone-based projects typically operate on an initial kickoff deposit followed by progressive payments tied to verifiable milestone deliverables (e.g. Design/Prototype, Beta Release, Production Deployment).",
  },

  // ── Support ──
  {
    id: "sup-1",
    category: "Support",
    question: "Do you provide post-launch maintenance and support?",
    answer:
      "Yes. Every completed deployment includes an initial 30-day warranty period for bug fixes and stability monitoring. We also provide ongoing monthly maintenance contracts covering security patches, uptime monitoring, and feature updates.",
  },
  {
    id: "sup-2",
    category: "Support",
    question: "How quickly do you respond to urgent technical issues?",
    answer:
      "For clients on active support retainers, critical severity issues are acknowledged within 1 to 2 hours, with prioritized resolution pipelines.",
  },
];
