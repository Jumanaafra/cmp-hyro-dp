/**
 * HYROVISION — Centralized Services Data
 * SOURCE OF TRUTH for all service information.
 * Used by AI chatbot, service overview, and service detail pages.
 *
 * All data verified from spec.md Sections 11 and 9.4.
 * DO NOT add unverified capabilities or fabricated metrics.
 */

export const services = [
  {
    id: "fullstack-web",
    slug: "fullstack-web",
    number: "01",
    title: "Full-Stack Web Application Development",
    shortTitle: "Full-Stack Web Apps",
    category: "Web & Mobile Engineering",
    description:
      "End-to-end web application development — from responsive frontends to scalable backend architectures. We build performant, production-ready applications using modern frameworks and best practices.",
    detailedDescription:
      "At Hyro Vision, we engineer high-performance web applications tailored to solve tangible business bottlenecks. By leveraging reactive component architectures, type-safe API boundaries, and elastic serverless or containerized backends, our applications deliver lightning-fast load times, seamless user journeys, and robust enterprise scalability.",
    capabilities: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "REST APIs",
      "Responsive UI",
      "State Management",
      "SSR / SSG Optimization",
    ],
    technologies: ["React.js", "Next.js", "Node.js", "Express.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    process: [
      { step: "01", title: "Architecture & Wireframing", desc: "Define component hierarchy, state flow, and data contracts." },
      { step: "02", title: "Frontend Engineering", desc: "Build responsive, accessible UI modules using React/Next.js." },
      { step: "03", title: "API & Backend Integration", desc: "Implement secure REST/GraphQL endpoints with rigorous input validation." },
      { step: "04", title: "Performance & Security QA", desc: "Audit Core Web Vitals, cross-browser compatibility, and vulnerability scanning." },
      { step: "05", title: "Production Deployment", desc: "Deploy to high-availability CDN infrastructure with continuous integration." },
    ],
    deliverables: [
      "Production-ready, fully responsive web application",
      "Clean, modular, and maintainable source code repository",
      "Comprehensive API documentation and schema models",
      "Automated build and continuous deployment pipeline",
      "Cross-browser and mobile responsive test verification",
    ],
    faqs: [
      {
        q: "What frameworks do you specialize in for web applications?",
        a: "We primarily build with modern React.js, Next.js, Node.js, and Express, accompanied by Tailwind CSS or Vanilla CSS for pristine design execution.",
      },
      {
        q: "Do you handle both frontend and backend development?",
        a: "Yes. We provide complete full-stack engineering, including database design, secure RESTful APIs, session management, and responsive frontend interfaces.",
      },
      {
        q: "How do you ensure application performance?",
        a: "We optimize Core Web Vitals through code-splitting, asset compression, server-side caching, efficient database indexing, and CDN-edge distribution.",
      },
    ],
    useCases: [
      "Business web applications",
      "Customer portals",
      "Interactive platforms",
      "Data-driven dashboards",
    ],
    color: "#14B8A6",
  },
  {
    id: "saas-enterprise",
    slug: "saas-enterprise",
    number: "02",
    title: "Custom SaaS & Enterprise Dashboards",
    shortTitle: "SaaS & Enterprise Systems",
    category: "Enterprise Platforms",
    description:
      "Custom-built SaaS platforms and enterprise dashboard systems designed to streamline operations, manage data, and scale with your business.",
    detailedDescription:
      "We design and build multi-tenant SaaS architectures and mission-critical enterprise platforms that centralize fragmented operational workflows. From granular role-based access control (RBAC) to complex administrative reporting and real-time activity streaming, our enterprise solutions give operators full visibility and control.",
    capabilities: [
      "CRM",
      "HRMS",
      "Business dashboards",
      "Management systems",
      "Admin systems",
      "Data systems",
      "Role-Based Access Control",
      "Real-Time Analytics",
    ],
    technologies: ["React.js", "Node.js", "MongoDB", "PostgreSQL", "Supabase", "Express.js", "Redis"],
    process: [
      { step: "01", title: "Workflow Audit", desc: "Map enterprise business logic, user roles, and reporting hierarchies." },
      { step: "02", title: "Database & Schema Modeling", desc: "Architect relational or document database structures for relational integrity." },
      { step: "03", title: "Dashboard & Admin UI", desc: "Develop modular data tables, dynamic charts, and filtering interfaces." },
      { step: "04", title: "Auth & Security Hardening", desc: "Implement JWT/OAuth2 authentication, session encryption, and audit logs." },
      { step: "05", title: "Staging & Production Rollout", desc: "Conduct stress-testing, database migration scripts, and team onboarding." },
    ],
    deliverables: [
      "Multi-tenant SaaS dashboard or enterprise web system",
      "Role-based authentication & authorization module",
      "Real-time analytics and customizable reporting views",
      "Automated database backup and migration configurations",
      "System administrator guide and operational documentation",
    ],
    faqs: [
      {
        q: "Can you build multi-tenant SaaS platforms with custom subscription tiers?",
        a: "Yes, we architect scalable multi-tenant databases with data isolation, tenant management, and integrated subscription/billing gateways.",
      },
      {
        q: "How is enterprise data secured?",
        a: "We adhere to industry security standards including encrypted data-at-rest and in-transit, parameterized queries against injection, and strict RBAC authorization.",
      },
      {
        q: "Can the dashboard integrate with our existing ERP or third-party tools?",
        a: "Absolutely. We engineer bi-directional webhooks and custom API connectors to synchronize with your current databases and enterprise software.",
      },
    ],
    useCases: [
      "Internal operations management",
      "Customer relationship management",
      "HR and workforce management",
      "Business analytics and reporting",
    ],
    color: "#3B82F6",
  },
  {
    id: "ai-integration",
    slug: "ai-integration",
    number: "03",
    title: "AI Integration & Autonomous Workflows",
    shortTitle: "AI & Autonomous Agents",
    category: "Artificial Intelligence",
    description:
      "AI-powered applications, intelligent assistants, autonomous agents, and workflow automation systems that bring intelligence into your business processes.",
    detailedDescription:
      "Hyro Vision engineers practical, grounded generative AI systems and autonomous agent workflows. Moving far beyond generic chatbots, we implement Retrieval-Augmented Generation (RAG) anchored to proprietary corporate data, multi-agent orchestration pipelines (LangGraph, n8n), and smart tool-calling interfaces that automate complex knowledge tasks.",
    capabilities: [
      "AI Applications",
      "AI Assistants",
      "AI Agents",
      "OpenAI",
      "Gemini",
      "LangGraph",
      "MCP",
      "n8n",
      "Make.com",
      "RAG Pipelines",
      "Vector Embeddings",
    ],
    technologies: ["Python", "Gemini", "OpenAI", "LangGraph", "LangChain", "ChromaDB", "n8n", "Make.com"],
    process: [
      { step: "01", title: "Use-Case Feasibility", desc: "Identify high-leverage workflows and evaluate model selection (Gemini vs. Groq/OpenAI)." },
      { step: "02", title: "Knowledge Ingestion & Vectorization", desc: "Extract, chunk, and embed organizational documentation into vector storage." },
      { step: "03", title: "Agent Logic & Guardrails", desc: "Program routing graphs, tool-calling definitions, and strict hallucination safeguards." },
      { step: "04", title: "Multi-Provider Fallback", desc: "Configure primary-to-secondary LLM fallback routers to guarantee 99.9% availability." },
      { step: "05", title: "Integration & Monitoring", desc: "Embed conversational or headless agent APIs into web products with telemetry." },
    ],
    deliverables: [
      "Custom conversational AI assistant or autonomous workflow agent",
      "Production-ready RAG vector database and document ingestion scripts",
      "Multi-provider LLM router ensuring high uptime and cost optimization",
      "Workflow automation webhooks and API orchestration connections",
      "Evaluation datasets and prompt engineering test harnesses",
    ],
    faqs: [
      {
        q: "How do you prevent AI hallucinations?",
        a: "We implement grounded Retrieval-Augmented Generation (RAG) with vector databases, strict system prompts, and citations that ground model responses exclusively in verified company documents.",
      },
      {
        q: "What happens if an AI provider experiences an outage?",
        a: "We build automatic multi-provider fallback routers (e.g., Google Gemini primary routing to Groq open-source models) so your system never experiences downtime.",
      },
      {
        q: "Can AI agents take real actions like updating our database or sending emails?",
        a: "Yes. Using function calling and agentic tools (via LangGraph or n8n), agents can safely perform verified actions with human-in-the-loop validation.",
      },
    ],
    useCases: [
      "AI-powered products",
      "Intelligent assistants and chatbots",
      "Autonomous workflow automation",
      "Knowledge work automation",
    ],
    color: "#8B5CF6",
  },
  {
    id: "backend-database",
    slug: "backend-database",
    number: "04",
    title: "Backend Architecture & Database Design",
    shortTitle: "Backend & Databases",
    category: "Cloud Infrastructure",
    description:
      "Robust backend systems and database architectures designed for performance, security, and scalability. From API design to authentication and data modeling.",
    detailedDescription:
      "A resilient application requires an unshakeable foundation. We architect fault-tolerant backend services, high-throughput microservices, and optimized database schemas. Whether structuring ACID-compliant relational schemas in PostgreSQL or elastic document stores in MongoDB and Supabase, we ensure zero bottlenecks under heavy concurrent load.",
    capabilities: [
      "Node.js",
      "Express",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "API architecture",
      "Authentication",
      "Data Modeling",
      "Caching (Redis)",
    ],
    technologies: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Supabase", "SQLite", "Firebase"],
    process: [
      { step: "01", title: "Domain Modeling", desc: "Draft entity relationship diagrams (ERD) and transaction throughput requirements." },
      { step: "02", title: "Database Provisioning", desc: "Configure managed database clusters, connection pooling, and replication." },
      { step: "03", title: "API Engineering", desc: "Build REST/WebSocket endpoints with strict schema validation and rate limiting." },
      { step: "04", title: "Caching & Indexing", desc: "Implement query indexing, Redis caching, and background job queueing." },
      { step: "05", title: "Load & Security Auditing", desc: "Verify authentication token lifecycles and simulate concurrent traffic spikes." },
    ],
    deliverables: [
      "Production-grade backend service codebase with documented API endpoints",
      "Normalized, indexed database schemas with migration history",
      "Secure authentication module (JWT, OAuth, API key validation)",
      "Connection pooling and database health check monitoring",
      "Database backup scripts and security firewall rules",
    ],
    faqs: [
      {
        q: "PostgreSQL or MongoDB — which database should we use?",
        a: "We evaluate your data domain: highly relational, transaction-critical data fits PostgreSQL, while flexible documents, rapid prototyping, and dynamic catalogs excel on MongoDB or Supabase.",
      },
      {
        q: "How do you handle API security and rate limiting?",
        a: "We implement token-bucket rate limiters, strict CORS policies, cryptographic JWT validation, helmet headers, and database parameterization.",
      },
      {
        q: "Can you optimize slow database queries in an existing application?",
        a: "Yes, we run query execution plan audits (EXPLAIN ANALYZE), introduce missing composite indexes, and set up Redis caching layers to drastically reduce latency.",
      },
    ],
    useCases: [
      "API development",
      "Database architecture",
      "Authentication systems",
      "Microservices design",
    ],
    color: "#10B981",
  },
  {
    id: "cloud-seo",
    slug: "cloud-seo",
    number: "05",
    title: "Cloud Deployment & Technical SEO",
    shortTitle: "Cloud & Technical SEO",
    category: "Deployment & Optimization",
    description:
      "Production-grade cloud deployment, infrastructure management, and technical SEO optimization to ensure your applications perform and rank.",
    detailedDescription:
      "Building exceptional software is only half the journey; deploying it reliably and ensuring maximum organic discoverability completes the picture. We configure automated CI/CD deployment pipelines on Vercel, Netlify, Render, and AWS, combined with technical SEO architecture (canonical routing, XML sitemaps, JSON-LD Schema.org structured data, and OpenGraph social previews).",
    capabilities: [
      "AWS",
      "Vercel",
      "Netlify",
      "Render",
      "Firebase",
      "SEO",
      "Sitemap",
      "robots.txt",
      "OpenGraph",
      "Analytics",
      "Schema.org JSON-LD",
    ],
    technologies: ["Vercel", "Netlify", "AWS", "Render", "Firebase", "HTML5", "JSON-LD"],
    process: [
      { step: "01", title: "Infrastructure Blueprint", desc: "Select optimal hosting (Vercel edge for frontend, container/VPS for backend)." },
      { step: "02", title: "CI/CD Setup", desc: "Automate build, lint, test, and preview deployment pipelines upon git push." },
      { step: "03", title: "Domain & SSL Configuration", desc: "Configure DNS records, automated SSL certificates, and apex domain redirects." },
      { step: "04", title: "Technical SEO Audit", desc: "Embed dynamic meta tags, canonical links, robots.txt, sitemaps, and Schema.org." },
      { step: "05", title: "Observability & Speed Tuning", desc: "Setup uptime alerts, error logging, and edge caching policies." },
    ],
    deliverables: [
      "Automated CI/CD deployment pipeline with preview branches",
      "Production SSL/DNS setup on custom corporate domain",
      "Automated XML sitemap (`/sitemap.xml`) and crawl policy (`/robots.txt`)",
      "Rich Schema.org JSON-LD structured data on all public views",
      "Google Analytics 4 / Search Console integration readiness",
    ],
    faqs: [
      {
        q: "What cloud platforms do you recommend for modern web apps?",
        a: "We heavily utilize Vercel and Netlify for high-speed frontend and serverless edge delivery, alongside AWS or Render for compute-heavy backend services.",
      },
      {
        q: "What does technical SEO include?",
        a: "It includes crawlability (robots.txt, sitemap.xml), indexability (canonical URLs), rich snippet markup (Schema.org JSON-LD), mobile responsiveness, and Core Web Vitals performance.",
      },
      {
        q: "Do you configure custom domains and SSL certificates?",
        a: "Yes, we handle complete DNS records (A, CNAME, TXT), automated renewal SSL/TLS certificates, and force HTTPS redirects.",
      },
    ],
    useCases: [
      "Cloud hosting and deployment",
      "CI/CD pipelines",
      "SEO optimization",
      "Performance monitoring",
    ],
    color: "#06B6D4",
  },
];
