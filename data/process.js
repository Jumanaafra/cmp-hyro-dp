/**
 * HYROVISION — Centralized Engineering Process Data
 * SOURCE OF TRUTH for process steps (spec.md Section 9.8, 17, 22)
 */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the core business problem, objectives, technical constraints, and user needs.",
    whatWeDo: "Deep-dive stakeholder sessions, requirement breakdown, and feasibility analysis.",
    clientProvides: "Business context, problem statement, and goals.",
    expectedOutput: "Defined project scope and technical roadmap.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Define",
    description: "Specify technical architecture, system workflows, integrations, and milestones.",
    whatWeDo: "System architecture design, data flow diagrams, and tech stack selection.",
    clientProvides: "Domain knowledge and workflow edge cases.",
    expectedOutput: "System specification and milestone plan.",
    icon: "📐",
  },
  {
    step: "03",
    title: "Design",
    description: "Craft clean, accessible, and intuitive UI/UX with high-impact visuals.",
    whatWeDo: "Component hierarchy, interactive prototypes, and design tokens.",
    clientProvides: "Brand guidelines and aesthetic preferences.",
    expectedOutput: "Production-ready UI design and user flows.",
    icon: "✨",
  },
  {
    step: "04",
    title: "Build",
    description: "Engineer scalable frontend and backend codebases following clean architecture.",
    whatWeDo: "Full-stack development, database implementation, and API engineering.",
    clientProvides: "Periodic feedback and milestone reviews.",
    expectedOutput: "Working software modules with automated tests.",
    icon: "⚙️",
  },
  {
    step: "05",
    title: "Integrate",
    description: "Connect AI models, external APIs, payment gateways, and autonomous workflows.",
    whatWeDo: "API orchestration, LLM grounding/RAG, and automation pipelines.",
    clientProvides: "Third-party access and integration keys.",
    expectedOutput: "Fully interconnected software ecosystem.",
    icon: "🔌",
  },
  {
    step: "06",
    title: "Test",
    description: "Rigorous quality assurance across performance, responsiveness, security, and edge cases.",
    whatWeDo: "Cross-device testing, performance audits, and security validation.",
    clientProvides: "User acceptance feedback.",
    expectedOutput: "Polished, bug-free release candidate.",
    icon: "🛡️",
  },
  {
    step: "07",
    title: "Deploy",
    description: "Seamless cloud deployment with optimized caching, SSL, and technical SEO.",
    whatWeDo: "Production build, CI/CD pipeline setup, and DNS configuration.",
    clientProvides: "Domain and hosting authorizations.",
    expectedOutput: "Live, monitored production application.",
    icon: "🚀",
  },
  {
    step: "08",
    title: "Scale",
    description: "Continuous monitoring, performance tuning, and architectural evolution as traffic grows.",
    whatWeDo: "Telemetry analysis, optimization, and feature enhancements.",
    clientProvides: "Growth milestones and new business objectives.",
    expectedOutput: "Resilient platform scaling with business demand.",
    icon: "📈",
  },
];
