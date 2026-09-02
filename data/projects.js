/**
 * HYROVISION — Centralized Projects Data
 * SOURCE OF TRUTH for all project/portfolio information.
 * Used by AI chatbot and project-related components.
 *
 * All data verified from spec.md Section 14.
 * DO NOT add unsupported results, statistics, or fabricated descriptions.
 */

export const projects = [
  {
    id: "happy-star",
    title: "Happy Star Satellite Vision",
    slug: "happy-star-satellite-vision",
    category: "Commercial / Business Management Platform",
    description:
      "A comprehensive commercial business management platform with integrated payment processing, designed for operational efficiency and scale.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Razorpay", "Netlify"],
    liveUrl: "https://happystarsatellitevision.netlify.app/",
    featured: true,
  },
  {
    id: "pakka-tourism",
    title: "Pakka Tourism",
    slug: "pakka-tourism",
    category: "Tourism Platform",
    description:
      "A modern tourism platform providing curated travel experiences, booking management, and destination discovery.",
    technologies: ["Next.js", "Firebase"],
    liveUrl: "https://pakkatourism.com",
    featured: true,
  },
  {
    id: "advanced-crm-hrms",
    title: "Advanced CRM / HRMS",
    slug: "advanced-crm-hrms",
    category: "Enterprise Platform",
    description:
      "A full-featured enterprise CRM and HRMS platform for managing customer relationships, workforce operations, and business data.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "",
    featured: true,
  },
  {
    id: "bsmartglass-auravision",
    title: "BSmartGlass / AuraVision 2.0",
    slug: "bsmartglass-auravision",
    category: "AI + IoT",
    description:
      "An AI-powered IoT smart glasses system with real-time video streaming, location services, AI assistance, and automation — connecting wearable hardware with intelligent cloud services.",
    technologies: [
      "MERN",
      "WebRTC",
      "WebSockets",
      "Google Maps API",
      "OpenAI API",
      "n8n",
      "Bluetooth/WiFi",
      "Raspberry Pi Zero 2 W",
    ],
    liveUrl: "https://b-smart-glass-aura-vision.vercel.app/",
    featured: true,
  },
  {
    id: "ai-learning-path",
    title: "AI-Powered Learning Path Generator",
    slug: "ai-learning-path-generator",
    category: "AI Agent / Autonomous Workflow",
    description:
      "An autonomous AI agent that generates personalized learning paths by integrating multiple APIs and knowledge sources — built with agentic AI architecture.",
    technologies: [
      "Python",
      "LangGraph",
      "Streamlit",
      "MCP",
      "Gemini",
      "YouTube API",
      "Google Drive API",
      "Notion API",
    ],
    liveUrl: "",
    featured: false,
  },
  {
    id: "alumni-connect",
    title: "Alumni Connect Platform",
    slug: "alumni-connect-platform",
    category: "Full-Stack Networking Platform",
    description:
      "A professional alumni networking platform enabling graduates to connect, collaborate, and share opportunities within their institution community.",
    technologies: ["MERN", "AWS", "MongoDB", "Mongoose"],
    liveUrl: "https://alumni-connection-frontend.vercel.app/",
    featured: false,
  },
  {
    id: "jojo-resort",
    title: "Jojo Resort",
    slug: "jojo-resort",
    category: "Commercial Web Application",
    description:
      "A premium commercial web application for a resort business, featuring booking management, gallery, and guest experience features.",
    technologies: ["Next.js", "React"],
    liveUrl: "",
    featured: false,
  },
  {
    id: "3d-ai-portfolio",
    title: "Personal 3D AI Portfolio",
    slug: "personal-3d-ai-portfolio",
    category: "AI + Interactive Web Experience",
    description:
      "An interactive 3D portfolio website with AI-powered features, canvas animations, and premium visual effects — showcasing creative technology capabilities.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "HTML5 Canvas",
      "Gemini",
      "OpenAI",
      "GA4",
    ],
    liveUrl: "",
    featured: false,
  },
];
