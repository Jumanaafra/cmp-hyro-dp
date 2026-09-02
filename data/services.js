/**
 * HYROVISION — Centralized Services Data
 * SOURCE OF TRUTH for all service information.
 * Used by AI chatbot and service-related components.
 *
 * All data verified from spec.md Sections 11 and 9.4.
 * DO NOT add unverified capabilities or technologies.
 */

export const services = [
  {
    id: "fullstack-web",
    number: "01",
    title: "Full-Stack Web Application Development",
    description:
      "End-to-end web application development — from responsive frontends to scalable backend architectures. We build performant, production-ready applications using modern frameworks and best practices.",
    capabilities: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "REST APIs",
      "Responsive UI",
    ],
    useCases: [
      "Business web applications",
      "Customer portals",
      "Interactive platforms",
      "Data-driven dashboards",
    ],
  },
  {
    id: "saas-enterprise",
    number: "02",
    title: "Custom SaaS & Enterprise Dashboards",
    description:
      "Custom-built SaaS platforms and enterprise dashboard systems designed to streamline operations, manage data, and scale with your business.",
    capabilities: [
      "CRM",
      "HRMS",
      "Business dashboards",
      "Management systems",
      "Admin systems",
      "Data systems",
    ],
    useCases: [
      "Internal operations management",
      "Customer relationship management",
      "HR and workforce management",
      "Business analytics and reporting",
    ],
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration & Autonomous Workflows",
    description:
      "AI-powered applications, intelligent assistants, autonomous agents, and workflow automation systems that bring intelligence into your business processes.",
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
    ],
    useCases: [
      "AI-powered products",
      "Intelligent assistants and chatbots",
      "Autonomous workflow automation",
      "Knowledge work automation",
    ],
  },
  {
    id: "backend-database",
    number: "04",
    title: "Backend Architecture & Database Design",
    description:
      "Robust backend systems and database architectures designed for performance, security, and scalability. From API design to authentication and data modeling.",
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
    ],
    useCases: [
      "API development",
      "Database architecture",
      "Authentication systems",
      "Microservices design",
    ],
  },
  {
    id: "cloud-seo",
    number: "05",
    title: "Cloud Deployment & Technical SEO",
    description:
      "Production-grade cloud deployment, infrastructure management, and technical SEO optimization to ensure your applications perform and rank.",
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
    ],
    useCases: [
      "Cloud hosting and deployment",
      "CI/CD pipelines",
      "SEO optimization",
      "Performance monitoring",
    ],
  },
];
