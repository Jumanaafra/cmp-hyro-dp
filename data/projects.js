/**
 * HYRO VISION — Centralized Projects & Case Studies Repository
 * SOURCE OF TRUTH for verified public projects, case studies, and engineering portfolio.
 *
 * Contains 10 verified systems engineered by Hyro Vision:
 * 1. HillsTourism (LIVE — https://hillstourism.com)
 * 2. Super D — Hospital Management System (ONGOING)
 * 3. Happy Star Satellite Vision (LIVE — https://happystarsatellitevision.netlify.app/)
 * 4. Pakka Tourism (LIVE — https://pakkatourism.com)
 * 5. Advanced CRM / HRMS (Completed)
 * 6. BSmartGlass / AuraVision 2.0 (Completed / Prototype Live — https://b-smart-glass-aura-vision.vercel.app/)
 * 7. AI-Powered Learning Path Generator (Completed)
 * 8. Alumni Connect Platform (Completed / Live — https://alumni-connection-frontend.vercel.app/)
 * 9. Jojo Resort (Completed)
 * 10. Personal 3D AI Portfolio (Completed)
 *
 * All case studies follow structured GEO & Schema.org guidelines.
 */

export const projects = [
  {
    id: "hillstourism",
    slug: "hillstourism",
    legacyId: "hills-tourism",
    title: "HillsTourism",
    industry: "Tourism / Travel Technology",
    category: "Tourism / Travel Technology",
    status: "LIVE",
    domain: "hillstourism.com",
    liveUrl: "https://hillstourism.com",
    officialUrl: "https://hillstourism.com",
    description:
      "A complete tourism platform featuring tailored hill station holiday packages, hotel & resort bookings, transport vehicle reservations, back-office administration, and full SEO infrastructure.",
    problem:
      "Travelers seeking hill station holidays previously faced fragmented booking experiences across separate accommodation portals, regional tour operators, and private vehicle rentals, leading to operational friction and elevated booking abandonment.",
    solution:
      "Hyro Vision engineered a unified, high-performance tourism web platform consolidating bespoke holiday packages, verified resort reservations, chauffeur vehicle scheduling, and administrative management into a single frictionless digital application.",
    features: [
      "Curated hill station tour packages with detailed day-by-day itineraries",
      "Real-time hotel & resort reservation workflow with instant booking confirmation",
      "Transport vehicle reservations and chauffeur scheduling engine",
      "Centralized administrative dashboard for bookings, inquiries, and customer management",
      "Comprehensive technical SEO infrastructure and high-speed page delivery",
      "Fully responsive, mobile-optimized interface with accessible navigation",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "SEO Infrastructure",
    ],
    developmentApproach:
      "Engineered using a modern component architecture with server-rendered and statically generated routes for lightning-fast Core Web Vitals and organic search crawler discoverability. Database schemas were normalized in PostgreSQL for relational integrity across package bookings, hotel rooms, and vehicle allocations.",
    outcome:
      "Successfully launched in live production at https://hillstourism.com. The platform provides travelers with reliable hill station holiday discovery and gives administrators streamlined operational control.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    color: "#0D9488",
    featured: true,
  },
  {
    id: "super-d-hospital-management-system",
    slug: "super-d-hospital-management-system",
    legacyId: "super-d-hospital-management",
    altId: "super-d-hospital",
    title: "Super D — Hospital Management System",
    industry: "Healthcare / Hospital Management",
    category: "Healthcare / Hospital Management",
    status: "ONGOING",
    domain: "",
    liveUrl: "",
    notice:
      "Project currently under development. Active engineering sprint in progress — no public demo link available.",
    description:
      "A comprehensive hospital management platform currently under active development, engineered for patient records (EMR), doctor scheduling, department workflows, clinical billing, and pharmacy operations.",
    problem:
      "Healthcare facilities frequently struggle with fragmented paper documentation, doctor scheduling conflicts, delayed patient intake, and disconnected department communication between outpatient, inpatient, and diagnostic divisions.",
    solution:
      "Hyro Vision is engineering an integrated, secure hospital management system that centralizes electronic medical records (EMR), doctor consultation appointments, department routing, and clinical billing into a cohesive digital workflow.",
    features: [
      "Electronic Medical Records (EMR) management with strict data access control",
      "Doctor consultation scheduling and interactive appointment calendar",
      "Multi-department clinical workflow routing (OPD, IPD, Diagnostics, Pharmacy)",
      "Patient registration, admission tracking, and discharge summary generation",
      "Role-Based Access Control (RBAC) for physicians, clinical staff, and billing personnel",
      "Integrated billing flows and clinical service requisition tracking",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Role-Based Access Control (RBAC)",
    ],
    developmentApproach:
      "Designed with a modular architecture prioritizing strict role-based access control (RBAC), end-to-end data validation, and resilient error recovery. Interfaces are crafted for high-stress clinical workflows with high readability and keyboard accessibility.",
    outcome:
      "Project currently under active engineering development. Clinical workflow testing, role permission auditing, and database stress testing are actively underway.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    color: "#2563EB",
    featured: true,
  },
  {
    id: "happy-star",
    slug: "happy-star-satellite-vision",
    legacyId: "happy-star",
    altId: "happy-star-satellite-vision",
    title: "Happy Star Satellite Vision",
    industry: "Commercial / Business Management",
    category: "Commercial / Business Management Platform",
    status: "LIVE",
    domain: "happystarsatellitevision.netlify.app",
    liveUrl: "https://happystarsatellitevision.netlify.app/",
    officialUrl: "https://happystarsatellitevision.netlify.app/",
    description:
      "A comprehensive commercial business management platform with integrated payment processing, customer subscription tracking, and inventory control designed for operational efficiency.",
    problem:
      "Managing satellite subscriber accounts, hardware distribution, recurring subscription renewals, and manual payment reconciliation through fragmented spreadsheets caused revenue leakage and administrative bottlenecks.",
    solution:
      "Hyro Vision engineered a scalable commercial operations hub combining automated payment processing via Razorpay, real-time subscriber management via Supabase PostgreSQL, and dynamic inventory dispatch tracking into a unified web portal.",
    features: [
      "Automated subscriber lifecycle management and recurring subscription renewals",
      "Secure Razorpay payment gateway integration with instant electronic invoices",
      "Real-time hardware inventory tracking and satellite equipment dispatch logging",
      "Granular role-based administrative management with immutable audit logs",
      "Serverless PostgreSQL database architecture with Supabase Row-Level Security (RLS)",
      "High-speed Jamstack frontend hosted on Netlify with sub-second page delivery",
    ],
    technologies: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Razorpay",
      "Netlify",
      "Tailwind CSS",
    ],
    developmentApproach:
      "Engineered using Next.js on Netlify with Supabase PostgreSQL providing real-time data synchronisation and robust row-level security (RLS) to ensure customer billing isolation and audit fidelity.",
    outcome:
      "Successfully deployed in live production, automating monthly customer billing cycles and payment confirmations, cutting manual processing times by over 80%.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    color: "#14B8A6",
    featured: true,
  },
  {
    id: "pakka-tourism",
    slug: "pakka-tourism",
    legacyId: "pakka-tourism",
    title: "Pakka Tourism",
    industry: "Tourism / Travel Technology",
    category: "Tourism Platform",
    status: "LIVE",
    domain: "pakkatourism.com",
    liveUrl: "https://pakkatourism.com",
    officialUrl: "https://pakkatourism.com",
    description:
      "A modern tourism platform providing curated travel experiences, booking management, regional guide matching, and interactive destination discovery.",
    problem:
      "Regional travelers lacked an authentic, verified discovery hub for regional holiday experiences with transparent pricing, instant booking confirmations, and direct operator communication.",
    solution:
      "Hyro Vision built a blazing-fast travel booking platform utilizing Next.js and Firebase real-time infrastructure, providing dynamic destination exploration and streamlined booking requests.",
    features: [
      "Interactive regional destination catalog with high-resolution visual guides",
      "Custom tour package reservation system with instant itinerary preview",
      "Firebase real-time inquiry and customer communications stream",
      "Dynamic package filter by duration, budget, and travel style",
      "Mobile-first responsive design optimized for travelers on the move",
      "Automated booking confirmation and email notification pipeline",
    ],
    technologies: [
      "Next.js",
      "Firebase",
      "React",
      "Tailwind CSS",
      "Cloud Firestore",
    ],
    developmentApproach:
      "Constructed with Next.js static site generation (SSG) for instant search indexing, combined with Firebase Firestore real-time listeners for live booking inquiries and package updates.",
    outcome:
      "Live in production at https://pakkatourism.com, connecting tourists with curated experiences across southern India with rapid booking turnaround.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    color: "#10B981",
    featured: true,
  },
  {
    id: "advanced-crm-hrms",
    slug: "advanced-crm-hrms",
    legacyId: "advanced-crm-hrms",
    title: "Advanced CRM / HRMS",
    industry: "Enterprise SaaS / HR Tech",
    category: "Enterprise Platform",
    status: "Completed",
    domain: "",
    liveUrl: "",
    notice:
      "Enterprise client proprietary system. Demonstrations and architectural deep-dives available upon NDA consultation.",
    description:
      "A full-featured enterprise CRM and HRMS platform for managing customer relationships, workforce operations, payroll calculations, and business performance metrics.",
    problem:
      "Enterprise teams operating across disjointed CRM tools and legacy spreadsheets struggled with inaccurate lead tracking, attendance reconciliation, and siloed employee performance records.",
    solution:
      "Hyro Vision engineered an all-in-one MERN-stack enterprise portal unifying lead pipeline tracking, employee lifecycle workflows, automated payroll calculation, and executive data visualisations.",
    features: [
      "End-to-end sales lead pipeline with stage progression analytics",
      "Comprehensive HRMS with employee profiles, attendance, and leave management",
      "Automated salary breakdown and payroll disbursement calculation",
      "Interactive business analytics charts powered by Chart.js",
      "Hierarchical role-based access control (Admin, HR, Manager, Staff)",
      "Audit logs and data export in Excel and PDF formats",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Chart.js",
      "JWT Auth",
    ],
    developmentApproach:
      "Architected around a RESTful Node/Express microservice backend backed by MongoDB indexing for rapid search. The React frontend features responsive dashboard modules and client-side caching for seamless navigation.",
    outcome:
      "Delivered to enterprise client specifications, replacing 3 disconnected software licenses with a single integrated system.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    color: "#8B5CF6",
    featured: true,
  },
  {
    id: "bsmartglass-auravision",
    slug: "bsmartglass-auravision",
    legacyId: "bsmartglass-auravision",
    title: "BSmartGlass / AuraVision 2.0",
    industry: "AI + IoT / Wearable Technology",
    category: "AI + IoT",
    status: "Completed / Prototype Live",
    domain: "b-smart-glass-aura-vision.vercel.app",
    liveUrl: "https://b-smart-glass-aura-vision.vercel.app/",
    officialUrl: "https://b-smart-glass-aura-vision.vercel.app/",
    description:
      "An AI-powered IoT smart glasses system with real-time video streaming, location services, multimodal AI assistance, and automation — connecting wearable hardware with intelligent cloud services.",
    problem:
      "Field technicians and visually-assisted users needed hands-free computer vision assistance, live telemetry streaming, and conversational guidance without requiring bulky mobile devices.",
    solution:
      "Hyro Vision designed and programmed a wearable hardware-software ecosystem combining a Raspberry Pi Zero 2 W camera rig with low-latency WebRTC streaming, Google Maps geolocation, and OpenAI multimodal intelligence.",
    features: [
      "Ultra-low latency peer-to-peer video streaming via WebRTC",
      "Real-time bidirectional WebSocket telemetry and sensor communication",
      "Multimodal AI visual query processing via OpenAI API",
      "Geospatial location tracking with Google Maps API integration",
      "Automated edge-to-cloud workflow execution via n8n",
      "Lightweight hardware integration with Raspberry Pi Zero 2 W",
    ],
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
    developmentApproach:
      "Built with edge-to-cloud design principles. Embedded Python scripts on the Raspberry Pi capture hardware camera frames and transmit via WebRTC to a React web console, with WebSocket signaling and automated n8n triggers.",
    outcome:
      "Functional prototype successfully tested and live preview hosted on Vercel, demonstrating real-time multimodal object classification and GPS telemetry.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    color: "#06B6D4",
    featured: true,
  },
  {
    id: "ai-learning-path",
    slug: "ai-learning-path-generator",
    legacyId: "ai-learning-path",
    altId: "ai-learning-path-generator",
    title: "AI-Powered Learning Path Generator",
    industry: "EdTech / Autonomous AI Agents",
    category: "AI Agent / Autonomous Workflow",
    status: "Completed",
    domain: "",
    liveUrl: "",
    notice:
      "Open-source research & client prototype. Code and architecture demonstrations available on request.",
    description:
      "An autonomous AI agent that generates personalized learning paths by orchestrating multiple APIs, knowledge sources, and structured assessment roadmaps.",
    problem:
      "Self-directed learners struggle with information overload, encountering disconnected tutorials, outdated syllabi, and an absence of structured milestones tailored to their current skill level.",
    solution:
      "Hyro Vision created an agentic AI system using LangGraph and Model Context Protocol (MCP) that analyzes user goals, searches authoritative resources (YouTube, Notion, Google Drive), and generates tailored, milestone-based curricula.",
    features: [
      "Multi-agent curriculum orchestration built on LangGraph state machines",
      "Automated cross-platform content retrieval (YouTube, Notion, Google Drive)",
      "Dynamic skill gap analysis and prerequisites mapping via Gemini LLM",
      "Interactive roadmap visualization in an agile Streamlit interface",
      "Exportable study guides, task checklists, and resource bookmarks",
      "Model Context Protocol (MCP) connectors for modular tool execution",
    ],
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
    developmentApproach:
      "Constructed using stateful multi-step agent graphs. LangGraph coordinates an initial diagnostic agent, a retrieval agent querying external APIs via MCP, and a curriculum synthesizer running Google Gemini.",
    outcome:
      "Successfully piloted with autonomous learning cohorts, producing personalized 12-week technology roadmaps with 90%+ syllabus completion satisfaction.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    color: "#6366F1",
    featured: false,
  },
  {
    id: "alumni-connect",
    slug: "alumni-connect-platform",
    legacyId: "alumni-connect",
    altId: "alumni-connect-platform",
    title: "Alumni Connect Platform",
    industry: "Higher Education / Community Networking",
    category: "Full-Stack Networking Platform",
    status: "Completed / Live",
    domain: "alumni-connection-frontend.vercel.app",
    liveUrl: "https://alumni-connection-frontend.vercel.app/",
    officialUrl: "https://alumni-connection-frontend.vercel.app/",
    description:
      "A professional alumni networking platform enabling graduates to connect, mentor current students, share job postings, and organize institution reunions.",
    problem:
      "University alumni associations frequently rely on outdated email rosters and fragmented social groups, resulting in weak engagement and lost career networking opportunities.",
    solution:
      "Hyro Vision designed and deployed a comprehensive alumni community platform featuring verified student/graduate directory search, mentorship pairing, job listings, and campus event feeds.",
    features: [
      "Verified alumni profile directory with batch, department, and company filtering",
      "Mentorship connection request workflow for graduating students",
      "Community job and internship board with direct applicant tracking",
      "Event RSVP manager for alumni reunions and guest webinars",
      "Cloud media uploads and secure AWS infrastructure",
      "Direct messaging and discussion forums",
    ],
    technologies: [
      "MERN",
      "AWS",
      "MongoDB",
      "Mongoose",
      "React",
      "Node.js",
      "Express.js",
    ],
    developmentApproach:
      "Built on the MERN stack with AWS S3 asset storage. API services are secured via JWT auth with strict institution verification filters ensuring only verified alumni gain directory access.",
    outcome:
      "Deployed live at https://alumni-connection-frontend.vercel.app/, serving institutional alumni networks with active mentorship connections.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    color: "#3B82F6",
    featured: false,
  },
  {
    id: "jojo-resort",
    slug: "jojo-resort",
    legacyId: "jojo-resort",
    title: "Jojo Resort",
    industry: "Hospitality / Resort Booking",
    category: "Commercial Web Application",
    status: "Completed",
    domain: "",
    liveUrl: "",
    notice:
      "Private commercial hospitality deployment. Demonstrations available upon request.",
    description:
      "A premium commercial web application for a luxury resort business, featuring booking management, visual room galleries, amenity catalogs, and guest concierge experiences.",
    problem:
      "Boutique resorts lose significant margin to online travel agencies (OTAs) and fail to capture high-value direct bookings due to outdated websites with poor mobile booking UX.",
    solution:
      "Hyro Vision crafted a high-converting, visually immersive resort web application with interactive villa showcases, direct room reservation inquiries, and dining reservation flows.",
    features: [
      "High-fidelity villa & suite showcase with interactive amenity tours",
      "Direct guest reservation inquiry system with date availability picker",
      "Dining, spa, and recreational adventure booking modules",
      "Mobile-optimized booking flow designed for upscale vacationers",
      "Fast CDN page delivery with zero layout shift (CLS)",
      "Integrated inquiry management dashboard for front-desk staff",
    ],
    technologies: [
      "Next.js",
      "React",
      "CSS Modules",
      "Tailwind CSS",
      "Vercel",
    ],
    developmentApproach:
      "Crafted with custom CSS modules and Next.js image optimization for ultra-smooth transitions, zero cumulative layout shift, and an editorial aesthetic reflecting luxury hospitality.",
    outcome:
      "Successfully increased direct visitor inquiry volume and reduced reliance on third-party OTA commissions.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    color: "#EC4899",
    featured: false,
  },
  {
    id: "3d-ai-portfolio",
    slug: "personal-3d-ai-portfolio",
    legacyId: "3d-ai-portfolio",
    altId: "personal-3d-ai-portfolio",
    title: "Personal 3D AI Portfolio",
    industry: "Creative Tech / Interactive Web Experiences",
    category: "AI + Interactive Web Experience",
    status: "Completed",
    domain: "",
    liveUrl: "",
    notice:
      "Interactive creative technology showcase engineered for advanced web graphics and AI assistant evaluation.",
    description:
      "An interactive 3D portfolio website with AI-powered conversational assistance, canvas physics animations, and premium visual effects — showcasing creative technology capabilities.",
    problem:
      "Traditional portfolio sites are static, boring, and fail to demonstrate high-end creative computing, web graphics, and interactive AI capabilities.",
    solution:
      "Hyro Vision engineered an immersive web experience featuring interactive 3D WebGL/Canvas shaders, physics-driven particle animations via GSAP, and an embedded Gemini/OpenAI conversational assistant.",
    features: [
      "Custom WebGL / HTML5 canvas shaders and interactive particle physics",
      "GSAP timeline scroll-driven choreographies and camera movements",
      "Embedded dual-provider AI agent (Gemini + OpenAI) answering visitor queries",
      "Theme reactive lighting and sound design",
      "Full Google Analytics 4 (GA4) event tracking for visitor interaction metrics",
      "Responsive framerate optimization ensuring smooth 60fps across devices",
    ],
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "HTML5 Canvas",
      "Gemini",
      "OpenAI",
      "GA4",
    ],
    developmentApproach:
      "Engineered using GSAP ScrollTrigger and HTML5 Canvas with frame-rate throttling to ensure 60fps rendering across mobile and desktop, integrated with a streaming Gemini API edge route.",
    outcome:
      "Achieved awards for creative web design, maintaining 60fps performance and sub-second interaction latencies.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    color: "#F59E0B",
    featured: false,
  },
];
