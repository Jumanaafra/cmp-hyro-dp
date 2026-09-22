/**
 * HYRO VISION — Centralized Projects & Case Studies Repository
 * SOURCE OF TRUTH for verified public projects and case studies.
 *
 * Public Projects contain strictly verified company work:
 * 1. HillsTourism (LIVE — https://hillstourism.com)
 * 2. Super D — Hospital Management System (ONGOING — Under active engineering)
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
];
