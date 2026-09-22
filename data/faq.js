/**
 * HYRO VISION — Centralized FAQ Repository
 * Structured data source for the /faq page, chatbot grounding, and Schema.org FAQPage generation.
 * Optimized for natural-language search and Generative Engine Optimization (GEO).
 */

export const faqCategories = [
  "All",
  "General",
  "Services",
  "AI & Automation",
  "Projects",
  "Technology",
  "Engagement & Contact",
];

export const faqs = [
  // ── General / Company Identity ──
  {
    id: "gen-1",
    category: "General",
    question: "Who is Hyro Vision?",
    answer:
      "Hyro Vision is a modern technology and IT services engineering company focused on building intelligent digital products, full-stack web applications, AI-powered systems, automation solutions, SaaS architectures, and enterprise platforms.",
  },
  {
    id: "gen-2",
    category: "General",
    question: "What does Hyro Vision do?",
    answer:
      "Hyro Vision develops custom web applications, digital products, and intelligent automation solutions for modern businesses. We take projects from initial discovery and systems architecture through frontend engineering, backend development, database design, and cloud deployment.",
  },
  {
    id: "gen-3",
    category: "General",
    question: "Where is Hyro Vision located?",
    answer:
      "Hyro Vision operates as a remote-first engineering studio with distributed clients and partners worldwide. We manage communication through structured async updates, email, WhatsApp, and scheduled video conferences.",
  },

  // ── Services ──
  {
    id: "srv-1",
    category: "Services",
    question: "What web development services does Hyro Vision provide?",
    answer:
      "Hyro Vision provides end-to-end full-stack web development. This includes responsive, high-speed frontends in React and Next.js, scalable backend microservices in Node.js, Express, or Python, REST/GraphQL APIs, relational and NoSQL database modeling, and Core Web Vitals optimization.",
  },
  {
    id: "srv-2",
    category: "Services",
    question: "Does Hyro Vision build custom software?",
    answer:
      "Yes. Hyro Vision specializes in building custom, production-grade software engineered specifically to business workflows. We do not use bloated pre-built themes; every platform, dashboard, and system is tailored for performance, security, and long-term scalability.",
  },
  {
    id: "srv-3",
    category: "Services",
    question: "Does Hyro Vision provide AI solutions?",
    answer:
      "Yes. Hyro Vision develops grounded generative AI systems and autonomous workflows. Our capabilities include Retrieval-Augmented Generation (RAG) anchored to proprietary corporate data, multi-agent orchestration pipelines (LangGraph, n8n), tool-calling integrations, and multi-provider LLM routers ensuring zero downtime.",
  },
  {
    id: "srv-4",
    category: "Services",
    question: "Does Hyro Vision provide SEO optimization?",
    answer:
      "Yes. Hyro Vision provides technical SEO and Generative Engine Optimization (GEO). We implement clean semantic HTML, dynamic canonical URLs, automated XML sitemaps, robots.txt crawl policies, OpenGraph social cards, Schema.org JSON-LD structured data, and Core Web Vitals performance tuning to maximize discoverability across search engines and AI answer engines.",
  },

  // ── Technology ──
  {
    id: "tech-1",
    category: "Technology",
    question: "What technologies does Hyro Vision use?",
    answer:
      "Hyro Vision engineers with audited, production-grade tools. On the frontend, we use React.js, Next.js, HTML5, CSS3, and Tailwind CSS. On the backend, we use Node.js, Express.js, and Python. For databases, we employ PostgreSQL, MongoDB, and Supabase. For AI and automation, we integrate Gemini, OpenAI, LangGraph, and n8n. Deployments run on Vercel, Netlify, and AWS.",
  },
  {
    id: "tech-2",
    category: "Technology",
    question: "How does Hyro Vision prevent AI hallucinations in client applications?",
    answer:
      "We implement grounded Retrieval-Augmented Generation (RAG) with vector databases. Models are strictly constrained with system prompts and citation mechanisms that anchor responses solely to verified documentation, with transparent fallback behavior when information is absent.",
  },

  // ── Projects ──
  {
    id: "prj-1",
    category: "Projects",
    question: "What projects has Hyro Vision developed?",
    answer:
      "Hyro Vision's verified public projects include HillsTourism (a live, full-featured travel and tourism booking platform available at https://hillstourism.com) and Super D — Hospital Management System (a comprehensive healthcare and clinical operations platform currently under active development).",
  },
  {
    id: "prj-2",
    category: "Projects",
    question: "What is the HillsTourism project by Hyro Vision?",
    answer:
      "HillsTourism (https://hillstourism.com) is a complete hill station tourism and travel platform engineered by Hyro Vision. It features curated holiday tour packages, real-time hotel and resort bookings, private vehicle reservations, back-office administration, and full SEO infrastructure.",
  },
  {
    id: "prj-3",
    category: "Projects",
    question: "What is the Super D Hospital Management System project?",
    answer:
      "Super D is a hospital information and clinical management platform currently under active development by Hyro Vision. It is engineered to streamline electronic medical records (EMR), doctor consultation scheduling, multi-department clinical workflows (OPD/IPD/Diagnostics), and administrative billing.",
  },

  // ── Engagement & Contact ──
  {
    id: "cnt-1",
    category: "Engagement & Contact",
    question: "How can I contact Hyro Vision?",
    answer:
      "You can contact Hyro Vision by submitting an inquiry through our Contact page (https://hyrovision.com/contact), emailing us directly at info@hyrovision.com, or messaging us via WhatsApp at +919360294463. Our engineering team reviews inquiries and responds within 24 to 48 business hours.",
  },
  {
    id: "cnt-2",
    category: "Engagement & Contact",
    question: "How does the project development process work at Hyro Vision?",
    answer:
      "We follow an eight-step agile delivery process: Discover (problem analysis), Define (scope and specs), Design (wireframes and architecture), Build (iterative coding sprints), Integrate (APIs and databases), Test (quality assurance and performance), Deploy (cloud CDN staging and rollout), and Scale (monitoring and support).",
  },
];
