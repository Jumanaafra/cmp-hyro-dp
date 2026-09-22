/**
 * HYROVISION — Careers & Talent Data
 * Structured source for /careers and /careers/:slug
 */

export const careerCulture = [
  {
    number: "01",
    title: "Engineering Excellence",
    description:
      "We value clean architecture, maintainable abstractions, and systems built to endure. Code is crafted with pride, not just slapped together.",
  },
  {
    number: "02",
    title: "Autonomous Ownership",
    description:
      "Engineers at Hyro Vision have direct ownership over what they build. We prize outcome-driven judgment over micromanagement.",
  },
  {
    number: "03",
    title: "Continuous Innovation",
    description:
      "We actively experiment with emerging AI primitives, agent frameworks, and reactive UI standards. Learning is embedded into our sprint rhythms.",
  },
  {
    number: "04",
    title: "Pragmatic Problem Solving",
    description:
      "We choose the right tool for the business problem. Whether that is Next.js, LangGraph, Python, or PostgreSQL, efficacy always triumphs over hype.",
  },
];

export const workEnvironment = [
  {
    title: "Remote-First Flexibility",
    description: "Work from anywhere in the world. We emphasize async documentation and deep work blocks over endless meetings.",
  },
  {
    title: "Modern Engineering Stack",
    description: "Hands-on exposure to production LLM architectures (Gemini, Groq), vector stores, WebSockets, WebRTC, and reactive cloud runtimes.",
  },
  {
    title: "High-Impact Product Exposure",
    description: "Build digital platforms and enterprise tools directly used by real companies and active commercial users.",
  },
  {
    title: "Equipment & Tooling Budget",
    description: "Full access to best-in-class developer tooling, cloud sandbox environments, and AI model quotas.",
  },
];

export const jobOpenings = [
  {
    id: "full-stack-engineer",
    slug: "full-stack-engineer",
    title: "Full-Stack Software Engineer (React / Node.js)",
    department: "Engineering",
    location: "Remote Worldwide",
    type: "Full-Time / Contract",
    experience: "2–4 Years",
    overview:
      "We are seeking a sharp Full-Stack Engineer passionate about crafting high-performance web applications, responsive interfaces, and scalable backend REST/GraphQL services.",
    skills: ["React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    responsibilities: [
      "Develop responsive, accessible, and high-speed web frontends using React and Next.js.",
      "Architect and implement secure Node.js backend services and relational database schemas.",
      "Integrate third-party payment gateways, authentication providers, and cloud services.",
      "Optimize Core Web Vitals, application load times, and cross-browser rendering.",
      "Collaborate asynchronously on architectural roadmaps, code reviews, and system documentation.",
    ],
    requirements: [
      "2+ years of professional full-stack development experience with React and Node.js.",
      "Strong understanding of JavaScript/TypeScript, async programming, and state management.",
      "Demonstrated experience designing relational or document databases (PostgreSQL, MongoDB, Supabase).",
      "Familiarity with Git branching workflows and automated deployment pipelines.",
      "Excellent written English communication skills for async technical discussions.",
    ],
    niceToHave: [
      "Experience with Python or FastAPI backend microservices.",
      "Familiarity with cloud hosting on Vercel, Render, or AWS.",
      "Prior exposure to LangChain, vector databases, or LLM integrations.",
    ],
  },
  {
    id: "ai-rag-engineer",
    slug: "ai-rag-engineer",
    title: "AI Systems & RAG Engineer (Python / LangGraph)",
    department: "Artificial Intelligence",
    location: "Remote Worldwide",
    type: "Full-Time / Contract",
    experience: "2–5 Years",
    overview:
      "Join our AI engineering team to design grounded Retrieval-Augmented Generation (RAG) pipelines, multi-agent workflows, and resilient multi-provider LLM routing infrastructures.",
    skills: ["Python", "FastAPI", "LangChain", "LangGraph", "ChromaDB", "Gemini API", "OpenAI API", "Vector Embeddings"],
    responsibilities: [
      "Architect and scale RAG retrieval pipelines using embedding models and vector databases.",
      "Design autonomous agent workflows, tool-calling mechanisms, and human-in-the-loop validation.",
      "Build fallback routers and latency-monitoring harnesses for multi-model inference (Gemini, Groq, OpenAI).",
      "Benchmark retrieval accuracy, chunking strategies, and hallucination containment.",
      "Package AI services as clean, containerized FastAPI endpoints ready for web integration.",
    ],
    requirements: [
      "Proven track record building production-grade LLM applications using Python.",
      "Deep understanding of text chunking, dense vector retrieval, and reranking concepts.",
      "Proficiency with FastAPI, async Python, Pydantic, and modern Python package management.",
      "Hands-on experience orchestrating agents or stateful chains (LangGraph, LangChain, or custom).",
      "Analytical mindset with a focus on benchmarking, token efficiency, and reliability.",
    ],
    niceToHave: [
      "Experience deploying models or RAG services on Docker, Render, or GCP.",
      "Familiarity with n8n or Make.com automation orchestration.",
      "Contributions to open-source AI or developer tools.",
    ],
  },
  {
    id: "frontend-ui-engineer",
    slug: "frontend-ui-engineer",
    title: "Frontend UI/UX Engineer (React / Next.js / Design Systems)",
    department: "Design & Frontend",
    location: "Remote Worldwide",
    type: "Full-Time / Contract",
    experience: "2–4 Years",
    overview:
      "We are looking for a detail-oriented Frontend Engineer who obsesses over visual polish, micro-animations, accessible design systems, and silky-smooth 60fps web experiences.",
    skills: ["React.js", "Next.js", "CSS3 / Vanilla CSS", "Tailwind CSS", "Framer Motion", "GSAP", "Responsive Design"],
    responsibilities: [
      "Translate Figma/design specifications into pixel-perfect, responsive React components.",
      "Implement smooth micro-animations, scroll-driven effects, and dynamic theme switching.",
      "Maintain our shared design token architecture and accessible component library.",
      "Ensure web accessibility (WCAG AA) and cross-device testing across desktop, tablet, and mobile.",
      "Profile and optimize rendering performance to prevent layout shifts and jank.",
    ],
    requirements: [
      "2+ years of dedicated frontend engineering experience with React.",
      "Exceptional mastery of CSS, modern flexbox/grid layouts, and responsive media queries.",
      "Portfolio or live links demonstrating eye for aesthetic excellence and motion design.",
      "Solid grasp of component lifecycle, hook memoization, and bundle optimization.",
      "Passion for clean code, semantic HTML, and intuitive user experiences.",
    ],
    niceToHave: [
      "Experience with Canvas 2D or Three.js/WebGL interactive experiences.",
      "Familiarity with Next.js App Router and server-side rendering.",
    ],
  },
];
